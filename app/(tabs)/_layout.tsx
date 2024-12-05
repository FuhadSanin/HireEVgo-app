import { Tabs } from "expo-router"
import { NotebookTabs, User } from "lucide-react-native"
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
