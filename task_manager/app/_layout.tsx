import { Stack } from "expo-router";
import './globals.css'
import { TaskProvider } from "@/context/TaskContext";

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack>
        {/*Welcome screen here */}
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </TaskProvider>
  );
}
