import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/MyBusiness";
import TodoScreen from "../screens/TodoScreen";
import FarmMngScreen from "../screens/FarmMngScreen";
import DiscoverScreen from "../screens/DiscoverScreen"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, images } from '../constants'
import MyBusiness from "../screens/MyBusiness";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    position: 'absolute',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopColor: '#fff',
    borderTopWidth: 5,
    height: 66,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },

}

const StackNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="home" size={34} color={COLORS.primary} />
            ) : (
              <AntDesign name="home" size={29} color="#898A8D" />
            ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Feather name="trello" size={36} color={COLORS.primary} />
            ) : (
              <Feather name="trello" size={31} color="#898A8D" />
            ),
        }}
      />

      {/*<Tab.Screen
        name="Farm"
        component={FarmMngScreen}
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons name="leaf-circle" size={47} color={COLORS.primary} />
            ) : (
              <MaterialCommunityIcons name="leaf-circle-outline" size={43} color="#898A8D" />
            ),
        }}

      />*/}

      <Tab.Screen
        name="My Task"
        component={TodoScreen}
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome5 name="tasks" size={32} color={COLORS.primary} />
            ) : (
              <FontAwesome5 name="tasks" size={27} color="#898A8D" />
            ),
        }}
      />

      <Tab.Screen
        name="MyBusiness"
        component={MyBusiness}
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={34} color={COLORS.primary} />
            ) : (
              <Ionicons name="person-outline" size={29} color="#898A8D" />
            ),
        }}
      />
    </Tab.Navigator>
  )
}

export default StackNavigator;
