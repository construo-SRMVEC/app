import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ShoppingBag, ArrowRight } from 'lucide-react-native';
import Header from '@/components/Header';
import CartItem from '@/components/CartItem';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import { useCartStore } from '@/store/cartStore';

export default function CartScreen() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCartStore();
  
  const handleCheckout = () => {
    // In a real app, this would navigate to the checkout screen
    alert('Proceeding to checkout...');
  };
  
  const handleContinueShopping = () => {
    router.push('/');
  };
  
  const handleClearCart = () => {
    clearCart();
  };
  
  const renderItem = ({ item }) => <CartItem item={item} />;
  
  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <ShoppingBag size={64} color={Colors.light.grayDark} />
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptyText}>
        Looks like you haven't added any products to your cart yet.
      </Text>
      <Button
        title="Start Shopping"
        onPress={handleContinueShopping}
        style={styles.shopButton}
      />
    </View>
  );
  
  const renderFooter = () => {
    if (items.length === 0) return null;
    
    const subtotal = getCartTotal();
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;
    
    return (
      <View style={styles.footer}>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>
              {shipping === 0 ? 'Free' : $${shipping.toFixed(2)}}
            </Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
        
        <View style={styles.actionsContainer}>
          <Button
            title="Checkout"
            onPress={handleCheckout}
            style={styles.checkoutButton}
            icon={<ArrowRight size={20} color={Colors.light.white} style={{ marginLeft: 8 }} />}
          />
          
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={handleClearCart}
          >
            <Text style={styles.clearButtonText}>Clear Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header title="Shopping Cart" showSearch={false} showBack={true} />
      
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => ${item.product.id}-${index}}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyCart}
        ListFooterComponent={renderFooter}
      />
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
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginTop: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.textLight,
    textAlign: 'center',
    marginBottom: 24,
  },
  shopButton: {
    width: 200,
  },
  footer: {
    backgroundColor: Colors.light.white,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryContainer: {
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.light.textLight,
  },
  summaryValue: {
    fontSize: 14,
    color: Colors.light.text,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  actionsContainer: {
    gap: 12,
  },
  checkoutButton: {
    flexDirection: 'row-reverse',
  },
  clearButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  clearButtonText: {
    fontSize: 14,
    color: Colors.light.error,
  },
});