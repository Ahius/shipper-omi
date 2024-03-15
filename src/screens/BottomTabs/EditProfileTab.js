import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import { images } from "../../../constants";

export default function EditProfileTab() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={images.shipperImg}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 999 }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            Shipper Name
          </Text>
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={24} />
          <TextInput
            placeholder="Họ và Tên"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" size={24} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <Icon name="map-marker-radius" size={24} />
          <TextInput
            placeholder="Khu vực"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" size={24} />
          <TextInput
            placeholder="Số điện thoại"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={() => {}}>
            <Text style={styles.panelButtonTitle}>Thay đổi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    commandButton: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: "#737170",
      alignItems: "center",
      marginTop: 10,
    },

  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#737170",
    paddingBottom: 10,
  },

  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },

  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
  },
});
