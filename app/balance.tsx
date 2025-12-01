import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useBalanceStorage, usePaymentsStorage } from "../utils/storage";

export default function HomeScreen() {
  const router = useRouter();
  const [payments, setPayments] = useState<any[]>([]);
  const [balance, setBalance] = useState<number | null>(null);

  const { loadBalance, clearBalance } = useBalanceStorage();
  const { loadPayments, clearPayments } = usePaymentsStorage();

  // Se vcituva balansot i plakanjata koi se vneseni
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const b = await loadBalance();
        if (b === null) {
          router.replace("/balance");
          return;
        }

        const p = await loadPayments();
        setBalance(b);
        setPayments(p);
      };

      loadData();
    }, [])
  );

  // Vkupno potroseno
  const totalSpent = payments.reduce((sum, p) => sum + p.amount, 0); //ovde se presmetuva vkupnata potrsuvacka a 0 e default vrednost

  // Preostanato saldo
  const remaining = balance !== null ? balance - totalSpent : 0;
  //Formatiranje na sumata
  const formattedRemaining = remaining.toLocaleString("mk-MK");
  const formattedSpent = totalSpent.toLocaleString("mk-MK");

  // Funkcija za resetiranje
  const resetAll = async () => {
    await clearPayments();
    await clearBalance();
    setPayments([]);
    setBalance(null);
    router.replace("/");
  };

  //Funkcija za inicijalizacija na resetiranje
  const confirmReset = () => {
    Alert.alert(
      "Потврда",
      "Дали сакате да ги ресетирате салдото и сите плаќања?",
      [
        { text: "Откажи", style: "cancel" },
        { text: "Ресетирај", style: "destructive", onPress: resetAll },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Balance Display */}
      <Text style={styles.header}>Состојба на Картичка</Text>

      <Text style={styles.remaining}>
        Преостанато: {formattedRemaining} ден.
      </Text>

      <Text style={styles.spent}>Потрошено: {formattedSpent} ден.</Text>

      {/* Payments List */}
      <FlatList
        data={payments}
        contentContainerStyle={{ paddingTop: 10 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              router.push({
                pathname: "/edit/[id]",
                params: { id: item.id as string },
              })
            }
          >
            <Text style={styles.itemTitle}>{item.description}</Text>
            <Text style={styles.itemAmount}>
              -{item.amount.toLocaleString("mk-MK")} ден.
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Bottom Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={() => router.push("/add")}
        >
          <Text style={styles.buttonText}>Додади Плаќање</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={confirmReset}
        >
          <Text style={styles.buttonText}>Ресетирај Сè</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F6FA",
  },

  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },

  remaining: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2E7D32",
  },

  spent: {
    fontSize: 18,
    color: "#C62828",
    marginBottom: 20,
  },

  item: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },

  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  itemAmount: {
    marginTop: 4,
    fontSize: 15,
    color: "#C62828",
  },

  buttonGroup: {
    marginTop: "auto",
    marginBottom: 35,
    gap: 12,
  },

  button: {
    padding: 15,
    borderRadius: 12,
  },

  addButton: {
    backgroundColor: "#4CAF50",
  },

  resetButton: {
    backgroundColor: "#D32F2F",
  },

  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
