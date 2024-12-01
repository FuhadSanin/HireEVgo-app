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
} from "react-native";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const onSubmit = () => {
    const { email, password } = form;

    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Show loading state
    setLoading(true);

    // Simulate login delay
    setTimeout(() => {
      console.log("Login Submitted:", form);

      // Redirect to dashboard after successful login
      router.push("/screen/Dashboard");
      setLoading(false); // Hide loading
    }, 2000); // Mock API call delay
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        padding: 16,
      }}
    >
      {/* Logo Section */}
      <View className="mb-4 items-center">
        <Image
          source={require("../../assets/images/logo.png")}
          className="w-[150px] h-[150px] bg-cover"
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
        <View className="mb-5">
          <Text className="text-gray-700 font-medium mb-2">Email</Text>
          <TextInput
            className="bg-white p-4 rounded-full border border-gray-300"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
        </View>

        <View className="mb-5 relative">
          <Text className="text-gray-700 font-medium mb-2">Password</Text>
          <TextInput
            className="bg-white p-4 rounded-full border border-gray-300"
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
          <TouchableOpacity
            className="absolute right-4"
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Text className="text-blue-500 font-medium">
              {isPasswordVisible ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Buttons */}
      <View className="w-full mt-6 space-y-4">
        {/* Login Button */}
        <TouchableOpacity
          className="bg-green-500 py-3 px-8 rounded-full flex justify-center items-center"
          onPress={onSubmit}
          disabled={loading} // Disable button during loading
        >
          <Text className="text-white text-lg font-bold">
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              "Login"
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;
