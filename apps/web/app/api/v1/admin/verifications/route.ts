import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/database';

/**
 * GET /api/v1/admin/verifications
 * Fetch all image analysis results with listing details
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status'); // PENDING, VERIFIED, MISMATCH, FLAGGED
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build where clause
    const where: any = {};
    if (status && status !== 'ALL') {
      where.verificationStatus = status;
    }

    // Fetch analyses with related data
    const [analyses, total] = await Promise.all([
      prisma.imageAnalysis.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
        include: {
          image: {
            include: {
              listing: {
                include: {
                  species: true,
                },
              },
            },
          },
        },
      }),
      prisma.imageAnalysis.count({ where }),
    ]);

    // Transform to frontend format
    const verifications = analyses.map((analysis) => ({
      id: analysis.id,
      listingId: analysis.image.listingId,
      listingTitle: analysis.image.listing.title,
      imageUrl: analysis.image.url,
      claimedSpecies: analysis.image.listing.species.scientificName,
      claimedCommonName: analysis.image.listing.species.commonName,
      detectedSpecies: analysis.topPrediction,
      confidence: analysis.confidence,
      status: analysis.verificationStatus,
      mismatchReason: analysis.mismatchReason,
      predictions: analysis.predictions,
      createdAt: analysis.createdAt,
    }));

    // Calculate stats
    const stats = await prisma.imageAnalysis.groupBy({
      by: ['verificationStatus'],
      _count: true,
    });

    const statsMap = {
      total: total,
      VERIFIED: stats.find(s => s.verificationStatus === 'VERIFIED')?._count || 0,
      MISMATCH: stats.find(s => s.verificationStatus === 'MISMATCH')?._count || 0,
      PENDING: stats.find(s => s.verificationStatus === 'PENDING')?._count || 0,
      FLAGGED: stats.find(s => s.verificationStatus === 'FLAGGED')?._count || 0,
    };

    return NextResponse.json({
      success: true,
      data: {
        verifications,
        stats: statsMap,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
      },
    });
  } catch (error) {
    console.error('Failed to fetch verifications:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch verification data',
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/v1/admin/verifications/:id
 * Manually update verification status (for admin review)
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { analysisId, status, reason } = body;

    if (!analysisId || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const updated = await prisma.imageAnalysis.update({
      where: { id: analysisId },
      data: {
        verificationStatus: status,
        mismatchReason: reason || null,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Failed to update verification:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update verification',
      },
      { status: 500 }
    );
  }
}
