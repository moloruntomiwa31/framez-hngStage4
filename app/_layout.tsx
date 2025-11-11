import { Stack } from "expo-router";
import { ConvexClientProvider } from "../lib/convex";
import { AuthProvider } from "../lib/auth";

export default function RootLayout() {
  return (
    <ConvexClientProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AuthProvider>
    </ConvexClientProvider>
  );
}
