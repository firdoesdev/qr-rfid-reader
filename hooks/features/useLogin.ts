import axios from '@/libs/axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

interface LoginCredentials {
    email: string
    password: string
}

interface Permission {
    id: string
    name: string
    key: string
    group_name: string
}

interface Role {
    id: string
    name: string
    key: string
    permissions: Permission[]
    is_active: boolean
}

interface Company {
    id: string
    name: string
    type: string
}

interface LoginResponse {
    data: {
        user: {
            id: string
            fullname: string
            email: string
            company: Company
            role: Role
            phone_number: string
            account_quota: null | number
        }
        token: string
    }
    message: string
}


interface LoginError {
    message: string
    errors?: Record<string, string[]>
}

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null)

    const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {

        console.log('Logging in with credentials:', credentials)
        setError(null)
        
        try {
            const { data } = await axios.post<LoginResponse>('/auth/login', credentials)
            // Store token in secure storage or context
            await AsyncStorage.setItem('accessToken', data.data.token)
            await AsyncStorage.setItem('user', JSON.stringify(data.data.user))
            console.log('Login successful:', data)
            return data
        } catch (err) {
            console.error('Login error:', err)
            setError('Network error occurred')
            throw new Error('Network error occurred')
        }
    }

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setError(null)
            // You can add additional success handling here
        }
    })

    return {
        login: mutation.mutate,
        loginAsync: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error,
        isError: !!error,
        data: mutation.data
    }
}
