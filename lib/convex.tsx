import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import "react-native-get-random-values";
import Constants from "expo-constants";

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL || Constants.expoConfig?.extra?.convexUrl;

const convex = new ConvexReactClient(convexUrl!, {
  unsavedChangesWarning: false,
});

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
