import React, { createContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null) // Initially no user

  // Load user from AsyncStorage on app load
  useEffect(() => {
    const loadUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user")
        if (jsonValue != null) {
          setUser(JSON.parse(jsonValue)) // Set user in context
        }
      } catch (error) {
        console.error("Error loading user from AsyncStorage", error)
      }
    }

    loadUser()
  }, [])

  const saveUser = async newUser => {
    try {
      const jsonValue = JSON.stringify(newUser)
      await AsyncStorage.setItem("user", jsonValue)
      setUser(newUser) // Set user in context
    } catch (error) {
      console.error("Error saving user to AsyncStorage", error)
    }
  }

  const clearUser = async () => {
    try {
      await AsyncStorage.removeItem("user")
      setUser(null)
    } catch (error) {
      console.error("Error clearing user from AsyncStorage", error)
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser: saveUser, clearUser }}>
      {children}
    </UserContext.Provider>
  )
}
