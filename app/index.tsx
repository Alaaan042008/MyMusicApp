import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import "@/global.css";
import React from "react";

export default function Home() {
  return (
    <View className="flex-1 bg-zinc-900 items-center justify-center px-6">

      <Text className="text-white text-3xl font-bold mb-6 text-center">
        MyMusicZone 🎧
      </Text>

      <Text className="text-gray-300 text-center mb-10">
        Tienda falsa de música usando React Native + Expo + iTunes API
      </Text>

      <Link href="/store/list" asChild>
        <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-2xl w-full items-center mb-4">
          <Text className="text-white text-lg font-semibold">Entrar a la Tienda</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/mymusic" asChild>
        <TouchableOpacity className="bg-purple-600 px-6 py-3 rounded-2xl w-full items-center mb-4">
          <Text className="text-white text-lg font-semibold">MyMusic</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/bank" asChild>
        <TouchableOpacity className="bg-yellow-600 px-6 py-3 rounded-2xl w-full items-center">
          <Text className="text-black text-lg font-semibold">Cajero Virtual 🏧</Text>
        </TouchableOpacity>
      </Link>

    </View>
  );
}
