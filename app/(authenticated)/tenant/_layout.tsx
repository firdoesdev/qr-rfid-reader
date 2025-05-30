import { IconSymbol } from "@/src/components/ui/IconSymbol";
import { Colors } from "@/src/constants/Colors";
import { useUpdateGatepassNumber } from "@/src/hooks/features/gatepass/useUpdateGatepassNumber";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function TenantLayout() {
  

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Tenant Documents",
          
        }}
      />
      <Stack.Screen
        name="camera"
        options={{
          headerTitle: "Verifikasi Dokumen Tenan",
        }}
      />
    </Stack>
  );
}
