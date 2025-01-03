import React, { useContext, useEffect, useState } from "react"
import { View, Image, ActivityIndicator } from "react-native"
import { UserContext } from "../context/UserContext"
import { useRouter } from "expo-router"
import "../global.css"

const Index = () => {
  const { user } = useContext(UserContext)
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)

  // Ensure navigation is delayed until layout is ready
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100) // Simulate a short delay
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isReady) {
      if (user) {
        router.replace("(tabs)/Dashboard") // Navigate to the Dashboard if the user is logged in
      } else {
        router.replace("/screen/Login") // Navigate to the Login screen if the user is not logged in
      }
    }
  }, [user, isReady])

  // Show a loading spinner while determining navigation
  return (
    <View className="flex-1 items-center justify-center bg-white">
      {!isReady && <ActivityIndicator size="large" color="#379972" />}
    </View>
  )
}

export default Index
