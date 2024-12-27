import React from "react"
import { View, Text } from "react-native"
import {
  CalendarDays,
  MapPin,
  DollarSign,
  MoveRight,
  Truck,
} from "lucide-react-native"
import { format, isToday, isTomorrow } from "date-fns"

const upcomingTrips = [
  {
    id: 1,
    date: "2022-10-10",
    time: "10:00 AM",
    starting: "Technopark",
    ending: "Kazhakoot",
    distance: "7.1",
    cost: "35.00",
  },
  {
    id: 2,
    date: "2022-10-11",
    time: "11:00 AM",
    starting: "Tirur",
    ending: "Technopark",
    distance: "5.2",
    cost: "25.00",
  },
  {
    id: 3,
    date: "2022-10-12",
    time: "12:00 PM",
    from: "Cochin",
    to: "Kazhakoot",
    distance: "10.0",
    cost: "50.00",
  },
]

const Upcoming = () => {
  // Classify trips into categories
  const todayTrips = upcomingTrips.filter(trip => isToday(trip.date))
  const tomorrowTrips = upcomingTrips.filter(trip => isTomorrow(trip.date))
  const otherTrips = upcomingTrips.filter(
    trip => !isToday(trip.date) && !isTomorrow(trip.date)
  )

  // Render a single trip
  const renderTrip = (trip: Trip) => (
    <View
      key={trip.id}
      className="p-5 mt-3 overflow-hidden flex-row justify-between shadow-custom-light bg-white border border-gray-200 rounded-3xl"
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
      </View>

      {/* Cost and Distance */}
      <View>
        <View className="items-center">
          <Text className="text-custom-blue text-xl font-bold">
            ₹{trip.cost || 0}
          </Text>
        </View>
        <View className="flex-row items-center bg-blue-200 rounded-xl flex justify-center p-1.5 mt-2">
          <Text className="text-black text-sm font-medium text-center">
            {trip.distance || 0} KM
          </Text>
        </View>
      </View>
    </View>
  )

  return (
    <View
      style={{ backgroundColor: "#F3F2F8" }}
      className="p-4 bg-gray-100 flex-1"
    >
      {/* Today Section */}
      {todayTrips.length > 0 && (
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900">Today</Text>

          {todayTrips.map(renderTrip)}
        </View>
      )}

      {/* Tomorrow Section */}
      {tomorrowTrips.length > 0 && (
        <View className="mb-6">
          <Text className="text-2xl  font-bold text-gray-900">Tomorrow</Text>

          {tomorrowTrips.map(renderTrip)}
        </View>
      )}

      {/* Other Dates Section */}
      {otherTrips.length > 0 && (
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900">Later</Text>

          {otherTrips.map(renderTrip)}
        </View>
      )}

      {/* No Upcoming Trips */}
      {todayTrips.length === 0 &&
        tomorrowTrips.length === 0 &&
        otherTrips.length === 0 && (
          <Text className="text-gray-600 text-center mt-10">
            No upcoming trips.
          </Text>
        )}
    </View>
  )
}

export default Upcoming
