import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from './BottomNavigation'; // Import BottomNavigation

const ProductPage = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState('');

  const products = [
    {
      id: '1',
      name: 'Omega Desk Chair Armless',
      sku: 'sku1',
      image: 'https://via.placeholder.com/50',
    },
    {
      id: '2',
      name: 'Omega Desk Chair With Arms',
      sku: 'sku2',
      image: 'https://via.placeholder.com/50',
    },
    {
      id: '3',
      name: 'Omega Desk Chair With Arms',
      sku: 'sku2',
      image: 'https://via.placeholder.com/50',
    },
    {
      id: '4',
      name: 'Omega Desk Chair With Arms',
      sku: 'sku2',
      image: 'https://via.placeholder.com/50',
    },
    {
      id: '5',
      name: 'Omega Desk Chair With Arms',
      sku: 'sku2',
      image: 'https://via.placeholder.com/50',
    },
  ];

  const renderProductItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() =>
        navigation.navigate('ProductDetail', {
        productName: 'Omega Desk Chair Armless',
      skuNumber: '12345',
      msrp: '$1,599',
      styles: 'armless, with arms',
      materials: 'fabric, leather',
      stock: '350 units',
      locations: '15, 8, 4',
      productImage: 'https://via.placeholder.com/300',
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productSku}>{item.sku}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Products"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
      </View>

      {/* Product List */}
      <FlatList
        data={products.filter((product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        contentContainerStyle={styles.listContent}
      />

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginVertical: 10,
    marginBottom: 40,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f4f4f4',
    borderRadius: 4,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  searchIcon: {
    marginLeft: -30,
  },
  listContent: {
    paddingHorizontal: 30,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DFDFDF',
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  productSku: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default ProductPage;
