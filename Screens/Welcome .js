import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/apart1.jpg')} // Replace with your background image path
      style={styles.background}
    >
      {/* Dark Overlay */}
      <View style={styles.overlay} />

      <View style={styles.container}>
        {/* App Logo */}
        <Image
          source={require('../assets/4.png')} // Replace with your app logo path
          style={styles.logo}
        />

        {/* Title */}
        <Text style={styles.title}>Find the perfect property to live in</Text>

        {/* Description */}
        <Text style={styles.description}>
          Explore apartments, houses, and commercial properties tailored to your preferences. Let us help you find your dream home effortlessly!
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate('Home')} // Navigate to Home screen
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark Blue overlay
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 200,
  },
  logo: {
    width: 200, // Adjust the size as needed
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#E3F2FD', // Light Blue text
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22, // Improve readability
  },
  getStartedButton: {
    backgroundColor: '#FBC02D', // Yellow for the button
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  getStartedText: {
    color: '#FFFFFF', // White text
    fontSize: 16,
    fontWeight: 'bold',
  },
});
