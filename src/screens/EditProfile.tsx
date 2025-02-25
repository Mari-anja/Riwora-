import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { updateUserProfile } from './api';


type EditProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditProfile'>;

const EditProfile = (): React.JSX.Element => {
    const navigation = useNavigation<EditProfileScreenNavigationProp>();
    const route = useRoute();


    const { user } = route.params as { user: any } || {}


    const [firstName, setFirstName] = useState(user?.first_name || '');
    const [lastName, setLastName] = useState(user?.last_name || '');
    const [email, setEmail] = useState(user?.email || '');

    const handleUpdateProfile = async () => {
        try {
            if (!user?.id) {  
                Alert.alert("Error", "User ID is missing.");
                return;
            }
    

            const updatedData = {
                user_id: user.id,
                updates: {
                    first_name: firstName,
                    last_name: lastName,
                    email,
                }
            };
            console.log("Sending profile update:", updatedData);

            const updatedUser = await updateUserProfile(user.id, updatedData);


            if (!updatedUser || updatedUser.error) {
                throw new Error(updatedUser.error || "Failed to update profile.");
            }

            Alert.alert("Success", "Profile updated successfully!");


            navigation.navigate("Profile", { user: updatedUser });

        } catch (error) {
            console.error("Update Error:", error);
            Alert.alert("Error", "Failed to update profile.");
        }
    };

    return (
        <View style={styles.container}>
            {/* Input Fields */}
            <View style={styles.inputContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>First Name</Text>
                    <TextInput 
                        value={firstName} 
                        onChangeText={setFirstName} 
                        style={styles.input} 
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Last Name</Text>
                    <TextInput 
                        value={lastName} 
                        onChangeText={setLastName} 
                        style={styles.input} 
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput 
                        value={email} 
                        onChangeText={setEmail} 
                        style={styles.input} 
                        keyboardType="email-address"
                    />
                </View>
            </View>

            {/* Update Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
                    <Text style={styles.buttonText}>Update Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'space-between',
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
    buttonContainer: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 4,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default EditProfile;
