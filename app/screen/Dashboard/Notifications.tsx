import React from "react"
import { View, Text } from "react-native"
import { Calendar, Bell, Truck, MapPin, MoveRight } from "lucide-react-native"

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      date: "2024-12-01",
      time: "10:30 AM",
      picking: "Tirur",
      dropping: "Kollam",
      distance: "5.2",
      estimatedCost: "25.00",
    },
    {
      id: 2,
      date: "2024-12-01",
      time: "12:00 PM",
      picking: "Tirur",
      dropping: "Kollam",
      distance: "3.8",
      estimatedCost: "18.50",
    },
    {
      id: 3,
      date: "2024-12-01",
      time: "02:30 PM",
      picking: "Tirur",
      dropping: "Kollam",
      distance: "7.1",
      estimatedCost: "35.00",
    },
  ]
  return (
    <View>
      <View className="p-6  flex flex-row items-center justify-between w-full">
        {/* Left Section */}
        <View className="flex flex-row items-center">
          {/* <Bell size={24} strokeWidth={2} color="black" /> */}
          <Text className="text-2xl ml-3 font-bold text-gray-900">
            Notifications
          </Text>
        </View>

        {/* Right Section */}
        <Text className="text-md text-custom-blue font-bold">Show all</Text>
      </View>
      <View className="p-6 pt-0 gap-7">
        {notifications.map(notification => (
          <View
            key={notification.id}
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
