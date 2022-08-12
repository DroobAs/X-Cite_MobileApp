import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import Cart from "./components/Cart/Cart";
import Profile from "./components/Profile/Profile";
import Search from "./components/Search/Search";
import Apple from "./components/Apple/Apple";
import Iphone from "./components/Apple/Iphone/Iphone";
import ProductSearch from "./components/Search/ProductSearch";
import Login from "./components/Profile/Login";
import SingUp from "./components/Profile/SingUp";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { AuthContextProvider } from "./context/AuthContext";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home2" component={Home} />
      <Stack.Screen
        name="Apple"
        component={Apple}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Iphone"
        component={Iphone}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search2" component={Search} />
      <Stack.Screen
        name="ProductSearch"
        component={ProductSearch}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile2" component={Profile} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SingUp"
        component={SingUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              height: 60,
              position: "absolute",
              bottom: 16,
              right: 16,
              left: 16,
              borderRadius: 25,
              backgroundColor: "#000",
              paddingBottom: 5,
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarIcon: ({ size, color }) => (
                <Icon name={"home"} color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Categories"
            component={Categories}
            options={{
              tabBarIcon: ({ size, color }) => (
                <Icon name={"list"} color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Cart"
            component={Cart}
            options={{
              tabBarIcon: ({ size, color }) => (
                <Icon name={"shopping-cart"} color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchStack}
            options={{
              tabBarIcon: ({ size, color }) => (
                <Icon name={"search"} color={color} size={size} />
              ),
              tabBarStyle: { display: "none" },
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileStack}
            options={({ route }) => ({
              tabBarIcon: ({ size, color }) => (
                <Icon name={"person"} color={color} size={size} />
              ),
              tabBarStyle: {
                display: tabBarVisibility(route),
                height: 60,
                position: "absolute",
                bottom: 16,
                right: 16,
                left: 16,
                borderRadius: 25,
                backgroundColor: "#000",
                paddingBottom: 5,
              },
            })}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}

const tabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) 
  if (routeName === "Login" || routeName === "SingUp") {
    return "none"
  }
};
