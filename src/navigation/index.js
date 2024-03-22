import React, { useEffect, useState } from "react";
import { NavigationContainer, useIsFocused, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeTab from "../screens/BottomTabs/HomeTab";
import HistoryTab from "../screens/BottomTabs/HistoryTab";
import ProfileTab from "../screens/BottomTabs/ProfileTab";

import NotificationTab from "../screens/BottomTabs/NotificationTab";
import { useDispatch, useSelector } from "react-redux";

import EditProfileTab from "../screens/BottomTabs/EditProfileTab";
import { Touchable, TouchableOpacity } from "react-native";
import { FetchNotification, updateNoti } from "../redux/reducers/notificationSlice";
import { FetchshipperOrders } from "../redux/reducers/shipperHistorySlice";


const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  const shipperId = useSelector(state => state.auth.shipperId);
  const notiData = useSelector(state => state.noti.data);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [iconName, setIconName] = useState('bell');

  const dispatch = useDispatch();
  const navigation = useNavigation();
  // useEffect(() => {
  //   if (shipperId !== null) {
  //     dispatch(FetchshipperOrders({ ShipperId: shipperId, status: 'Success' }));

  //   }
  // }, [dispatch, shipperId]);
  // useEffect(() => {
  //   dispatch(FetchNotification({ ShipperId: shipperId }));
  // }, [dispatch, shipperId]);

  // useEffect(() => {
  //   if (notiData && Array.isArray(notiData) && notiData.length > 0) {
  //     const hasNew = notiData.some(item => item.readStatus === 0);
  //     setHasNewNotification(hasNew);
  //     setIconName(hasNew ? 'bell-ring' : 'bell');
  //   }
  // }, [notiData, JSON.stringify(notiData)]);

  const handleTabPress = () => {
    dispatch(updateNoti({ id: shipperId }))
      .then(response => {
        console.log('Update thành công, payload:', response);
        navigation.navigate('Notification');
      })
      .catch(error => {
        console.error('Lỗi khi update:', error);
      });
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          headerShown: false,
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryTab}
        options={{
          headerShown: false,
          tabBarLabel: "Đơn hàng",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="package" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationTab}
        options={{
          headerShown: false,
          tabBarLabel: "Thông báo",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name={iconName}
              color={hasNewNotification ? 'red' : color}
              size={26}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} onPress={handleTabPress} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          headerShown: false,
          tabBarLabel: "Tôi",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}