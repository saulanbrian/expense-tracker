import { SplashScreen, Stack } from "expo-router";
import { TamaguiProvider, YStack } from "tamagui";
import { useEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import config from "@/tamagui.config";
import { useSupabaseAuth } from "@/src/features/auth/hooks/useSupabaseAuth";
import StackHeader from "@/src/components/StackHeader";
import ThemeContextProvider from "@/src/context/ThemeContextProvider";

type DefaultThemeType = keyof (typeof config)["themes"];

const defaultTheme: DefaultThemeType = "light_gray";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { authenticated, loading } = useSupabaseAuth();

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000);
    }
  }, [loading]);

  if (loading) return null;

  return (
    <ThemeContextProvider initialTheme={defaultTheme}>
      <TamaguiProvider config={config} defaultTheme={defaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "ios_from_right",
          }}
        >
          <Stack.Screen name={"auth"} />
          <Stack.Protected guard={authenticated}>
            <Stack.Screen name="(tabs)" />
          </Stack.Protected>
        </Stack>
      </TamaguiProvider>
    </ThemeContextProvider>
  );
}
