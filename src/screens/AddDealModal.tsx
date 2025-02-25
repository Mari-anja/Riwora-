import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert } from "react-native";
import { addNewDeal } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface AddDealModalProps {
    onClose: () => void;
    setRefreshTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  }
  

  const AddDealModal: React.FC<AddDealModalProps> = ({ onClose, setRefreshTrigger }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  


  const handleAddDeal = async () => {
    if (!title || !description) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem("user_id");  // ✅ Get user ID
      if (!userId) {
        Alert.alert("Error", "User not found.");
        return;
      }

      await addNewDeal(title, description, userId);
      Alert.alert("Success", "Deal added successfully!");
      onClose(); // ✅ Close modal after success
      setTimeout(() => {
        setRefreshTrigger(prev => !prev);  // 🔄 Toggle refresh trigger
      }, 300);
    } catch (error) {
      Alert.alert("Error", "Failed to add deal.");
    }
    setLoading(false);
  };

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add New Deal</Text>

          <TextInput
            placeholder="Deal Title"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Write About The Deal"
            style={[styles.input, styles.textArea]}
            multiline
            value={description}
            onChangeText={setDescription}
          />

          <TouchableOpacity style={styles.button} onPress={handleAddDeal} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? "Adding..." : "Add Deal"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: "80%", backgroundColor: "#fff", padding: 20, borderRadius: 10, alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { width: "100%", borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 5, marginBottom: 10 },
  textArea: { height: 80 },
  button: { backgroundColor: "#000", padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16 },
  closeButton: { marginTop: 10 },
  closeText: { color: "red" },
});

export default AddDealModal;
