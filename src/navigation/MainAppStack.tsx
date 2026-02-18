import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PlaceholderScreen } from "../screens/PlaceholderScreen";
import { House, Search, Users, ChartBar } from "lucide-react-native";

const Tab = createBottomTabNavigator();

export default function MainAppStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#00D26A",
      }}
    >
      <Tab.Screen
        name="Home"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Discover"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Teams"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Stats"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ChartBar color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
