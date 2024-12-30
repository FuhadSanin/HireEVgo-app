import React, { useState, useEffect, useContext } from "react";
import { View, Text, Alert } from "react-native";
import {
  MoveRight,
  Truck,
} from "lucide-react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/FirebaseConfig";
import { UserContext } from "../../../context/UserContext";
import { format, isToday, isTomorrow } from "date-fns";

const Upcoming = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true); // Loading state
  const [trips, setTrips] = useState([]);

  const GetTrips = async () => {
    try {
      setLoading(true); // Ensure loading is true before data fetch
      const response = await getDocs(collection(db, "trips"));
      const tripsList = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Ensure user.id exists and is valid
      if (!user?.id) throw new Error("Invalid user data");

      const filteredTrips = tripsList.filter(
        (trip) => trip.user === String(user.id)
      );
      // Handle case where no trips are found
      if (filteredTrips.length === 0) {
        setTrips([]);
        Alert.alert("Info", "No trips found for the current user.");
      } else {
        const actualTrips = filteredTrips[0]?.trips || [];
        setTrips(actualTrips);
        // console.log(actualTrips)
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to fetch trips. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    GetTrips();
  }, []);

  //To get day from date
  const getDayFromDate = (dateString) =>
    dateString
      ? [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][new Date(dateString).getDay()] || "Invalid Date"
      : "N/A";

  //To get Relative day from date
  const getRelativeDay = (dateString) => {
    if (!dateString) return "N/A";

    const inputDate = new Date(dateString);
    const today = new Date();

    // Normalize all dates to midnight
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    const diff = (inputDate - today) / (1000 * 60 * 60 * 24); // Difference in days

    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    return "null";
  };

  // Classify trips into categories
  const todayTrips = trips.filter((trip) => isToday(trip.date));
  const tomorrowTrips = trips.filter((trip) => isTomorrow(trip.date));
  const otherTrips = trips.filter(
    (trip) => !isToday(trip.date) && !isTomorrow(trip.date)
  );

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
            {trip.time || "N/A"} . ({getDayFromDate(trip.date) || "N/A"})
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
          {getRelativeDay(trip.date) === "Today" && (
            <View className="flex-row items-center bg-orange-400 rounded-xl flex justify-center p-1.5">
              <Text className="text-white text-sm font-bold text-center">
                {getRelativeDay(trip.date)}
              </Text>
            </View>
          )}

          {getRelativeDay(trip.date) === "Tomorrow" && (
            <View className="flex-row items-center bg-blue-400 rounded-xl flex justify-center p-1.5">
              <Text className="text-white text-sm font-bold text-center">
                {getRelativeDay(trip.date)}
              </Text>
            </View>
          )}

          <View className="flex-row justify-center items-center rounded-xl p-1.5">
            <Text className="text-gray-500">{trip.date || "N/A"}</Text>
          </View>
        </View>
      </View>

      {/* Cost and Distance */}
      <View>
        <View className="items-center">
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
  );

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
  );
};

export default Upcoming;
