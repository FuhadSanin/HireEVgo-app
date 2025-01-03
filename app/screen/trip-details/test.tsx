import { IndianRupee, MoveRight, Route, Truck } from "lucide-react-native"
import React from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"

const test = () => {
  const trip = {
    starting: "India",
    ending: "Pune",
    time: "10:00 AM",
    date: "2022-12-31",
    cost: 1000,
    distance: 200,
    client_details: {
      name: "John Doe",
      phone: "1234567890",
      email: "e@gmail.com",
      starting_address: "123, Pune",
      ending_address: "456, Mumbai",
      secondary_phone: "0987654321",
    },
  }

  // Convert client_details object to array for mapping
  const clientDetailsArray = Object.entries(trip.client_details).map(
    ([key, value]) => ({ label: key.replace(/_/g, " "), value })
  )

  return (
    <ScrollView className="bg-background-primary flex-1 p-8">
      {/* Header Section */}
      <View className="flex-row items-center justify-between mt-3 mb-3">
        <View className="flex-row items-center">
          <Truck size={20} color="#379972" />
          <Text className="text-gray-500 ml-2">
            {trip.time || "N/A"} . {trip.date}
          </Text>
        </View>
        <View>
          <View className="flex-row items-center bg-orange-400 rounded-xl justify-center p-1.5">
            <Text className="text-white text-sm font-bold text-center">
              Today
            </Text>
          </View>
        </View>
      </View>

      {/* Trip Info Section */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold uppercase">{trip.starting}</Text>
        <MoveRight size={24} color="gray" />
        <Text className="text-2xl font-bold uppercase">{trip.ending}</Text>
      </View>

      {/* Cost and Distance Section */}
      <View className="flex-row w-full px-2 mb-6 gap-3">
        <View className="rounded-3xl w-1/2 flex flex-col justify-center items-center bg-white p-4 shadow-custom-light h-36">
          <View className="bg-gray-100 rounded-full p-2">
            <IndianRupee size={24} color="#28A745" />
          </View>
          <Text className="text-sm capitalize font-semibold text-gray-500 mb-1 mt-3">
            Cost
          </Text>
          <Text className="text-xl capitalize font-bold text-center">
            {trip.cost} rs
          </Text>
        </View>

        <View className="rounded-3xl w-1/2 flex flex-col justify-center items-center bg-white p-4 shadow-custom-light h-36">
          <View className="bg-gray-100 rounded-full p-2">
            <Route size={24} color="blue" />
          </View>
          <Text className="text-sm capitalize font-semibold text-gray-500 mb-1 mt-3">
            Distance
          </Text>
          <Text className="text-xl font-bold text-center">
            {trip.distance} km
          </Text>
        </View>
      </View>

      {/* Client Details Section */}
      <View className="bg-white p-5 rounded-3xl shadow-custom-light">
        <Text className="text-xl font-bold mb-4">Client Details</Text>
        {clientDetailsArray.map((detail, index) => (
          <View
            className="flex-row items-center mb-3 justify-between"
            key={index}
          >
            <Text className="text-gray-500 capitalize font-medium ">
              {detail.label}:
            </Text>
            <Text className="text-gray-900 capitalize font-semibold">
              {detail.value}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity className="bg-primary-green  rounded-3xl p-4 mt-6">
        <Text className="text-white text-center font-bold">Completed</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default test
