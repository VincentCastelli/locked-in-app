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
        tabBarActiveTintColor: "#a3e635",
        tabBarInactiveTintColor: "#8c947c",
        tabBarStyle: {
          backgroundColor: "#131313",
          borderTopColor: "#2a2a2a",
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Tracker"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ChartBar color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Teams"
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
