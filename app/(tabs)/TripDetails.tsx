import React from "react"
import { ScrollView, SafeAreaView } from "react-native"
import Upcoming from "../screen/TripDetails/Upcoming"

const TripDetails = () => {
  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <ScrollView className="p-4">
        <Upcoming />
      </ScrollView>
    </SafeAreaView>
  )
}

export default TripDetails
