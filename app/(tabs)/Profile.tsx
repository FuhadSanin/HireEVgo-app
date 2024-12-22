import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import { User, Phone, Mail, Truck } from "lucide-react-native"; // Icons for visual clarity

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 16,
        }}
      >
        {/* Header Section */}
        <View className="bg-green-500 py-8 px-4 items-center rounded-b-3xl">
          {/* Profile Picture */}
          <View className="bg-white h-20 w-20 rounded-full items-center justify-center">
            <Text className="text-green-500 text-4xl font-bold">JD</Text>
          </View>
          {/* Name and Contact Info */}
          <Text className="text-white text-xl font-semibold mt-4">John Doe</Text>
          <Text className="text-white mt-1">email@gmail.com</Text>
          <Text className="text-white mt-1">+91 1234567890</Text>
        </View>

        {/* Vehicle Information */}
        <View className="mt-6">
          <Text className="text-lg font-bold mb-4">Vehicle Details</Text>
          <View className="bg-gray-100 rounded-lg p-4 mb-4">
            <View className="flex-row items-center mb-2">
              <Truck size={20} color="#4A5568" />
              <Text className="ml-2 text-gray-900 font-medium">
                Vehicle Name: Mahindra Scorpio
              </Text>
            </View>
            <Text className="text-gray-600">Vehicle Number: KL-07-AB-1234</Text>
          </View>
        </View>

        {/* RC Book and License */}
        <View>
          <Text className="text-lg font-bold mb-4">RC Book & License Details</Text>
          {/* RC Book Details */}
          <View className="bg-gray-100 rounded-lg p-4 mb-4">
            <Text className="text-gray-900 font-medium mb-2">RC Book</Text>
            <Image
              source={{ uri: "https://via.placeholder.com/300x150" }} // Replace with RC Book image URL
              className="w-full h-40 rounded-lg"
              resizeMode="cover"
            />
          </View>
          {/* License Details */}
          <View className="bg-gray-100 rounded-lg p-4">
            <Text className="text-gray-900 font-medium mb-2">License</Text>
            <Image
              source={{ uri: "https://via.placeholder.com/300x150" }} // Replace with License image URL
              className="w-full h-40 rounded-lg"
              resizeMode="cover"
            />
          </View>
        </View>
      </ScrollView>

      
      
    </SafeAreaView>
  );
};

export default Profile;
