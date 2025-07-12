import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import ProfileScreen from '../screens/main/ProfileScreen';
// import TeamsScreen from '../screens/main/TeamsScreen';
// import StatsScreen from '../screens/main/StatsScreen';

const Tab = createBottomTabNavigator();

export default function MainAppStack() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      Screens
      {/* 
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Teams" component={TeamsScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} /> 
      */}
    </Tab.Navigator>
  );
}
