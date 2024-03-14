import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../../constants';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from "react-redux";

import { profileUser } from '../../redux/reducers/userSlice';

export default function ProfileTab() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch()
  const shipperId = useSelector((state) => state.auth.shipperId)
  const shipperData = useSelector((state) => state.user.shipper)
  console.log(shipperId);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(shipperId) {
          // Dispatch with correct payload
          dispatch(profileUser({ShipperId: shipperId}));
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(error);
      }
    }
    fetchData()
  }, [dispatch, shipperId])
  console.log(shipperData);
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
        {shipperData && (
          <View>
            <Text style={{ marginVertical: 8, fontWeight: 'bold' }}>{shipperData.Name}</Text>
            <Text>Email: {shipperData.Email}</Text>
            <Text>Phone: {shipperData.Phone}</Text>
            <Text>Gender: {shipperData.Gender}</Text>
            <Text>CCCD: {shipperData.CCCD}</Text>
            <Text>Status: {shipperData.Status}</Text>
            <Text>Area: {shipperData.AreaName}</Text>
            <Text>Balance: {shipperData.Balance}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
