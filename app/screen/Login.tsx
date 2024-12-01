import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native"
import { useRouter } from "expo-router"
import { Mail, Lock, Eye, EyeOff } from "lucide-react-native" // Import Lucide Icons

const Login = () => {
  const router = useRouter()
  const [form, setForm] = useState({ email: "", password: "" })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = () => {
    const { email, password } = form;

    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true)

    setTimeout(() => {
      console.log("Login Submitted:", form)
      router.push("./(tabs)/Dashboard")
      setLoading(false)
    }, 2000)
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        padding: 16,
      }}
      className="pt-24"
    >
      {/* Logo Section */}
      <View className="mb-6 items-center">
        <Image
          source={require("../../assets/images/logo.png")} // Replace with your actual logo path
          className="w-36 h-36"
        />
      </View>

      {/* Header Section */}
      <View className="mb-8 items-center">
        <Text className="text-3xl font-bold">HireEVgo</Text>
        <Text
          className="text-lg text-gray-500 mt-2"
          style={{ fontFamily: "I-light" }}
        >
          Welcome back! Please login to your account.
        </Text>
      </View>

      {/* Form Section */}
      <View className="w-full">
        {/* Email Input */}
        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-1">Email</Text>
          <View className="flex-row items-center bg-white px-4 py-3 rounded-full border border-gray-300">
            <Mail size={20} color="#4A5568" />
            <TextInput
              className="flex-1 ml-3 text-gray-700"
              placeholder="Enter your email"
              keyboardType="email-address"
              value={form.email}
              onChangeText={text => setForm({ ...form, email: text })}
            />
          </View>
        </View>

        {/* Password Input */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-1">Password</Text>
          <View className="flex-row items-center bg-white px-4 py-3 rounded-full border border-gray-300">
            <Lock size={20} color="#4A5568" />
            <TextInput
              className="flex-1 ml-3 text-gray-700"
              placeholder="Enter your password"
              secureTextEntry={!isPasswordVisible}
              value={form.password}
              onChangeText={text => setForm({ ...form, password: text })}
            />
            <TouchableOpacity
              className="ml-3"
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <EyeOff size={20} color="#4A5568" />
              ) : (
                <Eye size={20} color="#4A5568" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View className="w-full">
        <TouchableOpacity
          className={`bg-green-500 py-3 rounded-full ${
            loading ? "opacity-50" : "opacity-100"
          }`}
          onPress={onSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white text-lg font-bold text-center">
              Login
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;
