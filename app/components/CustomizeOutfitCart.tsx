import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Edit } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { CustomOutfit } from '@/types';

interface CustomizeOutfitCardProps {
  outfit: CustomOutfit;
}

export default function CustomizeOutfitCard({ outfit }: CustomizeOutfitCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(/customize/${outfit.id});
  };
  
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: outfit.previewImage }} 
          style={styles.image} 
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.editButton}>
          <Edit size={18} color={Colors.light.white} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{outfit.name}</Text>
        <Text style={styles.type}>{outfit.type}</Text>
        
        <View style={styles.measurementsContainer}>
          {Object.entries(outfit.measurements).map(([key, value], index) => (
            <Text key={index} style={styles.measurement}>
              {key}: {value}cm
            </Text>
          ))}
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
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  editButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: Colors.light.primary,
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    color: Colors.light.textLight,
    marginBottom: 8,
  },
  measurementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  measurement: {
    fontSize: 12,
    color: Colors.light.text,
    backgroundColor: Colors.light.grayLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
});