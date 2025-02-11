import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather, FontAwesome } from 'react-native-vector-icons'
import propertyData from '../data/property'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {
  // state to store wishlist items
  const [wishlist, setWishlist] = useState([])
  
  // load wishlist from async storage

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const savedWishlist = await AsyncStorage.getItem('wishlist');// get the wishlist from async storage
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Error loading Wishlist", error);
    }
  };

  const toggleWishlist = async (property) => {
    try {
      let updatedWishlist = [...wishlist];
  
      if (wishlist.some((item) => item.id === property.id)) {
        // Remove from wishlist
        updatedWishlist = wishlist.filter((item) => item.id !== property.id);
        Alert.alert('Removed', 'Removed from Wishlist');
      } else {
        // Add to wishlist
        updatedWishlist.push(property);
        Alert.alert('Added', 'Added to Wishlist');
      }
  
      // Update state immediately
      setWishlist(updatedWishlist);
  
      // Store updated wishlist in AsyncStorage
      await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };
  
  

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topBar}>
        <Image source={require('../assets/4.png')} style={styles.profileImage} />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>PROPEASE</Text>
        <View style={styles.iconContainer}>
          <Feather name="search" size={30} color="black" style={styles.icon} />
          <FontAwesome name="bell" size={30} color="black" style={styles.icon} />
        </View>
      </View>

      {/* Feature Card */}
      <View style={styles.featureCard}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 5 }}>Find your dream home</Text>
        <Text style={styles.featureSubtitle}>See recommended properties based on your location</Text>

        <TouchableOpacity style={styles.locationButton}>
          <Text style={styles.buttonText}>Turn on Location</Text>
        </TouchableOpacity>
      </View>

      {/* Property Listings */}
      <Text style={styles.sectionTitle}>Discover all listings and rental properties</Text>
      <View style={{ flex: 1 }}>
        <FlatList
          data={propertyData}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.propertyList}
          renderItem={({ item }) => (
            <View style={styles.propertyCard}>
              <Image source={require('../assets/apart1.jpg')} style={styles.propertyImage} />
              <Text style={styles.propertyPrice}>Ksh {item.price}</Text>
              <Text style={styles.propertyLocation}>{item.location}</Text>

              {/* Wishlist Button */}
              <TouchableOpacity
                style={styles.wishlistButton}
                onPress={() => toggleWishlist(item)}
              >
                <FontAwesome
                  name={wishlist.some(wish => wish.id ===item.id) ? 'heart' : 'heart-o'}
                  size={30}
                  color={wishlist.some(wish => wish.id ===item.id) ? '#FFC107' : 'black'}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
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
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 40,
    gap: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
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
    justifyContent: 'center',
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
  propertyList: {
    paddingVertical: 10,
  },
  propertyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 30,
    marginRight: 15,
    overflow: 'hidden',
    width: 400,
    height: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  propertyImage: {
    width: '100%',
    height: '100%',
  },
  propertyPrice: {
    position: 'absolute',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
    bottom: 10,
  },
  propertyLocation: {
    position: 'absolute',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
    marginBottom: 10,
    bottom: 20,
  },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    borderRadius: 20,
  },
});
