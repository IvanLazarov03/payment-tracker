import { Stack } from "expo-router";

import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  const createDbIfNeeded = async (db: SQLiteDatabase) => {
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS balance (
      id INTEGER PRIMARY KEY,
      value REAL
    );

    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT,
      amount REAL
    );
  `);
  };

  //Ovde go definirame layout na apklikacijata so Stack Navigator
  return (
    <SQLiteProvider databaseName="storage.db" onInit={createDbIfNeeded}>
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
    </SQLiteProvider>
  );
}
