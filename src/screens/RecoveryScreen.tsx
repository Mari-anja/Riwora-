import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import { forgotPassword } from './api';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;


const RecoveryScreen = (): React.JSX.Element => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {
        console.log("Forgot Password button pressed");
        console.log("Email:", email);

        if (!email) {
            Alert.alert("Error", "Please enter your email.");
            return;
        }

        setLoading(true);
        try {
            console.log("Sending forgot password request...");
            const response = await forgotPassword(email);
            console.log("Forgot Password Response:", response);

            Alert.alert("Success", "Password reset link sent to your email.");
            
            // ✅ IF YOU HAD A RESET PAGE, YOU WOULD NAVIGATE NOW
            // navigation.navigate('ResetPassword');  

        } catch (error: any) {
            console.error("Forgot Password Error:", error);
            Alert.alert("Error", error.response?.data?.error || "User not found.");
        }
        setLoading(false);
    };


    return (
        <View style={styles.container}>
        {/* Title and Subtitle Container */}
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Account recovery</Text>
            <Text style={styles.subtitle}>Enter the email addresses associated with your account and we’ll send you a link to reset your password </Text>
        </View>

        {/* Input and Forgot Password Container */}
        <View style={styles.inputContainer}>
            <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
                placeholder="email@company.com"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            </View>
            <View style={styles.errorContainer}>
                <Text style={styles.errorIcon}>!</Text>
                <Text style={styles.errorText}>Unable to save your account details</Text>
            </View>
        </View>

        {/* Sign In and Error Container */}
        <View style={styles.signInContainer}>
          <TouchableOpacity style={styles.button} onPress={handleForgotPassword} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? "Sending..." : "Send"}</Text>
          </TouchableOpacity>
        </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'ClashGrotesk',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'ClashGrotesk',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 4,
  },
  signInContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#FCE4E4', 
    padding: 5,
    borderRadius: 4,
    width: '90%',
  },
  errorIcon: {
    fontSize: 20,
    color: '#FF0000',
    fontWeight: 'bold',
    marginRight: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#FF0000',
     
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'normal',
  },
  error: {
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default RecoveryScreen;
