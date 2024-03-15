import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeTab from "../screens/BottomTabs/HomeTab";
import PackageTab from "../screens/BottomTabs/PackageTab";
import HistoryTab from "../screens/BottomTabs/HistoryTab";
import ProfileTab from "../screens/BottomTabs/ProfileTab";
import EditProfileTab from "../screens/BottomTabs/EditProfileTab";

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
      options={{ title: "Chỉnh sửa thông tin người dùng",
     }}
    />
  </ProfileStack.Navigator>
);

export default function AppNavigation() {
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
          name="Packgae"
          component={PackageTab}
          options={{
            headerShown: false,
            tabBarLabel: "Đơn hàng",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="package" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="History"
          component={HistoryTab}
          options={{
            headerShown: false,
            tabBarLabel: "Lịch Sử",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="history" color={color} size={26} />
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
