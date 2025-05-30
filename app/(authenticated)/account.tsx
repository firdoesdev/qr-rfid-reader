import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { useContext, useEffect, useState } from "react";

import { HelloWave } from "@/src/components/HelloWave";
import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { useLogin } from "@/src/hooks/features/useLogin";
import useAuth from "@/src/hooks/features/useAuth";
import { Redirect, useRouter } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { IdCard } from "lucide-react-native";
import { IconSymbol } from "@/src/components/ui/IconSymbol";

export default function HomeScreen() {
  const router = useRouter();
  const authState = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("@/assets/images/logo-jiipe.png")}
        style={{
          width: 240,
          height: 240,
          alignSelf: "center",
          marginBottom: 20,
          resizeMode: "contain",
        }}
      />

      <TouchableOpacity
        onPress={async () => await authState.logout()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF",
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },

  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  menu: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },

  button: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
