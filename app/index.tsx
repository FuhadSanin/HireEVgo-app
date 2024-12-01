import { Text, View } from "react-native"
import "../global.css"
import Login from "./screen/Login"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Login />
    </View>
  )
}
