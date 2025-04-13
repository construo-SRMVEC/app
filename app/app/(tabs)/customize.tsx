import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, Upload, Mic, Camera } from 'lucide-react-native';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Colors from '@/constants/colors';

const outfitTypes = [
  {
    id: '1',
    name: 'T-Shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Jeans',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: 'Dress',
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    name: 'Jacket',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    name: 'Suit',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6',
    name: 'Skirt',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

export default function CustomizeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOutfit, setSelectedOutfit] = useState<string | null>(null);
  
  const handleOutfitSelect = (outfitId: string) => {
    setSelectedOutfit(outfitId);
    router.push(/customize/create?outfitType=${outfitId});
  };
  
  const handleUpload = () => {
    // In a real app, this would open the image picker
    alert('Upload functionality would open image picker');
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.customHeader}>
        <Text style={styles.headerTitle}>Customize Your Outfit</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search outfits..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <View style={styles.searchActions}>
            <TouchableOpacity style={styles.searchAction}>
              <Search size={20} color={Colors.light.textLight} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchAction}>
              <Mic size={20} color={Colors.light.textLight} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchAction}>
              <Camera size={20} color={Colors.light.textLight} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.uploadSection}>
          <Text style={styles.sectionTitle}>Upload Your Design</Text>
          <Text style={styles.sectionDescription}>
            Upload an image or video of your outfit to create a 3D model
          </Text>
          <Button
            title="Upload Image or Video"
            onPress={handleUpload}
            icon={<Upload size={20} color={Colors.light.white} style={{ marginRight: 8 }} />}
            style={styles.uploadButton}
          />
        </View>
        
        <View style={styles.outfitsSection}>
          <Text style={styles.sectionTitle}>Select Your Outfit</Text>
          <Text style={styles.sectionDescription}>
            Choose from our collection of customizable outfits
          </Text>
          
          <View style={styles.outfitsGrid}>
            {outfitTypes.map((outfit) => (
              <TouchableOpacity
                key={outfit.id}
                style={[
                  styles.outfitCard,
                  selectedOutfit === outfit.id && styles.selectedOutfitCard
                ]}
                onPress={() => handleOutfitSelect(outfit.id)}
              >
                <Image
                  source={{ uri: outfit.image }}
                  style={styles.outfitImage}
                  resizeMode="cover"
                />
                <View style={styles.outfitOverlay}>
                  <Text style={styles.outfitName}>{outfit.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
  customHeader: {
    backgroundColor: Colors.light.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.primary,
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.grayLight,
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 44,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  searchActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchAction: {
    marginLeft: 12,
  },
  scrollView: {
    flex: 1,
  },
  uploadSection: {
    padding: 16,
    backgroundColor: Colors.light.grayLight,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: Colors.light.textLight,
    marginBottom: 16,
  },
  uploadButton: {
    marginTop: 8,
  },
  outfitsSection: {
    padding: 16,
  },
  outfitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  outfitCard: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 16,
    height: 180,
  },
  selectedOutfitCard: {
    borderWidth: 2,
    borderColor: Colors.light.primary,
    borderRadius: 12,
  },
  outfitImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  outfitOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    padding: 12,
    borderRadius: 12,
  },
  outfitName: {
    color: Colors.light.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});