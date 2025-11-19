import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function MyMusic() {
  const [songs, setSongs] = useState<any[]>([]);

  useEffect(() => {
    AsyncStorage.getItem("purchased").then((v) => {
      if (v) setSongs(JSON.parse(v));
    });
  }, []);

  return (
    <View className="flex-1 bg-zinc-900 p-6 pt-14">
      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-gray-700 px-4 py-2 rounded-xl mb-6"
      >
        <Text className="text-white">Regresar</Text>
      </TouchableOpacity>

      <Text className="text-3xl text-white font-bold mb-6">MyMusic 🎵</Text>

      <FlatList
        data={songs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const imageUrl =
            item.artworkUrl600?.replace("http://", "https://") ||
            item.artworkUrl100?.replace("http://", "https://");

          return (
            <View className="flex-row mb-4 items-center">
              <Image
                source={{ uri: imageUrl }}
                style={{ width: 60, height: 60, borderRadius: 10 }}
              />
              <View className="ml-3">
                <Text className="text-white text-lg">{item.trackName}</Text>
                <Text className="text-gray-300">{item.artistName}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
