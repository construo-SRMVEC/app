import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Save, RotateCw } from 'lucide-react-native';
import Slider from '@react-native-community/slider';
import Button from '@/components/Button';
import Colors from '@/constants/colors';

const { width } = Dimensions.get('window');

// Mock outfit data
const outfitTypes = {
  '1': {
    name: 'T-Shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    measurements: [
      { id: 'chest', name: 'Chest', min: 80, max: 140, default: 100 },
      { id: 'length', name: 'Length', min: 60, max: 90, default: 70 },
      { id: 'shoulders', name: 'Shoulders', min: 40, max: 60, default: 45 },
      { id: 'sleeves', name: 'Sleeves', min: 15, max: 30, default: 20 },
    ]
  },
  '2': {
    name: 'Jeans',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    measurements: [
      { id: 'waist', name: 'Waist', min: 60, max: 120, default: 80 },
      { id: 'hips', name: 'Hips', min: 80, max: 140, default: 100 },
      { id: 'length', name: 'Length', min: 90, max: 120, default: 105 },
      { id: 'thigh', name: 'Thigh', min: 40, max: 80, default: 55 },
    ]
  },
};

export default function CustomizeCreateScreen() {
  const router = useRouter();
  const { outfitType } = useLocalSearchParams();
  
  const outfit = outfitTypes[outfitType as string];
  
  if (!outfit) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Outfit type not found</Text>
          <Button 
            title="Go Back" 
            onPress={() => router.back()} 
            style={styles.goBackButton}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  const [measurements, setMeasurements] = useState(
    outfit.measurements.reduce((acc, measurement) => {
      acc[measurement.id] = measurement.default;
      return acc;
    }, {})
  );
  
  const [name, setName] = useState(My Custom ${outfit.name});
  
  const handleMeasurementChange = (id, value) => {
    setMeasurements(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSave = () => {
    // In a real app, this would save the custom outfit
    alert('Custom outfit saved!');
    router.push('/customize');
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={Colors.light.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Customize {outfit.name}</Text>
        
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Save size={24} color={Colors.light.primary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.nameContainer}>
          <Text style={styles.sectionTitle}>Name Your Design</Text>
          <TextInput
            style={styles.nameInput}
            value={name}
            onChangeText={setName}
            placeholder="Enter a name for your design"
          />
        </View>
        
        <View style={styles.previewContainer}>
          <Text style={styles.sectionTitle}>Preview</Text>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: outfit.image }}
              style={styles.previewImage}
              resizeMode="contain"
            />
            <TouchableOpacity style={styles.rotateButton}>
              <RotateCw size={24} color={Colors.light.white} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.measurementsContainer}>
          <Text style={styles.sectionTitle}>Measurements</Text>
          <Text style={styles.measurementsDescription}>
            Adjust the sliders to customize your {outfit.name.toLowerCase()} measurements
          </Text>
          
          {outfit.measurements.map((measurement) => (
            <View key={measurement.id} style={styles.measurementItem}>
              <View style={styles.measurementHeader}>
                <Text style={styles.measurementName}>{measurement.name}</Text>
                <Text style={styles.measurementValue}>
                  {measurements[measurement.id]} cm
                </Text>
              </View>
              
              <Slider
                style={styles.slider}
                minimumValue={measurement.min}
                maximumValue={measurement.max}
                value={measurements[measurement.id]}
                onValueChange={(value) => handleMeasurementChange(measurement.id, Math.round(value))}
                minimumTrackTintColor={Colors.light.primary}
                maximumTrackTintColor={Colors.light.grayLight}
                thumbTintColor={Colors.light.primary}
                step={1}
              />
              
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>{measurement.min} cm</Text>
                <Text style={styles.sliderLabel}>{measurement.max} cm</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title="Generate 3D Model"
          onPress={handleSave}
          style={styles.generateButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    backgroundColor: Colors.light.white,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  nameContainer: {
    padding: 16,
    backgroundColor: Colors.light.white,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 12,
  },
  nameInput: {
    backgroundColor: Colors.light.grayLight,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  previewContainer: {
    padding: 16,
    backgroundColor: Colors.light.white,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  previewImage: {
    width: width - 32,
    height: 300,
  },
  rotateButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: Colors.light.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  measurementsContainer: {
    padding: 16,
    backgroundColor: Colors.light.white,
    marginBottom: 16,
  },
  measurementsDescription: {
    fontSize: 14,
    color: Colors.light.textLight,
    marginBottom: 16,
  },
  measurementItem: {
    marginBottom: 20,
  },
  measurementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  measurementName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
  },
  measurementValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 12,
    color: Colors.light.textLight,
  },
  footer: {
    padding: 16,
    backgroundColor: Colors.light.white,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  generateButton: {
    backgroundColor: Colors.light.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: Colors.light.textLight,
    marginBottom: 16,
  },
  goBackButton: {
    width: 200,
  },
});