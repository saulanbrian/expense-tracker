import { TabBar, TabHeader } from "@/src/components/navigation";
import { Tabs } from "expo-router";
import React from "react";

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
