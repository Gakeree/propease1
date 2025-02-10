import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import Explore from '../Screens/Explore';
import Wishlist from '../Screens/Wishlist';
import Profile from '../Screens/Profile';

import { Feather, MaterialIcons, FontAwesome } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

export default function () {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0, // Lowered to make it float
          left: 20,
          right: 20,
          elevation: 5,
          backgroundColor: '#007BFF', // Primary Blue
          borderRadius: 5, // Rounded corners for a modern look
          height: 70, // Reduced height for a sleeker design
          paddingHorizontal: 10,
        
          ...styles.shadow,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          color: '#FFFFFF', // Label color set to white for contrast
        },
        tabBarIcon: ({ color, size, focused }) => {
          let IconName;
          let IconComponent;

          if (route.name === 'Home') {
            IconName = 'home';
            IconComponent = Feather;
          } else if (route.name === 'Explore') {
            IconName = 'search';
            IconComponent = Feather;
          } else if (route.name === 'Wishlist') {
            IconName = 'heart';
            IconComponent = FontAwesome;
          } else if (route.name === 'Profile') {
            IconName = 'person';
            IconComponent = MaterialIcons;
          }

          return (
            <IconComponent style={styles.icon}
              name={IconName}
              size={focused ? 32 : 30} // Larger size for focused icon
              color={focused ? '#FFC107' : 'black'} // Bright Yellow for focused, Gray for unfocused
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Wishlist" component={Wishlist} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#E63946', // Red for subtle shadow
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10, // Stronger shadow for a floating effect
  },
  icon: {
    
    justifyContent: 'center',
    alignItems: 'center',
  },
});
