import React, { useEffect, useState } from 'react';
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchUserProfile, updateNotificationPreferences } from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavigation from './BottomNavigation'; // Import the BottomNavigation component
import { ChevronRight, Shield, ChevronsRight, ChevronsDown, Settings, Bell, User, Pencil } from "lucide-react-native";

type RouteParams = {
  Profile: { userId: string };
};

// ✅ Define User Type
type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  notifications?: {
    pushNotifications: boolean;
    newMessages: boolean;
    newCustomers: boolean;
    newTasks: boolean;
  };
};

type ProfileScreenRouteProp = RouteProp<{ Profile: { userId: string } }, 'Profile'>;

const ProfileScreen = ({ navigation }: any) => {
  const route = useRoute<ProfileScreenRouteProp>();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>(""); // Ensures userId is always a string
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(true);
  const [showSecurityDropdown, setShowSecurityDropdown] = useState(false);

  const [preferences, setPreferences] = useState({
    pushNotifications: true,
    newMessages: false,
    newCustomers: true,
    newTasks: true,
  });

// ✅ Runs when screen first loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let storedUserId = await AsyncStorage.getItem("user_id");

        if (!storedUserId && route.params?.userId) {
          storedUserId = route.params.userId;
        }

        if (!storedUserId) {
          console.error("⚠️ No userId found");
          return;
        }

        setUserId(storedUserId);

        // ✅ Fetch user profile
        const userData = await fetchUserProfile(storedUserId);
        if (userData) {
          setUser(userData);

          // ✅ Set notification preferences from backend
          if (userData.notifications) {
            setPreferences(userData.notifications);
          }
        } else {
          console.error("⚠️ User profile not found.");
        }
      } catch (error) {
        console.error("⚠️ Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // ✅ Runs every time the user returns to the profile screen
  useFocusEffect(
  React.useCallback(() => {
    const fetchUserData = async () => {
      try {
        let storedUserId = await AsyncStorage.getItem("user_id");
        if (!storedUserId) {
          console.error("⚠️ No userId found");
          return;
        }

        const userData = await fetchUserProfile(storedUserId);
        if (userData) {
          setUser(userData);
          if (userData.notifications) {
            setPreferences(userData.notifications);
          }
        }
      } catch (error) {
        console.error("⚠️ Error fetching user profile:", error);
      }
    };

    fetchUserData();
  }, [])
  );


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* User Information */}
        <View style={styles.userInfo}>
          <View style={styles.textContainer}>
            <Text style={styles.userName}>{user?.first_name} {user?.last_name}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("EditProfile", { user: { ...user, id: userId } })}>
            <Pencil size={22} color="#727272" />
          </TouchableOpacity>
        </View>

        {/* Settings Options */}
        <View style={styles.settingsContainer}>
          {/* Notification Preferences */}
          <TouchableOpacity
            style={styles.settingsOption}
            onPress={() => setShowNotificationDropdown(!showNotificationDropdown)}
          >
            <Bell size={22} color="#727272" />
            <Text style={styles.settingsText}>Notification Preferences</Text>
            <ChevronsDown size={22} color="#727272" />
          </TouchableOpacity>

          {/* Notification Dropdown */}
          {showNotificationDropdown && (
            <View style={styles.dropdownContainer}>
              {Object.entries(preferences).map(([key, value]) => (
                <View style={styles.dropdownItem} key={key}>
                  <Text style={styles.dropdownText}>
                    {key === "pushNotifications"
                      ? "Allow Push Notifications"
                      : key === "newMessages"
                      ? "New Messages"
                      : key === "newCustomers"
                      ? "New Customers"
                      : "New Tasks"}
                  </Text>
                  <Switch
                    value={value}
                    onValueChange={async () => {
                      try {
                        const newValue = !value;
                        setPreferences((prev) => ({ ...prev, [key]: newValue }));

                        if (!userId) {
                          console.error("⚠️ userId is null, cannot update preferences.");
                          return;
                        }

                        await updateNotificationPreferences(userId, { [key]: newValue });
                      } catch (error) {
                        console.error(`⚠️ Failed to update ${key}:`, error);
                      }
                    }}
                  />
                </View>
              ))}
            </View>
          )}

          {/* Integration Settings */}
          <TouchableOpacity
            style={styles.settingsOption}
            onPress={() => navigation.navigate('IntegrationSettings')}
          >
            <Settings size={22} color="#727272" />
            <Text style={styles.settingsText}>Integration Settings</Text>
            <ChevronsRight size={22} color="#727272" />
          </TouchableOpacity>

          {/* Security */}
          <TouchableOpacity
            style={styles.settingsOption}
            onPress={() => setShowSecurityDropdown(!showSecurityDropdown)}
          >
            <Shield size={22} color="#727272" />
            <Text style={styles.settingsText}>Security</Text>
            <ChevronsDown size={20} color="#000" />
          </TouchableOpacity>

          {/* Security Dropdown */}
          {showSecurityDropdown && (
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => navigation.navigate('PasswordChange')}
              >
                <Text style={styles.dropdownText}>Update Password</Text>
                <ChevronRight size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => navigation.navigate('TwoFactorAuth')}
              >
                <Text style={styles.dropdownText}>
                  Enable Two-Factor Authentication
                </Text>
                <ChevronRight size={24} color="#000" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Bottom Navigation */}
        <BottomNavigation navigation={navigation} activeTab="Profile" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#FFF' },
  container: { flex: 1, backgroundColor: '#fff' },
  header: { display: "flex", alignItems: "center", paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#EEEEEE" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#000' },
  userInfo: { backgroundColor: '#f4f4f4', borderRadius: 4, padding: 16, marginVertical: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  textContainer: { flexDirection: 'column', alignItems: 'flex-start' },
  userName: { fontSize: 18, fontWeight: '600' },
  userEmail: { fontSize: 14, color: '#888' },
  editButton: { padding: 8 },
  settingsContainer: { flex: 1, marginVertical: 20, paddingHorizontal: 20 },
  settingsOption: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee', justifyContent: 'space-between' },
  settingsText: { flex: 1, fontSize: 16, marginLeft: 10, color: '#000' },
  dropdownContainer: { backgroundColor: '#f9f9f9', paddingVertical: 10, paddingHorizontal: 15 },
  dropdownItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  dropdownText: { fontSize: 14, color: '#000' },
});

export default ProfileScreen;
