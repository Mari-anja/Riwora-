import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { registerUser } from './api';

type SignScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

const SignScreen = (): React.JSX.Element => {
    const navigation = useNavigation<SignScreenNavigationProp>();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        console.log("Sign Up button pressed");
        console.log("First Name:", firstName);
        console.log("Last Name:", lastName);
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Company Name:", companyName);

        if (!firstName || !lastName || !email || !password) {
            Alert.alert("Error", "All fields except company name are required.");
            return;
        }

        setLoading(true);
        try {
            console.log("Sending signup request...");
            const response = await registerUser(firstName, lastName, companyName, email, password);
            console.log("Signup Response:", response);
            Alert.alert("Success", "Account created successfully!");
            navigation.navigate('Login');
        } catch (error: any) {
            console.error("Signup Error:", error);
            let errorMessage = "Signup failed due to an unknown error.";

            if (error.response && error.response.data && error.response.data.error) {
                errorMessage = error.response.data.error;  
            }
            Alert.alert("Error", error.response?.data?.error || "Signup failed due to an unknown error.");
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Create an Account</Text>
                <Text style={styles.subtitle}>
                    Already have an account? 
                    <Text style={styles.signInLink} onPress={() => navigation.navigate('Login')}> Sign In.</Text>
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.row}>
                    <View style={[styles.inputGroup, styles.halfInput]}>
                        <Text style={styles.inputLabel}>First Name</Text>
                        <TextInput
                            placeholder="e.g. Maria"
                            style={styles.input}
                            value={firstName}
                            onChangeText={(text) => setFirstName(text)}
                        />
                    </View>
                    <View style={[styles.inputGroup, styles.halfInput]}>
                        <Text style={styles.inputLabel}>Last Name</Text>
                        <TextInput
                            placeholder="e.g. Smith"
                            style={styles.input}
                            value={lastName}
                            onChangeText={(text) => setLastName(text)}
                        />
                    </View>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Company name (Optional)</Text>
                    <TextInput
                        style={styles.input}
                        value={companyName}
                        onChangeText={(text) => setCompanyName(text)}
                    />
                </View>
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

            <View style={styles.signInContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? "Signing Up..." : "Sign Up"}</Text>
                </TouchableOpacity>
            </View>

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
    container: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'space-between' },
    headerContainer: { alignItems: 'center', marginBottom: 20 },
    title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    subtitle: { fontSize: 16, color: '#666', textAlign: 'center' },
    signInLink: { color: '#007BFF', fontWeight: 'bold' },
    inputContainer: { marginBottom: 20 },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    inputGroup: { marginBottom: 15 },
    halfInput: { flex: 1, marginHorizontal: 5 },
    inputLabel: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8 },
    forgotPassword: { textAlign: 'right', color: '#007BFF', marginTop: 10 },
    signInContainer: { alignItems: 'center', marginBottom: 20 },
    button: { borderWidth: 1, borderColor: '#000', padding: 15, borderRadius: 8, alignItems: 'center', width: '100%' },
    buttonText: { color: '#000', fontSize: 16, fontWeight: 'normal' },
    divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
    line: { flex: 1, height: 1, backgroundColor: '#ddd' },
    orText: { marginHorizontal: 10, color: '#666' },
    socialButtons: { flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 40 },
    socialButton: { flex: 1, backgroundColor: '#f0f0f0', padding: 15, alignItems: 'center', marginHorizontal: 5, borderRadius: 8 }
});

export default SignScreen;
