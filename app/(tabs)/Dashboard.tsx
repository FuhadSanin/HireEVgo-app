import React, { useContext, useEffect, useState } from "react"
import { ScrollView } from "react-native"
import Header from "../screen/Dashboard/Header"
import Notifications from "../screen/Dashboard/Notifications"
import { UserContext } from "../../context/UserContext"

const Dashboard = () => {
  const { user } = useContext(UserContext)
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      className="bg-background-primary w-full"
    >
      <Header user={user} />
      <Notifications />
      {/* <Money /> */}
    </ScrollView>
  )
}

export default Dashboard
