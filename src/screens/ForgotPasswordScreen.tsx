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
import { resetPasswordApi } from "../api/auth";
import { getErrorMessage } from "../api/errors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthStack";
import { PrimaryButton, PrimaryInput } from "../components";
import { Mail, Lock } from "lucide-react-native";

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "ForgotPassword"
>;

interface Props {
  navigation: ForgotPasswordScreenNavigationProp;
}

export const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    if (!email || !newPassword) {
      Alert.alert("Error", "Please enter your email and new password");
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      await resetPasswordApi(email, newPassword);
      Alert.alert("Success", "Your password has been reset", [
        {
          text: "OK",
          onPress: () => navigation.navigate("SignIn"),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", getErrorMessage(error, "Failed to reset password"));
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
          {/* Email & New Password */}
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
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              disabled={isLoading}
            />
            {/* Submit */}
            <PrimaryButton disabled={isLoading} onPress={handleReset}>
              <PrimaryButton.Text>
                {isLoading ? "Loading..." : "Reset"}
              </PrimaryButton.Text>
            </PrimaryButton>
            {/* Sign Up Redirect */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have any account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUp")}
                disabled={isLoading}
              >
                <Text style={styles.signUpLink}>Sign up here</Text>
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
    color: "#fff",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  footerText: {
    color: "#fff",
    fontSize: 14,
  },
  signUpLink: {
    color: "#00D26A",
    fontSize: 14,
    fontWeight: "bold",
  },
});
