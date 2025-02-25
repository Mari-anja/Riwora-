import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text, Alert } from 'react-native';

import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { Home, Send, Bell, User } from "lucide-react-native"; 

const BottomNavigation = ({ navigation }: any) => {
  const route = useRoute(); 
  const activeTab = route.name;
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("user_id");
      setUserId(storedUserId);
    };
    fetchUserId();
  }, []);

  return (
    <View style={styles.container}>
      {/* Home */}
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
      <Home size={24} color={activeTab === 'Home' ? '#007BFF' : '#000'} />
      </TouchableOpacity>

      {/* Messages */}
      <TouchableOpacity onPress={() => navigation.navigate('Sent')}>
      <Send size={24} color={activeTab === 'Messages' ? '#007BFF' : '#000'} />
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity onPress={() => navigation.navigate('AIAssistant')}>
        <View>
        <Image
          source={require('../assets/images/midbutton.png')} 
          style={[
            styles.profileImage,
            activeTab === 'Profile' && styles.activeImage,
          ]}
        />
        </View>
      </TouchableOpacity>

      {/* Notifications */}
      <TouchableOpacity onPress={() => navigation.navigate('NotificationsPage')}>

        <Bell size={24} color={activeTab === 'Notifications' ? '#007BFF' : '#000'} />

      </TouchableOpacity>

      {/* Account */}
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      <User size={24} color={activeTab === 'Account' ? '#007BFF' : '#000'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  activeImage: {
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  notificationContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -4,
    backgroundColor: '#FF0000',
    width: 16,
    height: 16,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default BottomNavigation;
