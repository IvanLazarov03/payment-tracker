import { Stack } from "expo-router";

export default function RootLayout() {
  //Ovde go definirame layout na apklikacijata so Stack Navigator
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Внеси Состојба" }} />

      <Stack.Screen
        name="balance"
        options={{
          title: "Состојба",
        }}
      />

      <Stack.Screen
        name="add"
        options={{
          title: "Додади Плаќање",
          //so presentation go definirame nacinot na koj sakame da se prikaze noviot ekran
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
