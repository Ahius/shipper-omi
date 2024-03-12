import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../../constants'
import { StatusBar } from 'expo-status-bar'

export default function ProfileTab() {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#fff"
    }}>
      <StatusBar style="auto" />
      <View style={{width: "100%"}}> 

      <Image source={images.cover}
      resizeMode='cover'
      style={{height: 228,
        width: "100%"
      }}
      />

      </View>

      <View style={{flex: 1, alignItems: "center"}}>

        <Image source={images.profile}
        resizeMode='contain'
        style={{
          height: 155,
          width: 155,
          borderRadius: 999,
          borderColor: "#ccc",
          borderWidth: 2,
          marginTop: -90
        }}
        />
          <Text style={{marginVertical: 8, fontWeight: "bold"}}>Shipper Name</Text>
      </View>
    </SafeAreaView>
  )
}