import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeTab from '../screens/BottomTabs/HomeTab';
import PackageTab from '../screens/BottomTabs/PackageTab';
import HistoryTab from '../screens/BottomTabs/HistoryTab';
import ProfileTab from '../screens/BottomTabs/ProfileTab';

const Tab = createBottomTabNavigator();

export default function AppNavigation() {

      function MyTabs() {
        return (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeTab} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}/>

            <Tab.Screen name="Packgae" component={PackageTab} options={{
          tabBarLabel: 'Package',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="package" color={color} size={26} />
          ),
        }}/>

            <Tab.Screen name="History" component={HistoryTab}  options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" color={color} size={26} />
          ),
        }}/>

            <Tab.Screen name="Profile" component={ProfileTab}  options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}/>
          </Tab.Navigator>
        );
      }

  return (
    <NavigationContainer>
        <MyTabs />
    </NavigationContainer>
  )
}