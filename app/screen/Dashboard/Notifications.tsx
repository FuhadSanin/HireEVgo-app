import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Calendar, Bell, Truck, MapPin } from "lucide-react-native"

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
          <Text className="text-2xl ml-3" style={{ fontFamily: "Montserrat-Bold" }}>
            Notifications
          </Text>
        </View>

        {/* Right Section */}
        <TouchableOpacity onPress={toggleShowAll}>
          <Text className="text-md text-custom-blue" style={{ fontFamily: "Montserrat-Medium" }}>
            {showAll ? "Show less" : "Show all"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="p-6 pt-0 gap-5">
        {notificationsToDisplay.map((notification, index) => (
          <View
            key={index}
            className="p-5 flex-row justify-between bg-white border border-gray-300 rounded-3xl"
          >
            {/* Date and Time */}
            <View>
              <View className="flex-row items-center mb-2">
                <MapPin size={20} color="#16A34A" />
                <Text className="text-gray-800 ml-2" style={{ fontFamily: "Montserrat-Bold" }}>
                  {notification.location}
                </Text>
              </View>
              <View className="flex-row items-center mb-2">
                <Calendar size={20} color="#16A34A" />
                <Text className="text-gray-800 ml-2" style={{ fontFamily: "Montserrat-Medium" }}>
                  {notification.date} at {notification.time}
                </Text>
              </View>

              {/* Distance */}
              <View className="flex-row items-center mb-2">
                <Truck size={20} color="#16A34A" />
                <Text className="font-medium ml-2" style={{ fontFamily: "Montserrat-Bold" }}>
                  Distance:
                </Text>
                <Text className="text-gray-800 ml-3" style={{ fontFamily: "Montserrat-Medium" }}>
                  {notification.distance}
                </Text>
              </View>
            </View>

            {/* Estimated Cost */}
            <View className="items-center">
              <Text className="text-custom-blue text-2xl" style={{ fontFamily: "Montserrat-Bold" }}>
                ₹{notification.estimatedCost}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default Notifications
