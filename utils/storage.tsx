import AsyncStorage from "@react-native-async-storage/async-storage";

const BALANCE_KEY = "card_balance";
const PAYMENTS_KEY = "payments";

// -----------------------------
// 🔹 BALANCE
// -----------------------------
export async function saveBalance(amount: number) {
  await AsyncStorage.setItem(BALANCE_KEY, JSON.stringify(amount));
}

export async function loadBalance(): Promise<number> {
  const data = await AsyncStorage.getItem(BALANCE_KEY);
  return data ? JSON.parse(data) : 0; // default = 0
}

export async function clearBalance() {
  await AsyncStorage.removeItem(BALANCE_KEY);
}

// -----------------------------
// 🔹 PAYMENTS
// -----------------------------
export async function savePayments(payments: any[]) {
  await AsyncStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments));
}

export async function loadPayments() {
  const data = await AsyncStorage.getItem(PAYMENTS_KEY);
  return data ? JSON.parse(data) : [];
}

export async function clearPayments() {
  await AsyncStorage.removeItem(PAYMENTS_KEY);
}
