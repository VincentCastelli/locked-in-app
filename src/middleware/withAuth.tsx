import React, { useEffect, ComponentType } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";

/**
 * Higher-order component that protects routes from unauthenticated access
 * Redirects to SignIn screen if user is not authenticated
 */
export function withAuth<P extends object>(Component: ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated } = useAuthStore();
    const navigation = useNavigation<NavigationProp<any>>();

    useEffect(() => {
      if (!isAuthenticated) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Auth" }],
        });
      }
    }, [isAuthenticated, navigation]);

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
