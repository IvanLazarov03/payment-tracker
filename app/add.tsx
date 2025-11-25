import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import uuid from "react-native-uuid";
import { loadBalance, loadPayments, savePayments } from "../utils/storage";

export default function AddPaymentScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");

  const handleAdd = async () => {
    if (!amount) return;

    const num = Number(amount);
    if (isNaN(num) || num <= 0) {
      alert("Внесете валиден износ!");
      return;
    }

    const payments = await loadPayments();
    const balance = await loadBalance();
    const totalSpent = payments.reduce(
      (sum: number, p: { amount: number }) => sum + p.amount,
      0
    );
    const remaining = balance - totalSpent;

    if (num > remaining) {
      Alert.alert("Немате доволно средтсва за оваа!");
      return;
    }

    const newPayment = {
      id: uuid.v4().toString(),
      amount: Number(amount),
      description: desc || "Нема опис на плакање",
      date: new Date().toISOString(),
    };

    await savePayments([...payments, newPayment]);
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Сума"
        keyboardType="numeric"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
      />

      <TextInput
        placeholder="Опис на плакање (опционално)"
        style={styles.input}
        value={desc}
        onChangeText={setDesc}
      />

      <Button title="Зачувај Плакање" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
});
