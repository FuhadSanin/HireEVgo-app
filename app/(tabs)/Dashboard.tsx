import React from "react"
import { ScrollView } from "react-native"
import Header from "../screen/Dashboard/Header"
import Notifications from "../screen/Dashboard/Notifications"
import Money from "../screen/Dashboard/Money"

const Dashboard = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      className="bg-gray-50 w-full"
    >
      <Header />
      <Notifications />
      <Money />
    </ScrollView>
  );
};

export default Dashboard;
