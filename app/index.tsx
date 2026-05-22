import LoadingScreen from "@/src/components/LoadingScreen";
import { useSupabaseAuth } from "@/src/features/auth/hooks/useSupabaseAuth";
import { Redirect } from "expo-router";

export default function App() {
  const { loading, authenticated } = useSupabaseAuth();

  if (loading) return <LoadingScreen />;

  return (
    <Redirect href={authenticated ? "/(tabs)/ingestion" : "/auth/sign-in"} />
  );
}
