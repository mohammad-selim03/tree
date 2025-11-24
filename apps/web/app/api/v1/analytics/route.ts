import { NextRequest, NextResponse } from 'next/server';
import { getSellerAnalytics, getAdminAnalytics } from '@/lib/services/analytics';
import { subDays } from 'date-fns';

/**
 * GET /api/v1/analytics/seller?period=7d|30d|90d
 * Get seller analytics
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sellerId = searchParams.get('sellerId');
    const period = searchParams.get('period') || '30d';
    const type = searchParams.get('type') || 'seller';

    // Parse period
    const days = parseInt(period.replace('d', '')) || 30;
    const startDate = subDays(new Date(), days);
    const endDate = new Date();

    if (type === 'admin') {
      const analytics = await getAdminAnalytics();
      return NextResponse.json({
        success: true,
        data: analytics,
      });
    }

    if (!sellerId) {
      return NextResponse.json(
        { success: false, error: 'Seller ID required' },
        { status: 400 }
      );
    }

    const analytics = await getSellerAnalytics(sellerId, {
      startDate,
      endDate,
    });

    return NextResponse.json({
      success: true,
      data: analytics,
      period: {
        startDate,
        endDate,
        days,
      },
    });
  } catch (error: any) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch analytics',
      },
      { status: 500 }
    );
  }
}
