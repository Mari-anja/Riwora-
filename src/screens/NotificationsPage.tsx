import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from './BottomNavigation';
import { ChevronsRight, Search } from "lucide-react-native";

const notificationsData = [
  {
    id: '1',
    title: 'Follow-Up Alert',
    description:
      'Reminder to check in with Sarah K. about her recent inquiry on the Ava Lounge Chair. It’s been 3 days since your last interaction.',
    date: 'Today',
  },
  {
    id: '2',
    title: 'Inventory Update',
    description:
      'New stock alert: The Ava Lounge Chair is back in stock with 50 units available. Check inventory for details.',
    date: 'Today',
  },
  {
    id: '3',
    title: 'Weekly Report',
    description:
      'Prepare a detailed report on customer feedback regarding the Ava Lounge Chair. Highlight key insights and opportunities for improvement.',
    date: '10.3.24',
  },
  {
    id: '4',
    title: 'Follow-Up Suggestion',
    description:
      'Hey, James! Sarah mentioned interest in upgrading her sectional. A quick note about our new designs might catch her attention!',
    date: '9.25.24',
  },
  {
    id: '5',
    title: 'Product Launch Meeting',
    description:
      'Schedule a meeting to discuss the launch strategy for the new product line. Include marketing and sales teams.',
    date: '9.15.24',
  },
];

const NotificationsPage = ({ navigation }: any) => {
  const renderNotificationItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.notificationItem}
      onPress={() =>
        navigation.navigate('NotificationDetail', {
          title: item.title,
          description: item.description,
        })
      }
    >
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationDate}>{item.date}</Text>
        </View>
        <View style={styles.notificationd}>
            <Text style={styles.notificationDescription}>{item.description}</Text>
            <ChevronsRight size={24} color="#000" style={styles.chevronIcon} />
        </View>
      </View>
      
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
    <View style={styles.container}>

    <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#888"
        />
        <Search size={20} color="#888" style={styles.searchIcon} />
      </View>

      {/* Notifications List */}
      <FlatList
        data={notificationsData}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationItem}
        contentContainerStyle={styles.listContent}
      />

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} activeTab="Notifications" />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,  // ✅ Ensures entire screen is used
    backgroundColor: '#FFF',
},
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerTitle: {
    alignItems: "center",
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  searchIcon: {
    marginLeft: -30,
  },
  listContent: {
    paddingHorizontal: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
  },
  notificationContent: {
    flex: 1,
    marginRight: 10,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationDate: {
    fontSize: 12,
    color: '#888',
    marginLeft: 10,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  chevronIcon: {
    alignSelf: 'center',
  },
  notificationd: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
  }
});

export default NotificationsPage;
