import { prisma } from '@repo/database';
import { startOfWeek, startOfMonth, subDays, subMonths } from 'date-fns';

export interface AnalyticsPeriod {
  startDate: Date;
  endDate: Date;
}

export interface SellerAnalytics {
  overview: {
    totalListings: number;
    activeListings: number;
    totalViews: number;
    averagePrice: number;
    totalRevenue: number;
  };
  verification: {
    totalImages: number;
    verifiedCount: number;
    mismatchCount: number;
    pendingCount: number;
    verificationRate: number;
  };
  carePlans: {
    totalGenerated: number;
    uniqueSpecies: number;
    averageGenerationsPerListing: number;
  };
  performance: {
    topListings: Array<{
      id: string;
      title: string;
      views: number;
      verificationStatus: string | null;
    }>;
    recentActivity: Array<{
      date: Date;
      listingCount: number;
      viewCount: number;
    }>;
  };
  trends: {
    viewTrend: Array<{ date: string; views: number }>;
    listingTrend: Array<{ date: string; count: number }>;
  };
}

export async function getSellerAnalytics(
  sellerId: string,
  period: AnalyticsPeriod = {
    startDate: subDays(new Date(), 30),
    endDate: new Date(),
  }
): Promise<SellerAnalytics> {
  // Fetch all seller listings
  const listings = await prisma.listing.findMany({
    where: {
      sellerId,
      createdAt: {
        gte: period.startDate,
        lte: period.endDate,
      },
    },
    include: {
      images: {
        include: {
          imageAnalysis: true,
        },
      },
    },
  });

  // Overview metrics
  const totalListings = listings.length;
  const activeListings = listings.filter(l => l.status === 'ACTIVE').length;
  const totalViews = listings.reduce((sum, l) => sum + l.viewCount, 0);
  const averagePrice = listings.length > 0
    ? listings.reduce((sum, l) => sum + Number(l.basePrice), 0) / listings.length
    : 0;

  // Verification metrics
  const allImages = listings.flatMap(l => l.images);
  const allAnalyses = allImages.map(img => img.imageAnalysis).filter(Boolean);
  
  const verifiedCount = allAnalyses.filter(a => a?.verificationStatus === 'VERIFIED').length;
  const mismatchCount = allAnalyses.filter(a => a?.verificationStatus === 'MISMATCH').length;
  const pendingCount = allAnalyses.filter(a => a?.verificationStatus === 'PENDING').length;
  const verificationRate = allAnalyses.length > 0
    ? (verifiedCount / allAnalyses.length) * 100
    : 0;

  // Care plan metrics
  const carePlans = await prisma.aICarePlan.findMany({
    where: {
      createdAt: {
        gte: period.startDate,
        lte: period.endDate,
      },
    },
  });

  const uniqueSpecies = new Set(carePlans.map(cp => cp.speciesId)).size;

  // Top listings
  const topListings = listings
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5)
    .map(l => ({
      id: l.id,
      title: l.title,
      views: l.viewCount,
      verificationStatus: l.images[0]?.imageAnalysis?.verificationStatus || null,
    }));

  // Trends (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    return {
      date: date.toISOString().split('T')[0],
      views: 0,
      count: 0,
    };
  });

  // View trend (simplified - in production, track daily metrics)
  const viewTrend = last7Days.map(day => ({
    date: day.date,
    views: Math.floor(totalViews / 7), // Simplified average
  }));

  const listingTrend = last7Days.map(day => ({
    date: day.date,
    count: listings.filter(l => 
      l.createdAt.toISOString().split('T')[0] === day.date
    ).length,
  }));

  return {
    overview: {
      totalListings,
      activeListings,
      totalViews,
      averagePrice,
      totalRevenue: 0, // TODO: Calculate from actual orders
    },
    verification: {
      totalImages: allImages.length,
      verifiedCount,
      mismatchCount,
      pendingCount,
      verificationRate: Math.round(verificationRate),
    },
    carePlans: {
      totalGenerated: carePlans.length,
      uniqueSpecies,
      averageGenerationsPerListing: totalListings > 0 
        ? carePlans.length / totalListings 
        : 0,
    },
    performance: {
      topListings,
      recentActivity: [], // Simplified for now
    },
    trends: {
      viewTrend,
      listingTrend,
    },
  };
}

export async function getAdminAnalytics(): Promise<{
  platform: {
    totalUsers: number;
    totalSellers: number;
    totalListings: number;
    totalViews: number;
  };
  aiUsage: {
    totalVerifications: number;
    verificationRate: number;
    totalCarePlans: number;
    activeWorkers: number;
  };
  growth: {
    newUsersThisWeek: number;
    newListingsThisWeek: number;
    growthRate: number;
  };
}> {
  const weekStart = startOfWeek(new Date());
  const monthStart = startOfMonth(new Date());

  const [
    totalUsers,
    totalSellers,
    totalListings,
    newUsersThisWeek,
    newListingsThisWeek,
    totalVerifications,
    verifiedCount,
    totalCarePlans,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.seller.count(),
    prisma.listing.count(),
    prisma.user.count({ where: { createdAt: { gte: weekStart } } }),
    prisma.listing.count({ where: { createdAt: { gte: weekStart } } }),
    prisma.imageAnalysis.count(),
    prisma.imageAnalysis.count({ where: { verificationStatus: 'VERIFIED' } }),
    prisma.aICarePlan.count(),
  ]);

  // Calculate total views
  const listings = await prisma.listing.findMany({
    select: { viewCount: true },
  });
  const totalViews = listings.reduce((sum, l) => sum + l.viewCount, 0);

  const verificationRate = totalVerifications > 0
    ? (verifiedCount / totalVerifications) * 100
    : 0;

  return {
    platform: {
      totalUsers,
      totalSellers,
      totalListings,
      totalViews,
    },
    aiUsage: {
      totalVerifications,
      verificationRate: Math.round(verificationRate),
      totalCarePlans,
      activeWorkers: 1, // Simplified
    },
    growth: {
      newUsersThisWeek,
      newListingsThisWeek,
      growthRate: 0, // TODO: Calculate from historical data
    },
  };
}
