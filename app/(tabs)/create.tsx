import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Image } from "react-native";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "../../lib/auth";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function CreateScreen() {
  const [content, setContent] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { userId } = useAuth();
  const createPost = useMutation(api.posts.createPost);
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleCreate = async () => {
    if (!content.trim() && !imageUri) return Alert.alert("Error", "Post cannot be empty");
    if (!userId) return;

    try {
      await createPost({ userId, content, imageUrl: imageUri || undefined });
      setContent("");
      setImageUri(null);
      router.push("/(tabs)/feed");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={6}
      />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>{imageUri ? "Change Image" : "Add Image"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 15, borderRadius: 8, height: 150, textAlignVertical: "top" },
  image: { width: "100%", height: 200, borderRadius: 8, marginTop: 15 },
  imageButton: { backgroundColor: "#f0f0f0", padding: 15, borderRadius: 8, marginTop: 15 },
  imageButtonText: { color: "#007AFF", textAlign: "center", fontSize: 16, fontWeight: "600" },
  button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 8, marginTop: 20 },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 16, fontWeight: "600" },
});
