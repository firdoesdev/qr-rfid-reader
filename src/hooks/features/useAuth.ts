import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  USER_STORAGE_KEY,
} from "@/src/constants/storage-key";
import axios from "@/src/libs/axios";

interface Permission {
  id: string;
  name: string;
  key: string;
  group_name: string;
}

interface Role {
  id: string;
  name: string;
  key: string;
  permissions: Permission[];
  is_active: boolean;
}

interface Company {
  id: string;
  name: string;
  type: string;
}

interface User {
  id: string;
  fullname: string;
  email: string;
  company: Company;
  role: Role;
  phone_number: string;
  account_quota: null | number;
}

interface LoginResponse {
  data: {
    user: {
      id: string;
      fullname: string;
      email: string;
      company: Company;
      role: Role;
      phone_number: string;
      account_quota: null | number;
    };
    token: string;
  };
  message: string;
}
interface LoginCredentials {
  email: string;
  password: string;
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
  const router = useRouter();

  useEffect(() => {
    // Load auth state from AsyncStorage on mount
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const [userString, token] = await Promise.all([
        AsyncStorage.getItem(USER_STORAGE_KEY),
        AsyncStorage.getItem(ACCESS_TOKEN_STORAGE_KEY),
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
      console.error("Failed to load auth state:", error);
      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        "/auth/login",
        credentials
      );
      await Promise.all([
        AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.data.user)),
        AsyncStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, data.data.token),
      ]);

      setAuthState({
        user: data.data.user,
        token: data.data.token,
        isLoading: false,
        isAuthenticated: true,
      });

      router.replace("/");

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(USER_STORAGE_KEY),
        AsyncStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY),
      ]);

      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      });

      router.replace("/login");

      return true;
    } catch (error) {
      console.error("Logout failed:", error);
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
