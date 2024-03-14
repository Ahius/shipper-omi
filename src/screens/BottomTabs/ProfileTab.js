import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../../constants';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from 'jwt-decode'; // Import jwt-decode

export default function ProfileTab() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shipperData, setShipperData] = useState(null);
console.log("data ship", shipperData);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in AsyncStorage');
        }
        // Ensure jwtDecode is defined and is a function
        if (typeof jwtDecode !== 'function') {
          throw new Error('jwtDecode is not a function');
        }
        const decodedToken = jwtDecode(token); // Use jwt-decode
        setShipperData(decodedToken);
        console.log("Shipper: ", decodedToken);
        setIsLoading(false);
      } catch (error) {
        console.error('Error retrieving token:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar style="auto" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar style="auto" />
        <Text>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  if (!shipperData) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar style="auto" />
        <Text>No user data found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar style="auto" />
      <View style={{ width: '100%' }}>
        <Image
          source={images.cover}
          resizeMode="cover"
          style={{ height: 228, width: '100%' }}
        />
      </View>

      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image
          source={images.shipperImg}
          resizeMode="contain"
          style={{
            height: 155,
            width: 155,
            borderRadius: 999,
            borderColor: '#ccc',
            borderWidth: 2,
            marginTop: -90,
          }}
        />
        <Text style={{ marginVertical: 8, fontWeight: 'bold' }}>{shipperData.shipper.Name}</Text>
        <Text>Email: {shipperData.shipper.Email}</Text>
        <Text>Phone: {shipperData.shipper.Phone}</Text>
        <Text>Gender: {shipperData.shipper.Gender}</Text>
        <Text>CCCD: {shipperData.shipper.CCCD}</Text>
        <Text>Status: {shipperData.shipper.Status}</Text>
        <Text>Area: {shipperData.shipper.AreaName}</Text>
        <Text>Balance: {shipperData.shipper.Balance}</Text>
      </View>
    </SafeAreaView>
  );
}
