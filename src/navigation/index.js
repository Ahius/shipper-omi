import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeTab from "../screens/BottomTabs/HomeTab";
import PackageTab from "../screens/BottomTabs/PackageTab";
import HistoryTab from "../screens/BottomTabs/HistoryTab";
import ProfileTab from "../screens/BottomTabs/ProfileTab";

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeTab}
          options={{
            headerShown: false,
            tabBarLabel: "Home",
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
            tabBarLabel: "Package",
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
            tabBarLabel: "History",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="history" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileTab}
          options={{
            headerShown: false,
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (

      <MyTabs />

  );
}
