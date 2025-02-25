import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavigation from './BottomNavigation';
import { ChevronsRight } from 'lucide-react-native';

const API_URL = 'http://localhost:5001/api/messages';
const CUSTOMER_API_URL = 'http://localhost:5001/api/customer';

// Function to format the message date
const formatMessageDate = (dateString: string) => {
  const messageDate = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (messageDate.toDateString() === today.toDateString()) {
    return "Today";
  } else if (messageDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return messageDate.toLocaleDateString("en-GB"); // Formats to DD/MM/YYYY
  }
};

const SentPage = ({ navigation }: any) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      if (!userId) {
        console.error('🚨 No user_id found in AsyncStorage');
        setLoading(false);
        return;
      }

      // 🔹 Fetch messages
      const response = await fetch(`${API_URL}?user_id=${userId}`);
      const responseText = await response.text();

      console.log("🔹 Raw API Response:", responseText);

      // ✅ Check if response is valid JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("❌ Error parsing JSON response:", jsonError);
        setLoading(false);
        return;
      }

      if (!Array.isArray(data)) {
        console.error("❌ API did not return an array:", data);
        setLoading(false);
        return;
      }

      // ✅ Store only the **latest** message per customer (avoids duplicates)
      const latestMessages = new Map();
      data.forEach((msg: any) => {
        if (!latestMessages.has(msg.receiver) || new Date(msg.date) > new Date(latestMessages.get(msg.receiver).date)) {
          latestMessages.set(msg.receiver, msg);
        }
      });

      // ✅ Extract **unique** customer IDs
      const customerIds = Array.from(latestMessages.keys()).filter(id => id !== null);
      const customersMap: Record<string, string> = {};

      // 🔹 Fetch Customer Names
      for (const customerId of customerIds) {
        try {
          const customerResponse = await fetch(`${CUSTOMER_API_URL}/${customerId}`);
          const customerResponseText = await customerResponse.text();

          console.log(`🔹 Raw Customer API Response for ${customerId}:`, customerResponseText);

          // ✅ Parse the response safely
          let customerData;
          try {
            customerData = JSON.parse(customerResponseText);
          } catch (customerError) {
            console.error(`❌ JSON Parse Error for Customer ${customerId}:`, customerError);
            continue;
          }

          if (customerData.firstName && customerData.lastName) {
            customersMap[customerId] = `${customerData.firstName} ${customerData.lastName}`;
          } else {
            console.error(`❌ Customer data missing for ${customerId}`, customerData);
            customersMap[customerId] = "Unknown User";
          }
        } catch (customerFetchError) {
          console.error(`❌ Error fetching customer ${customerId}:`, customerFetchError);
        }
      }

      // ✅ Attach names to messages and ensure **only one message per customer**
      const uniqueMessages = Array.from(latestMessages.values()).map((msg) => ({
        ...msg,
        customerName: customersMap[msg.receiver] || "Unknown User",
      }));

      setMessages(uniqueMessages);
    } catch (error) {
      console.error("❌ Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderSentMessageItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() =>
        navigation.navigate('MessageDetail', {
          customerId: item.receiver,
          customerName: item.customerName, // ✅ Send actual customer name
        })
      }
    >
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.messageSender}>{item.customerName}</Text>
          <Text style={styles.messageDate}>{formatMessageDate(item.date)}</Text>
        </View>
        <View style={styles.messageFooter}>
          <Text style={styles.messageText} numberOfLines={1} ellipsizeMode="tail">
            {item.message}
          </Text>
          <ChevronsRight size={22} color="#727272" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

        <View style={styles.contentContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search"
              style={styles.searchInput}
              placeholderTextColor="#888"
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
          ) : messages.length === 0 ? (
            <View style={styles.noMessagesContainer}>
              <Text style={styles.noMessagesText}>No messages available</Text>
            </View>
          ) : (
            <FlatList
              data={messages}
              keyExtractor={(item) => item._id}
              renderItem={renderSentMessageItem}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>

        <BottomNavigation navigation={navigation} activeTab="Sent" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
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
  contentContainer: {
    flex: 1,
    paddingBottom: 10,
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
    borderRadius: 4,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  listContent: {
    paddingHorizontal: 20,
  },
  messageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    padding: 15,
    marginVertical: 10,
  },
  messageContent: {
    flex: 1,
    marginRight: 10,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  messageSender: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  messageDate: {
    fontSize: 12,
    color: '#888',
    marginLeft: 10,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    paddingRight: 5,
  },
  messageText: {
    fontSize: 14,
    color: '#666',
    flexShrink: 1,
    marginRight: 10,
  },
  noMessagesContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  noMessagesText: {
    fontSize: 18,
    color: '#888',
  },
});

export default SentPage;
