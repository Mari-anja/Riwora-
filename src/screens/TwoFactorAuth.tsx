import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TwoFactorAuth = () => {
  return (
    <View style={styles.container}>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.description}>
          To Enable Two-Factor Authentication, Start By Logging Into Your Account Settings. Look For The Security Section, Where You Should Find An Option For Two-Factor Authentication. Click On It And Follow The Prompts To Link Your Phone Number Or Authentication App. Once Set Up, You'll Receive A Verification Code Each Time You Log In, Adding An Extra Layer Of Security To Your Account.
        </Text>
      </View>

      {/* Set Up Button */}
      <TouchableOpacity style={styles.setupButton}>
        <Text style={styles.setupButtonText}>Set Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'justify',
  },
  setupButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 20, // Adds space between button and bottom edge
  },
  setupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TwoFactorAuth;
