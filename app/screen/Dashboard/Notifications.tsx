import React, { useEffect, useContext, useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native"
import { Truck, MoveRight } from "lucide-react-native"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../../config/FirebaseConfig"
import { UserContext } from "../../../context/UserContext"

const Notifications = () => {
  const { user } = useContext(UserContext)
  const [showAll, setShowAll] = useState(false) // State to toggle show all notifications
  const [loading, setLoading] = useState(true) // Loading state
  const [trips, setTrips] = useState([])

  const GetTrips = async () => {
    try {
      setLoading(true) // Ensure loading is true before data fetch
      const response = await getDocs(collection(db, "trips"))
      const tripsList = response.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Ensure user.id exists and is valid
      if (!user?.id) throw new Error("Invalid user data")

      const filteredTrips = tripsList.filter(
        trip => trip.user === String(user.id)
      )

      // Handle case where no trips are found
      if (filteredTrips.length === 0) {
        setTrips([])
        Alert.alert("Info", "No trips found for the current user.")
      } else {
        const actualTrips = filteredTrips[0]?.trips || []
        setTrips(actualTrips)
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
      Alert.alert("Error", "Failed to fetch trips. Please try again.")
      console.error(error)
    }
  }

  useEffect(() => {
    GetTrips()
  }, [])

  // Function to toggle the visibility of notifications
  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  // Limit the number of notifications to show initially
  const notificationsToDisplay = showAll ? trips : trips.slice(0, 3)

  return (
    <View>
      <View className="p-6 mb-3 flex flex-row items-center justify-between w-full">
        {/* Header Section */}
        <View className="flex flex-row items-center">
          <Text className="text-2xl ml-3 font-bold text-gray-900">
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
        {loading
          ? // Show skeleton loading when data is being fetched
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
          : // Show actual notifications once loading is complete
            notificationsToDisplay.map((trip, index) => (
              <View
                key={index}
                className="p-5 flex-row justify-between shadow-custom-light bg-white border border-gray-200 rounded-3xl"
              >
                {/* Trip Details */}
                <View>
                  <View className="flex-row items-center mb-2">
                    <Truck size={20} color="#379972" />
                    <Text className="text-gray-500 ml-2">
                      {trip.time || "N/A"} ({trip.date || "N/A"})
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
                  <View className="flex-row items-center bg-blue-200 rounded-xl flex justify-center p-1.5 mt-2">
                    <Text className="text-black text-sm font-bold text-center">
                      {trip.distance || 0} KM
                    </Text>
                  </View>
                </View>

                {/* Cost and Distance */}
                <View>
                  <View className="flex-row items-center bg-red-300 rounded-xl flex justify-center p-1.5 mb-2">
                    <Text className="text-white text-sm font-bold text-center">
                      Tomorrow
                    </Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-custom-blue text-xl font-bold">
                      ₹{trip.cost || 0}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
      </View>
    </View>
  )
}

export default Notifications
