import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Cart() {
  const { add } = useLocalSearchParams();
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    if (add) {
      fetch(`https://itunes.apple.com/lookup?id=${add}`)
        .then((r) => r.json())
        .then((j) => setCart((c) => [...c, j.results?.[0]]));
    }
  }, [add]);

  const total = cart.reduce((t, i) => t + (i.trackPrice || 0), 0);

  return (
    <View className="flex-1 bg-white p-6 pt-14">
      <Text className="text-2xl font-bold mb-4">Carrito</Text>

      <FlatList
        data={cart}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => {
          const imageUrl =
            item.artworkUrl600?.replace("http://", "https://") ||
            item.artworkUrl100?.replace("http://", "https://") ||
            item.artworkUrl60?.replace("http://", "https://");

          return (
            <View className="flex-row items-center mb-4">
              <Image
                source={{ uri: imageUrl }}
                style={{ width: 60, height: 60, borderRadius: 10 }}
              />
              <View className="ml-3 flex-1">
                <Text className="font-semibold">{item.trackName}</Text>
                <Text className="text-gray-600">
                  ${item.trackPrice ? item.trackPrice.toFixed(2) : "0.00"}
                </Text>
              </View>
            </View>
          );
        }}
      />

      <Text className="text-xl font-bold mt-4">Total: ${total.toFixed(2)}</Text>

      <TouchableOpacity
  className="bg-blue-600 mt-4 py-3 rounded-xl items-center"
  onPress={async () => {
    const old = await AsyncStorage.getItem("purchased");
    const previous = old ? JSON.parse(old) : [];

    await AsyncStorage.setItem(
      "purchased",
      JSON.stringify([...previous, ...cart])
    );

    setCart([]);
    alert("Compra realizada. Ahora tus canciones están en MyMusic.");
  }}
>
  <Text className="text-white text-lg font-semibold">Pagar</Text>
</TouchableOpacity>

    </View>
  );
}
