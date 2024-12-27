import React from "react"
import { ScrollView, SafeAreaView } from "react-native"
import Upcoming from "../screen/TripDetails/Upcoming"
import Previous from "../screen/TripDetails/Previous"

const TripDetails = () => {
  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <ScrollView className="p-4">
        <Upcoming />
        <Previous />
      </ScrollView>
    </SafeAreaView>
  )
}

export default TripDetails
