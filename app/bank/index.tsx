import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ArrowLeft, CreditCard, Plus, Minus } from "lucide-react-native";

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
    <View className="flex-1 bg-black items-center justify-center p-6">
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex-row items-center bg-red-800 px-4 py-2 rounded-xl mb-8"
      >
        <ArrowLeft color="white" size={20} style={{ marginRight: 8 }} />
        <Text className="text-white text-lg">Regresar</Text>
      </TouchableOpacity>

      <Text className="text-red-600 text-3xl font-bold mb-4 flex-row items-center">
        <CreditCard color="orange" size={28} style={{ marginRight: 8 }} />
        Cajero Virtual
      </Text>

      <Text className="text-orange-400 text-xl mb-10">
        Saldo Actual: ${balance}
      </Text>

      <TouchableOpacity
        onPress={deposit}
        className="bg-red-600 px-6 py-3 rounded-2xl w-full items-center mb-4 flex-row justify-center"
      >
        <Plus color="white" size={20} style={{ marginRight: 8 }} />
        <Text className="text-white text-lg font-semibold">Depositar $10</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={withdraw}
        className="bg-orange-600 px-6 py-3 rounded-2xl w-full items-center flex-row justify-center"
      >
        <Minus color="white" size={20} style={{ marginRight: 8 }} />
        <Text className="text-white text-lg font-semibold">Retirar $10</Text>
      </TouchableOpacity>
    </View>
  );
}
