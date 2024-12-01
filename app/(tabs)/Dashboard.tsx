import React from "react"
import { View, Text, Button, ScrollView } from "react-native"
import { useRouter } from "expo-router"

const Dashboard = () => {
  const router = useRouter()

  // Example driver data (this would typically come from a backend or context)
  const driver = {
    name: "John Doe",
    licenseNumber: "D123456789",
    licenseExpiry: "12/12/2025",
    vehicleDetails: {
      make: "Tesla",
      model: "Model 3",
      plateNumber: "ABC1234",
    },
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        width: "100%",
      }}
    >
      {/* Dashboard Title */}
      <Text className="text-2xl font-bold text-center mb-6">
        Driver Dashboard
      </Text>

      {/* Driver's Info */}
      <View className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <Text className="text-xl font-semibold mb-2">Personal Details</Text>
        <Text className="text-gray-700 mb-1">Name: {driver.name}</Text>
        <Text className="text-gray-700 mb-1">
          License No: {driver.licenseNumber}
        </Text>
        <Text className="text-gray-700">
          License Expiry: {driver.licenseExpiry}
        </Text>
      </View>

      {/* Vehicle Details */}
      <View className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <Text className="text-xl font-semibold mb-2">Vehicle Details</Text>
        <Text className="text-gray-700 mb-1">
          Make: {driver.vehicleDetails.make}
        </Text>
        <Text className="text-gray-700 mb-1">
          Model: {driver.vehicleDetails.model}
        </Text>
        <Text className="text-gray-700">
          Plate No: {driver.vehicleDetails.plateNumber}
        </Text>
      </View>

      {/* Logout Button */}
      <View className="w-full mt-6">
        <Button
          title="Logout"
          onPress={() => router.push("/screen/Login")}
          color="#34D399" // Tailwind Green
        />
      </View>
    </ScrollView>
  )
}

export default Dashboard
