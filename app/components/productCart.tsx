import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, Star } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { Product } from '@/types';
import { useUserStore } from '@/store/userStore';

interface ProductCardProps {
  product: Product;
  horizontal?: boolean;
}

export default function ProductCard({ product, horizontal = false }: ProductCardProps) {
  const router = useRouter();
  const { favorites, addToFavorites, removeFromFavorites } = useUserStore();
  
  const isFavorite = favorites.includes(product.id);
  
  const handlePress = () => {
    router.push(/product/${product.id});
  };
  
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };
  
  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;
  
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        horizontal ? styles.horizontalContainer : styles.verticalContainer
      ]} 
      onPress={handlePress}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.images[0] }} 
          style={styles.image} 
          resizeMode="cover"
        />
        
        {product.isNew && (
          <View style={[styles.badge, styles.newBadge]}>
            <Text style={styles.badgeText}>NEW</Text>
          </View>
        )}
        
        {discountPercentage > 0 && (
          <View style={[styles.badge, styles.discountBadge]}>
            <Text style={styles.badgeText}>{discountPercentage}% OFF</Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={toggleFavorite}
        >
          <Heart 
            size={20} 
            color={isFavorite ? Colors.light.error : Colors.light.white} 
            fill={isFavorite ? Colors.light.error : 'none'} 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={14} color={Colors.light.warning} fill={Colors.light.warning} />
          <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
          <Text style={styles.reviews}>({product.reviews})</Text>
        </View>
        
        <View style={styles.priceContainer}>
          {product.discountPrice ? (
            <>
              <Text style={styles.discountPrice}>${product.discountPrice.toFixed(2)}</Text>
              <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>
            </>
          ) : (
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  verticalContainer: {
    width: 170,
    height: 260,
  },
  horizontalContainer: {
    width: 300,
    height: 180,
    flexDirection: 'row',
  },
  imageContainer: {
    position: 'relative',
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    top: 8,
    left: 8,
  },
  newBadge: {
    backgroundColor: Colors.light.primary,
  },
  discountBadge: {
    backgroundColor: Colors.light.error,
  },
  badgeText: {
    color: Colors.light.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: Colors.light.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
    color: Colors.light.text,
  },
  reviews: {
    fontSize: 12,
    color: Colors.light.textLight,
    marginLeft: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  discountPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.error,
  },
  originalPrice: {
    fontSize: 14,
    fontWeight: 'normal',
    color: Colors.light.textLight,
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
});