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
  const shipperData = useSelector((state) => state.user.initialState)
  console.log("Shipper: ", ShipperId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(ShipperId) {
          await dispatch(profileUser(ShipperId))
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
    fetchData()
  }, [dispatch, ShipperId])

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
