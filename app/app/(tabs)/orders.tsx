import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle } from 'lucide-react-native';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Colors from '@/constants/colors';
import { useUserStore } from '@/store/userStore';

// Mock orders data
const orders = [
  {
    id: '1',
    date: '2023-06-15',
    status: 'delivered',
    items: [
      { name: 'Premium Cotton T-Shirt', quantity: 2 },
      { name: 'Slim Fit Jeans', quantity: 1 }
    ],
    total: 79.97
  },
  {
    id: '2',
    date: '2023-06-10',
    status: 'shipped',
    items: [
      { name: 'Wireless Bluetooth Headphones', quantity: 1 }
    ],
    total: 149.99
  },
  {
    id: '3',
    date: '2023-06-05',
    status: 'processing',
    items: [
      { name: 'Smart Watch Series 5', quantity: 1 },
      { name: 'Leather Crossbody Bag', quantity: 1 }
    ],
    total: 319.98
  },
  {
    id: '4',
    date: '2023-05-28',
    status: 'cancelled',
    items: [
      { name: 'Summer Floral Dress', quantity: 1 }
    ],
    total: 34.99
  }
];

export default function OrdersScreen() {
  const router = useRouter();
  const { isAuthenticated } = useUserStore();
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={20} color={Colors.light.success} />;
      case 'shipped':
        return <Truck size={20} color={Colors.light.info} />;
      case 'processing':
        return <Clock size={20} color={Colors.light.warning} />;
      case 'cancelled':
        return <XCircle size={20} color={Colors.light.error} />;
      default:
        return <Package size={20} color={Colors.light.textLight} />;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'shipped':
        return 'Shipped';
      case 'processing':
        return 'Processing';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleOrderPress = (orderId: string) => {
    router.push(/orders/${orderId});
  };
  
  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <Header title="Orders" />
        
        <View style={styles.emptyContainer}>
          <Package size={64} color={Colors.light.grayDark} />
          <Text style={styles.emptyTitle}>No Orders Yet</Text>
          <Text style={styles.emptyText}>
            Please sign in to view your orders
          </Text>
          <TouchableOpacity 
            style={styles.signInButton}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        
        <Footer />
      </SafeAreaView>
    );
  }
  
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => handleOrderPress(item.id)}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>Order #{item.id}</Text>
          <Text style={styles.orderDate}>{formatDate(item.date)}</Text>
        </View>
        
        <View style={styles.statusContainer}>
          {getStatusIcon(item.status)}
          <Text style={[
            styles.statusText,
            item.status === 'delivered' && styles.deliveredText,
            item.status === 'shipped' && styles.shippedText,
            item.status === 'processing' && styles.processingText,
            item.status === 'cancelled' && styles.cancelledText,
          ]}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
      
      <View style={styles.orderItems}>
        {item.items.map((orderItem, index) => (
          <Text key={index} style={styles.itemText}>
            {orderItem.quantity}x {orderItem.name}
          </Text>
        ))}
      </View>
      
      <View style={styles.orderFooter}>
        <Text style={styles.totalText}>Total: ${item.total.toFixed(2)}</Text>
        <ChevronRight size={20} color={Colors.light.textLight} />
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header title="Orders" />
      
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Package size={64} color={Colors.light.grayDark} />
            <Text style={styles.emptyTitle}>No Orders Yet</Text>
            <Text style={styles.emptyText}>
              Your orders will appear here once you make a purchase
            </Text>
          </View>
        }
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
    flexGrow: 1,
  },
  orderCard: {
    backgroundColor: Colors.light.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  orderDate: {
    fontSize: 14,
    color: Colors.light.textLight,
    marginTop: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  deliveredText: {
    color: Colors.light.success,
  },
  shippedText: {
    color: Colors.light.info,
  },
  processingText: {
    color: Colors.light.warning,
  },
  cancelledText: {
    color: Colors.light.error,
  },
  orderItems: {
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingTop: 12,
    marginBottom: 12,
  },
  itemText: {
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingTop: 12,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
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
  signInButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  signInButtonText: {
    color: Colors.light.white,
    fontSize: 16,
    fontWeight: '600',
  },
});