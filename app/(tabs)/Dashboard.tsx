import React, { useContext, useState, useEffect } from "react"
import { ScrollView, RefreshControl, Alert } from "react-native"
import Header from "../screen/Dashboard/Header"
import Notifications from "../screen/Dashboard/Notifications"
import Previous from "../screen/Dashboard/Previous"
import { UserContext } from "../../context/UserContext"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../config/FirebaseConfig"

const Dashboard = () => {
  const { user } = useContext(UserContext)
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true) // Loading state
  const [trips, setTrips] = useState([])

  const GetTrips = async () => {
    try {
      setLoading(true) // Ensure loading is true before data fetch
      const response = await getDocs(collection(db, "trips"))
      const tripsList = response.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Ensure user.id exists and is valid
      if (!user?.id) throw new Error("Invalid user data")

      const filteredTrips = tripsList.filter(
        trip => trip.user === String(user.id)
      )

      // Handle case where no trips are found
      if (filteredTrips.length === 0) {
        setTrips([])
        Alert.alert("Info", "No trips found for the current user.")
      } else {
        const actualTrips = filteredTrips[0]?.trips || []
        setTrips(actualTrips)
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
      Alert.alert("Error", "Failed to fetch trips. Please try again.")
      console.error(error)
    }
  }

  useEffect(() => {
    GetTrips()
    const intervalId = setInterval(() => {
      GetTrips()
    }, 30 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [])

  // Function to handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true)
    await GetTrips()
    setRefreshing(false)
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="bg-background-primary w-full"
    >
      <Header user={user} />
      <Notifications loading={loading} trips={trips} />
      <Previous />
    </ScrollView>
  )
}

export default Dashboard
