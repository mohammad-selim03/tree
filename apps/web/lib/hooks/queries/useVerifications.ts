import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface VerificationItem {
  id: string;
  listingId: string;
  listingTitle: string;
  imageUrl: string;
  claimedSpecies: string;
  claimedCommonName: string;
  detectedSpecies: string | null;
  confidence: number | null;
  status: 'PENDING' | 'VERIFIED' | 'MISMATCH' | 'FLAGGED';
  mismatchReason: string | null;
  predictions: any;
  createdAt: Date;
}

interface VerificationStats {
  total: number;
  VERIFIED: number;
  MISMATCH: number;
  PENDING: number;
  FLAGGED: number;
}

interface VerificationsResponse {
  verifications: VerificationItem[];
  stats: VerificationStats;
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export function useVerifications(params?: {
  status?: string;
  limit?: number;
  offset?: number;
}) {
  return useQuery({
    queryKey: ['verifications', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.status) searchParams.set('status', params.status);
      if (params?.limit) searchParams.set('limit', params.limit.toString());
      if (params?.offset) searchParams.set('offset', params.offset.toString());

      const res = await fetch(`/api/v1/admin/verifications?${searchParams}`);
      if (!res.ok) throw new Error('Failed to fetch verifications');
      const data = await res.json();
      return data.data as VerificationsResponse;
    },
  });
}

export function useUpdateVerification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      analysisId,
      status,
      reason,
    }: {
      analysisId: string;
      status: string;
      reason?: string;
    }) => {
      const res = await fetch('/api/v1/admin/verifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysisId, status, reason }),
      });
      if (!res.ok) throw new Error('Failed to update verification');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verifications'] });
    },
  });
}
