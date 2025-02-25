import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type PreferencesType = {
  pushNotifications: boolean;
  newMessages: boolean;
  newCustomers: boolean;
  newTasks: boolean;
};

const NotificationsScreen = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [preferences, setPreferences] = useState<PreferencesType>({
    pushNotifications: true,
    newMessages: false,
    newCustomers: true,
    newTasks: true,
  });

  const togglePreference = (key: keyof PreferencesType) => {
    console.log(`Toggling preference: ${key}`); // Debugging log
    setPreferences((prev) => {
      const updatedPreferences = { ...prev, [key]: !prev[key] };
      console.log('Updated Preferences:', updatedPreferences); // Debugging log
      return updatedPreferences;
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.headerLeft}>
          <Icon name="notifications" size={20} color="#000" />
          <Text style={styles.headerText}>Notification Preferences</Text>
        </View>
        <Icon name={isExpanded ? 'expand-less' : 'expand-more'} size={24} color="#000" />
      </TouchableOpacity>

      {/* Dropdown */}
      {isExpanded && (
        <View style={styles.dropdown}>
          <View style={styles.option}>
            <Text style={styles.optionText}>Allow Push Notifications</Text>
            <Switch
              value={preferences.pushNotifications}
              onValueChange={() => togglePreference('pushNotifications')}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>New Messages</Text>
            <Switch
              value={preferences.newMessages}
              onValueChange={() => togglePreference('newMessages')}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>New Customers</Text>
            <Switch
              value={preferences.newCustomers}
              onValueChange={() => togglePreference('newCustomers')}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>New Tasks</Text>
            <Switch
              value={preferences.newTasks}
              onValueChange={() => togglePreference('newTasks')}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
    fontWeight: 'bold',
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});

export default NotificationsScreen;
