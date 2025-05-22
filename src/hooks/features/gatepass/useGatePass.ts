import { useState, useCallback } from 'react';

import { useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import axios from '@/src/libs/axios';

// Define types for company
interface Company {
    id: string;
    email: string | null;
    npwp: string;
    name: string;
    business_field: string;
    operation_status: string;
    type: string;
    status_pu: string;
    no_pu: string | null;
    pic_name: string;
    pic_phone: string;
    address: string | null;
    created_at: string;
    updated_at: string;
}

// Define employee type based on API response
interface CompanyEmployee {
    id: string;
    name: string;
    nip: string;
    email: string;
    company: Company;
    activity: string;
    gatepass_number: string;
    valid_start_at: string;
    valid_end_at: string | null;
    is_permanent: boolean;
    letter_of_assignment_path: string | null;
    letter_of_assignment_url: string | null;
    integrity_pact_letter_path: string | null;
    integrity_pact_letter_url: string | null;
    created_at: string;
    updated_at: string;
}

interface PaginationParams {
    page: number;
    limit: number;
    search?: string;
    // Add other filter parameters as needed
}

interface ApiResponse {
    data: {
        meta: {
            page: number;
            total: number;
            per_page: number;
            total_page: number;
        };
        items: CompanyEmployee[];
    };
    message: string;
}

const fetchEmployees = async ({ pageParam = 1, queryKey }: any): Promise<ApiResponse> => {
    const [_, params] = queryKey;
    const response = await axios.get<ApiResponse>('/company-employees', { 
        params: { ...params, page: pageParam } 
    });
    return response.data;
};

const useGatePass = () => {
    const [params, setParams] = useState({
        limit: 10,
        search: undefined as string | undefined,
    });
    const queryClient = useQueryClient();

    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch
    } = useInfiniteQuery({
        queryKey: ['company-employees', params],
        queryFn: fetchEmployees,
        initialPageParam: 1,
        // refetchInterval: 5000,
        getNextPageParam: (lastPage) => {
            const { page, total_page } = lastPage.data.meta;
            return page < total_page ? page + 1 : undefined;
        },
    });

    // Flatten all pages of data
    const employees = data?.pages.flatMap(page => page.data.items) || [];
    const meta = data?.pages[data.pages.length - 1]?.data.meta || {
        page: 1,
        total: 0,
        per_page: 10,
        total_page: 1,
    };

    const loadMore = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const changeLimit = (limit: number) => {
        setParams(prev => ({ ...prev, limit }));
    };

    const searchEmployees = (search: string) => {
        setParams(prev => ({ ...prev, search }));
    };

    const refresh = () => {
        refetch();
    };

    return {
        employees,
        loading: isLoading,
        loadingMore: isFetchingNextPage,
        error: error ? (error instanceof Error ? error.message : 'Failed to fetch employees') : null,
        meta,
        hasNextPage,
        loadMore,
        changeLimit,
        searchEmployees,
        refresh
    };
};

export default useGatePass;
