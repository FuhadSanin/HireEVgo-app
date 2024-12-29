import React from "react"
import { View, Text, StyleSheet } from "react-native"
import CircularProgress from "react-native-circular-progress-indicator"

const Customer = () => {
  const satisfaction = 4.8 // Static value

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Customer Satisfaction</Text>
      <CircularProgress
        value={60}
        duration={4000}
        progressValueColor={"black"}
        titleColor={"black"}
        titleStyle={{ fontWeight: "bold" }}
        activeStrokeColor={"#f39c12"}
        inActiveStrokeColor={"gray"}
        inActiveStrokeOpacity={0.2}
        inActiveStrokeWidth={5}
        activeStrokeWidth={10}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  satisfactionText: {
    fontSize: 18,
    color: "black",
    marginTop: 10,
  },
})

export default Customer
