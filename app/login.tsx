import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";
import { useEffect, useState } from "react";

import { HelloWave } from "@/src/components/HelloWave";
import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { useLogin } from "@/src/hooks/features/useLogin";
import useAuth from "@/src/hooks/features/useAuth";
import { useRouter } from "expo-router";
import { Colors } from "@/src/constants/Colors";
// import { View } from 'react-native-reanimated/lib/typescript/Animated';
export default function HomeScreen() {
  const { loginAsync, isLoading, data } = useLogin();
  const { isAuthenticated, user, logout, refreshAuth } = useAuth();
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
      router.push("/(authenticated)");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      
      router.push("/(authenticated)");
    }
  }, [isAuthenticated]);

  return (
    <SafeAreaView style={styles.container}>
      
      <Image
        source={require('@/assets/images/logo-jiipe.png')}
        style={{
          width: 240,
          height: 240,
          alignSelf: 'center',
          marginBottom: 20,
          resizeMode: 'contain'
        }}
      />
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

       <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={isLoading}>
          <Text style={styles.buttonText}>{isLoading ? "Loading..." : "Masuk"}</Text>
        </TouchableOpacity>
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
    fontSize: 32,
    textAlign: "center",
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 8,
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
