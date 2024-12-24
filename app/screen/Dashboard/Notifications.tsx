import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import { Truck, MoveRight } from "lucide-react-native"

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [showAll, setShowAll] = useState(false) // State to toggle show all notifications
  const [loading, setLoading] = useState(true) // Loading state

  const fetchData = async () => {
    try {
      const url = "https://sheetdb.io/api/v1/ku3ntk7syjkp5"

      const response = await fetch(url)
      const jsonData = await response.json()
      setNotifications(jsonData)
    } catch (error) {
      console.error("Error fetching notifications:", error)
    } finally {
      setLoading(false) // Set loading to false after fetching data
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Function to toggle the visibility of notifications
  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  // Limit the number of notifications to show initially
  const notificationsToDisplay = showAll
    ? notifications
    : notifications.slice(0, 3)

  return (
    <View>
      <View className="p-6 mb-3 flex flex-row items-center justify-between w-full">
        {/* Left Section */}
        <View className="flex flex-row items-center">
          <Text className="text-2xl ml-3 font-bold text-gray-900">
            Notifications
          </Text>
        </View>

        {/* Right Section */}
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
            notificationsToDisplay.map((notification, index) => (
              <View
                key={index}
                className="p-5 flex-row justify-between shadow-custom-light bg-white border border-gray-200 rounded-3xl"
              >
                {/* Date and Time */}
                <View>
                  <View className="flex-row items-center mb-2">
                    <Truck size={20} color="#379972" />
                    <Text className="text-gray-500 ml-2">
                      {notification.time} ({notification.date})
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-gray-800 capitalize text-xl font-bold">
                      {notification.picking}
                    </Text>
                    <MoveRight size={20} color="gray" />
                    <Text className="text-gray-800 capitalize text-xl font-bold">
                      {notification.dropping}
                    </Text>
                  </View>
                </View>

                {/* Estimated Cost */}
                <View>
                  <View className="items-center">
                    <Text className=" text-custom-blue text-xl font-bold">
                      ₹{notification.estimatedCost}
                    </Text>
                  </View>
                  <View className="flex-row items-center bg-blue-200 rounded-xl flex justify-center p-1.5 mt-2 ">
                    <Text className="text-black text-sm font-medium text-center">
                      {notification.distance} KM
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
