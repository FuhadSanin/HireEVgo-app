import React from "react";
import { View, Text } from "react-native";
import { CalendarDays, MapPin, DollarSign } from "lucide-react-native";
import { format, isToday, isTomorrow } from "date-fns";

interface Trip {
  id: number;
  date: Date;
  from: string;
  to: string;
  duration: string;
  income: string;
}


const upcomingTrips = [
  {
    id: 1,
    date: new Date(),
    from: "Technopark",
    to: "Kazhakoot",
    duration: "7.1 km (25 min)",
    income: "₹35.00",
  },
  {
    id: 2,
    date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    from: "Thiruvananthapuram",
    to: "Technopark",
    duration: "5.2 km (15 min)",
    income: "₹25.00",
  },
  {
    id: 3,
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days later
    from: "Cochin",
    to: "Kazhakoot",
    duration: "10.0 km (35 min)",
    income: "₹50.00",
  },
];

const Upcoming = () => {
  // Classify trips into categories
  const todayTrips = upcomingTrips.filter((trip) => isToday(trip.date));
  const tomorrowTrips = upcomingTrips.filter((trip) => isTomorrow(trip.date));
  const otherTrips = upcomingTrips.filter(
    (trip) => !isToday(trip.date) && !isTomorrow(trip.date)
  );

  // Render a single trip
  const renderTrip = (trip: Trip) => (
    <View key={trip.id} className="bg-white p-4 rounded-lg shadow mb-3">
      <View className="flex-row items-center mb-2">
        <CalendarDays size={20} color="#4A5568" />
        <Text className="ml-2 text-gray-700 font-medium">
          {format(trip.date, "EEE, MMM d, yyyy")}
        </Text>
      </View>
      <View className="flex-row items-center mb-2">
        <MapPin size={20} color="#38BDF8" />
        <Text className="ml-2 text-gray-700">
          {trip.from} → {trip.to}
        </Text>
      </View>
      <View className="flex-row items-center mb-2">
        <Text className="text-gray-600">Duration: {trip.duration}</Text>
      </View>
      <View className="flex-row items-center">
        <DollarSign size={20} color="#10B981" />
        <Text className="ml-2 text-green-600 font-semibold">
          Income: {trip.income}
        </Text>
      </View>
    </View>
  );
  

  return (
    <View
      style={{backgroundColor:'#F3F2F8'}}
      className="p-4 bg-gray-100 flex-1">
      <Text className="text-2xl font-bold text-gray-800 mb-6">🚗 Upcoming Trips</Text>

      {/* Today Section */}
      {todayTrips.length > 0 && (
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-700 mb-3">📅 Today</Text>
          {todayTrips.map(renderTrip)}
        </View>
      )}

      {/* Tomorrow Section */}
      {tomorrowTrips.length > 0 && (
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-700 mb-3">📅 Tomorrow</Text>
          {tomorrowTrips.map(renderTrip)}
        </View>
      )}

      {/* Other Dates Section */}
      {otherTrips.length > 0 && (
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-700 mb-3">📅 Later</Text>
          {otherTrips.map(renderTrip)}
        </View>
      )}

      {/* No Upcoming Trips */}
      {todayTrips.length === 0 && tomorrowTrips.length === 0 && otherTrips.length === 0 && (
        <Text className="text-gray-600 text-center mt-10">No upcoming trips.</Text>
      )}
    </View>
  );
};

export default Upcoming;
