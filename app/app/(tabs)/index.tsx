import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BannerCarousel from "@/components/BannerCarousel";
import CategoryItem from "@/components/CategoryItem";
import ProductSection from "@/components/ProductSection";
import Colors from "@/constants/colors";
import { banners } from "@/mocks/banners";
import { categories } from "@/mocks/categories";
import {
  getRecommendedProducts,
  getTrendingProducts,
  getSummerDeals,
  getSuggestedProducts,
  getNearbyProducts,
} from "@/mocks/products";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Header />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[Colors.light.primary]}
          />
        }
      >
        <BannerCarousel banners={banners} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </ScrollView>

        <ProductSection
          title="Recommended for You"
          products={getRecommendedProducts()}
          seeAllLink="/recommended"
        />

        <ProductSection
          title="Latest Deals"
          products={getTrendingProducts()}
          seeAllLink="/deals"
        />

        <ProductSection
          title="Summer Hot Deals"
          products={getSummerDeals()}
          seeAllLink="/summer-deals"
        />

        <ProductSection
          title="Suggestions"
          products={getSuggestedProducts()}
          seeAllLink="/suggestions"
        />

        <ProductSection
          title="Nearby Trends"
          products={getNearbyProducts()}
          seeAllLink="/nearby"
        />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
