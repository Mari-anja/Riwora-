import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { ChevronsRight, User } from "lucide-react-native";
import BottomNavigation from './BottomNavigation';
import axios from "axios";

const API_BASE_URL = 'http://127.0.0.1:5001/api';

interface Customer {
    id: string;
    first_name: string;
    last_name: string;
    clientId: string;
  }
  


const RecentSearch: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);
  
    const handleSearch = async (query: string) => {
      setSearchQuery(query);
      if (!query.trim()) {
        setCustomers([]); // Clear results if empty search
        return;
      }
  
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/search-customers?query=${query}`);
        setCustomers(response.data || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
            </View>

            {/* Recent Search Section */}
            <Text style={styles.sectionTitle}>Recent Search</Text>
            {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
            <FlatList
                data={customers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    
                    <TouchableOpacity style={styles.searchItem} 
                    onPress={() => navigation.navigate('SearchResultsByCustomer', { customer: { 
                        id: item.id, 
                        first_name: item.first_name, 
                        last_name: item.last_name,
                        clientId: item.clientId
                    } })}>
                        

                        <View style={styles.iconAndText}>
                        <User size={24} color="#888" />
                            <Text style={styles.searchText}>{item.first_name} {item.last_name}</Text>

                        </View>
                        <ChevronsRight size={24} color="#888" />
                    </TouchableOpacity>
                )}
            />
        )}    

            {/* Bottom Navigation */}
            <BottomNavigation navigation={navigation} activeTab="Search" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 4,
    },
    cancelText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#007AFF',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'normal',
        marginBottom: 16,
    },
    searchItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 24,
        borderRadius: 4,
        marginBottom: 8,
        justifyContent: 'space-between',
    },
    iconAndText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    searchText: {
        fontSize: 16,
        paddingLeft: 8,
    },
});

export default RecentSearch;
