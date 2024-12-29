import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import {
  Truck,
  ChevronsLeftRightEllipsis,
  Route,
  IndianRupee,
  Fuel,
  Star,
} from "lucide-react-native"
import CircularProgress from "react-native-circular-progress-indicator"

const previousRides = {
  total_rides: 114,
  total_distance_covered_km: 3992.51,
  average_distance_per_ride_km: 35.02,
  total_amount_earned_currency: 6241.96,
  approx_fuel_expenses_currency: 434.36,
  customer_satisfaction_level_out_of_5: 4.85,
}

const tiles = [
  {
    label: "Total Rides",
    value: previousRides.total_rides,
    bgColor: "#FF5733", // Hex color for orange
    Icon: Truck,
  },
  {
    label: "Total Distance",
    value: `${previousRides.total_distance_covered_km.toFixed(2)} km`,
    bgColor: "#007BFF", // Hex color for blue
    Icon: Route,
  },
  {
    label: "Avg Distance",
    value: `${previousRides.average_distance_per_ride_km.toFixed(2)} km`,
    bgColor: "#9400D3",
    Icon: ChevronsLeftRightEllipsis,
  },
  {
    label: "Total Earnings",
    value: `₹ ${previousRides.total_amount_earned_currency.toFixed(2)}`,
    bgColor: "#28A745", // Hex color for green
    Icon: IndianRupee,
  },
  {
    label: "Fuel Expenses",
    value: `₹ ${previousRides.approx_fuel_expenses_currency.toFixed(2)}`,
    bgColor: "#6C757D", // Hex color for gray
    Icon: Fuel,
  },
]

const Previous = () => {
  const [loading, setLoading] = useState(true)

  // Simulate data fetching
  setTimeout(() => setLoading(false), 2000)

  return (
    <View className="p-6">
      <Text className="text-2xl font-bold text-gray-900 mb-6">
        Previous Rides Overview
      </Text>

      {loading ? (
        <View className="animate-pulse">
          <View className="flex flex-wrap flex-row -mx-2 h-fit">
            {tiles.map((tile, index) => (
              <View key={index} className={`w-1/2 px-2 mb-6`}>
                <View
                  className={`rounded-3xl flex flex-col justify-center items-center bg-gray-200 p-4 shadow-custom-light h-36`}
                >
                  <View className="bg-gray-300 rounded-full p-2">
                    <tile.Icon size={24} color={tile.bgColor} />
                  </View>
                  <View className="h-4 w-2/3 bg-gray-300 rounded mt-3"></View>
                  <View className="h-4 w-1/2 bg-gray-300 rounded mt-1"></View>
                </View>
              </View>
            ))}
            <View className={`w-1/2 px-2 mb-6`}>
              <View
                className={`h-fit rounded-3xl flex flex-col justify-center items-center bg-gray-200 p-4 shadow-custom-light `}
              >
                <View className="h-4 w-2/3 bg-gray-300 rounded mb-3"></View>
                <View className="h-32 w-2/3 bg-gray-300 rounded mb-3"></View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View className="flex flex-wrap flex-row -mx-2 h-fit">
          {tiles.map((tile, index) => (
            <View key={index} className={`w-1/2 px-2 mb-6`}>
              <View
                className={`rounded-3xl flex flex-col justify-center items-center bg-white p-4 shadow-custom-light h-36 `}
              >
                <View className="bg-gray-100 rounded-full p-2">
                  <tile.Icon size={24} color={tile.bgColor} />
                </View>
                <Text className=" text-sm font-semibold text-gray-500 mb-1 mt-3">
                  {tile.label}
                </Text>
                <Text className=" text-xl font-bold text-center">
                  {tile.value}
                </Text>
              </View>
            </View>
          ))}
          <View className={`w-1/2 px-2 mb-6`}>
            <View
              className={`h-fit rounded-3xl flex flex-col justify-center items-center bg-white p-4 shadow-custom-light `}
            >
              <Text className=" text-sm font-semibold text-gray-500 mb-3">
                Customer Satisfaction
              </Text>
              <CircularProgress
                value={60}
                maxValue={100}
                duration={4000}
                progressValueColor={"black"}
                titleColor={"gray"}
                titleStyle={{ fontWeight: "bold" }}
                activeStrokeColor={"#f39c12"}
                valueSuffix={"%"}
                title={`${previousRides.customer_satisfaction_level_out_of_5}/5`}
                inActiveStrokeColor={"gray"}
                inActiveStrokeOpacity={0.2}
                inActiveStrokeWidth={5}
                activeStrokeWidth={10}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default Previous
