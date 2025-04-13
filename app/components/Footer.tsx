import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Home, Grid, Shirt, Package, Video, User } from "lucide-react-native";
import Colors from "@/constants/colors";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Grid, label: "Categories", path: "/categories" },
    { icon: Shirt, label: "Customize", path: "/customize" },
    { icon: Package, label: "Orders", path: "/orders" },
    { icon: Video, label: "Videos", path: "/videos" },
    { icon: User, label: "Account", path: "/account" },
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item, index) => {
        const active = isActive(item.path);
        const Icon = item.icon;

        return (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
            onPress={() => router.push(item.path)}
          >
            <Icon
              size={24}
              color={active ? Colors.light.primary : Colors.light.textLight}
            />
            <Text style={[styles.navLabel, active && styles.activeNavLabel]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.light.background,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
    color: Colors.light.textLight,
  },
  activeNavLabel: {
    color: Colors.light.primary,
    fontWeight: "500",
  },
});
