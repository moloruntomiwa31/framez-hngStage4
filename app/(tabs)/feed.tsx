import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function FeedScreen() {
  const posts = useQuery(api.posts.getAllPosts);

  if (!posts) return <Text style={styles.loading}>Loading...</Text>;

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.post}>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.user?.name[0].toUpperCase()}</Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.author}>{item.user?.name}</Text>
              <Text style={styles.timestamp}>{formatTime(item.createdAt)}</Text>
            </View>
          </View>
          {item.content && <Text style={styles.content}>{item.content}</Text>}
          {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.image} />}
        </View>
      )}
      ListEmptyComponent={<Text style={styles.empty}>No posts yet</Text>}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  loading: { textAlign: "center", marginTop: 50, fontSize: 16 },
  post: { backgroundColor: "#fff", padding: 15, borderRadius: 8, marginBottom: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#007AFF", justifyContent: "center", alignItems: "center", marginRight: 10 },
  avatarText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  headerText: { flex: 1 },
  author: { fontWeight: "bold", fontSize: 16 },
  timestamp: { fontSize: 12, color: "#999", marginTop: 2 },
  content: { fontSize: 14, color: "#333", marginBottom: 10 },
  image: { width: "100%", height: 250, borderRadius: 8, marginTop: 5 },
  empty: { textAlign: "center", marginTop: 50, fontSize: 16, color: "#999" },
});
