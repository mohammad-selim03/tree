import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/database';
import { generateCarePlan } from '@/lib/ai/gemini';

/**
 * POST /api/v1/care-plans/generate
 * Generate a new care plan for a species
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { speciesId, userId, userLocation, plantAge, potSize } = body;

    if (!speciesId) {
      return NextResponse.json(
        { success: false, error: 'Species ID is required' },
        { status: 400 }
      );
    }

    // Fetch species details
    const species = await prisma.species.findUnique({
      where: { id: speciesId },
    });

    if (!species) {
      return NextResponse.json(
        { success: false, error: 'Species not found' },
        { status: 404 }
      );
    }

    // Generate care plan using AI
    const carePlan = await generateCarePlan({
      speciesName: species.commonName,
      scientificName: species.scientificName,
      userLocation,
      plantAge,
      potSize,
    });

    // Save to database if userId provided
    let savedPlan = null;
    if (userId) {
      savedPlan = await prisma.aICarePlan.create({
        data: {
          userId,
          speciesId,
          schedule: carePlan as any, // Store full JSON
          generatedContent: carePlan.summary,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: savedPlan?.id,
        carePlan,
        species: {
          id: species.id,
          commonName: species.commonName,
          scientificName: species.scientificName,
        },
      },
    });
  } catch (error: any) {
    console.error('Failed to generate care plan:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to generate care plan',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/v1/care-plans?speciesId=xxx
 * Get existing care plan for a species
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const speciesId = searchParams.get('speciesId');
    const userId = searchParams.get('userId');

    if (!speciesId && !userId) {
      return NextResponse.json(
        { success: false, error: 'Species ID or User ID is required' },
        { status: 400 }
      );
    }

    const where: any = {};
    if (speciesId) where.speciesId = speciesId;
    if (userId) where.userId = userId;

    const carePlans = await prisma.aICarePlan.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 10, // Return last 10 plans
    });

    return NextResponse.json({
      success: true,
      data: carePlans.map(plan => ({
        id: plan.id,
        carePlan: plan.schedule, // The full JSON care plan
        summary: plan.generatedContent,
        speciesId: plan.speciesId,
        userId: plan.userId,
        createdAt: plan.createdAt,
      })),
    });
  } catch (error: any) {
    console.error('Failed to fetch care plans:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch care plans',
      },
      { status: 500 }
    );
  }
}
