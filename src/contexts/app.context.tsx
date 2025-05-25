import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { PropsWithChildren, useEffect, createContext, useState } from "react";
import "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useColorScheme } from "@/src/hooks/useColorScheme";

import { Buffer } from "buffer";
import ReactQueryClientProvider from "../libs/react-query";
import { login as loginApi } from "../api/auth/login/login.api";
import { useRouter } from "expo-router";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  USER_STORAGE_KEY,
} from "../constants/storage-key";

global.Buffer = Buffer;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function AppProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <ReactQueryClientProvider>
      {/* You can use the context here if needed */}
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar style="dark" />
        {children}
      </ThemeProvider>
    </ReactQueryClientProvider>
  );
}
