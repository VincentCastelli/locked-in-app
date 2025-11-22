import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { withAuth } from "../middleware/withAuth";
import { useAuthStore } from "../store/authStore";

export const PlaceholderScreen: React.FC = () => {
  const { user, signOut } = useAuthStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to LockedIn!</Text>
      <Text style={styles.subtitle}>Logged in as: {user?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: "#666",
  },
  button: {
    backgroundColor: "#00D9A3",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

// Protect this screen with authentication
withAuth(PlaceholderScreen);
