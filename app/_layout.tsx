import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Плакања" }} />
      <Stack.Screen
        name="add"
        options={{
          title: "Додади Плакање",
          presentation: "formSheet",
          sheetAllowedDetents: [0.7, 0.7],
        }}
      />
    </Stack>
  );
}
