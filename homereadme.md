import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList, Button } from 'react-native';
import React from 'react';
import { FontAwesome, Feather } from 'react-native-vector-icons';

const Home = () => {
  const propertyData = [
    {
      id: '1',
      image: 'https://via.placeholder.com/150',
      price: '$1,699,000',
      location: '1135 S. Ave, Menlo Park, CA',
    },
    {
      id: '2',
      image: 'https://via.placeholder.com/150',
      price: '$1,299,000',
      location: '2245 N. Ave, San Mateo, CA',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topBar}>
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }}
          style={styles.profileImage}
        />
        <View style={styles.iconContainer}>
          <Feather name="search" size={24} color="black" style={styles.icon} />
          <FontAwesome name="bell" size={24} color="black" style={styles.icon} />
        </View>
      </View>

      {/* Feature Card */}
      <View style={styles.featureCard}>
        <Text style={styles.featureTitle}>Explore Nearby</Text>
        <Text style={styles.featureSubtitle}>
          See recommended properties based on your location.
        </Text>
        <TouchableOpacity style={styles.locationButton}>
          <Text style={styles.buttonText}>Turn on Location</Text>
        </TouchableOpacity>
      </View>

      {/* Property Listings */}
      <Text style={styles.sectionTitle}>Discover all listings and rental properties</Text>
      <FlatList
        data={propertyData}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.propertyList}
        renderItem={({ item }) => (
          <View style={styles.propertyCard}>
            <Image source={{ uri: item.image }} style={styles.propertyImage} />
            <Text style={styles.propertyPrice}>{item.price}</Text>
            <Text style={styles.propertyLocation}>{item.location}</Text>
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
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  featureCard: {
    backgroundColor: '#ffffff',
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
    fontSize: 18,
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
    borderRadius: 5,
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
  propertyList: {
    paddingVertical: 10,
  },
  propertyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginRight: 15,
    overflow: 'hidden',
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  propertyImage: {
    width: '100%',
    height: 120,
  },
  propertyPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
  },
  propertyLocation: {
    fontSize: 12,
    color: '#7A7A7A',
    marginLeft: 10,
    marginBottom: 10,
  },
});
