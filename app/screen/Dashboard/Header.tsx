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
    <View className="w-full mb-6 bg-green-600 p-6 pb-12 pt-24  rounded-b-[50px]">
      <View className="flex flex-row items-center justify-center gap-10 w-full">
        {/* Profile Image */}
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?background=c8e6c9&color=43a047&bold=true&name=${driver.name}`,
          }}
          className="w-20 h-20 rounded-full bg-white"
        />
        {/* Driver Info */}
        <View>
          <Text
            className="text-white text-3xl"
            style={{ fontFamily: "Montserrat-Bold" }}
          >
            {driver.name}
          </Text>
          <Text
            className="text-gray-200 text-lg"
            style={{ fontFamily: "Montserrat-Light" }}
          >
            {driver.email}
          </Text>
          <Text
            className="text-gray-200 text-lg"
            style={{ fontFamily: "Montserrat-Light" }}
          >
            {driver.phone}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Header
