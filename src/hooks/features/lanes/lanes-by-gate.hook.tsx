import { lanes } from '@/src/api/lane/lane.api'
import { TGatesFilterParams } from '@/src/api/gate/gate.request'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'


const LANES_BY_GATE_QUERY_KEY = 'lanes'

export const useLanesByGate = (gateId: string) => {
   const [params, setParams] = useState<TGatesFilterParams>({
    page: 1,
    per_page:10
   });

  const lanesQuery = useInfiniteQuery({
    queryKey: [LANES_BY_GATE_QUERY_KEY, params],
    queryFn: ({ pageParam }) => {
        console.log('Fetching lanes with params:', gateId);
        return lanes(gateId, { ...params, page: pageParam })
    },
    getNextPageParam: (lastPage) => {
      const { page, total_page } = lastPage.data.meta;
      return page < total_page ? page + 1 : undefined;
    },
    
    initialPageParam: 1
  })

  return {
    ...lanesQuery,
    data: lanesQuery.data?.pages.flatMap((page) => page.data.items) || [],
  }
}