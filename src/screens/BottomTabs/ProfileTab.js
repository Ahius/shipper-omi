import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../../constants";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { profileUser } from "../../redux/reducers/userSlice";
import { Caption, Title } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
import { logout } from "../../redux/reducers/authSlice";

export default function ProfileTab({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const shipperId = useSelector((state) => state.auth.shipperId);
  const shipperData = useSelector((state) => state.user.data);

  const handleLogout = () => {
    dispatch(logout());
    console.log('Logged out successfully');
    navigation.navigate('Login');
  };

  const genderMapping = {
    Male: 'Nam',
    Female: 'Nữ',
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="account-edit"
          size={25}
          onPress={() => navigation.navigate("EditProfile")}
          title="Edit"
          color="#007AFF"
        />
      ),
    });
  }, [navigation]);

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f3f2f7" }}>
      <View style={styles.imageWrapper}>
        <StatusBar style="auto" />

        <View style={{ alignItems: "center" }}>
          <Image
            source={images.shipperImg}
            resizeMode="contain"
            style={{
              height: 90,
              width: 90,
              borderRadius: 999,
              borderColor: "#ccc",
              borderWidth: 2,
              marginTop: -30,
            }}
          />
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              {shipperData.Name}
            </Text>
            <Caption style={styles.caption}>{shipperData.Email}</Caption>
          </View>
        </View>
      </View>

      {shipperData && (
        <View style={{}}>
          <View style={{}}>
            <View style={{ alignItems: "center" }}>
              {/* <Text style={{ fontWeight: "bold", fontSize: 30 }}>{shipperData.Name}</Text>
              <Caption style={styles.caption}>{shipperData.Email}</Caption> */}
            </View>

            <View style={styles.infoBoxWrapper}>
              <View style={styles.infoBox}>
                <Title>{shipperData.Balance}</Title>
                <Caption style={styles.caption}> Điểm tín dụng</Caption>
              </View>
            </View>
            <View style={{}}>
              <View style={styles.userInfoSection}>
                <View style={styles.row}>
                  <Icon name="phone" size={25} />
                  <Text style={styles.menuItemText}>{shipperData.Phone}</Text>
                </View>

                <View style={styles.row}>
                  <Icon name="human-male-female" size={25} />
                  <Text style={styles.menuItemText}> {genderMapping[shipperData.Gender]}</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="map-marker-radius" size={25} />
                  <Text style={styles.menuItemText}>
                    {" "}
                    {shipperData.AreaName}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      <View style={styles.menuWrapper}>
        <View style={styles.menuItem}>
          <Icon name="credit-card" size={25} />
          <Text style={styles.menuItemText}>Payment</Text>
        </View>

        <View style={styles.menuItem}>
          <Icon name="account-check-outline" size={25} />
          <Text style={styles.menuItemText}>Support</Text>
        </View>

        <View style={styles.menuItem}>
          <IonIcon name="settings-outline" size={25} />
          <Text style={styles.menuItemText}>Settings</Text>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  caption: {
    fontSize: 20,
    fontWeight: "500",
  },

  userInfoSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "95%",
    margin: 10,
  },

  row: {
    flexDirection: "row",
    padding: 10
  },

  userInfoText: {
    marginLeft: 10,
  },

  infoBoxWrapper: {
    margin: 10,
    borderColor: "#dddddd",
    borderRadius: 10,
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  infoBox: {
    alignItems: "center",
    justifyContent: "center",
  },

  menuWrapper: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "95%",
    margin: 10,
  },

  menuItem: {
    flexDirection: "row",
    padding: 10,
    marginLeft: 10,
  },

  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },

  imageWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 150,
    width: "95%",
    margin: 10,
  },

  logoutButton: {
    backgroundColor: '#ff0000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    width: "50%"
  },

  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: "center"
  },
});
