import React from "react";
import { View, Text, Button, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";

const Dashboard = () => {
  const router = useRouter();

  // Example driver data (this would typically come from a backend or context)
  const driver = {
    name: "John Doe",
    licenseNumber: "D123456789",
    licenseExpiry: "12/12/2025",
    email: "email@gmail.com",
    vehicleDetails: {
      make: "Tesla",
      model: "Model 3",
      plateNumber: "ABC1234",
    },
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        width: "100%",
      }}
    >
      <View className="bg-green-500 h-fit p-5 pb-16 pt-10 rounded-b-[30px] flex flex-row">
        <View className="bg-red-500 w-1/2 fit ">
          {/* <Image
            source={require("../../assets/images/logo.png")}
            className="w-16 h-16 fit"
          /> */}
        </View>
        <View className=" w-1/2">
          <Text className="text-white text-center text-lg font-bold">
            {driver.name}
          </Text>
          <Text className="text-gray-400 text-center text-lg">
            {driver.email}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
