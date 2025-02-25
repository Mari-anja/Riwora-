import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { addCustomer } from './api';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from 'react-native-element-dropdown';

// const customerTypes = [

//   "Add New Customer",
//   "Be Backs",
//   "Pending Deals",
//   "Closed Deals"
// ];



type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type CustomerAddRouteProp = RouteProp<RootStackParamList, 'Customer'>;

const CustomerAdd = (): React.JSX.Element => {
    const navigation = useNavigation<LoginScreenNavigationProp>();


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    

    const [value, setValue] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    

    const customerTypes = [
      { label: 'Add New Customer', value: 'new' },
      { label: 'Be Backs', value: 'be_back' },
      { label: 'Pending Deals', value: 'pending' },
    ];


    const route = useRoute<CustomerAddRouteProp>();
const initialType = route.params?.customerType || "new";  // ✅ Default to "new"
const [customerType, setCustomerType] = useState<string>(initialType);

useEffect(() => {
  if (route.params?.refreshTrigger) {
      setRefreshTrigger(true);
  }
}, [route.params?.refreshTrigger]);


    const handleAddCustomer = async () => {
      if (!firstName || !lastName || !email || !phone || !customerType) {
          Alert.alert("Error", "Please fill in all required fields.");
          return;
      }


      setLoading(true);
      // try {
      //     const response = await addCustomer(firstName, lastName, email, phone, customerType, notes);
      //     Alert.alert("Success", "Customer added successfully!");
      //     navigation.goBack();  // ✅ Navigate back to previous screen
      // } catch (error: unknown) {
      //     console.error("Error adding customer:", error);
      //     if (error instanceof Error) {
      //         Alert.alert("Error", error.message);
      //     } else {
      //         Alert.alert("Error", "An unknown error occurred.");
      //     }
      // }

      try {
        const userId = await AsyncStorage.getItem("user_id");  // ✅ Fetch userId
        if (!userId) {
            Alert.alert("Error", "User not found. Please log in again.");
            return;
        }


        await addCustomer(firstName, lastName, email, phone, customerType, notes, () => {

          setRefreshTrigger((prev) => !prev);
// 🔥 Trigger dashboard update
      });
        // 🔹 **Trigger refresh in NewCustomers.tsx**

        Alert.alert("Success", "Customer added successfully!");

        setTimeout(() => {
          navigation.navigate("Dashboard", { refreshTrigger: new Date().getTime() }); // ✅ Force dashboard refresh
      }, 1000);
        if (customerType === "pending") {
          navigation.navigate("PendingCustomers");
      } else if (customerType === "new") {
          navigation.navigate("NewCustomers");
      }
        navigation.goBack();
    } catch (error) {
        console.error("Error adding customer:", error);
        Alert.alert("Error", "An unknown error occurred.");
    } finally {
        setLoading(false);
    }
  };
        
  //       const response = await addCustomer( firstName, lastName, email, phone, customerType, notes);
  //       Alert.alert("Success", "Customer added successfully!");
  //       navigation.goBack();
  //   } catch (error) {
  //       console.error("Error adding customer:", error);
  //       Alert.alert("Error", "An unknown error occurred.");
  //   }
  //     setLoading(false);
  // };
  
  

    return (
        <View style={styles.container}>

        {/* Input and Forgot Password Container */}
        <View style={styles.inputContainer}>
            <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
                placeholder="E.G Maria"
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
            />
            </View>
            <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
                placeholder="E.G Smith"
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
            />
            </View>

            <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
                placeholder="Enter your work email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            </View>
            <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
                placeholder="123 456 789"
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            </View>

            <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Customer Type</Text>
            <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={customerTypes}
        
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        value={customerType}
        onChange={item => {
          setCustomerType(item.value);
        }}
        />

            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Notes</Text>
                <TextInput
                    placeholder="Type Here"
                    style={styles.notesInput}
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                    textAlignVertical="top"
                />
            </View>
        </View>

        {/* Sign In and Error Container */}
        <View style={styles.signInContainer}>
            <TouchableOpacity style={styles.button} onPress={handleAddCustomer} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? "Adding..." : "Add Customer"}</Text>
            </TouchableOpacity>
            <View style={styles.errorContainer}>
                <Text style={styles.errorIcon}>!</Text>
                <Text style={styles.errorText}>Unable to save your account details</Text>
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
    backgroundColor: '#F5EFDF', 
    padding: 5,
    borderRadius: 4,
    width: '90%',
    // opacity: 0.1, 
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
  notesInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 4,
    fontSize: 16,
    height: 120, 
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 4,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});


export default CustomerAdd;
