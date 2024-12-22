import React from "react"
import { View, Text, ScrollView, Image } from "react-native"
import { User, Phone, Mail, Truck, BookUser, IdCard } from "lucide-react-native"

const Profile = () => {
  const user = {
    personalDetails: [
      {
        label: "Full Name",
        value: "John Doe",
        icon: <User size={24} color="#379972" />,
      },
      {
        label: "Email",
        value: "johndoe@example.com",
        icon: <Mail size={24} color="#379972" />,
      },
      {
        label: "Personal Number",
        value: "+1 123 456 7890",
        icon: <Phone size={24} color="#379972" />,
      },
      {
        label: "Emergency Contact",
        value: "+1 987 654 3210",
        icon: <BookUser size={24} color="#8B0000" />,
      },
    ],
    vehicleDetails: [
      {
        label: "Vehicle Name",
        value: "Mahindra Scorpio",
        icon: <Truck size={24} color="#379972" />,
      },
      {
        label: "Vehicle Number",
        value: "ABC-1234",
      },
      {
        label: "License Number",
        value: "D123456789",
        icon: <IdCard size={24} color="#379972" />,
      },
      { label: "RC Number", value: "RC987654321" },
    ],
    documents: [
      {
        label: "RC Book",
        uri: "https://www.shutterstock.com/shutterstock/photos/645891550/display_1500/stock-vector-flat-man-driver-license-plastic-card-template-id-card-vector-illustration-645891550.jpg",
      },
      {
        label: "License",
        uri: "https://pvccardwala.com/wp-content/uploads/2022/11/WhatsApp-Image-2022-11-28-at-7.40.47-PM-3.jpeg",
      },
    ],
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      className="bg-background-primary w-full"
    >
      <View className="p-6 pb-12 pt-24">
        {/* Profile Information */}
        <View className="mb-6">
          <Text className="text-2xl mb-4 font-bold text-gray-900">
            Profile Information
          </Text>
          <View className="p-5 shadow-custom-light bg-white border border-gray-200 rounded-3xl mb-6">
            {user.personalDetails.map((detail, index) => (
              <View className="flex-row items-center mb-3" key={index}>
                {detail.icon && <View className="mr-3">{detail.icon}</View>}
                <Text className="text-gray-500 font-medium">
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
        <View className="p-5 shadow-custom-light bg-white border border-gray-200 rounded-3xl mb-6">
          {user.vehicleDetails.map((detail, index) => (
            <View className="flex-row items-center mb-3" key={index}>
              {detail.icon && <View className="mr-3">{detail.icon}</View>}
              <Text className="text-gray-500 font-medium">{detail.label}:</Text>
              <Text className="text-gray-900 font-semibold ml-auto">
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
          {user.documents.map((doc, index) => (
            <View
              key={index}
              className="p-5 shadow-custom-light bg-white border border-gray-200 rounded-3xl mb-5"
            >
              <Text className="text-gray-900 font-medium mb-3">
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
      </View>
    </ScrollView>
  )
}

export default Profile
