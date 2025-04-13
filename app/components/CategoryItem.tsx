import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Category } from '@/types';
import Colors from '@/constants/colors';
import { Shirt, Smartphone, Footprints, Watch, Sparkles, Home, Dumbbell, BookOpen } from 'lucide-react-native';

interface CategoryItemProps {
  category: Category;
}

export default function CategoryItem({ category }: CategoryItemProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(/categories/${category.id});
  };
  
  const getIcon = () => {
    switch (category.icon) {
      case 'shirt':
        return <Shirt size={24} color={Colors.light.white} />;
      case 'smartphone':
        return <Smartphone size={24} color={Colors.light.white} />;
      case 'footprints':
        return <Footprints size={24} color={Colors.light.white} />;
      case 'watch':
        return <Watch size={24} color={Colors.light.white} />;
      case 'sparkles':
        return <Sparkles size={24} color={Colors.light.white} />;
      case 'home':
        return <Home size={24} color={Colors.light.white} />;
      case 'dumbbell':
        return <Dumbbell size={24} color={Colors.light.white} />;
      case 'book-open':
        return <BookOpen size={24} color={Colors.light.white} />;
      default:
        return <Shirt size={24} color={Colors.light.white} />;
    }
  };
  
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      <Text style={styles.name} numberOfLines={1}>{category.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 80,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.light.text,
  },
});