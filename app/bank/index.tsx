import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "@/global.css";

export default function Bank() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem("balance").then(v => {
      if (v) setBalance(Number(v));
    });
  }, []);

  async function saveBalance(newValue: number) {
    setBalance(newValue);
    await AsyncStorage.setItem("balance", String(newValue));
  }

  function deposit() {
    saveBalance(balance + 10);
  }

  function withdraw() {
    if (balance >= 10) saveBalance(balance - 10);
  }

  return (
    <View className="flex-1 bg-zinc-900 items-center justify-center p-6">
      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-gray-700 px-4 py-2 rounded-xl mb-8"
      >
        <Text className="text-white">Regresar</Text>
      </TouchableOpacity>

      <Text className="text-white text-3xl font-bold mb-4">Cajero Virtual 🏧</Text>

      <Text className="text-white text-xl mb-10">
        Saldo Actual: ${balance}
      </Text>

      <TouchableOpacity
        onPress={deposit}
        className="bg-emerald-600 px-6 py-3 rounded-2xl w-full items-center mb-4"
      >
        <Text className="text-white text-lg font-semibold">Depositar $10</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={withdraw}
        className="bg-red-600 px-6 py-3 rounded-2xl w-full items-center"
      >
        <Text className="text-white text-lg font-semibold">Retirar $10</Text>
      </TouchableOpacity>
    </View>
  );
}
