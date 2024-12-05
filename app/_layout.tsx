import { Stack } from "expo-router"
import { useFonts } from "expo-font"

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Bold": require("../assets/fonts/CabinetGrotesk-Medium.ttf"),
    "Montserrat-Regular": require("../assets/fonts/CabinetGrotesk-Regular.ttf"),
    "Montserrat-Light": require("../assets/fonts/CabinetGrotesk-Light.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Raleway-Medium.ttf"),
  })

  if (!fontsLoaded) {
    return null // or a loading spinner
  }
  return (
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
    </Stack>
  )
}
