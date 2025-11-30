import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import uuid from "react-native-uuid";
import { loadBalance, loadPayments, savePayments } from "../utils/storage";

export default function AddPaymentScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState(""); //state za iznos
  const [desc, setDesc] = useState(""); //state za opis

  const handleAdd = async () => {
    if (!amount) return;

    const num = Number(amount);
    if (isNaN(num) || num <= 0) {
      //ovde ako vnesenata vrednost ne e broj ili e pomala od nula iznosot ne e validen
      alert("Внесете валиден износ!");
      return;
    }

    const payments = await loadPayments(); //se vcituvaat vnesenite plakanja
    const balance = await loadBalance(); //se vcituva balansot na sostojba
    const totalSpent = payments.reduce(
      (sum: number, p: { amount: number }) => sum + p.amount,
      0
    );
    const remaining = balance - totalSpent; //se presmetuva preostanatiot balans po vnesuvanje na plakanje

    //ako sumata na vnesenoto plakanje e pogolema od balansot ili go stava balansot vo minus togas se javuva ovoj alert
    if (num > remaining) {
      Alert.alert("Немате доволно средтсва за оваа!");
      return;
    }

    //struktura na plakanje
    const newPayment = {
      id: uuid.v4().toString(),
      amount: Number(amount),
      description: desc || "Нема опис на плакање", //ako ne se vnese opis na plakanje default vrednost e ovaa
      date: new Date().toISOString(),
    };

    await savePayments([...payments, newPayment]); //se zacuvuva plakanjeto
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
