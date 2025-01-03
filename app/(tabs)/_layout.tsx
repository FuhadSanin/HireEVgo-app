import React from "react"
import { Tabs } from "expo-router"
import { NotebookTabs, User, Calendar } from "lucide-react-native"
import { UserContext } from "../../context/UserContext"
import Login from "../screen/Login"

const TabLayout = () => {
  const { user } = React.useContext(UserContext)

  if (!user) {
    return <Login /> // Show Login screen if no user is authenticated
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#379972",
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
        name="UpcomingTrips"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#379972" },
          headerTintColor: "#FFFFFF",
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#379972" },
          headerTintColor: "#FFFFFF",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  )
}

export default TabLayout
