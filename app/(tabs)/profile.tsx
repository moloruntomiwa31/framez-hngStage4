import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "../../lib/auth";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { userId, logout } = useAuth();
  const user = useQuery(api.auth.getUser, userId ? { userId } : "skip");
  const posts = useQuery(api.posts.getUserPosts, userId ? { userId } : "skip");
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  if (!user) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarText}>{user.name[0].toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.postsTitle}>My Posts ({posts?.length || 0})</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            {item.content && <Text style={styles.content}>{item.content}</Text>}
            {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.image} />}
            <Text style={styles.date}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No posts yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loading: { textAlign: "center", marginTop: 50, fontSize: 16 },
  header: { padding: 20, backgroundColor: "#f8f8f8", borderBottomWidth: 1, borderBottomColor: "#ddd", alignItems: "center" },
  avatarLarge: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#007AFF", justifyContent: "center", alignItems: "center", marginBottom: 15 },
  avatarText: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 5 },
  email: { fontSize: 14, color: "#666", marginBottom: 15 },
  logoutButton: { backgroundColor: "#ff3b30", padding: 12, borderRadius: 8, width: "100%" },
  logoutText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  postsTitle: { fontSize: 18, fontWeight: "bold", padding: 15 },
  post: { backgroundColor: "#fff", padding: 15, marginHorizontal: 15, marginBottom: 10, borderRadius: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  content: { fontSize: 14, color: "#333", marginBottom: 8 },
  image: { width: "100%", height: 200, borderRadius: 8, marginBottom: 8 },
  date: { fontSize: 12, color: "#999" },
  empty: { textAlign: "center", marginTop: 30, fontSize: 16, color: "#999" },
});
