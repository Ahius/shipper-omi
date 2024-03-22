import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeTab from "../screens/BottomTabs/HomeTab";
import HistoryTab from "../screens/BottomTabs/HistoryTab";
import ProfileTab from "../screens/BottomTabs/ProfileTab";
import NotificationTab from "../screens/BottomTabs/NotificationTab";
import EditProfileTab from "../screens/BottomTabs/EditProfileTab";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Hồ sơ người dùng"
      component={ProfileTab}
      options={{}}
    />
    <ProfileStack.Screen
      name="EditProfile"
      component={EditProfileTab}
      options={{ title: "Chỉnh sửa thông tin người dùng" }}
    />
  </ProfileStack.Navigator>
);

export default function AppNavigation() {
  const shipperOrders = useSelector((state) => state.shipperOder.data);
  const shipperProfile = useSelector((state) => state.user.data);
  console.log("data pack:", shipperProfile);
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
        component={ProfileStackScreen}
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
