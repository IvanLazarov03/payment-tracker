import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Плаќања" }} />

      <Stack.Screen
        name="balance"
        options={{
          title: "Внеси Состојба",
        }}
      />

      <Stack.Screen
        name="add"
        options={{
          title: "Додади Плаќање",
          presentation: "formSheet",
          sheetAllowedDetents: [0.7],
        }}
      />

      <Stack.Screen
        name="edit/[id]"
        options={{
          title: "Уреди Плаќање",
          presentation: "formSheet",
          sheetAllowedDetents: [0.7],
        }}
      />
    </Stack>
  );
}
