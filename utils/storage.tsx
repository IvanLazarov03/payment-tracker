// utils/storage.tsx
import { useSQLiteContext } from "expo-sqlite";

// -----------------------------
// 🔹 BALANCE
// -----------------------------
export function useBalanceStorage() {
  const db = useSQLiteContext();

  const saveBalance = async (amount: number) => {
    // Only one balance row, overwrite each time
    await db.runAsync("DELETE FROM balance");
    await db.runAsync("INSERT INTO balance (id, value) VALUES (?, ?)", [
      1,
      amount,
    ]);
  };

  const loadBalance = async (): Promise<number> => {
    const row = await db.getFirstAsync<{ value: number }>(
      "SELECT value FROM balance WHERE id = 1"
    );
    return row ? row.value : 0; // default = 0
  };

  const getBalance = async (): Promise<number | null> => {
    const row = await db.getFirstAsync<{ value: number }>(
      "SELECT value FROM balance WHERE id = 1"
    );
    return row ? row.value : null; // distinguish "no balance" vs "exists"
  };

  const clearBalance = async () => {
    await db.runAsync("DELETE FROM balance");
  };

  return { saveBalance, loadBalance, getBalance, clearBalance };
}

// -----------------------------
// 🔹 PAYMENTS
// -----------------------------
export function usePaymentsStorage() {
  const db = useSQLiteContext();

  const savePayment = async (description: string, amount: number) => {
    await db.runAsync(
      "INSERT INTO payments (description, amount) VALUES (?, ?)",
      [description, amount]
    );
  };

  const loadPayments = async () => {
    return await db.getAllAsync<{
      id: number;
      description: string;
      amount: number;
    }>("SELECT * FROM payments ORDER BY id DESC");
  };

  const clearPayments = async () => {
    await db.runAsync("DELETE FROM payments");
  };

  const updatePayment = async (
    id: number,
    description: string,
    amount: number
  ) => {
    await db.runAsync(
      "UPDATE payments SET description = ?, amount = ? WHERE id = ?",
      [description, amount, id]
    );
  };

  const deletePayment = async (id: number) => {
    await db.runAsync("DELETE FROM payments WHERE id = ?", [id]);
  };

  return {
    savePayment,
    loadPayments,
    clearPayments,
    updatePayment,
    deletePayment,
  };
}
