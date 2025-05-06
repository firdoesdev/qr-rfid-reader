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
import { useState } from "react";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLogin } from "@/hooks/features/useLogin";
import useAuth from "@/hooks/features/useAuth";
// import { View } from 'react-native-reanimated/lib/typescript/Animated';
export default function HomeScreen() {
  const { loginAsync, isLoading, data } = useLogin();
  const { isAuthenticated,user,logout, refreshAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  if (isAuthenticated) {
    console.log("User is authenticated:", user?.email);
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.title}>{user?.email}</Text>
        <Button
          title="Logout"
          onPress={async () => {
            await logout();
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
      <Text>Email:</Text>
      <TextInput
        placeholder="Enter your email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Text>Password:</Text>
      <TextInput
        placeholder="Enter your password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
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
