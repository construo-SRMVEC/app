import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  User,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react-native";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Colors from "@/constants/colors";
import { useUserStore } from "@/store/userStore";

export default function AccountScreen() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useUserStore();

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    {
      icon: Heart,
      title: "Favorites",
      route: "/favorites",
    },
    {
      icon: MapPin,
      title: "Addresses",
      route: "/addresses",
    },
    {
      icon: CreditCard,
      title: "Payment Methods",
      route: "/payment-methods",
    },
    {
      icon: Bell,
      title: "Notifications",
      route: "/notifications",
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      route: "/help",
    },
    {
      icon: Settings,
      title: "Settings",
      route: "/settings",
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Header title="Account" showSearch={false} />

      <ScrollView style={styles.scrollView}>
        {isAuthenticated ? (
          <View style={styles.profileSection}>
            <View style={styles.profileHeader}>
              {user?.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <User size={40} color={Colors.light.white} />
                </View>
              )}

              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{user?.name}</Text>
                <Text style={styles.profileEmail}>{user?.email}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={() => router.push("/edit-profile")}
            >
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.authSection}>
            <View style={styles.authContent}>
              <User size={64} color={Colors.light.primary} />
              <Text style={styles.authTitle}>Sign in to your account</Text>
              <Text style={styles.authDescription}>
                Sign in to access your orders, favorites, and personalized
                recommendations
              </Text>
              <Button
                title="Sign In"
                onPress={handleLogin}
                style={styles.signInButton}
              />
              <TouchableOpacity onPress={() => router.push("/auth/register")}>
                <Text style={styles.registerText}>
                  Don't have an account?{" "}
                  <Text style={styles.registerLink}>Register</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => router.push(item.route)}
              >
                <View style={styles.menuItemLeft}>
                  <Icon size={24} color={Colors.light.text} />
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <ChevronRight size={20} color={Colors.light.textLight} />
              </TouchableOpacity>
            );
          })}

          {isAuthenticated && (
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <View style={styles.menuItemLeft}>
                <LogOut size={24} color={Colors.light.error} />
                <Text style={[styles.menuItemText, styles.logoutText]}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: Colors.light.white,
    padding: 16,
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.light.textLight,
  },
  editProfileButton: {
    marginTop: 16,
    alignSelf: "flex-end",
  },
  editProfileText: {
    color: Colors.light.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  authSection: {
    backgroundColor: Colors.light.white,
    padding: 24,
    marginBottom: 16,
  },
  authContent: {
    alignItems: "center",
  },
  authTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.text,
    marginTop: 16,
    marginBottom: 8,
  },
  authDescription: {
    fontSize: 14,
    color: Colors.light.textLight,
    textAlign: "center",
    marginBottom: 24,
  },
  signInButton: {
    width: "100%",
    marginBottom: 16,
  },
  registerText: {
    fontSize: 14,
    color: Colors.light.textLight,
  },
  registerLink: {
    color: Colors.light.primary,
    fontWeight: "500",
  },
  menuSection: {
    backgroundColor: Colors.light.white,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    color: Colors.light.text,
    marginLeft: 16,
  },
  logoutText: {
    color: Colors.light.error,
  },
  versionInfo: {
    padding: 16,
    alignItems: "center",
  },
  versionText: {
    fontSize: 12,
    color: Colors.light.textLight,
  },
});
