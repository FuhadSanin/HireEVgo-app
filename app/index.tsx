import React from "react"
import { SafeAreaView, Image, View } from "react-native"
import "../global.css" // Ensure global styles are properly loaded
import Login from "./screen/Login"

export default function Index() {
  return (
    <SafeAreaView className="flex-1  items-center bg-white">
      <View className="bg-cover absolute  bg-center w-full h-56 rounded-lg mb-8">
        <Image
          source={require("../assets/images/wave.png")}
          className="w-full h-full"
        />
      </View>
      <Login />
    </SafeAreaView>
  )
}
