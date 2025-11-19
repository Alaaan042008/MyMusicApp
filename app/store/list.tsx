import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from "react-native";
import { Link } from "expo-router";
import "@/global.css";

export default function StoreList() {
  const [query, setQuery] = useState("pop");
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchTracks(term: string) {
    try {
      setLoading(true);
      const r = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=20`
      );
      const j = await r.json();
      setTracks(j.results ?? []);
    } finally {
      setLoading(false);
    }
  }

  // Cargar apenas entras
  useEffect(() => {
    fetchTracks("pop");
  }, []);

  return (
    <View className="flex-1 bg-zinc-900 px-4 pt-10">
      <View className="flex-row mb-4">
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar..."
          placeholderTextColor="#aaa"
          className="flex-1 bg-white/10 text-white rounded-xl px-4 py-2"
        />

        <TouchableOpacity
          onPress={() => fetchTracks(query)}
          className="bg-blue-600 px-4 ml-2 rounded-xl justify-center"
        >
          <Text className="text-white font-semibold">Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text className="text-white text-center mt-10">Cargando...</Text>
      ) : (
        <FlatList
          data={tracks}
          numColumns={2}
          keyExtractor={(item) => item.trackId.toString()}
          renderItem={({ item }) => {
            const img =
              item.artworkUrl600 ||
              item.artworkUrl100 ||
              item.artworkUrl60;

            return (
              <Link
                asChild
                href={{
                  pathname: "/store/details",
                  params: { id: item.trackId.toString() },
                }}
              >
                <TouchableOpacity className="w-1/2 p-2">
                  <View className="bg-white rounded-2xl p-2">
                    <Image
                      source={{ uri: img }}
                      style={{ width: "100%", height: 130, borderRadius: 12 }}
                    />
                    <Text className="mt-2 font-semibold" numberOfLines={1}>
                      {item.trackName}
                    </Text>
                    <Text className="text-gray-600 text-xs" numberOfLines={1}>
                      {item.artistName}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Link>
            );
          }}
        />
      )}
    </View>
  );
}
