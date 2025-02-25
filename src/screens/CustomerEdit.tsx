import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { updateCustomer } from './api';

type CustomerEditScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CustomerEdit'>;

const CustomerEdit = (): React.JSX.Element => {
    const navigation = useNavigation<CustomerEditScreenNavigationProp>();
    const route = useRoute(); 


    const { customer } = route.params as { customer: any };


    const [firstName, setFirstName] = useState(customer.name.split(' ')[0] || '');
    const [lastName, setLastName] = useState(customer.name.split(' ')[1] || '');
    const [email, setEmail] = useState(customer.email);
    const [phone, setPhone] = useState(customer.phone);
    const [customerType, setCustomerType] = useState(customer.type || '');
    const [notes, setNotes] = useState(customer.notes || '');

    const handleUpdateCustomer = async () => {
        try {
            const updatedData = {
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
                type: customerType,
                notes,
            };
    
            console.log("Updating customer with data:", updatedData);
    
            const response = await updateCustomer(customer.id, updatedData);
    
            Alert.alert('Success', 'Customer updated successfully!');
            navigation.goBack(); 
        } catch (error: unknown) {
            console.error('Update Error:', error);
    
            if (error instanceof Error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Error', 'An unknown error occurred');
            }
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
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Phone Number</Text>
                    <TextInput 
                        value={phone} 
                        onChangeText={setPhone} 
                        style={styles.input} 
                        keyboardType="phone-pad"
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Customer Type</Text>
                    <TextInput 
                        value={customerType} 
                        onChangeText={setCustomerType} 
                        style={styles.input} 
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Notes</Text>
                    <TextInput 
                        value={notes} 
                        onChangeText={setNotes} 
                        style={styles.notesInput} 
                        multiline 
                        textAlignVertical="top"
                    />
                </View>
            </View>

            {/* Update Button */}
            <View style={styles.signInContainer}>
                <TouchableOpacity style={styles.button} onPress={handleUpdateCustomer}>
                    <Text style={styles.buttonText}>Update Information</Text>
                </TouchableOpacity>
                <View style={styles.errorContainer}>
{/*                     <Text style={styles.errorIcon}>!</Text>
                    <Text style={styles.errorText}>Unable to save your account details</Text> */}
                </View>
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
    notesInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        borderRadius: 4,
        fontSize: 16,
        height: 120, 
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
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'normal',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: '#F5EFDF', 
        padding: 5,
        borderRadius: 4,
        width: '90%',
    },
    errorIcon: {
        fontSize: 20,
        color: '#D59C00',
        fontWeight: 'bold',
        marginRight: 8,
    },
    errorText: {
        fontSize: 14,
        color: '#000',
    },
});

export default CustomerEdit;
