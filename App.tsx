import React from "react";
import { ConvexProvider } from "convex/react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { convex } from "./src/api/convex";

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ConvexProvider>
  );
}
