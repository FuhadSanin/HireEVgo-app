import React, { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Truck, MoveRight } from "lucide-react-native"

const Notifications = ({ loading, trips }) => {
  const [showAll, setShowAll] = useState(false) // State to toggle show all notifications

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
                      {trip.time || "N/A"} . (Thursday)
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
                    <View className="flex-row items-center bg-orange-400 rounded-xl flex justify-center p-1.5">
                      <Text className="text-white text-sm font-bold text-center">
                        Tommorow
                      </Text>
                    </View>
                    <View className="flex-row justify-center items-center rounded-xl p-1.5">
                      <Text className="text-gray-500 ">
                        {trip.date || "N/A"}
                      </Text>
                    </View>
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
              </View>
            ))}
      </View>
    </View>
  )
}

export default Notifications
