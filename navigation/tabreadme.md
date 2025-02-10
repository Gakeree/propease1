### **Adding Icons from React Native Vector Icons Step by Step**

You are using **React Navigation** with a **Bottom Tab Navigator**, and you want to add icons to each tab using **React Native Vector Icons**. Follow these steps:

---

## **Step 1: Install React Native Vector Icons**
If you haven't installed **react-native-vector-icons**, run the following command:

```sh
npm install react-native-vector-icons
```

For **Expo Users**, you need to install `expo install`:

```sh
expo install react-native-vector-icons
```

---

## **Step 2: Import Required Icon Library**
In your `Tab.Navigator`, import the icon set you want to use. Since you have **Home, Explore, Wishlist, and Profile**, I recommend **Feather, MaterialIcons, and FontAwesome**.

```javascript
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import Explore from '../Screens/Explore';
import Wishlist from '../Screens/Wishlist';
import Profile from '../Screens/Profile';

// Import Icons
import { Feather, MaterialIcons, FontAwesome } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
        // Adding Icons
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          let IconComponent;

          if (route.name === 'Home') {
            IconComponent = Feather;
            iconName = 'home'; // Feather icon
          } else if (route.name === 'Explore') {
            IconComponent = MaterialIcons;
            iconName = 'explore'; // MaterialIcons icon
          } else if (route.name === 'Wishlist') {
            IconComponent = FontAwesome;
            iconName = 'heart'; // FontAwesome icon
          } else if (route.name === 'Profile') {
            IconComponent = Feather;
            iconName = 'user'; // Feather icon
          }

          return <IconComponent name={iconName} size={size} color={focused ? '#ff6347' : '#808080'} />;
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
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
```

---

## **Step 3: Explanation of Code**
1. **Import Icons**  
   - We import the required icons from `react-native-vector-icons` (`Feather`, `MaterialIcons`, `FontAwesome`).

2. **Modify `screenOptions` in `Tab.Navigator`**  
   - We use **`screenOptions`** to set custom properties for the bottom tab.
   - `tabBarIcon: ({ color, size, focused }) => {}`  
     - This function **dynamically** assigns an icon based on the `route.name`.

3. **Dynamic Icon Assignment**  
   - We use a `switch`-like `if` condition to map each **screen name** to its respective icon set and icon name.
   - **Example**:
     - `'Home'` uses `Feather` → `'home'`
     - `'Explore'` uses `MaterialIcons` → `'explore'`
     - `'Wishlist'` uses `FontAwesome` → `'heart'`
     - `'Profile'` uses `Feather` → `'user'`

4. **Focused & Unfocused Icon Colors**  
   - **Focused (Active Tab)** → **Orange (#ff6347)**  
   - **Unfocused (Inactive Tab)** → **Gray (#808080)**  

---

## **Step 4: Run Your App**
Now, run your app and check if the icons appear correctly:

```sh
npx expo start
```

or for bare React Native:

```sh
npx react-native run-android   # For Android
npx react-native run-ios       # For iOS
```

---

### **Final Output:**
✅ **Each tab now has a dynamic icon that changes color when focused!** 🚀  

Would you like to **customize the icons further** (e.g., add badges, change sizes, or animate them)? Let me know! 😊