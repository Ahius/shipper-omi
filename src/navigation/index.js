import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeTab from "../screens/BottomTabs/HomeTab";
import HistoryTab from "../screens/BottomTabs/HistoryTab";
import ProfileTab from "../screens/BottomTabs/ProfileTab";
import NotificationTab from "../screens/BottomTabs/NotificationTab";
import { useDispatch, useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  // const shipperId = useSelector(state => state.auth.shipperId);
  
  // const dispatch = useDispatch();
  // const shipperOrders = useSelector(state => state.shipperOder.data);
  // console.log('id:', shipperId);
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
          // tabBarLabel: "Lịch Sử",
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
            <MaterialCommunityIcons name="bell" color={color} size={26} />
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
