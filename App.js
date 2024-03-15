import AppNavigation from "./src/navigation";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./src/screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import store from "./src/redux/store/store";  
import { Provider } from "react-redux";
import RegisterForm from "./src/screens/Register";
import OrderDetail from "./src/screens/BottomTabs/OrderDetail";
import PackageTab from "./src/screens/BottomTabs/PackageTab";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AppNavigation" component={AppNavigation} />
        <Stack.Screen name="Register" component={RegisterForm} />
        <Stack.Screen name="OrderDetail" component={OrderDetail} />
        <Stack.Screen name="Package" component={PackageTab} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

