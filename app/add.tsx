import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import uuid from "react-native-uuid";
import { loadPayments, savePayments } from "../utils/storage";

export default function AddPaymentScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");

  const handleAdd = async () => {
    if (!amount || !desc) return;

    const payments = await loadPayments();

    const newPayment = {
      id: uuid.v4().toString(),
      amount: Number(amount),
      description: desc,
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
        placeholder="Опис на плакање"
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
