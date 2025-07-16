import { Stack } from "expo-router";
import './globals.css'; // Import global styles (Tailwind or other global CSS)
import { TaskProvider } from "@/context/TaskContext"; // Global context for managing tasks

export default function RootLayout() {
  return (
    // Provide global task context to all screens
    <TaskProvider>
      {/* Define the navigation stack */}
      <Stack>
        {/* Initial Welcome screen shown on first app load */}
        <Stack.Screen 
          name="welcome" 
          options={{ headerShown: false }} 
        />

        {/* Main tab navigation (contains home, add task, calendar) */}
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
      </Stack>
    </TaskProvider>
  );
}
