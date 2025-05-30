import AppProvider from "@/src/contexts/app.context";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
      <AppProvider>
        <Stack screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen
            name="(authenticated)"
            options={{ headerShown: false, animation:'none' }}
          />
          <Stack.Screen
            name="login"
            options={{ headerShown: false , animation: "none"}}
          />
        </Stack>
      </AppProvider>
    
  );
}
