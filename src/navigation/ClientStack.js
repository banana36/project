import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import PtProfileScreen from "@screens/PtProfileScreen";
import ViewDietScreen from "@screens/ViewDietScreen";
import WorkoutScreen from "@screens/WorkoutScreen";
import React from "react";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AddPostScreen from "../screens/AddPostScreen";
import ChatScreen from "../screens/ChatScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchPtScreen from "../screens/SearchPtScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={{
        title: "",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#2e64e515",
          shadowColor: "#2e64e515",
          elevation: 0
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        )
      }}
    />
  </Stack.Navigator>
);

const MessageStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({ route }) => ({
        title: route.params.userName,
        headerBackTitleVisible: false
      })}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerShown: false
      }}
    />
  </Stack.Navigator>
);

const DietStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ViewDiet"
      component={ViewDietScreen}
      options={{
        headerShown: false
      }}
    />
  </Stack.Navigator>
);

const SearchPtStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SearchPT"
      component={SearchPtScreen}
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="PTProfile"
      component={PtProfileScreen}
      options={{
        headerShown: false
      }}
    />
  </Stack.Navigator>
);

const WorkoutStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Workout"
      component={WorkoutScreen}
      options={{
        headerShown: false
      }}
    />
  </Stack.Navigator>
);

const getActiveRouteName = (route) => {
  if (route?.state) {
    return getActiveRouteName(route?.state?.routes?.[route?.state?.index]);
  }
  return route?.name;
};

const ClientStack = () => {
  const getTabBarVisibility = (route) => {
    const routeName = getActiveRouteName(route);

    if (["SearchPT", "Home", "Dashboard", "Ricerca"].includes(routeName)) {
      return true;
    }
    return false;
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#2e64e5"
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={HomeStack}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          )
        })}
      />
      <Tab.Screen
        name="Dieta"
        component={DietStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fast-food-outline" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Allenamenti"
        component={WorkoutStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fitness-outline" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Ricerca"
        component={SearchPtStack}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          )
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default ClientStack;
