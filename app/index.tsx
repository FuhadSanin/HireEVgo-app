import React from "react"
import { SafeAreaView } from "react-native"
import "../global.css" // Ensure global styles are properly loaded
import Login from "./screen/Login"

export default function Index() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Login />
      {/* <Dashboard /> */}
    </SafeAreaView>
  )
}
