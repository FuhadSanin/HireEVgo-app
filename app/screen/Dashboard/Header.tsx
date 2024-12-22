import React from "react"
import { View, Text, Image } from "react-native"

const Header = () => {
  const driver = {
    name: "John Doe",
    licenseNumber: "D123456789",
    licenseExpiry: "12/12/2025",
    email: "email@gmail.com",
    phone: "1234567890",
    vehicleDetails: {
      make: "Tesla",
      model: "Model 3",
      plateNumber: "ABC1234",
    },
  }
  return (
    <View className="w-full mb-6 bg-primary-green p-6 pb-12 pt-24  rounded-b-[50px]">
      <View className="flex flex-row items-center justify-center gap-10 w-full">
        {/* Profile Image */}
        <Image
          source={{
            uri: "https://alumni.cusat.ac.in/wp-content/themes/cera/assets/images/avatars/user-avatar.png",
          }}
          className="w-20 h-20 rounded-full bg-white"
        />
        {/* Driver Info */}
        <View>
          <Text className="text-white text-3xl font-bold">{driver.name}</Text>
          <Text className="text-gray-200 text-lg font-medium">
            {driver.email}
          </Text>
          <Text className="text-gray-200 text-lg font-medium">
            {driver.phone}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Header