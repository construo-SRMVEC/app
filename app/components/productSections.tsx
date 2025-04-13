import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import Colors from "@/constants/colors";

interface ProductSectionProps {
  title: string;
  products: Product[];
  seeAllLink?: string;
  horizontal?: boolean;
}

export default function ProductSection({
  title,
  products,
  seeAllLink,
  horizontal = true,
}: ProductSectionProps) {
  const router = useRouter();

  const handleSeeAll = () => {
    if (seeAllLink) {
      router.push(seeAllLink);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {seeAllLink && (
          <TouchableOpacity style={styles.seeAllButton} onPress={handleSeeAll}>
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color={Colors.light.primary} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard product={item} horizontal={!horizontal} />
        )}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: "500",
  },
  listContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
});
