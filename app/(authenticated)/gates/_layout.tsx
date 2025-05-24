import { IconSymbol } from "@/src/components/ui/IconSymbol";
import { Colors } from "@/src/constants/Colors";
import { useUpdateGatepassNumber } from "@/src/hooks/features/gatepass/useUpdateGatepassNumber";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function GateLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTitle: "Gate",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
        }}
      />
       
    </>
  );
}
