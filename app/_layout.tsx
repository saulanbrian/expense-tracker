import { SplashScreen, Stack } from "expo-router";
import { TamaguiProvider, YStack } from "tamagui";
import { useEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import config from "@/tamagui.config";
import { useSupabaseAuth } from "@/src/features/auth/hooks/useSupabaseAuth";
import ThemeContextProvider from "@/src/context/ThemeContextProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

type DefaultThemeType = keyof (typeof config)["themes"];

const defaultTheme: DefaultThemeType = "dark_gray";

export default function RootLayout() {
  const { authenticated } = useSupabaseAuth();

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider initialTheme={defaultTheme}>
        <TamaguiProvider config={config} defaultTheme={defaultTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "ios_from_right",
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name={"auth"} />
            <Stack.Protected guard={authenticated}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name={"camera-scan"} />
            </Stack.Protected>
          </Stack>
        </TamaguiProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}
