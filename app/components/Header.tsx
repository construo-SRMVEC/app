import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Search, Bell, ShoppingBag, Menu, X } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constents/colors";
import { useCartStore } from "@/store/cartStore";

interface HeaderProps {
  showSearch?: boolean;
  showBack?: boolean;
  title?: string;
}

export default function Header({
  showSearch = true,
  showBack = false,
  title,
}: HeaderProps) {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const cartCount = useCartStore((state) => state.getCartCount());

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: "/search",
        params: { query: searchQuery },
      });
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>
        {searchVisible ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => setSearchVisible(false)}
            >
              <X size={20} color={Colors.light.textLight} />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.leftContainer}>
              {showBack ? (
                <TouchableOpacity
                  onPress={() => router.back()}
                  style={styles.iconButton}
                >
                  <Menu size={24} color={Colors.light.text} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => router.push("/menu")}
                  style={styles.iconButton}
                >
                  <Menu size={24} color={Colors.light.text} />
                </TouchableOpacity>
              )}
              <Text style={styles.logo}>{title || "ShopEase"}</Text>
            </View>

            <View style={styles.rightContainer}>
              {showSearch && (
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => setSearchVisible(true)}
                >
                  <Search size={24} color={Colors.light.text} />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => router.push("/notifications")}
              >
                <Bell size={24} color={Colors.light.text} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cartButton}
                onPress={() => router.push("/cart")}
              >
                <ShoppingBag size={24} color={Colors.light.text} />
                {cartCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {cartCount > 9 ? "9+" : cartCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.light.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.light.background,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.primary,
    marginLeft: 8,
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  cartButton: {
    padding: 8,
    marginLeft: 8,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: Colors.light.primary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: Colors.light.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: Colors.light.grayLight,
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  searchButton: {
    padding: 8,
    marginLeft: 8,
  },
});
