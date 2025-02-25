import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProductDetail = ({ route, navigation }: any) => {
  const {
    productName = 'Omega Desk Chair Armless',
    skuNumber = '12345',
    msrp = '$1,599',
    styles = 'armless, with arms',
    materials = 'fabric, leather',
    stock = '350 units',
    locations = '15, 8, 4',
    productImage = 'https://via.placeholder.com/300',
  } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Product Image */}
      <Image source={{ uri: productImage }} style={styles.productImage} />

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Product Details</Text>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Product Name</Text>
          <Text style={styles.detailValue}>{productName}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>SKU Number</Text>
          <Text style={styles.detailValue}>{skuNumber}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>MSRP</Text>
          <Text style={styles.detailValue}>{msrp}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Available Styles</Text>
          <Text style={styles.detailValue}>{styles}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Materials</Text>
          <Text style={styles.detailValue}>{materials}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Stock Availability</Text>
          <Text style={styles.detailValue}>{stock}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Locations</Text>
          <Text style={styles.detailValue}>{locations}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginVertical: 5,
  },
});

export default ProductDetail;
