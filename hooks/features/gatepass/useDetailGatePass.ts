import {  useQuery } from '@tanstack/react-query';
import axios from '@/libs/axios';

interface CompanyEmployee {
    id: string;
    name: string;
    nip: string;
    email: string;
    activity: string;
    status: string;
    gatepass_number: string;
    valid_start_at: string;
    valid_end_at: string;
    is_permanent: boolean;
    letter_of_assignment_path: string;
    letter_of_assignment_url: string;
    integrity_pact_letter_path: string;
    integrity_pact_letter_url: string;
    created_at: string;
    updated_at: string;
    created_by: {
        id: string;
        fullname: string;
    };
}

interface ApiResponse {
    data: CompanyEmployee;
    message: string;
}

interface UseDetailCompanyEmployeeProps {
    id?: string;
    enabled?: boolean;
}

export const useDetailCompanyEmployee = ({ id, enabled = !!id }: UseDetailCompanyEmployeeProps) => {
    return useQuery({
        queryKey: ['company-employee', id],
        queryFn: async () => {
            if (!id) throw new Error('Company employee ID is required');
            const response = await axios.get<ApiResponse>(`/company-employees/${id}`);
            return response.data;
        },
        enabled,
    });
};