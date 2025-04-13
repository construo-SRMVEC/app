import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Play, Clock } from "lucide-react-native";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Colors from "@/constants/colors";

// Mock videos data
const videos = [
  {
    id: "1",
    title: "Summer Fashion Trends 2023",
    thumbnail:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    duration: "5:24",
    views: "12K",
    date: "2 days ago",
  },
  {
    id: "2",
    title: "How to Style Minimalist Outfits",
    thumbnail:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    duration: "8:15",
    views: "45K",
    date: "1 week ago",
  },
  {
    id: "3",
    title: "Top 10 Gadgets for 2023",
    thumbnail:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    duration: "12:38",
    views: "78K",
    date: "3 weeks ago",
  },
  {
    id: "4",
    title: "Home Decor Ideas on a Budget",
    thumbnail:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    duration: "7:52",
    views: "32K",
    date: "1 month ago",
  },
  {
    id: "5",
    title: "Workout Gear Essentials",
    thumbnail:
      "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    duration: "6:10",
    views: "18K",
    date: "2 months ago",
  },
];

export default function VideosScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.videoCard}>
      <View style={styles.thumbnailContainer}>
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.playButton}>
          <Play
            size={24}
            color={Colors.light.white}
            fill={Colors.light.white}
          />
        </View>
        <View style={styles.durationContainer}>
          <Clock size={12} color={Colors.light.white} />
          <Text style={styles.duration}>{item.duration}</Text>
        </View>
      </View>

      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.videoStats}>
          <Text style={styles.videoViews}>{item.views} views</Text>
          <Text style={styles.videoDate}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Header title="Videos" />

      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  listContent: {
    padding: 16,
  },
  videoCard: {
    backgroundColor: Colors.light.white,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  thumbnailContainer: {
    position: "relative",
    height: 200,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -24 }, { translateY: -24 }],
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  durationContainer: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  duration: {
    color: Colors.light.white,
    fontSize: 12,
    marginLeft: 4,
  },
  videoInfo: {
    padding: 12,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 8,
  },
  videoStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  videoViews: {
    fontSize: 14,
    color: Colors.light.textLight,
  },
  videoDate: {
    fontSize: 14,
    color: Colors.light.textLight,
    marginLeft: 12,
  },
});
