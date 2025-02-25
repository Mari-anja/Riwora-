import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { updateUserPassword } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Eye, EyeClosed } from "lucide-react-native";  // ✅ Import Lucide icons

const PasswordChange = ({ navigation }: any) => {
  // State for password visibility toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  // State for password inputs
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle password update
  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }
  
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem("user_id");
      if (!userId) {
        Alert.alert("Error", "User not found.");
        return;
      }
  
      await updateUserPassword(userId, currentPassword, newPassword);
      Alert.alert("Success", "Password updated successfully.");
      navigation.goBack(); // ✅ Navigates back to Profile page
    } catch (error: any) {
      Alert.alert("Error", error.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Input Fields */}
      <View style={styles.form}>
        {/* Current Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Current Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              secureTextEntry={!showCurrentPassword}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter current password"
            />
            <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
              {showCurrentPassword ? <EyeClosed size={24} color="#000" /> : <Eye size={24} color="#000" />}
            </TouchableOpacity>
          </View>
        </View>

        {/* New Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
              {showNewPassword ? <EyeClosed size={24} color="#000" /> : <Eye size={24} color="#000" />}
            </TouchableOpacity>
          </View>
        </View>

        {/* Retype New Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Retype New Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              secureTextEntry={!showRetypePassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
            />
            <TouchableOpacity onPress={() => setShowRetypePassword(!showRetypePassword)}>
              {showRetypePassword ? <EyeClosed size={24} color="#000" /> : <Eye size={24} color="#000" />}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handlePasswordChange} disabled={loading}>
        <Text style={styles.saveButtonText}>{loading ? "Updating..." : "Save New Password"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  form: { marginTop: 20 },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 16, color: '#333', marginBottom: 5 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 4, paddingHorizontal: 10, backgroundColor: '#f4f4f4' },
  input: { flex: 1, height: 40, fontSize: 16, color: '#333' },
  saveButton: { marginTop: 'auto', backgroundColor: '#000', paddingVertical: 15, borderRadius: 4, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default PasswordChange;
