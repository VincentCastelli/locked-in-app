import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuthStore } from "../store/authStore";
import { getErrorMessage } from "../api/errors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthStack";
import { PrimaryButton } from "../components";

type SignInScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "SignIn"
>;

interface Props {
  navigation: SignInScreenNavigationProp;
}

export const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const signIn = useAuthStore((state) => state.signIn);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert("Error", getErrorMessage(error, "Failed to sign in"));
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
          {/* Username and Password */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </View>
            {/* Forgot Password */}
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
              disabled={isLoading}
            >
              <Text style={styles.forgotPassword}>Forgot Password ?</Text>
            </TouchableOpacity>
            {/* Sign In */}
            <PrimaryButton disabled={isLoading} onPress={handleSignIn}>
              <PrimaryButton.Text>
                {isLoading ? "Loading..." : "Sign In"}
              </PrimaryButton.Text>
            </PrimaryButton>
            {/* Create Account */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUp")}
                disabled={isLoading}
              >
                <Text style={styles.signUpLink}>Sign Up here</Text>
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
    height: 110,
    alignSelf: "center",
    marginLeft: 30,
  },
  tagline: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  forgotPassword: {
    color: "#fff",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
