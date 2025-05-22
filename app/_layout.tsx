import AppProvider from "@/src/contexts/app.provider";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <AppProvider>
      <Slot />
    </AppProvider>
  );
}
