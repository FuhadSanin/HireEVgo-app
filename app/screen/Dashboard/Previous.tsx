import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import {
  Truck,
  ChevronsLeftRightEllipsis,
  Route,
  IndianRupee,
  Fuel,
  Star,
} from "lucide-react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { db } from "../../../config/FirebaseConfig";
import { UserContext } from "../../../context/UserContext";
import { collection, getDocs } from "firebase/firestore";

const Previous = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [tiles, setTiles] = useState([]);

  // Fetch and filter previous trips for the current user
  const GetPrevTrips = async () => {
    try {
      setLoading(true); // Ensure loading starts before fetch
      const response = await getDocs(collection(db, "previous"));
      const prevtrips = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Validate user data exists
      if (!user?.id) throw new Error("Invalid user data");

      const actualPrevTrips = prevtrips.find(
        (trip) => trip.user === String(user.id)
      );

      if (!actualPrevTrips || !actualPrevTrips.previous) {
        setTiles([]);
        Alert.alert("Info", "No trips found for the current user.");
      } else {
        setTiles(actualPrevTrips.previous); 
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch trips. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetPrevTrips();
  }, []);

  // Transform object data for mapping
  const transformData = (data) => {
    return Object.entries(data).map(([key, value]) => ({
      label: key,
      value: value,
    }));
  };

  // Extract transformed previous rides
  const previousRides =
    tiles.length > 0 ? transformData(tiles[0]) : []; // Ensure tiles exist

  // Icon mapping for labels
  const iconMapping = {
    "avg Distance": <ChevronsLeftRightEllipsis size={24} color="#9400D3" />,
    "fuel Expenses": <Fuel size={24} color="#6C757D" />,
    "total Distance": <Route size={24} color="#007BFF" />,
    "total Earnings": <IndianRupee size={24} color="#28A745" />,
    "total Rides": <Truck size={24} color="#FF5733" />,
    "customer Satisfaction": <Star size={24} color="#FFC107" />,
  };

  return (
    <View className="p-6">
      <Text className="text-2xl font-bold text-gray-900 mb-6">
        Previous Rides Overview
      </Text>

      {loading ? (
        <View className="animate-pulse">
          <View className="flex flex-wrap flex-row -mx-2 h-fit">
            {Array.from({ length: 6 }).map((_, index) => (
              <View key={index} className={`w-1/2 px-2 mb-6`}>
                <View
                  className={`rounded-3xl flex flex-col justify-center items-center bg-gray-200 p-4 shadow-custom-light h-36`}
                >
                  <View className="bg-gray-300 rounded-full p-2" />
                  <View className="h-4 w-2/3 bg-gray-300 rounded mt-3" />
                  <View className="h-4 w-1/2 bg-gray-300 rounded mt-1" />
                </View>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View className="flex flex-wrap flex-row -mx-2 h-fit">
          {previousRides.map((tile, index) => (
            <View key={index} className={`w-1/2 px-2 mb-6`}>
              <View
                className={`rounded-3xl flex flex-col justify-center items-center bg-white p-4 shadow-custom-light h-36`}
              >
                <View className="bg-gray-100 rounded-full p-2">
                  {iconMapping[tile.label] || null}
                </View>
                <Text className="text-sm capitalize font-semibold text-gray-500 mb-1 mt-3">
                  {tile.label}
                </Text>
                <Text className="text-xl capitalize font-bold text-center">
                  {tile.value}
                </Text>
              </View>
            </View>
          ))}
          <View className={`w-1/2 px-2 mb-6`}>
            <View
              className={`h-fit rounded-3xl flex flex-col justify-center items-center bg-white p-4 shadow-custom-light`}
            >
              <Text className="text-sm font-semibold capitalize text-gray-500 mb-3">
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
                title={`${tiles[0]?.["customer Satisfaction"]||0}/5`}
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
  );
};

export default Previous;
