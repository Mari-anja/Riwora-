import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import BottomNavigation from './BottomNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchBeBackCustomers } from './api';  // ✅ Import API function
import { ChevronsRight, ChevronLeft } from "lucide-react-native";

type BeBackCustomersProps = NativeStackScreenProps<RootStackParamList, 'BeBackCustomers'>;

const BeBackCustomers: React.FC<BeBackCustomersProps> = ({ navigation }) => {
    const [customers, setCustomers] = useState<{ id: string; name: string; phone: string; email: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    useEffect(() => {
        const getCustomers = async () => {
            const data = await fetchBeBackCustomers();  // ✅ No need to pass userId manually
            setCustomers(data);
            setLoading(false);
        };
    
        getCustomers();
    }, [refreshTrigger]);

    const renderCustomer = ({ item }: { item: { id: string; name: string; phone: string; email: string } }) => (
        <TouchableOpacity
            style={styles.customerItem}
            onPress={() => navigation.navigate('CustomerProfile', { customer: item })}
        >
            <Text style={styles.customerName}>{item.name}</Text>
            <ChevronsRight size={22} color="#727272" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>


            <View style={styles.header}>
        <TouchableOpacity style={styles.goback} onPress={() => navigation.goBack()}>
          <ChevronLeft size={20} color="#727272" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tasks</Text>
        <View style={{ width: 32 }} /> 
      </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#000" />
                ) : customers.length > 0 ? (
                    <FlatList
                        data={customers}
                        keyExtractor={(item) => item.id}
                        renderItem={renderCustomer}
                        contentContainerStyle={styles.listContainer}
                    />
                ) : (
                    <Text style={styles.noCustomers}>No return appointments found.</Text>
                )}
            </View>

            {/* ✅ Bottom Navigation Always at Bottom */}
            <BottomNavigation navigation={navigation} activeTab="BeBackCustomers" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    goback: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#DADADA",
        padding: 4,
        alignSelf: "flex-start",
      },
      header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderBottomWidth: 1,
        borderBottomColor: "#EEEEEE",
      },
      headerTitle: {
        fontSize: 22,
        fontWeight: "600",
        marginLeft: 10,
      },
    safeContainer: {
        flex: 1,  // ✅ Ensures entire screen is used
        backgroundColor: '#FFF',
    },
    container: { flex: 1, backgroundColor: '#FFF' },
    listContainer: { paddingHorizontal: 20 },
    customerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 4,
        marginVertical: 5,
        backgroundColor: '#FFF',
    },
    customerName: { fontSize: 16, fontWeight: '500' },
    noCustomers: { textAlign: 'center', marginTop: 20, fontSize: 16, color: 'gray' },
});

export default BeBackCustomers;
