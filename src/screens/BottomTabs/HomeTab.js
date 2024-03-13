import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/Feather";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../../redux/reducers/authSlice";


export default function HomeTab() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleLogout = () => {
    dispatch(logout());
    console.log('Logged out successfully');
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ position: 'absolute', top: 40, right: 10 }}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", marginVertical: 40 }}>
          <Text style={[styles.themeText, { color: "#fff" }]}>Track your shipment</Text>
          <Text style={{ color: "#fff" }}>Keep track of your goods with us</Text>
          <View style={styles.searchBox}>
            <TextInput
              placeholder="Number Tracking"
              clearButtonMode="always"
              style={styles.searchBar}
            />
            <View style={styles.searchIcon}>
              <Icon name="search" size={20} color="#000" />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.center}>
        <Text style={styles.themeText}>Order Service</Text>
        <View style={styles.orderContainer}>
          <View style={styles.orderBox}>
            <View style={styles.orderContent}>
              <Icon name="shipping-fast" size={25} />
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Pick Up Package
              </Text>
            </View>
          </View>

          <View style={[styles.orderBox]}>
            <View style={styles.orderContent}>
              <Icon2 name="package" size={25} />
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Shipping Package
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.themeText}>Recently Tracking</Text>
        </View>

        <View style={[styles.trackingBox, { marginTop: 20 }]}>
          <View style={styles.orderContainer}>
            <Icon name="shipping-fast" size={25} color={"#fff"}>
              <Text style={styles.trackingText}>
                {" "}
                Your item is being shipped
              </Text>
            </Icon>
          </View>
          <View style={styles.trackingContent}>
            <View>

              <Text style={{ fontWeight: "bold", color: "#fff" }} >Track Number</Text>
              <Text style={styles.trackingText}>232-444-230</Text>
            </View>

            <View>

              <Text style={{ fontWeight: "bold", color: "#fff" }}>Address</Text>
              <Text style={styles.trackingText}>HCM, Vietnam</Text>
            </View>
          </View>
        </View>

      </View>


      {/* <View style={styles.footer}>
        <View style={styles.navigateBar}>
        <Icon name="home" size={30}/>
        <Icon2 name="package" size={30}/>
        <Icon3 name="sticker-text" size={30}/>
        <Icon name="user" size={30}/>
        </View>
      </View> */}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    backgroundColor: "#125c25",
  },

  themeText: {
    fontWeight: "bold",
    fontSize: 24,
  },

  searchBox: {
    width: 360,
    position: "relative",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 10,
  },

  searchBar: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flex: 1,
  },

  searchIcon: {
    position: "absolute",
    right: 10,
  },

  center: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
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
    marginBottom: 30
  },

  orderContent: {
    alignItems: "center",
    marginVertical: 30,
  },

  trackingBox: {
    backgroundColor: "#125c25",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    width: 360,
    height: 200,
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
    marginHorizontal: 20
  },

  trackingText: {
    fontSize: 15,
    color: "#fff"
  },

  footer: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20
  },

  logoutButton: {
    backgroundColor: '#ff0000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },


  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

});
