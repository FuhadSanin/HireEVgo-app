import React, { useState, useContext, useEffect } from "react"
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
  Linking,
} from "react-native"
import { useRouter } from "expo-router"
import { IdCard, Book } from "lucide-react-native"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../config/FirebaseConfig"
import { UserContext } from "../../context/UserContext"

const Login = () => {
  const phoneNumber = "tel:18001234567"

  const handlePress = async () => {
    try {
      const supported = await Linking.canOpenURL(phoneNumber)
      if (supported) {
        await Linking.openURL(phoneNumber) // Opens the dialer
      } else {
        Alert.alert("Error", "Your device doesn't support this feature.")
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open dialer.")
    }
  }
  const router = useRouter()
  const { setUser } = useContext(UserContext)
  const [form, setForm] = useState({ id: "", name: "" })
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])

  const GetUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"))
      const usersList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setUsers(usersList)
    } catch (error) {
      Alert.alert("Error", "Failed to fetch users.")
      console.error(error)
    }
  }

  useEffect(() => {
    GetUsers()
  }, [])

  const onSubmit = () => {
    const { id, name } = form

    if (!id || !name) {
      Alert.alert("Error", "Please fill in all fields.")
      return
    }

    setLoading(true)

    if (users.length > 0) {
      const user = users.find(
        user =>
          String(user.id) === String(id) &&
          user.name.toLowerCase() === name.toLowerCase()
      )

      if (user) {
        setUser(user) // Set user in context
        router.push("./(tabs)/Dashboard") // Navigate to Dashboard
      } else {
        Alert.alert("Error", "Invalid ID or Name.")
      }
    } else {
      Alert.alert("Error", "No users found. Please check the database.")
    }

    setLoading(false)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        className="pt-24 w-full p-8"
      >
        {/* Logo Section */}
        <View className="mb-4 items-center">
          <Image
            source={require("../../assets/images/logo.png")}
            className="w-36 h-36"
          />
        </View>
        {/* Header Section */}
        <View className="mb-8 items-center">
          <Text className="text-3xl font-bold">HireEVgo</Text>
          <Text className="text-lg text-gray-500 mt-2">
            Welcome back! Please login to your account.
          </Text>
        </View>
        {/* Form Section */}
        <View className="w-full">
          {/* Driver ID Input */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-1">Driver ID</Text>
            <View className="flex-row items-center bg-white px-4 py-3 rounded-full border border-gray-300">
              <IdCard size={20} color="#4A5568" />
              <TextInput
                className="flex-1 ml-3 text-gray-700"
                placeholder="Enter your Driver ID"
                placeholderTextColor="#9CA3AF"
                value={form.id}
                onChangeText={text => setForm({ ...form, id: text })}
              />
            </View>
          </View>

          {/* Name Input */}
          <View className="mb-6">
            <Text className="text-gray-700 font-medium mb-1">Name</Text>
            <View className="flex-row items-center bg-white px-4 py-3 rounded-full border border-gray-300">
              <Book size={20} color="#4A5568" />
              <TextInput
                className="flex-1 ml-3 text-gray-700"
                placeholder="Enter your name"
                placeholderTextColor="#9CA3AF"
                value={form.name}
                onChangeText={text => setForm({ ...form, name: text })}
              />
            </View>
          </View>
        </View>
        {/* Buttons */}
        <View className="w-full">
          <TouchableOpacity
            className={`bg-primary-green py-3 rounded-full ${
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
        <View className="mt-10 items-center w-full py-4">
          <View className="flex-row items-center justify-center">
            <Text className="text-gray-500 mr-2">Need help? Call</Text>
            <TouchableOpacity onPress={handlePress}>
              <Text className="text-primary-green font-semibold underline">
                1800-123-4567
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-gray-500 mt-1">
            &copy; 2024 HireEVgo. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login
