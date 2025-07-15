import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import logo from '@/assets/images/logo.png';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-gradient-to-b from-blue-100 to-white px-6">
      {/* Logo Section */}
      <View className="bg-white p-6 rounded-3xl shadow-lg mb-6">
        <Image source={logo} style={{ width: 100, height: 100 }} />
      </View>

      {/* Title */}
      <Text className="text-4xl font-extrabold text-blue-700 mb-2 tracking-wide">
        TaskMaster
      </Text>

      {/* Tagline */}
      <Text className="text-base text-gray-600 text-center mb-8 leading-relaxed">
        Plan better. Stay focused. <Text className="text-blue-500 font-semibold">Get things done.</Text>
      </Text>

      {/* Button */}
      <TouchableOpacity
        onPress={() => router.replace('/')}
        className="bg-blue-600 px-8 py-4 rounded-full shadow-lg active:scale-95"
      >
        <Text className="text-white text-base font-semibold">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
