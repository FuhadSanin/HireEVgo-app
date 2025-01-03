import { UserProvider } from "@/context/UserContext"
import { Stack } from "expo-router"

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="screen/trip-details/test"
          options={{
            title: "Trip Details", // Custom header title
            headerStyle: {
              backgroundColor: "#379972", // Green header background
            },
            headerTintColor: "#fff", // White text color
            headerBackTitle: "Home", // Back button text
          }}
        />
      </Stack>
    </UserProvider>
  )
}
