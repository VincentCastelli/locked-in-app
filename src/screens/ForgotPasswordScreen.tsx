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
import { resetPasswordApi } from "../api/auth";
import { getErrorMessage } from "../api/errors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthStack";
import { PrimaryButton, PrimaryInput } from "../components";
import { Mail } from "lucide-react-native";

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "ForgotPassword"
>;

interface Props {
  navigation: ForgotPasswordScreenNavigationProp;
}

export const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      await resetPasswordApi(email, "");
      Alert.alert("Success", "A reset link has been sent to your email", [
        {
          text: "OK",
          onPress: () => navigation.navigate("SignIn"),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", getErrorMessage(error, "Failed to send reset link"));
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
            <Text style={styles.brandLabel}>Account Recovery</Text>
            <Text style={styles.headline}>
              LOST YOUR{"\n"}
              <Text style={styles.headlineAccent}>EDGE?</Text>
            </Text>
            <Text style={styles.subtitle}>
              Enter your registered email below. We'll send a high-velocity
              reset link to get you back in the arena.
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

            {/* Submit */}
            <View style={styles.ctaContainer}>
              <PrimaryButton disabled={isLoading} onPress={handleReset}>
                <PrimaryButton.Text>
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </PrimaryButton.Text>
              </PrimaryButton>
            </View>

            {/* Return to Login */}
            <TouchableOpacity
              onPress={() => navigation.navigate("SignIn")}
              style={styles.returnButton}
              disabled={isLoading}
            >
              <Text style={styles.returnText}>Return to Login</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Badges */}
          <View style={styles.badgeRow}>
            <Text style={styles.badge}>PERFORMANCE</Text>
            <Text style={styles.badgeSeparator}>·</Text>
            <Text style={styles.badge}>PRECISION</Text>
            <Text style={styles.badgeSeparator}>·</Text>
            <Text style={styles.badge}>POWER</Text>
          </View>

          <Text style={styles.copyright}>© 2024 LockedIn Kinetic Systems</Text>
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
  brandLabel: {
    fontFamily: "Lexend_500Medium",
    fontSize: 13,
    color: "#a3e635",
    textTransform: "uppercase",
    letterSpacing: 2,
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
  ctaContainer: {
    marginTop: 8,
  },
  returnButton: {
    alignSelf: "center",
    marginTop: 24,
  },
  returnText: {
    fontFamily: "Lexend_500Medium",
    color: "#c2cab0",
    fontSize: 14,
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 48,
    marginBottom: 12,
  },
  badge: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 11,
    color: "#424936",
    letterSpacing: 2,
  },
  badgeSeparator: {
    color: "#424936",
    marginHorizontal: 10,
    fontSize: 14,
  },
  copyright: {
    fontFamily: "Lexend_400Regular",
    fontSize: 11,
    color: "#424936",
    textAlign: "center",
  },
});
