import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PlaceholderScreen } from "../screens/PlaceholderScreen";

const Tab = createBottomTabNavigator();

export default function MainAppStack() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Profile" component={PlaceholderScreen} />
      <Tab.Screen name="Teams" component={PlaceholderScreen} />
      <Tab.Screen name="Stats" component={PlaceholderScreen} />
    </Tab.Navigator>
  );
}
