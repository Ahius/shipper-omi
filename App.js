import AppNavigation from "./src/navigation";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./src/screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import store from "./src/redux/store/store";  
import { Provider } from "react-redux";
import RegisterForm from "./src/screens/Register";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AppNavigation" component={AppNavigation} />
        <Stack.Screen name="Register" component={RegisterForm} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

