import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from './BottomNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { ChevronRight, ShoppingBag, ChevronsRight, User } from "lucide-react-native";
type SearchResultsProps = NativeStackScreenProps<RootStackParamList, 'SearchResultsByCustomer'>;

const orders = [
    { id: '00023', date: '24.12.2024', price: '145 $' },
    { id: '00024', date: '24.12.2024', price: '145 $' },
    { id: '00025', date: '24.12.2024', price: '145 $' },
];

const SearchResultsByCustomer: React.FC<SearchResultsProps> = ({ route, navigation }) => {
    const { customer } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Search Results</Text>

            {/* Main Wrapper for Customer and Orders */}
            <View style={styles.cardWrapper}>
                {/* Customer Information */}
                <View style={styles.customerCard}>
                    <View style={styles.textContainer}>
                        <Text style={styles.customerName}>{customer.first_name} {customer.last_name}</Text>
                        <Text style={styles.customerId}>Client ID: {customer.clientId}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('CustomerProfile', { customer: { 
        id: customer.id, 
        name: `${customer.first_name} ${customer.last_name}`, 
        phone: customer.phone || "No Phone Available",  
        email: customer.email || "No Email Available"
    } })}>
                        <User size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Order List */}
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('OrderDetails', { order: item, customer })}
                            style={styles.orderItem}>
                            <ShoppingBag size={24} color="#000" style={styles.icon} />
                            <View style={styles.orderDetails}>
                                <Text style={styles.orderId}>Order Id: {item.id}</Text>
                                <Text style={styles.orderInfo}>{item.date} | {item.price}</Text>
                            </View>
                            <ChevronsRight size={18} color="#000" />
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* Fixed Bottom Navigation */}
            <View style={styles.bottomNavWrapper}>
                <BottomNavigation navigation={navigation} activeTab="Search" />
            </View>
        </View>


    );
    
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#fff', 
        padding: 20 
    },

    header: { 
        fontSize: 22, 
        fontWeight: 'normal',
        padding: 16,
         
    },

    /* ⬇️ Main wrapper that ends at last order */
    cardWrapper: {
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#DFDFDF',
        padding: 15,
        marginBottom: 80, // ⬅️ Leaves space for BottomNavigation
    },

    customerCard: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingBottom: 24, 
        paddingTop: 12,
        borderColor: '#DFDFDF'
    },

    customerName: { 
        fontSize: 18, 
        fontWeight: 'normal' 
    },

    textContainer: { 
        flexDirection: 'column' 
    },

    customerId: { 
        fontSize: 14, 
        color: '#777' 
    },

    orderItem: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 18, 
        borderRadius: 4, 
        backgroundColor: '#f4f4f4', 
        marginBottom: 8 
    },

    icon: { 
        width: 24, 
        height: 24, 
        marginRight: 10 
    },

    orderDetails: { 
        flex: 1 
    },

    orderId: { 
        fontSize: 16, 
        fontWeight: 'normal' 
    },

    orderInfo: { 
        fontSize: 14, 
        color: '#777' 
    },

    /* ⬇️ Fixing BottomNavigation */
    bottomNavWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopWidth: 0,
        borderColor: '#DFDFDF'
    }
});




export default SearchResultsByCustomer;
