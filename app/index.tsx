import { useFocusEffect, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import { clearPayments, loadPayments } from "../utils/storage";

export default function HomeScreen() {
  const [payments, setPayments] = useState<any[]>([]);
  const router = useRouter();

  useFocusEffect(() => {
    loadPayments().then(setPayments);
  });

  const total = payments.reduce((sum, p) => sum + p.amount, 0);
  const formattedTotal = total.toLocaleString("mk-MK");

  const resetPayments = async () => {
    await clearPayments();
    setPayments([]);
  };

  const confirmReset = () => {
    Alert.alert(
      "Потврда",
      "Дали сте сигурни дека сакате да ги избришете сите плаќања?",
      [
        { text: "Откажи", style: "cancel" },
        { text: "Ресетирај", style: "destructive", onPress: resetPayments },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.total}>Вкупно Потрошено: {formattedTotal} ден.</Text>

      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.description}</Text>
            <Text>{item.amount.toLocaleString("mk-MK")} ден.</Text>
          </View>
        )}
      />

      <View style={styles.buttonGroup}>
        <Button title="Додади Плаќање" onPress={() => router.push("/add")} />
        <Button
          title="Ресетирај Сите Плаќања"
          color="red"
          onPress={confirmReset}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  total: {
    fontSize: 22,
    fontWeight: "bold",
  },
  item: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 8,
    borderRadius: 6,
  },
  buttonGroup: {
    gap: 10,
  },
});
