import React from "react"
import { View, Text } from "react-native"
import { Calendar, Bell, Truck, MapPin } from "lucide-react-native"

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      date: "2024-12-01",
      time: "10:30 AM",
      location: "Thiruvananthapuram",
      distance: "5.2 km",
      estimatedCost: "25.00",
    },
    {
      id: 2,
      date: "2024-12-01",
      time: "12:00 PM",
      location: "Technopark",
      distance: "3.8 km",
      estimatedCost: "18.50",
    },
    {
      id: 3,
      date: "2024-12-01",
      time: "02:30 PM",
      location: "Kazhakoot",
      distance: "7.1 km",
      estimatedCost: "35.00",
    },
  ]
  return (
    <View>
      <View className="p-6 mb-3 flex flex-row items-center justify-between w-full">
        {/* Left Section */}
        <View className="flex flex-row items-center">
          <Bell size={24} strokeWidth={3} color="#0E627C" />
          <Text
            className="text-2xl ml-3"
            style={{ fontFamily: "Montserrat-Bold" }}
          >
            Notifications
          </Text>
        </View>

        {/* Right Section */}
        <Text
          className="text-md text-custom-blue"
          style={{ fontFamily: "Montserrat-Medium" }}
        >
          Show all
        </Text>
      </View>
      <View className="p-6 pt-0 gap-5">
        {notifications.map(notification => (
          <View
            key={notification.id}
            className="p-5 flex-row justify-between bg-white border border-gray-300 rounded-3xl"
          >
            {/* Date and Time */}
            <View>
              <View className="flex-row items-center mb-2">
                <MapPin size={20} color="#16A34A" />
                <Text
                  className="text-gray-800 ml-2"
                  style={{ fontFamily: "Montserrat-Bold" }}
                >
                  {notification.location}
                </Text>
              </View>
              <View className="flex-row items-center mb-2">
                <Calendar size={20} color="#16A34A" />
                <Text
                  className="text-gray-800 ml-2"
                  style={{ fontFamily: "Montserrat-Medium" }}
                >
                  {notification.date} at {notification.time}
                </Text>
              </View>

              {/* Distance */}
              <View className="flex-row items-center mb-2">
                <Truck size={20} color="#16A34A" />
                <Text
                  className="font-medium ml-2"
                  style={{ fontFamily: "Montserrat-Bold" }}
                >
                  Distance:
                </Text>
                <Text
                  className="text-gray-800 ml-3"
                  style={{ fontFamily: "Montserrat-Medium" }}
                >
                  {notification.distance}
                </Text>
              </View>
            </View>

            {/* Estimated Cost */}
            <View className="items-center">
              <Text
                className=" text-custom-blue text-2xl"
                style={{ fontFamily: "Montserrat-Bold" }}
              >
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
