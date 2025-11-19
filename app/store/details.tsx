import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import "@/global.css";

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

  const imageUrl =
    item.artworkUrl600?.replace("http://", "https://") ||
    item.artworkUrl100?.replace("http://", "https://") ||
    item.artworkUrl60?.replace("http://", "https://");

  return (
    <ScrollView className="flex-1 bg-[#0d0d0d] p-6">
      {/* Botón Regresar */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex-row items-center mb-4"
      >
        <Ionicons name="chevron-back" size={28} color="#6EE7B7" />
        <Text className="text-[#6EE7B7] text-lg ml-1">Regresar</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: imageUrl }}
        style={{
          width: "100%",
          height: 260,
          borderRadius: 22,
        }}
      />

      <Text className="text-white text-3xl font-extrabold mt-5">
        {item.trackName}
      </Text>

      <Text className="text-[#A1A1AA] text-xl mt-1">{item.artistName}</Text>

      <Text className="text-[#737373] mt-1 italic">
        {item.collectionName}
      </Text>

      {/* Agregar al Carrito */}
      <TouchableOpacity
        className="bg-emerald-600 mt-8 py-4 rounded-2xl items-center flex-row justify-center"
        onPress={() =>
          router.push({ pathname: "/store/cart", params: { add: id } })
        }
      >
        <Ionicons name="cart" size={22} color="white" style={{ marginRight: 8 }} />
        <Text className="text-white font-semibold text-lg">
          Agregar al Carrito
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
