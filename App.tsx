import React from "react";
import { convex } from "./src/api/convex";
import { ConvexProvider } from "convex/react";
import RootNavigator from "./src/navigation/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./src/design/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <ConvexProvider client={convex}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ConvexProvider>
    </ThemeProvider>
  );
}
