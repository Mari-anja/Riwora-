import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert  } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;


const LoginScreen = (): React.JSX.Element => {
    const navigation = useNavigation<LoginScreenNavigationProp>();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        console.log("Login button pressed");
        console.log("Email:", email);
        console.log("Password:", password);

        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }

        setLoading(true);
        try {
            console.log("Sending login request...");
            const response = await loginUser(email, password);
            console.log(" Login Response:", JSON.stringify(response, null, 2))


            if (!response.user_id) {
              console.error("❌ Login failed: user_id missing in response");
              Alert.alert("Error", "Login failed. Please try again.");
              setLoading(false);
              return;
          }
  
          await AsyncStorage.setItem("user_id", response.user_id.toString());  
          console.log("✅ User ID stored in AsyncStorage:", response.user_id);
  

          Alert.alert("Success", "Logged in successfully!");
  

          navigation.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
          });
  
      } catch (error: any) {
          console.error("❌ Login Error:", error);
          Alert.alert("Error", error.response?.data?.error || "Invalid email or password.");
      }
      setLoading(false);
  }
    return (
        <View style={styles.container}>
        {/* Title and Subtitle Container */}
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Don't have an account? 
            <Text 
            style={styles.signUpLink} onPress={() => navigation.navigate('SignUp')}> Sign Up.</Text></Text>
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
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                  placeholder="password"
                  style={styles.input}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
              />
            </View>
            <Text style={styles.forgotPassword} onPress={() => navigation.navigate('Recovery')}>Forgot Password?</Text>
        </View>

        {/* Sign In and Error Container */}
        <View style={styles.signInContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? "Logging in..." : "Sign In"}</Text>
          </TouchableOpacity>
{/*             <View style={styles.errorContainer}>
                <Text style={styles.errorIcon}>!</Text>
                <Text style={styles.errorText}>Unable to save your account details</Text> */}
            </View>
        </View>

        {/* Divider and Social Media Buttons */}
        
            <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.orText}>or sign in with</Text>
            <View style={styles.line} />
            </View>
            <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
                <Text>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
                <Text>LinkedIn</Text>
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
  signUpLink: {
    color: '#007BFF',
    fontWeight: 'bold',
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
  forgotPassword: {
    textAlign: 'right',
    color: '#007BFF',
    marginTop: 10,
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
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 10,
    color: '#666',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 4,
    
  },
});

export default LoginScreen;
