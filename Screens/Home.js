import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Feather, FontAwesome } from 'react-native-vector-icons';
import propertyData from '../data/property';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
const Home = () => {
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load wishlist from AsyncStorage on component mount
  useFocusEffect(
    React.useCallback(() => {
      loadWishlist();
    }, [])
  );

  const loadWishlist = async () => {
    try {
      const savedWishlist = await AsyncStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error('Error loading Wishlist', error);
    }
  };

  const toggleWishlist = async (property) => {
    try {
      let updatedWishlist = [...wishlist];

      if (wishlist.some((item) => item.id === property.id)) {
        updatedWishlist = wishlist.filter((item) => item.id !== property.id);
        Alert.alert('Removed', 'Removed from Wishlist');
      } else {
        updatedWishlist.push(property);
        Alert.alert('Added', 'Added to Wishlist');
      }

      setWishlist(updatedWishlist);
      await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const categories = ['All', ...new Set(propertyData.map(item => item.category))];
  const filteredProperties = selectedCategory === 'All' ? propertyData : propertyData.filter(item => item.category === selectedCategory);

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topBar}>
        <Image source={require('../assets/4.png')} style={styles.profileImage} />
        <Text style={styles.logoText}>PROPEASE</Text>
        <View style={styles.iconContainer}>
          <Feather name="search" size={28} color="black" style={styles.icon} />
          <FontAwesome name="bell" size={28} color="black" style={styles.icon} />
        </View>
      </View>

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome to Propease!</Text>

      {/* Feature Card */}
      <View style={styles.featureCard}>
        <Text style={styles.featureTitle}>Find your dream home</Text>
        <Text style={styles.featureSubtitle}>See recommended properties based on your location</Text>
        <TouchableOpacity style={styles.locationButton}>
          <Text style={styles.buttonText}>Turn on Location</Text>
        </TouchableOpacity>
      </View>

      {/* Property Listings */}
      <Text style={styles.sectionTitle}>Discover all listings and rental properties</Text>

      {/* Category Filter */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === item && styles.selectedCategory]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text style={[styles.categoryText, selectedCategory === item && styles.selectedCategoryText]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.categoryList}
      />

      {/* Property List */}
      <FlatList
        data={filteredProperties}
        
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.propertyList}
        renderItem={({ item }) => (
          <View style={styles.propertyCard}>
            <Image source={require('../assets/apart1.jpg')} style={styles.propertyImage} />
            <View style={styles.propertyInfo}>
              <Text style={styles.propertyPrice}>Ksh {item.price}</Text>
              <Text style={styles.propertyLocation}>{item.location}</Text>
            </View>
            {/* Wishlist Button */}
            <TouchableOpacity
              style={styles.wishlistButton}
              onPress={() => toggleWishlist(item)}
            >
              <FontAwesome
                name={wishlist.some(wish => wish.id === item.id) ? 'heart' : 'heart-o'}
                size={24}
                color={wishlist.some(wish => wish.id === item.id) ? '#FFC107' : 'black'}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 25,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#7A7A7A',
    marginBottom: 15,
  },
  locationButton: {
    backgroundColor: '#0056D2',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryList: {
    marginBottom: 40,
    paddingVertical: 10,
  },
  categoryButton: {
    backgroundColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 15,
    height: 40,
    width:140,

    borderRadius: 20,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: '#0056D2',
  },
  categoryText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',  
  },
  selectedCategoryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  propertyList: {
    paddingVertical: 10,
     
  },
  propertyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  propertyImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  propertyInfo: {
    marginTop: 10,
  },
  propertyPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  propertyLocation: {
    fontSize: 14,
    color: '#7A7A7A',
  },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
});
