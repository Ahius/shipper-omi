import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { RadioButton } from "react-native-paper";

import { images } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { profileUser, updateProfile } from "../../redux/reducers/userSlice";
import { fetchArea } from "../../redux/reducers/areaSlice";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

export default function EditProfileTab() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const shipperId = useSelector((state) => state.auth.shipperId);
  const shipperData = useSelector((state) => state.user.data);
  const areaData = useSelector((state) => state.area);

  const [profileUpdate, setProfileUpdate] = useState({
    Name: shipperData.Name,
    Email: shipperData.Email,
    Phone: shipperData.Phone,
    Gender: shipperData.Gender,
    Status: shipperData.Status,
    AreaId: shipperData.AreaId,
    CCCD: shipperData.CCCD,
  });

  const [selectedGender, setSelectedGender] = useState(shipperData.Gender); // State to hold selected gender

  const handleGenderChange = (value) => {
    setSelectedGender(value); // Update selected gender when radio button is changed
    handleTextInputChange("Gender", value); // Also update the profileUpdate state
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (shipperId) {
          setIsLoading(true);
          await dispatch(profileUser({ ShipperId: shipperId }));
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    fetchData();
  }, [dispatch, shipperId]);

  useEffect(() => {
    dispatch(fetchArea());
  }, []);

  const handleTextInputChange = (name, value) => {
    setProfileUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async () => {
    // Validate email format
    const emailRegex = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/;
    if (!emailRegex.test(profileUpdate.Email)) {
      setNotification("Email phải có định dạng @gmail.com");
      return;
    }

    // Validate phone number length
    const phoneNumberLength = profileUpdate.Phone.length;
    if (phoneNumberLength !== 10 && phoneNumberLength !== 12) {
      setNotification("Số điện thoại phải có 10 hoặc 12 số");
      return;
    }

    console.log("Updated: ", profileUpdate);
    try {
      const response = await dispatch(
        updateProfile({ ShipperId: shipperId, profileUpdate: profileUpdate })
      );

      if (response && response.payload) {
        if (response.payload === "Shipper updated successfully") {
          setError(null);

          navigation.navigate("Login");

          console.log("Profile updated successfully:", response.payload);
        } else {
          setError("Đã xảy ra lỗi trong quá trình chỉnh sửa 1.");
        }
      } else {
        setError("Đã xảy ra lỗi trong quá trình chỉnh sửa 2.");
      }
    } catch (error) {
      setError("Đã xảy ra lỗi trong quá trình chỉnh sửa 3.");
      console.error("Error occurred while updating profile:", error);
    }
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <StatusBar style="auto" />
        <Text>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  if (!shipperData) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <StatusBar style="auto" />
        <Text>No user data found</Text>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {notification && (
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationText}>{notification}</Text>
        </View>
      )}

      <View style={{ flex: 1 }}>
        <View style={{ margin: 20 }}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => {}}>
              <View
                style={{
                  height: 90,
                  width: 90,
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
                  ></View>
                </ImageBackground>
              </View>
            </TouchableOpacity>

            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
              {shipperData.Name}
            </Text>
          </View>
          <View style={styles.action}>
            <FontAwesome name="user-o" size={24} />
            <TextInput
              placeholder="Họ và Tên"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInput}
              value={profileUpdate.Name}
              onChangeText={(value) => handleTextInputChange("Name", value)}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="envelope-o" size={24} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInput}
              value={profileUpdate.Email}
              onChangeText={(value) => handleTextInputChange("Email", value)}
            />
          </View>
          <View style={styles.action}>
            <Feather name="phone" size={24} />
            <TextInput
              placeholder="Số điện thoại"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInput}
              value={profileUpdate.Phone}
              keyboardType="numeric"
              onChangeText={(value) => handleTextInputChange("Phone", value)}
            />
          </View>
          <View style={styles.genderContainer}>
            <Icon name="human-male-female" size={24} />
            <Text style={{ marginRight: 10 }}>Giới tính</Text>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => handleGenderChange("Nam")}
            >
              <RadioButton
                value="Male"
                status={selectedGender === "Male" ? "checked" : "unchecked"}
                onPress={() => handleGenderChange("Male")}
              />
              <Text>Nam</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => handleGenderChange("Female")}
            >
              <RadioButton
                value="Female"
                status={selectedGender === "Female" ? "checked" : "unchecked"}
                onPress={() => handleGenderChange("Female")}
              />
              <Text>Nữ</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.action}>
            <Icon
              name="map-marker-radius"
              size={24}
              style={{ marginTop: 15 }}
            />
            <Picker
              selectedValue={profileUpdate.AreaId}
              style={styles.textInput}
              onValueChange={(itemValue) =>
                handleTextInputChange("AreaId", itemValue)
              }
            >
              {areaData.data.map((area) => (
                <Picker.Item
                  key={area.AreaId}
                  label={area.AreaName}
                  value={area.AreaId}
                />
              ))}
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.commandButton}
            onPress={handleProfileUpdate}
          >
            <Text style={styles.panelButtonTitle}>Thay đổi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#737170",
    alignItems: "center",
  },

  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#737170",
    paddingBottom: 10,
  },

  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },

  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
  },

  genderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#737170",
    paddingBottom: 15,
  },

  notificationContainer: {
    backgroundColor: '#ff0000', 
    padding: 2, 
    borderRadius: 5, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  notificationText: {
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: 'bold', 
  },
});
