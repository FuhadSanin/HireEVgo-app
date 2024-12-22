import React from "react";
import { View, Text } from "react-native";
import { CalendarDays, MapPin, DollarSign } from "lucide-react-native";
import { format } from "date-fns";

const previousRides = [
    {
      id: 1,
      date: new Date("2024-05-15"),
      from: "Kazhakoot",
      to: "Technopark",
      duration: "7.1 km (30 min)",
      income: "₹50.00",
    },
    {
      id: 2,
      date: new Date("2024-05-20"),
      from: "Thiruvananthapuram",
      to: "Kazhakoot",
      duration: "5.2 km (20 min)",
      income: "₹40.00",
    },
  ];

const Previous = () => {
  return (
    <View>
      <Text className="text-xl font-bold text-gray-800 mb-4">📅 Previous Month Rides</Text>
      {previousRides.map((ride) => (
        <View key={ride.id} className="bg-white p-4 rounded-lg shadow mb-3">
          <View className="flex-row items-center mb-2">
            <CalendarDays size={20} color="#4A5568" />
            <Text className="ml-2 text-gray-700">{format(ride.date, "yyyy-MM-dd")}</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <MapPin size={20} color="#38BDF8" />
            <Text className="ml-2 text-gray-700">
              {ride.from} → {ride.to}
            </Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Text className="font-medium text-gray-600">Duration: {ride.duration}</Text>
          </View>
          <View className="flex-row items-center">
            <DollarSign size={20} color="#10B981" />
            <Text className="ml-2 font-semibold text-green-600">Income: {ride.income}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Previous;
