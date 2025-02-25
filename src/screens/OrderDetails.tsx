import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { ShoppingBag, MapPinned, User } from "lucide-react-native";

type OrderDetailsProps = NativeStackScreenProps<RootStackParamList, 'OrderDetails'>;

const OrderDetails: React.FC<OrderDetailsProps> = ({ route, navigation }) => {
    const { order, customer } = route.params;

    return (
        <View style={styles.container}>
            {/* Header */}

            {/* Order Summary */}
            <View style={styles.orderContainer}>
                <View style={styles.orderDetails}>
                    <Text style={styles.orderId}>Order Id: 00024</Text>
                    <Text style={styles.orderDate}>24.12.2024</Text>
                </View>
                <Text style={styles.orderTotal}>Total: 145 $</Text>
                </View>

            <Text style={styles.sectionTitle}>Order Information</Text>

            {/* Order Information */}
            <View style={styles.infoCard}>
                <User size={20} color="#000" />
                <View style={styles.name}>
                <Text style={styles.infoText}>Customer: </Text> 
                <Text style={styles.infoText2}>{customer.first_name} {customer.last_name} </Text> 
                </View>
            </View>

            <View style={styles.infoCard}>
                <MapPinned size={20} color="#000" />
                <Text style={styles.infoText}>Address: {order.address}</Text>
            </View>

            {/* Items Purchased */}
            <Text style={styles.sectionTitle}>Items Purchased</Text>
            <FlatList
                data={order.items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemCard}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <View>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemSku}>{item.sku}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    orderContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center', 
        backgroundColor: '#FFFFFF', 
        borderWidth: 1, 
        borderColor: '#DFDFDF', 
        borderRadius: 4, 
        padding: 15, 
        marginHorizontal: 16,
        marginBottom: 24,
        marginTop: 24,
        
      },
      orderDetails: {
        flexDirection: 'column',
      },
      orderId: {
        fontSize: 16,
        fontWeight: '400', 
      },
      orderDate: {
        fontSize: 14,
        color: '#777',
      },
      orderTotal: {
        fontSize: 16,
        fontWeight: '700', 
        textAlign: 'right',
      },
    totalText: {fontSize: 16,fontWeight: 'bold', color: '#000'},
    infoCard: { flexDirection: 'row', alignItems: 'center', padding: 18, marginHorizontal: 16, backgroundColor: '#FFFFFF', borderRadius: 8, marginBottom: 8, borderColor: '#DFDFDF', borderWidth: 1, }, 
    infoText: { fontSize: 14, marginLeft: 8 },
    sectionTitle: { fontSize: 18, fontWeight: 'semibold', margin: 16 },
    itemCard: { flexDirection: 'row', alignItems: 'center', padding: 12, marginHorizontal: 16, backgroundColor: '#f9f9f9', borderRadius: 8, marginBottom: 8 },
    itemImage: { width: 50, height: 50, borderRadius: 8, marginRight: 16 },
    itemName: { fontSize: 16, fontWeight: '600' },
    itemSku: { fontSize: 12, color: '#888' },
    name: { flex: 1,
        flexDirection: 'column'},
    infoText2: {fontSize: 16,opacity: 0.5, color: '#000', paddingLeft:8},
});

export default OrderDetails;
