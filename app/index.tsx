import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import React from "react";
import { ShoppingCart, Music, CreditCard } from "lucide-react-native";

export default function Home() {
  return (
    <View className="flex-1 bg-black items-center justify-center px-6">

      <Text className="text-red-600 text-3xl font-bold mb-6 text-center">
        MyMusicZone
      </Text>


      <Link href="/store/list" asChild>
        <TouchableOpacity className="bg-red-600 px-6 py-3 rounded-2xl w-full items-center mb-4 flex-row justify-center">
          <ShoppingCart color="white" size={20} style={{ marginRight: 8 }} />
          <Text className="text-white text-lg font-semibold">Entrar a la Tienda</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/music" asChild>
        <TouchableOpacity className="bg-orange-600 px-6 py-3 rounded-2xl w-full items-center mb-4 flex-row justify-center">
          <Music color="white" size={20} style={{ marginRight: 8 }} />
          <Text className="text-white text-lg font-semibold">MyMusic</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/MyKast" asChild>
        <TouchableOpacity className="bg-orange-700 px-6 py-3 rounded-2xl w-full items-center mb-4 flex-row justify-center">
          <ShoppingCart color="white" size={20} style={{ marginRight: 8 }} />
          <Text className="text-white text-lg font-semibold">MyKast</Text>
        </TouchableOpacity>
      </Link>


      <Link href="/bank" asChild>
        <TouchableOpacity className="bg-red-800 px-6 py-3 rounded-2xl w-full items-center flex-row justify-center">
          <CreditCard color="white" size={20} style={{ marginRight: 8 }} />
          <Text className="text-white text-lg font-semibold">Cajero Virtual</Text>
        </TouchableOpacity>
      </Link>

    </View>
  );
}
