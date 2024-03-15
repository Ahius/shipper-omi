import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../../constants";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { profileUser } from "../../redux/reducers/userSlice";
import { Caption, Title } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcon from "react-native-vector-icons/Ionicons";

export default function ProfileTab({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const shipperId = useSelector((state) => state.auth.shipperId);
  const shipperData = useSelector((state) => state.user.data);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="account-edit" size={25}
          onPress={() => navigation.navigate('EditProfile')}
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
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <StatusBar style="auto" />
        <Text>Loading...</Text>
      </SafeAreaView>
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="auto" />
      <View style={{ width: "100%",position: 'absolute' }}>
        <Image
          source={images.cover}
          resizeMode="cover"
          style={{ height: 228, width: "100%" }}
        />
      </View>

      <View style={{ flex: 1, alignItems: "center"}}>
        <Image
          source={images.shipperImg}
          resizeMode="contain"
          style={{
            height: 155,
            width: 155,
            borderRadius: 999,
            borderColor: "#ccc",
            borderWidth: 2,
            marginTop: 90,
          }}
        />
      </View>
      {shipperData && (
        <View style={styles.userInfoSection}>
          <View style={{ alignItems: "center"}}>
            <Text style={{ marginVertical: 8, fontWeight: "bold" }}>
              {shipperData.Name}
            </Text>
            <Caption style={styles.caption}>{shipperData.Email}</Caption>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="phone" size={20} />
              <Text style={styles.userInfoText}>{shipperData.Phone}</Text>
            </View>

            <View style={styles.row}>
              <Icon name="human-male-female" size={20} />
              <Text style={styles.userInfoText}> {shipperData.Gender}</Text>
            </View>

            <View style={styles.row}>
              <Icon name="map-marker-radius" size={20} />
              <Text style={styles.userInfoText}> {shipperData.AreaName}</Text>
            </View>
          </View>

          <View style={styles.infoBoxWrapper}>
              <View style={styles.infoBox}>
                <Title>{shipperData.Balance}</Title>
                <Caption> Điểm tín dụng</Caption>
              </View>
            </View>

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
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },

  userInfoSection: {
   marginTop: 10,
   marginLeft: 10
    
  },

  row: {
    flexDirection: "row",
    marginBottom: 10,
  },

  userInfoText: {
    marginLeft: 10,
  },

  infoBoxWrapper: {
    marginVertical: 10,
    marginRight: 10,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    width: "98%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  infoBox: {
    alignItems: "center",
    justifyContent: "center",
  },

  menuItem: {
    flexDirection: "row",
    paddingVertical: 25,
    
  },

  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
