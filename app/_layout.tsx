import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  useFonts({
    "Inter-Black": require("./../assets/fonts/Montserrat-Black.ttf"),
    "I-light": require("./../assets/fonts/Montserrat-Light.ttf"),
  });

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="screen/Dashboard"
        options={{
          headerTitle: "Login",
        }}
      />
    </Stack>
  );
}
