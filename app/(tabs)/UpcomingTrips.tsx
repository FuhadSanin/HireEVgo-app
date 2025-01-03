import React, { useState, useEffect, useContext } from "react"
import {
  ScrollView,
  SafeAreaView,
  RefreshControl,
  View,
  Text,
  Alert,
} from "react-native"
import { MoveRight, Truck } from "lucide-react-native"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../config/FirebaseConfig"
import { UserContext } from "../../context/UserContext"
import { isToday, isTomorrow, parseISO } from "date-fns"

const SkeletonCard = () => (
  <View className="p-5 mt-3 overflow-hidden flex-row justify-between shadow-custom-light bg-gray-200 border border-gray-300 rounded-3xl animate-pulse">
    <View>
      <View className="h-4 w-20 bg-gray-300 mb-2 rounded"></View>
      <View className="flex-row items-center mb-2">
        <View className="h-4 w-12 bg-gray-300 mr-2 rounded"></View>
        <View className="h-4 w-24 bg-gray-300 rounded"></View>
      </View>
      <View className="h-4 w-32 bg-gray-300 rounded"></View>
    </View>
    <View>
      <View className="h-4 w-12 bg-gray-300 mb-2 rounded"></View>
      <View className="h-4 w-16 bg-gray-300 rounded"></View>
    </View>
  </View>
)

const UpcomingTrips = () => {
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [trips, setTrips] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const GetTrips = async () => {
    try {
      setLoading(true)
      const response = await getDocs(collection(db, "trips"))
      const tripsList = response.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))

      if (!user?.id) throw new Error("Invalid user data")

      const filteredTrips = tripsList.filter(
        trip => trip.user === String(user.id)
      )

      if (filteredTrips.length === 0) {
        setTrips([])
        Alert.alert("Info", "No trips found for the current user.")
      } else {
        const actualTrips = filteredTrips[0]?.trips || []
        setTrips(actualTrips)
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch trips. Please try again.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    GetTrips()
    const intervalId = setInterval(() => {
      GetTrips()
    }, 30 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [])

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

  const onRefresh = async () => {
    setRefreshing(true)
    await GetTrips()
    setRefreshing(false)
  }

  const renderTrip = trip => (
    <View
      key={trip.id}
      className="p-5 mt-3 overflow-hidden flex-row justify-between shadow-custom-light bg-white border border-gray-200 rounded-3xl"
    >
      {/* Trip Details */}
      <View>
        <View className="flex-row items-center mb-2">
          <Truck size={20} color="#379972" />
          <Text className="text-gray-500 ml-2">
            {trip.time || "N/A"} . ({getDayFromDate(trip.date) || "N/A"})
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

          {getRelativeDay(trip.date) === "Tomorrow" && (
            <View className="flex-row items-center bg-blue-400 rounded-xl flex justify-center p-1.5">
              <Text className="text-white text-sm font-bold text-center">
                {getRelativeDay(trip.date)}
              </Text>
            </View>
          )}

          <View className="flex-row justify-center items-center rounded-xl p-1.5">
            <Text className="text-gray-500">{trip.date || "N/A"}</Text>
          </View>
        </View>
      </View>

      {/* Cost and Distance */}
      <View>
        <View className="items-center">
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
    </View>
  )

  // Categorize trips into Today, Tomorrow, and Later
  const todayTrips = trips.filter(trip => isToday(parseISO(trip.date)))
  const tomorrowTrips = trips.filter(trip => isTomorrow(parseISO(trip.date)))
  const laterTrips = trips.filter(
    trip => !isToday(parseISO(trip.date)) && !isTomorrow(parseISO(trip.date))
  )

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <ScrollView
        className="p-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <View>
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </View>
        ) : (
          <View className="p-4 bg-gray-100 flex-1">
            {todayTrips.length > 0 && (
              <View className="mb-6">
                <Text className="text-2xl font-bold text-gray-900">Today</Text>
                {todayTrips.map(renderTrip)}
              </View>
            )}

            {tomorrowTrips.length > 0 && (
              <View className="mb-6">
                <Text className="text-2xl font-bold text-gray-900">
                  Tomorrow
                </Text>
                {tomorrowTrips.map(renderTrip)}
              </View>
            )}

            {laterTrips.length > 0 && (
              <View className="mb-6">
                <Text className="text-2xl font-bold text-gray-900">Later</Text>
                {laterTrips.map(renderTrip)}
              </View>
            )}

            {todayTrips.length === 0 &&
              tomorrowTrips.length === 0 &&
              laterTrips.length === 0 && (
                <Text className="text-gray-600 text-center mt-10">
                  No upcoming trips.
                </Text>
              )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default UpcomingTrips
