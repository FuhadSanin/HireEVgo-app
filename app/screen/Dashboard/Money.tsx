import { ChartBar } from "lucide-react-native"
import React from "react"
import { View, Text } from "react-native"
import PieChart from "react-native-pie-chart"

const Money = () => {
  const widthAndHeight = 150
  const series = [123, 321, 123, 789, 537]
  const sliceColor = ["#fbd203", "#ffb300", "#ff9100", "#ff6c00", "#ff3c00"]
  return (
    <View>
      <View className="p-6 mb-3 flex flex-row items-center justify-between w-full">
        {/* Left Section */}
        <View className="flex flex-row items-center">
          <ChartBar size={24} strokeWidth={3} color="#0E627C" />
          <Text
            className="text-2xl ml-3"
            style={{ fontFamily: "Montserrat-Bold" }}
          >
            Visualise
          </Text>
        </View>
      </View>
      <View className="p-6 pt-0 gap-5 ">
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.45}
          coverFill={"#FFF"}
        />
      </View>
    </View>
  )
}

export default Money
