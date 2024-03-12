import AppNavigation from "./src/navigation";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./src/screens/Login";
import { NavigationContainer } from "@react-navigation/native";


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AppNavigation" component={AppNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

