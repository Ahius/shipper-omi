import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { profileUser } from "../../redux/reducers/userSlice";
import { FetchshipperOrders } from "../../redux/reducers/shipperHistorySlice";

export default function HomeTab() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("Success");

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const shipperId = useSelector((state) => state.auth.shipperId);
  const shipperData = useSelector((state) => state.user.data);
  const shipperOrders = useSelector((state) => state.shipperOder.data);

  useEffect(() => {
    console.log(selectedStatus);
    if (shipperId !== null) {
      dispatch(
        FetchshipperOrders({ ShipperId: shipperId, status: selectedStatus })
      );
    }
  }, [dispatch, shipperId, selectedStatus]);

  console.log("data his", shipperOrders);

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

  const handlePickUp = () => {
    navigation.navigate("History");
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

  if (!Array.isArray(shipperOrders)) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ alignItems: "center", marginVertical: 40 }}>
          <Text style={[styles.themeText, { color: "#fff" }]}>Xin chào</Text>
          <Text style={[styles.themeText, { color: "#fff" }]}>
            {" "}
            {shipperData.Name}
          </Text>
          <Text style={{ color: "#fff" }}>
            Bắt đầu một ngày giao hàng tuyệt vời
          </Text>
        </View>
      </View>
      <View style={styles.center}>
        <Text style={styles.themeText}>Đơn giao hàng của bạn</Text>
        <View style={styles.orderContainer}>
          <TouchableOpacity onPress={() => handlePickUp()}>
            <View style={styles.orderBox}>
              <View style={styles.orderContent}>
                <Icon name="shipping-fast" size={25} />
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Nhận đơn hàng
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.themeText}>Hoạt Động gần đây</Text>
        </View>

        <View style={[styles.trackingBox, { marginTop: 20 }]}>
          <View style={styles.historyContainer}>
            <Icon name="shipping-fast" size={25}>
              <Text style={styles.trackingText}>
                {" "}
                Lịch sử đơn hàng
              </Text>
            </Icon>
          </View>
          <ScrollView>
            {shipperOrders.length > 0 ? (
              shipperOrders.map((order) => (
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      textAlign: "center",
                      margin: 10,
                      color: "#62BEB0",
                    }}
                  >
                    Tòa nhà: {order.BuildingName}
                  </Text>
                  <Text style={styles.shippingOrderText}>
                    Trạng thái thanh toán: {order.PayingStatus}
                  </Text>
                  <Text style={styles.shippingOrderText}>
                    Hoa hồng:{" "}
                    {order.ShippingPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Text>
                  <Text style={styles.shippingOrderText}>
                    Trạng thái:{" "}
                    {order.Status === "Canceled" && (
                      <Text style={styles.canceledStatus}>{order.Status}</Text>
                    )}
                    {order.Status === "Success" && (
                      <Text style={styles.successStatus}>{order.Status}</Text>
                    )}
                    {order.Status === "Pending" && (
                      <Text style={styles.pendingStatus}>{order.Status}</Text>
                    )}
                  </Text>

                  <Text
                    style={{
                      fontSize: 11,
                      color: "grey",
                      marginTop: 4,
                      marginLeft: 12,
                      textAlign: "left",
                    }}
                  >
                    Thời gian:{" "}
                    {new Date(order.OrderDate).toLocaleDateString("en-CA")}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.noOrderText}>Hiện chưa có đơn hàng nào</Text>
            )}
          </ScrollView>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f2f7",
  },

  header: {
    backgroundColor: "#125c25",
  },

  themeText: {
    fontWeight: "bold",
    fontSize: 24,
  },

  center: {
    flex: 1,
    alignItems: "center",
  },

  orderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },

  orderBox: {
    backgroundColor: "#f8e0af",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    width: 160,
    height: 120,
    marginHorizontal: 20,
    marginBottom: 30,
  },

  orderContent: {
    alignItems: "center",
    marginVertical: 30,
  },

  trackingBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    width: 360,
    height: 300,
  },

  trackingContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    borderRadius: 8,
    backgroundColor: "rgba(180,180,180,0.5)",
    width: 320,
    height: 100,
    marginVertical: 20,
    marginHorizontal: 20,
  },

  trackingText: {
    fontSize: 15,
    color: "black",
  },

  footer: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },

  logoutButton: {
    backgroundColor: "#ff0000",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  shippingOrderText: {
    paddingLeft: 10,
    margin: 2
  },

  historyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 15,
    marginTop: 20,
  },
});
