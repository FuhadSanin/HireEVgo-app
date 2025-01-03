import React, { useEffect, useContext, useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native"
import { Truck, MoveRight, Check } from "lucide-react-native"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../../config/FirebaseConfig"
import { UserContext } from "../../../context/UserContext"
import { router } from "expo-router"

const Notifications = ({ loading, trips }) => {
  const { user } = useContext(UserContext)
  const [showAll, setShowAll] = useState(false) // State to toggle show all notifications

  //To get day from date
  const getDayFromDate = dateString =>
    dateString
      ? [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][new Date(dateString).getDay()] || "Invalid Date"
      : "N/A"

  //To get Relative day from date
  const getRelativeDay = dateString => {
    if (!dateString) return "N/A"

    const inputDate = new Date(dateString)
    const today = new Date()

    // Normalize all dates to midnight
    today.setHours(0, 0, 0, 0)
    inputDate.setHours(0, 0, 0, 0)

    const diff = (inputDate - today) / (1000 * 60 * 60 * 24) // Difference in days

    if (diff === 0) return "Today"
    if (diff === 1) return "Tomorrow"
    return "null"
  }

  const filteredTrips = trips.filter(
    trip =>
      getRelativeDay(trip.date) === "Today" ||
      getRelativeDay(trip.date) === "Tomorrow"
  )

  // Function to toggle the visibility of notifications
  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  // Limit the number of notifications to show initially
  const notificationsToDisplay = showAll
    ? filteredTrips
    : filteredTrips.slice(0, 3)

  const handleButtonPress = () => {
    // Show a confirmation popup
    Alert.alert(
      "Confirm Completion",
      "Have you completed this trip?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancelled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            console.log("Trip completed")
            // You can add further actions here, e.g., updating state or backend
          },
        },
      ],
      { cancelable: true }
    )
  }

  const handleNotificationPress = () => {
    router.push("/screen/trip-details/test")
  }

  return (
    <View>
      <View className="p-6 mb-3 flex flex-row items-center justify-between w-full">
        {/* Header Section */}
        <View className="flex flex-row items-center">
          <Text className="text-2xl font-bold text-gray-900">
            Notifications
          </Text>
        </View>

        {/* Toggle Button */}
        <TouchableOpacity onPress={toggleShowAll}>
          <Text className="text-md text-custom-blue font-semibold">
            {showAll ? "Show less" : "Show all"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="p-6 pt-0 gap-5">
        {loading ? (
          // Show skeleton loading when data is being fetched
          Array.from({ length: 3 }).map((_, index) => (
            <View
              key={index}
              className="p-5 flex-row justify-between shadow-custom-light bg-gray-200 rounded-3xl animate-pulse"
            >
              <View>
                <View className="flex-row items-center mb-2">
                  <View className="w-6 h-6 bg-gray-300 rounded-full" />
                  <View className="ml-2 w-24 h-5 bg-gray-300 rounded" />
                </View>
                <View className="flex-row items-center gap-2">
                  <View className="w-20 h-6 bg-gray-300 rounded" />
                  <MoveRight size={20} color="gray" />
                  <View className="w-20 h-6 bg-gray-300 rounded" />
                </View>
              </View>

              <View>
                <View className="items-center">
                  <View className="w-16 h-6 bg-gray-300 rounded" />
                </View>
                <View className="flex-row items-center bg-gray-300 rounded-xl justify-center p-1.5 mt-2">
                  <View className="w-12 h-4 bg-gray-300 rounded" />
                </View>
              </View>
            </View>
          ))
        ) : notificationsToDisplay.length === 0 ? (
          <View className="flex justify-center items-center rounded-3xl shadow-custom-light">
            <Text className="text-gray-500 text-lg font-semibold">
              No notifications
            </Text>
          </View>
        ) : (
          notificationsToDisplay.map((trip, index) => (
            <TouchableOpacity
              key={index}
              className="p-5 flex-row justify-between shadow-custom-light bg-white border border-gray-200 rounded-3xl"
              onPress={handleNotificationPress}
            >
              {/* Trip Details */}
              <View>
                <View className="flex-row items-center mb-2">
                  <Truck size={20} color="#379972" />
                  <Text className="text-gray-500 ml-2">
                    {trip.time || "N/A"} . ({getDayFromDate(trip.date) || "N/A"}
                    )
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Text className="text-gray-800 capitalize text-xl font-bold">
                    {trip.starting || "Unknown"}
                  </Text>
                  <MoveRight size={20} color="gray" />
                  <Text className="text-gray-800 capitalize text-xl font-bold">
                    {trip.ending || "Unknown"}
                  </Text>
                </View>
                <View className="flex-row gap-2 mt-2">
                  {getRelativeDay(trip.date) === "Today" && (
                    <View className="flex-row items-center bg-orange-400 rounded-xl flex justify-center p-1.5">
                      <Text className="text-white text-sm font-bold text-center">
                        {getRelativeDay(trip.date)}
                      </Text>
                    </View>
                  )}

                  {getRelativeDay(trip.date) === "Today" && (
                    <TouchableOpacity
                      className="flex-row items-center bg-primary-green rounded-xl flex justify-center p-1.5"
                      onPress={handleButtonPress}
                    >
                      <Check color="white" />
                    </TouchableOpacity>
                  )}

                  {getRelativeDay(trip.date) === "Tomorrow" && (
                    <View className="flex-row items-center bg-blue-400 rounded-xl flex justify-center p-1.5">
                      <Text className="text-white text-sm font-bold text-center">
                        {getRelativeDay(trip.date)}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Cost and Distance */}
              <View>
                <View className="items-center ">
                  <Text className="text-custom-blue text-xl font-bold">
                    ₹{trip.cost || 0}
                  </Text>
                </View>
                <View className="flex-row border border-gray-300  items-center rounded-xl flex justify-center p-1.5 mt-2">
                  <Text className="text-sm font-bold text-center">
                    {trip.distance || 0} KM
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  )
}

export default Notifications
