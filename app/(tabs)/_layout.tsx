import { Tabs } from "expo-router"
import { NotebookTabs, User, Calendar } from "lucide-react-native"
import React from "react"

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#22C55E",
      }}
    >
      <Tabs.Screen
        name="Dashboard"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <NotebookTabs size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="TripDetails"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />, // Calendar icon for trips
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  )
}

export default TabLayout
