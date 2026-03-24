import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuthStore } from "../store/authStore";
import { getErrorMessage } from "../api/errors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthStack";
import { PrimaryButton, PrimaryInput } from "../components";
import { Mail, Lock } from "lucide-react-native";

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
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Brand */}
          <View style={styles.header}>
            <Text style={styles.brand}>LockedIn</Text>
            <Text style={styles.headline}>
              UNLEASH YOUR{"\n"}
              <Text style={styles.headlineAccent}>POTENTIAL.</Text>
            </Text>
            <Text style={styles.subtitle}>
              The high-performance platform for elite athletes and visionary
              coaches. Track, analyze, and dominate.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
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

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
              disabled={isLoading}
              style={styles.forgotRow}
            >
              <Text style={styles.forgotText}>Forgot?</Text>
            </TouchableOpacity>

            {/* Sign In */}
            <PrimaryButton disabled={isLoading} onPress={handleSignIn}>
              <PrimaryButton.Text>
                {isLoading ? "Loading..." : "Get Started"}
              </PrimaryButton.Text>
            </PrimaryButton>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or login with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Sign Up Redirect */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUp")}
                disabled={isLoading}
              >
                <Text style={styles.signUpLink}>Join the roster.</Text>
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
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 48,
  },
  brand: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 28,
    color: "#a3e635",
    marginBottom: 16,
  },
  headline: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 38,
    color: "#e5e2e1",
    lineHeight: 44,
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
  forgotRow: {
    alignSelf: "flex-end",
    marginTop: -8,
    marginBottom: 24,
  },
  forgotText: {
    fontFamily: "Lexend_500Medium",
    color: "#e2c62d",
    fontSize: 13,
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
  signUpLink: {
    fontFamily: "Lexend_700Bold",
    color: "#a3e635",
    fontSize: 14,
  },
});
