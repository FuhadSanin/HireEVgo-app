import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Calendar, Bell, Truck, MapPin, MoveRight } from "lucide-react-native"

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [showAll, setShowAll] = useState(false)  // State to toggle show all notifications

  const fetchData = async () => {
    const url = "https://sheetdb.io/api/v1/ku3ntk7syjkp5"

    // Measure request body size (if applicable)
    const requestBody = JSON.stringify({}) // if you're sending a POST body, replace this with your actual body
    const requestBodySize = new TextEncoder().encode(requestBody).length // Calculate request body size

    // Perform the fetch
    const response = await fetch(url)

    // Measure response body size
    const jsonData = await response.json()
    const responseBodySize = new TextEncoder().encode(JSON.stringify(jsonData)).length // Calculate response body size

    // Measure headers size
    const headers = response.headers
    let headersSize = 0
    headers.forEach((value: string, key: string) => {
      headersSize += new TextEncoder().encode(key).length + new TextEncoder().encode(value).length
    })

    // Calculate total size (Request Body + Headers + Response Body)
    const totalSize = requestBodySize + headersSize + responseBodySize

    console.log(`Request Body Size: ${requestBodySize} bytes`)
    console.log(`Headers Size: ${headersSize} bytes`)
    console.log(`Response Body Size: ${responseBodySize} bytes`)
    console.log(`Total Size: ${totalSize} bytes`)

    setNotifications(jsonData)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Function to toggle the visibility of notifications
  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  // Limit the number of notifications to show initially
  const notificationsToDisplay = showAll ? notifications : notifications.slice(0, 3)

  return (
    <View>
      <View className="p-6 mb-3 flex flex-row items-center justify-between w-full">
        {/* Left Section */}
        <View className="flex flex-row items-center">
          <Bell size={24} strokeWidth={3} color="#0E627C" />
          <Text className="text-2xl ml-3 font-bold text-gray-900">
            Notifications
          </Text>
        </View>

        {/* Right Section */}
        <TouchableOpacity onPress={toggleShowAll}>
          <Text className="text-md text-custom-blue">
            {showAll ? "Show less" : "Show all"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="p-6 pt-0 gap-5">
        {notificationsToDisplay.map((notification, index) => (
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
              <Text className="text-gray-800 text-xl font-bold">
                {notification.picking}
              </Text>
              <MoveRight size={20} color="gray" />
              <Text className="text-gray-800 text-xl font-bold">
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
            <View className="flex-row items-center bg-blue-200 rounded-xl flex justify-center p-1 mt-2 ">
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
