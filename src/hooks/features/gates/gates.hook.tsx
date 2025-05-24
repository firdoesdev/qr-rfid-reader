import {gates} from '@/src/api/gate/gate.api'
import {TGatesResponse} from '@/src/api/gate/gate.response'
import {TGatesFilterParams} from '@/src/api/gate/gate.request'

import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query'
import { useState } from 'react'


const GATES_QUERY_KEY = 'gate-list'

export const useGates = () => {
   const [params, setParams] = useState<TGatesFilterParams>({
    page: 1,
    per_page:10
   });

  const gatesQuery = useInfiniteQuery({
    queryKey: [GATES_QUERY_KEY, params],
    queryFn: ({ pageParam }) => {
        console.log('Fetching gates with params:', pageParam);
        return gates({ ...params, page: pageParam })
    },
    getNextPageParam: (lastPage) => {
      const { page, total_page } = lastPage.data.meta;
      return page < total_page ? page + 1 : undefined;
    },
    
    initialPageParam: 1
  })

  return {
    ...gatesQuery,
    data: gatesQuery.data?.pages.flatMap((page) => page.data.items) || [],
  }
}