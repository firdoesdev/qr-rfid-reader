import { Tabs } from "expo-router";
import React, { useContext } from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/src/components/HapticTab";
import { IconSymbol } from "@/src/components/ui/IconSymbol";
import TabBarBackground from "@/src/components/ui/TabBarBackground";
import { Colors } from "@/src/constants/Colors";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { Redirect } from "expo-router";
import useAuth from "@/src/hooks/features/useAuth";


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const authState = useAuth();
  
  if (!authState.isAuthenticated && !authState.isLoading) {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="gates"
        options={{
          title: "Gate",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="boom.gate" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="qr-camera"
        options={{
          title: "QR Code",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="qr.scanner" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="gatepass-personil"
        options={{
          title: "Gatepass",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="card.add" color={color} />
          ),
        }}
      />

        <Tabs.Screen
        name="tenant"
        options={{
          title: "Tenant Verification",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="user" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
