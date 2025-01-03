import React from "react"
import { View, Text, Image } from "react-native"

const Header = ({ user }) => {
  return (
    <View className="w-full mb-6 bg-primary-green p-6 pb-12   rounded-b-[50px]">
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
          <Text className="text-white text-3xl font-bold">
            {user?.name || "No Name"}
          </Text>
          <Text className="text-gray-200 text-lg font-medium">
            {user?.email}
          </Text>
          <Text className="text-gray-200 text-lg font-medium">
            {user?.phone}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Header
