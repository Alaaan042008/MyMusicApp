import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { z } from "zod";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // ✅ Esquema de validación con Zod
  const registerSchema = z
    .object({
      name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
      email: z.string().email("Debe ingresar un correo electrónico válido."),
      password: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres.")
        .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula.")
        .regex(/[0-9]/, "Debe contener al menos un número."),
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Las contraseñas no coinciden.",
      path: ["confirm"],
    });

  const handleRegister = async () => {
    const result = registerSchema.safeParse({ name, email, password, confirm });

    if (!result.success) {
      const firstError = result.error.errors[0];
      Alert.alert("Error", firstError.message);
      return;
    }

    const newUser = { name, email, password };
    await AsyncStorage.setItem("user", JSON.stringify(newUser));

    Alert.alert("Éxito", "Registro completado. Ahora puedes iniciar sesión.");
    router.push("/MyKast/login/LoginScreen");
  };

  return (
    <View className="flex-1 bg-[#0b0b0b] px-6 pt-20">
      <Image
              source={require("@/assets/images/78d9a14a-5646-444c-8255-c41850ae3243.png")}
              resizeMode="contain" // Evita deformar la imagen
              className="w-72 h-72" // Tamaño adaptable, puedes ajustar
      />
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-6 bg-white/10 rounded-full p-3"
      >
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      <Text className="text-white text-3xl font-bold mb-10 text-center">
        Registro
      </Text>

      <TextInput
        placeholder="Nombre"
        placeholderTextColor="#999"
        className="bg-[#181818] text-white px-4 py-3 rounded-xl mb-4"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#999"
        className="bg-[#181818] text-white px-4 py-3 rounded-xl mb-4"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        className="bg-[#181818] text-white px-4 py-3 rounded-xl mb-4"
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        placeholder="Confirmar contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        className="bg-[#181818] text-white px-4 py-3 rounded-xl mb-4"
        value={confirm}
        onChangeText={setConfirm}
      />

      <TouchableOpacity
        onPress={handleRegister}
        className="bg-[#FA0501] py-4 rounded-full mt-4"
      >
        <Text className="text-white text-center text-lg font-semibold">
          Registrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
