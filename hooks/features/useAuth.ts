import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

interface User {
    id: string
    fullname: string
    email: string
    company: Company
    role: Role
    phone_number: string
    account_quota: null | number
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        token: null,
        isLoading: true,
        isAuthenticated: false,
    });

    useEffect(() => {
        // Load auth state from AsyncStorage on mount
        loadAuthState();
    }, []);

    const loadAuthState = async () => {
        try {
            const [userString, token] = await Promise.all([
                AsyncStorage.getItem('user'),
                AsyncStorage.getItem('accessToken'),
            ]);
            
            if (userString && token) {
                const user = JSON.parse(userString);
                
                setAuthState({
                    user,
                    token,
                    isLoading: false,
                    isAuthenticated: true,
                });
            } else {
                setAuthState({
                    user: null,
                    token: null,
                    isLoading: false,
                    isAuthenticated: false,
                });
            }
        } catch (error) {
            console.error('Failed to load auth state:', error);
            setAuthState({
                user: null,
                token: null,
                isLoading: false,
                isAuthenticated: false,
            });
        }
    };

    const login = async (user: User, token: string) => {
        try {
            await Promise.all([
                AsyncStorage.setItem('user', JSON.stringify(user)),
                AsyncStorage.setItem('token', token),
            ]);
            
            setAuthState({
                user,
                token,
                isLoading: false,
                isAuthenticated: true,
            });
            
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const logout = async () => {
        try {
            await Promise.all([
                AsyncStorage.removeItem('user'),
                AsyncStorage.removeItem('token'),
            ]);
            
            setAuthState({
                user: null,
                token: null,
                isLoading: false,
                isAuthenticated: false,
            });
            
            return true;
        } catch (error) {
            console.error('Logout failed:', error);
            return false;
        }
    };

    return {
        user: authState.user,
        token: authState.token,
        isLoading: authState.isLoading,
        isAuthenticated: authState.isAuthenticated,
        login,
        logout,
        refreshAuth: loadAuthState,
    };
};

export default useAuth;