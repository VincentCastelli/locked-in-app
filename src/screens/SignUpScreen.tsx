import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useAuthStore } from "../store/authStore";
import { getErrorMessage } from "../api/errors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthStack";
import { PrimaryButton, PrimaryInput } from "../components";
import { Mail, Lock } from "lucide-react-native";

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "SignUp"
>;

interface Props {
  navigation: SignUpScreenNavigationProp;
}

export const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const signUp = useAuthStore((state) => state.signUp);

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password);
    } catch (error) {
      Alert.alert("Error", getErrorMessage(error, "Failed to sign up"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/hero-bg.png")}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.content}
        >
          {/* Logo */}
          <View style={styles.header}>
            <Image
              source={require("../../assets/lockedin-logo-dark.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.tagline}>
              Build your game. Showcase the journey.
            </Text>
          </View>
          {/* Email & Password */}
          <View style={{ flex: 1 }}>
            <PrimaryInput
              icon={Mail}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              disabled={isLoading}
            />
            <PrimaryInput
              icon={Lock}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              disabled={isLoading}
            />
            {/* Submit */}
            <PrimaryButton disabled={isLoading} onPress={handleSignUp}>
              <PrimaryButton.Text>
                {isLoading ? "Loading..." : "Sign Up"}
              </PrimaryButton.Text>
            </PrimaryButton>
            {/* Sign In Redirect */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignIn")}
                disabled={isLoading}
              >
                <Text style={styles.signInLink}>Sign In here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(6, 82, 52, 0.65)",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 140,
  },
  logo: {
    width: 410,
    height: 120,
    alignSelf: "center",
    marginLeft: 30,
  },
  tagline: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  footerText: {
    color: "white",
    fontSize: 14,
  },
  signInLink: {
    color: "#00D26A",
    fontSize: 14,
    fontWeight: "bold",
  },
});
