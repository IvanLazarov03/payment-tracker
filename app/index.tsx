import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { saveBalance } from "../utils/storage";

export default function BalanceScreen() {
  const router = useRouter();
  const [input, setInput] = useState("");

  const handleSave = async () => {
    const value = parseFloat(input);
    if (!isNaN(value) && value > 0) {
      await saveBalance(value); // store balance in AsyncStorage
      router.replace("/balance"); // go to HomeScreen after saving
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Внеси Состојба на Картичка</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={input}
        onChangeText={setInput}
        placeholder="Пример: 10000"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Зачувај</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  label: { fontSize: 18, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 8 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
