import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import ClientProfileScreen from "@screens/ClientProfileScreen";
import MyClientScreen from "@screens/MyClientScreen";
import PtCalendarScreen from "@screens/PtCalendarScreen";
import React from "react";
import { View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AddPostScreen from "../screens/AddPostScreen";
import ChatScreen from "../screens/ChatScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="RN Social"
      component={HomeScreen}
      options={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#2e64e5",
          fontFamily: "Kufam-SemiBoldItalic",
          fontSize: 18
        },
        headerStyle: {
          shadowColor: "#fff",
          elevation: 0
        },
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <FontAwesome5.Button
              name="plus"
              size={22}
              backgroundColor="#fff"
              color="#2e64e5"
              onPress={() => navigation.navigate("AddPost")}
            />
          </View>
        )
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
    <Stack.Screen
      name="HomeProfile"
      component={ProfileScreen}
      options={{
        title: "",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: "#fff",
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

const MessageStack = ({ navigation }) => (
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

const ProfileStack = ({ navigation }) => (
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
        headerTitle: "Edit Profile",
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: "#fff",
          elevation: 0
        }
      }}
    />
  </Stack.Navigator>
);

const ClientStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MyClient"
      component={MyClientScreen}
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="ClientProfile"
      component={ClientProfileScreen}
      options={{
        headerShown: false
      }}
    />
  </Stack.Navigator>
);

const CalendarStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="PtCalendar"
      component={PtCalendarScreen}
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

const PTStack = () => {
  const getTabBarVisibility = (route) => {
    const routeName = getActiveRouteName(route);
    console.log("DEBUG::  ~ routeName", routeName);

    if (["Clienti", "MyClient"]?.includes(routeName)) {
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
        name="Home"
        component={FeedStack}
        options={({ route }) => ({
          tabBarLabel: "Home",
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          )
        })}
      />
      {/* <Tab.Screen
        name="Messages"
        component={MessageStack}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          // tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              color={color}
              size={size}
            />
          )
        })}
      /> */}
      <Tab.Screen
        name="Clienti"
        component={ClientStack}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          )
        })}
      />
      <Tab.Screen
        name="Calendario"
        component={CalendarStack}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Notifiche"
        component={ProfileStack}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default PTStack;
