import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuth } from "../lib/auth";
import { useRouter } from "expo-router";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const signUpMutation = useMutation(api.auth.signUp);
  const loginMutation = useMutation(api.auth.login);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        const userId = await loginMutation({ email, password });
        await login(userId);
        router.replace("/(tabs)/feed");
      } else {
        const userId = await signUpMutation({ email, password, name });
        await login(userId);
        router.replace("/(tabs)/feed");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isLogin ? "Login" : "Sign Up"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.link}>
          {isLogin ? "Need an account? Sign up" : "Have an account? Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 30, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 15, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 8, marginTop: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 16, fontWeight: "600" },
  link: { color: "#007AFF", textAlign: "center", marginTop: 20 },
});
