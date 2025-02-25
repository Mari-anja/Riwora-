import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IntegrationSettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Integration Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default IntegrationSettingsScreen;
