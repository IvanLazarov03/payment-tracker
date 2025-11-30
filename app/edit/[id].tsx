import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { loadPayments, savePayments } from "../../utils/storage";

export default function EditPaymentScreen() {
  const router = useRouter(); //se koristi za navigacija pomegju razlicnite ekrani
  const { id } = useLocalSearchParams();

  const [description, setDescription] = useState(""); //state za opis na plakanjeto
  const [amount, setAmount] = useState(""); //state za vrednosta na plakanjeto

  const [payments, setPayments] = useState<any[]>([]); //prvicen state za site plakanja(prazna niza)

  // se vcituva postoeckoto plakanje dokolku postoi
  useEffect(() => {
    const load = async () => {
      const stored = await loadPayments();
      setPayments(stored);

      const payment = stored.find((p: any) => p.id === id);

      if (!payment) {
        Alert.alert("Грешка", "Не постои ова плаќање.");
        router.back();
        return;
      }

      setDescription(payment.description);
      setAmount(String(payment.amount));
    };

    load();
  }, [id]);

  // zacuvuvanje na promenite na plakanje
  const save = async () => {
    if (!description || !amount) {
      Alert.alert("Грешка", "Пополнете ги сите полиња.");
      return;
    }

    const num = Number(amount);
    if (isNaN(num) || num <= 0) {
      Alert.alert("Грешка", "Внесете валиден износ.");
      return;
    }

    const updated = payments.map((p) =>
      p.id === id ? { ...p, description, amount: num } : p
    );

    await savePayments(updated);

    Alert.alert("Успешно", "Плаќањето е ажурирано.", [
      { text: "ОК", onPress: () => router.replace("/balance") },
    ]);
  };

  // brisenje na plakanje
  const remove = () => {
    Alert.alert("Бришење", "Дали сте сигурни?", [
      { text: "Откажи", style: "cancel" },
      {
        text: "Избриши",
        style: "destructive",
        onPress: async () => {
          const filtered = payments.filter((p) => p.id !== id);
          await savePayments(filtered);
          router.replace("/balance");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Уреди Плаќање</Text>

      <TextInput
        style={styles.input}
        placeholder="Опис"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="Износ"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity
        style={[styles.button, styles.saveButton]}
        onPress={save}
      >
        <Text style={styles.buttonText}>Зачувај</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={remove}
      >
        <Text style={styles.buttonText}>Избриши</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Назад</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 14,
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: "#FFF",
  },
  button: {
    padding: 15,
    borderRadius: 12,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    backgroundColor: "#D32F2F",
  },
  backButton: {
    backgroundColor: "#607D8B",
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
