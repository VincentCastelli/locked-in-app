import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const PlaceholderScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Coming Soon</Text>
    </View>
  );
};

export default function MainAppStack() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Profile" component={PlaceholderScreen} />
      <Tab.Screen name="Teams" component={PlaceholderScreen} />
      <Tab.Screen name="Stats" component={PlaceholderScreen} />
    </Tab.Navigator>
  );
}
