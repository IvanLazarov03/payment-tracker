import AsyncStorage from "@react-native-async-storage/async-storage";

export async function savePayments(payments: any[]) {
  await AsyncStorage.setItem("payments", JSON.stringify(payments));
}

export async function loadPayments() {
  const data = await AsyncStorage.getItem("payments");
  return data ? JSON.parse(data) : [];
}

export async function clearPayments() {
  await AsyncStorage.removeItem("payments");
}
