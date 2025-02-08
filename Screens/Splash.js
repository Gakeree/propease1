import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Splash = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Welcome'); // Redirect after 3 seconds
        }, 3000);
    }, [navigation]);

    return (
        <View style={styles.container}>
            {/* Image with Fade-in Animation */}
            <Animatable.Image
                source={require('../assets/4.png')}  // Ensure correct image path
                style={styles.logo}
                animation="fadeInDown"
                duration={1500}
            />

            {/* Text with Bounce Animation */}
            <Animatable.Text
                style={styles.text}
                animation="bounceIn"
                duration={2000}
                delay={500}
            >
                Propease
            </Animatable.Text>
        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    text: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
    },
});
