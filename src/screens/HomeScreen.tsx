

import React from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import LinearGradient from 'react-native-linear-gradient';



type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;


const HomeScreen = (): React.JSX.Element => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <LinearGradient
      colors={['#D1E7F5', '#F6D5C2']}
      style={styles.gradientContainer}>

      <View style={styles.container}>
        {/* Centered Content */}
        <View style={styles.centerContainer}>
          {/* Logo */}
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
          />

          {/* Title */}
          <Text style={styles.title}>Riwora</Text>
          {/* Subtitle */}
        <Text style={styles.subtitle}>Automate Follow-Ups, Close More Deals</Text>
        </View>

        
        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}>try riwora</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>

          <Text style={styles.signInText}>
            Already have an account?{' '}
            <Text style={styles.signInLink}
            onPress={() => navigation.navigate('Login')}>
                Sign In.</Text>
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  logo: {
    width: 100, 
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    textAlign: 'center',
    color: '#333',
    marginTop: 60,
    marginBottom: 30,
    fontFamily: 'ClashGrotesk',
    marginHorizontal: 10,
  },

  footer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },

  button: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'center',
    marginBottom: 10, 
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginRight: 10,
  },
  arrow: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  signInText: {
    fontSize: 14,
    color: '#666',
  },
  signInLink: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default HomeScreen;

