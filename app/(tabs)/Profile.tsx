import React, { useState, useEffect, useContext } from "react"
import {
  View,
  Text,
  ScrollView,
  Image,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native"
import { UserContext } from "../../context/UserContext"
import { User, Phone, Mail, Truck, BookUser, IdCard } from "lucide-react-native"

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  // Icon mapping for labels
  const iconMapping = {
    name: <User size={20} className="mr-3" color="#379972" />,
    email: <Mail size={20} className="mr-3" color="#379972" />,
    "personal number": <Phone size={20} className="mr-3" color="#379972" />,
    "emergency contact": <BookUser size={20} className="mr-3"  color="#8B0000" />,
    "license number": <IdCard size={20} className="mr-3" color="#379972" />,
    "vehicle name": <Truck size={20} className="mr-3" color="#379972" />,
  };

  // Function to transform the object keys and values into arrays
  const transformData = (data) => {
    return Object.entries(data).map(([key, value]) => ({
      label: key,
      value: value,
    }));
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate API call delay
    return () => clearTimeout(timer);
  }, []);

  // Extract the transformed personal and vehicle details
  const personalDetails = transformData({
    name: user.name,
    email: user.email,
    "personal number": user["personal number"],
    "emergency contact": user["emergency contact"],
  });

  const vehicleDetails = transformData(user["vehicle details"]);

  const documentDetails = Object.entries(user.documents).map(([key, uri]) => ({
    label: key,
    uri: uri,
  }));

  const phoneNumber = "tel:18001234567"

  const handlePress = async () => {
    try {
      const supported = await Linking.canOpenURL(phoneNumber)
      if (supported) {
        await Linking.openURL(phoneNumber) // Opens the dialer
      } else {
        Alert.alert("Error", "Your device doesn't support this feature.")
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open dialer.")
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      className="bg-background-primary w-full"
    >
      <View className="p-6 pb-6 pt-12">
        {/* Profile Information */}
        <View className="mb-6">
          <Text className="text-2xl mb-4 font-bold text-gray-900">
            Profile Information
          </Text>
          <View className="p-5 shadow-custom-light bg-white border border-gray-200 rounded-3xl mb-6">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <View className="flex-row items-center mb-3" key={index}>
                    <View className="w-6 h-6 bg-gray-200 rounded-full mr-3 animate-pulse" />
                    <View className="flex-1 h-5 bg-gray-200 rounded animate-pulse" />
                  </View>
                ))
              : personalDetails.map((detail, index) => (
                  <View className="flex-row items-center mb-3" key={index}>
                    {iconMapping[detail.label.toLowerCase()] || null}
                    <Text className="text-gray-500 ml-2 capitalize font-medium">
                      {detail.label}:
                    </Text>
                    <Text className="text-gray-900 font-semibold ml-auto">
                      {detail.value}
                    </Text>
                  </View>
                ))}
          </View>
        </View>

        {/* Vehicle Information */}
        <Text className="text-2xl mb-4 font-bold text-gray-900">
          Vehicle Information
        </Text>
        <View className="p-5 shadow-custom-light bg-white border border-gray-200 rounded-3xl mb-6">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <View className="flex-row items-center mb-3" key={index}>
                  <View className="w-6 h-6 bg-gray-200 rounded-full mr-3 animate-pulse" />
                  <View className="flex-1 h-5 bg-gray-200 rounded animate-pulse" />
                </View>
              ))
            : vehicleDetails.map((detail, index) => (
                <View className="flex-row items-center mb-3" key={index}>
                  {iconMapping[detail.label.toLowerCase()] || null}
                  <Text className="text-gray-500 ml-2 capitalize font-medium">
                    {detail.label}:
                  </Text>
                  <Text className="text-gray-900 capitalize font-semibold ml-auto">
                    {detail.value}
                  </Text>
                </View>
              ))}
        </View>

        {/* Documents */}
        <View>
          <Text className="text-2xl mb-4 font-bold text-gray-900">
            Documents
          </Text>
          {loading
            ? Array.from({ length: 2 }).map((_, index) => (
                <View
                  key={index}
                  className="p-5 shadow-custom-light bg-white border border-gray-300 rounded-3xl mb-5"
                >
                  <View className="w-full h-40 bg-gray-200 rounded-lg animate-pulse" />
                </View>
              ))
            : documentDetails.map((doc, index) => (
                <View
                  key={index}
                  className="p-5 shadow-custom-light bg-white border border-gray-200 rounded-3xl mb-5"
                >
                  <Text className="text-gray-900 capitalize font-medium mb-3">
                    {doc.label}
                  </Text>
                  <Image
                    source={{
                      uri: doc.uri,
                    }}
                    className="w-full h-40 rounded-lg"
                    resizeMode="cover"
                  />
                </View>
              ))}
        </View>
        <View className="items-center border-t border-gray-300 w-full py-4">
          <View className="flex-row items-center justify-center">
            <Text className="text-gray-500 mr-2">Need help? Call</Text>
            <TouchableOpacity onPress={handlePress}>
              <Text className="text-primary-green font-semibold underline">
                1800-123-4567
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-gray-500 mt-1">
            &copy; 2024 HireEVgo. All rights reserved.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
