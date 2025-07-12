import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useUserStore } from "../store/userStore";
import AuthStack from "./AuthStack";
import MainAppStack from "./MainAppStack";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const user = useUserStore((state) => state.user);

  return user ? <MainAppStack /> : <AuthStack />;
}
