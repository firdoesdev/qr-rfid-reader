import { listDocumentCiesa } from "@/src/api/ciesa/ciesa.api";

import { useInfiniteQuery } from "@tanstack/react-query";
import { TTListCiesaFilterParams } from "@/src/api/ciesa/ciesa.request";
import { useState } from "react";

const CIESA_DOCS_QUERY_KEY = "list-ciesa-docs";

export const useListCiesaDocuments = (nitku: string) => {
  const [params, setParams] = useState<TTListCiesaFilterParams>({
    page: 1,
    per_page: 5,
    nitku: nitku,
    order: 'DESC'
  })

  const ciesaQuery = useInfiniteQuery({
    queryKey: [CIESA_DOCS_QUERY_KEY,  params],
    enabled: !!nitku, // Only run query if nitku is provided
    queryFn: ({ pageParam }) => {
      return listDocumentCiesa({ ...params, page: pageParam })
    },
    getNextPageParam: (lastPage) => {
      const { page, total_page } = lastPage.data.meta
      return page < total_page ? page + 1 : undefined
    },
    initialPageParam: 1,
  })

  return {
    ...ciesaQuery,
    data: ciesaQuery.data?.pages.flatMap((page) => page.data.items) || [],
  }
}