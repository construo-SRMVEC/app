import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { CartItem as CartItemType } from '@/types';
import Colors from '@/constents/colors';
import { useCartStore } from '@/store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCartStore();
  
  const handleIncreaseQuantity = () => {
    updateQuantity(item.product.id, item.quantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(item.product.id);
  };
  
  const price = item.product.discountPrice || item.product.price;
  const totalPrice = price * item.quantity;
  
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: item.product.images[0] }} 
        style={styles.image} 
        resizeMode="cover"
      />
      
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={2}>{item.product.name}</Text>
          
          {(item.selectedSize || item.selectedColor) && (
            <Text style={styles.variant}>
              {item.selectedSize && `Size: ${item.selectedSize}`}
              {item.selectedSize && item.selectedColor && ' | '}
              {item.selectedColor && `Color: ${item.selectedColor}`}
            </Text>
          )}
          
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>
        
        <View style={styles.actionsContainer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={handleDecreaseQuantity}
              disabled={item.quantity <= 1}
            >
              <Minus size={16} color={item.quantity <= 1 ? Colors.light.grayDark : Colors.light.text} />
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{item.quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={handleIncreaseQuantity}
            >
              <Plus size={16} color={Colors.light.text} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.removeButton} 
            onPress={handleRemove}
          >
            <Trash2 size={18} color={Colors.light.error} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.light.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 4,
  },
  variant: {
    fontSize: 12,
    color: Colors.light.textLight,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.grayLight,
    borderRadius: 20,
    paddingHorizontal: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 8,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
  },
});
