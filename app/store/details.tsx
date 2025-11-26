import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ArrowLeft, ShoppingCart } from "lucide-react-native";

export default function Details() {
  const { id } = useLocalSearchParams();
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    fetch(`https://itunes.apple.com/lookup?id=${id}`)
      .then((r) => r.json())
      .then((j) => setItem(j.results?.[0]));
  }, [id]);

  if (!item)
    return (
      <Text className="text-white mt-20 text-center text-lg">Cargando...</Text>
    );

  async function buySong() {
    const balance = Number(await AsyncStorage.getItem("balance") || 0);
    const price = 10;

    if (balance < price) {
      return Alert.alert("Saldo insuficiente", "Recarga dinero en el cajero.");
    }

    let purchased = JSON.parse(await AsyncStorage.getItem("purchased") || "[]");

    if (purchased.some((s: any) => s.trackId === item.trackId)) {
      return Alert.alert("Ya comprada", "Esta canción ya es tuya.");
    }

    purchased.push(item);

    await AsyncStorage.setItem("purchased", JSON.stringify(purchased));
    await AsyncStorage.setItem("balance", String(balance - price));

    Alert.alert("Éxito", "Canción comprada correctamente.");
    router.push("/music");
  }

  const imageUrl =
    item.artworkUrl600?.replace("http://", "https://") ||
    item.artworkUrl100?.replace("http://", "https://") ||
    item.artworkUrl60?.replace("http://", "https://");

  return (
    <ScrollView className="flex-1 bg-black p-6">

      <TouchableOpacity
        onPress={() => router.back()}
        className="flex-row items-center mb-4"
      >
        <ArrowLeft color="orange" size={28} />
        <Text className="text-orange-400 text-lg ml-2">Regresar</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: imageUrl }}
        style={{ width: "100%", height: 260, borderRadius: 22 }}
      />

      <Text className="text-red-600 text-3xl font-extrabold mt-5">
        {item.trackName}
      </Text>

      <Text className="text-orange-400 text-xl mt-1">{item.artistName}</Text>

      <Text className="text-gray-500 mt-1 italic">{item.collectionName}</Text>

      <TouchableOpacity
        className="bg-red-700 mt-8 py-4 rounded-2xl items-center flex-row justify-center"
        onPress={buySong}
      >
        <ShoppingCart color="white" size={22} style={{ marginRight: 8 }} />
        <Text className="text-white font-semibold text-lg">
          Comprar por $10
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
