import TabHeader from "@/src/components/TabHeader";
import TabBar from "@/src/components/TabBar";
import { Tabs } from "expo-router";
import React from "react";
import {
  UploadCloud,
  FileCheck,
  TrendingUp,
  History,
  Component as IconComponent,
} from "@tamagui/lucide-icons-2";
import { GetProps } from "tamagui";

type IconProps = GetProps<typeof IconComponent>;

export const TabIcons = {
  ingestion: (props: IconProps) => <UploadCloud {...props} />,
  verification: (props: IconProps) => <FileCheck {...props} />,
  analytics: (props: IconProps) => <TrendingUp {...props} />,
  "audit-trail": (props: IconProps) => <History {...props} />,
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        header: (props) => <TabHeader {...props} />,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="ingestion" options={{ title: "Ingestion" }} />
      <Tabs.Screen name="verification" options={{ title: "Verification" }} />
      <Tabs.Screen name="analytics" options={{ title: "Analytics" }} />
      <Tabs.Screen name="audit-trail" options={{ title: "Audit Trail" }} />
    </Tabs>
  );
}
