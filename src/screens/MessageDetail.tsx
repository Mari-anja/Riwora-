import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Mic, Send, ChevronLeft } from "lucide-react-native";

const API_URL = 'http://localhost:5001/api';
// If on Android emulator, use: const API_URL = 'http://10.0.2.2:5001/api';

const MessageDetail = ({ route, navigation }: any) => {
  const { customerId, customerName } = route.params;
  const [messages, setMessages] = useState<any[]>([]);
  const [messageText, setMessageText] = useState('');
  const [customerFullName, setCustomerFullName] = useState('');

  const fetchConversation = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      if (!userId) {
        console.error('🚨 No user_id found in AsyncStorage');
        return;
      }

      const response = await fetch(`${API_URL}/messages/conversation?sender=${userId}&receiver=${customerId}`);
      const data = await response.json();
      setMessages(data || []);
    } catch (error) {
      console.error('❌ Error fetching conversation:', error);
    }
  };

  useEffect(() => {
    fetchCustomerDetails();
    fetchConversation();
  }, [customerId]);

  // Function to format message dates
  const formatMessageDate = (dateString: string) => {
    const messageDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString('en-GB');
    }
  };

  const fetchCustomerDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/customer/${customerId}`);
      const data = await response.json();
      setCustomerFullName(`${data.firstName} ${data.lastName}`);
    } catch (error) {
      console.error('❌ Error fetching customer details:', error);
    }
  };

  // Fetch conversation between the logged-in user and the customer
  const handleSend = useCallback(async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      if (!userId) {
        console.error('🚨 No user_id found in AsyncStorage');
        return;
      }
      if (!messageText.trim()) {
        return; 
      }

      const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: userId,
          receiver: customerId,
          content: messageText.trim(),
        }),
      });
      const result = await response.json();
      if (result.error) {
        console.error('❌ Failed to send message:', result.error);
        return;
      }

      const newMessage = {
        _id: Date.now().toString(),
        sender: userId,
        receiver: customerId,
        message: messageText.trim(),
        date: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, newMessage]);
      setMessageText(''); 

      await fetchConversation();
    } catch (error) {
      console.error('❌ Error sending message:', error);
    }
  }, [messageText, customerId]);


  // Handle sending a new message


  // Render each message bubble.
  const renderItem = ({ item }: { item: any }) => {
    const isMine = item.sender !== customerId;
    return (
      <View
        style={[
          styles.messageContainer,
          isMine ? styles.myMessage : styles.theirMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.messageDate}>{formatMessageDate(item.date)}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.goback} onPress={() => navigation.goBack()}>
              <ChevronLeft size={20} color="#727272" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{customerName}</Text>
            <View style={{ width: 32 }} /> 
          </View>


          {/* Conversation */}
          <FlatList
            data={messages}
            keyExtractor={(item, index) => item._id || index.toString()} // ✅ Ensures unique keys
            renderItem={renderItem}
            style={{ flex: 1, padding: 10 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          {/* Suggested Responses */}
          <View style={styles.suggestionsContainer}>
            <TouchableOpacity style={styles.suggestionBubble}>
              <Text style={styles.suggestionText}>
                Hello! Thanks for reaching out. We have sofas in stunning...
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suggestionBubble}>
              <Text style={styles.suggestionText}>
                Thank you! Let me recommend some options for you.
              </Text>
            </TouchableOpacity>
          </View>

          {/* Input Section */}
          <View style={styles.inputContainer}>
            <TouchableOpacity>
              <Mic size={24} color="#000" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Type a message"
              placeholderTextColor="#888"
              value={messageText}
              onChangeText={setMessageText}
            />
            <TouchableOpacity onPress={handleSend}>
              <Send size={24} color="#007BFF" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    marginTop: 50,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginLeft: 10,
  },
  goback: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#DADADA",
    padding: 4,
    alignSelf: "flex-start",
  },
  messageContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 4,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#D6D6D6',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f4f4f4',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  messageDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    textAlign: 'right',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  suggestionBubble: {
    backgroundColor: '#f4f4f4',
    borderRadius: 4,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  suggestionText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default MessageDetail;
