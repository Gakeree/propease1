import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadWishlist();
    }, [])
  );

  const loadWishlist = async () => {
    try {
      const savedWishlist = await AsyncStorage.getItem('wishlist');
      if (savedWishlist) {
        console.log("Loaded Wishlist:", savedWishlist);
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Error loading Wishlist", error);
    }
  };

  const removeWishlist = async (property) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== property.id);
    setWishlist(updatedWishlist);

    try {
      await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    } catch (error) {
      console.error("Error updating Wishlist", error);
    }
    alert('Removed from Wishlist');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Wishlist</Text>

      {wishlist.length === 0 ? (
        <Text style={styles.emptyMessage}>No properties in your wishlist yet.</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item, index) => item?.id ? item.id.toString() : index.toString()} // FIXED
          renderItem={({ item }) => (
            <View style={styles.propertyCard}>
              <Image source={require('../assets/apart1.jpg')} style={styles.propertyImage} />
               
              <Text style={styles.propertyPrice}>Ksh {item.price}</Text>
              <Text style={styles.propertyLocation}>{item.location}</Text>

              <TouchableOpacity onPress={() => removeWishlist(item)} style={styles.removeButton}>
                <FontAwesome name="heart" size={30} color="#FFC107" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F8F8', marginTop: 30 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  emptyMessage: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 20 },
  propertyCard: { backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10 },
  propertyImage: { width: '100%', height: 150, borderRadius: 10 },
  propertyPrice: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
  propertyLocation: { fontSize: 14, color: '#555' },
  removeButton: { position: 'absolute', top: 10, right: 10, padding: 5 },
});
