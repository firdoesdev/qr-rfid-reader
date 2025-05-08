import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import { useEffect, useState } from "react";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLogin } from "@/hooks/features/useLogin";
import useAuth from "@/hooks/features/useAuth";
import { Redirect, useRouter } from "expo-router";
// import { View } from 'react-native-reanimated/lib/typescript/Animated';
export default function HomeScreen() {
  const { loginAsync, isLoading, data } = useLogin();
  const {
    isAuthenticated,
    user,
    logout,
    refreshAuth,
    isLoading: sessionLoading,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const credentials = {
      email,
      password,
    };
    try {
      await loginAsync(credentials);
      refreshAuth();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (sessionLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </SafeAreaView>
    );
  }



  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      <Text style={styles.title}>{user?.email}</Text>
      <Button
          title="Logout"
          onPress={async () => {
            await logout();
            router.push('/login')
          }}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF",
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 5,
    width: "100%",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
  },
});
