import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import { useAuthStore } from "../store/authStore";
import { getErrorMessage } from "../api/errors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthStack";
import { PrimaryButton, PrimaryInput } from "../components";
import { Mail, Lock, User } from "lucide-react-native";

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "SignUp"
>;

interface Props {
  navigation: SignUpScreenNavigationProp;
}

export const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("");
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
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            disabled={isLoading}
          >
            <Text style={styles.backText}>{"← Back"}</Text>
          </TouchableOpacity>

          {/* Brand */}
          <View style={styles.header}>
            <Text style={styles.brand}>LockedIn</Text>
            <Text style={styles.headline}>
              JOIN THE{"\n"}
              <Text style={styles.headlineAccent}>ROSTER.</Text>
            </Text>
            <Text style={styles.subtitle}>
              Enter your details to create an account and start your journey.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <PrimaryInput
              icon={User}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              disabled={isLoading}
            />
            <PrimaryInput
              icon={Mail}
              placeholder="Email Address"
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
            <View style={styles.ctaContainer}>
              <PrimaryButton disabled={isLoading} onPress={handleSignUp}>
                <PrimaryButton.Text>
                  {isLoading ? "Loading..." : "Create Account"}
                </PrimaryButton.Text>
              </PrimaryButton>
            </View>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or sign up with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Sign In Redirect */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignIn")}
                disabled={isLoading}
              >
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131313",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingTop: 56,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 24,
  },
  backText: {
    fontFamily: "Lexend_500Medium",
    color: "#c2cab0",
    fontSize: 14,
  },
  header: {
    marginBottom: 40,
  },
  brand: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 24,
    color: "#a3e635",
    marginBottom: 12,
  },
  headline: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 36,
    color: "#e5e2e1",
    lineHeight: 42,
    marginBottom: 12,
  },
  headlineAccent: {
    color: "#a3e635",
  },
  subtitle: {
    fontFamily: "Lexend_400Regular",
    fontSize: 14,
    color: "#8c947c",
    lineHeight: 20,
  },
  form: {
    flex: 1,
  },
  ctaContainer: {
    marginTop: 8,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#2a2a2a",
  },
  dividerText: {
    fontFamily: "Lexend_400Regular",
    color: "#8c947c",
    marginHorizontal: 12,
    fontSize: 13,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  footerText: {
    fontFamily: "Lexend_400Regular",
    color: "#e5e2e1",
    fontSize: 14,
  },
  signInLink: {
    fontFamily: "Lexend_700Bold",
    color: "#a3e635",
    fontSize: 14,
  },
});
