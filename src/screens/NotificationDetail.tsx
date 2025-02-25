import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from './BottomNavigation'; // Make sure this is the correct import

const NotificationDetail = ({ route, navigation }: any) => {
  const { title, description } = route.params;

  const handleDelete = () => {
    Alert.alert('Delete Notification', 'Are you sure you want to delete this notification?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Title and Trash Icon */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={handleDelete}>
            <Icon name="delete" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      {/* Mark As Read Button */}
      <TouchableOpacity style={styles.markAsReadButton}>
        <Text style={styles.markAsReadText}>Mark As Read</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} activeTab="Notifications" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E7E9',
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  descriptionContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E8E7E9',
    padding: 15,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  description: {
    fontSize: 16,
    color: '#000',
  },
  markAsReadButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  markAsReadText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default NotificationDetail;




