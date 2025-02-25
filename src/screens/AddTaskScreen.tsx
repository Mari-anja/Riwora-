import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import { addTask } from "./api";


const AddTaskScreen = ({ route }) => {
    const { refreshTasks } = route.params || {};
  const navigation = useNavigation();
  const [priorityModal, setPriorityModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Not Started");
  const [deadline, setDeadline] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Format the selected date for display
  const formattedDate = deadline.toISOString().split("T")[0];

  const handleAddTask = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Task title cannot be empty.");
      return;
    }

    console.log("📌 Sending Task:", { 
        title, 
        status, 
        priority, 
        deadline: formattedDate,
        description
      });

    try {
      await addTask(title, status, priority, formattedDate, description);
      Alert.alert("Success", "Task added successfully!");

      // Refresh tasks in Dashboard
      if (refreshTasks) {
        refreshTasks();
      }

      // Navigate back to Dashboard
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to add task.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Write About The Task"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={styles.selector} onPress={() => setPriorityModal(true)}>
        <Text style={styles.selectorText}>Priority:</Text>
        <Text style={[styles.valueText, styles[priority.toLowerCase()]]}>{priority}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.selector} onPress={() => setStatusModal(true)}>
        <Text style={styles.selectorText}>Status:</Text>
        <Text style={[styles.valueText, styles[status.replace(" ", "").toLowerCase()]]}>{status}</Text>
      </TouchableOpacity>

      {/* 📅 DEADLINE PICKER (Calendar Modal) */}
      <TouchableOpacity style={styles.selector} onPress={() => setShowCalendar(true)}>
        <Text style={styles.selectorText}>Deadline:</Text>
        <Text style={styles.valueText}>{formattedDate}</Text>
      </TouchableOpacity>

      {/* Priority Modal */}
      <Modal visible={priorityModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Priority</Text>
            <TouchableOpacity style={[styles.priorityButton, styles.high]} onPress={() => { setPriority("High"); setPriorityModal(false); }}>
              <Text>High</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.priorityButton, styles.medium]} onPress={() => { setPriority("Medium"); setPriorityModal(false); }}>
              <Text>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.priorityButton, styles.low]} onPress={() => { setPriority("Low"); setPriorityModal(false); }}>
              <Text>Low</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Status Modal */}
      <Modal visible={statusModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose State</Text>
            <TouchableOpacity style={styles.statusButton} onPress={() => { setStatus("Not Started"); setStatusModal(false); }}>
              <Text>Not Started</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.statusButton, styles.inprogress]} onPress={() => { setStatus("In Progress"); setStatusModal(false); }}>
              <Text>In Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.statusButton, styles.done]} onPress={() => { setStatus("Done"); setStatusModal(false); }}>
              <Text>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statusButton} onPress={() => { setStatus("Archived"); setStatusModal(false); }}>
              <Text>Archived</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 🔥 Calendar Modal (Fixed) */}
      <Modal visible={showCalendar} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Deadline</Text>
            <Calendar
              onDayPress={(day) => {
                setDeadline(new Date(day.dateString));
                setShowCalendar(false); // Close modal after selection
              }}
              markedDates={{
                [formattedDate]: { selected: true, selectedColor: "#007AFF" },
              }}
              theme={{
                selectedDayBackgroundColor: "#007AFF",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#FF5733",
                arrowColor: "#007AFF",
              }}
            />
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowCalendar(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "white", flex: 1 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 5, marginBottom: 10 },
  selector: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#ddd", padding: 15, borderRadius: 5, marginBottom: 10 },
  selectorText: { fontSize: 16 },
  valueText: { fontSize: 16, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 },
  addButton: { backgroundColor: "#333", padding: 15, borderRadius: 5, alignItems: "center" },
  addButtonText: { color: "white", fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10, width: "90%", alignItems: "center" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  closeButtonText: { fontSize: 16, color: "#007AFF", marginTop: 10, textAlign: "center" },
  cancelButton: { marginTop: 10, padding: 10, backgroundColor: "#ddd", borderRadius: 5 },
  priorityButton: { padding: 15, width: "100%", alignItems: "center", marginBottom: 5 },
  statusButton: { padding: 15, width: "100%", alignItems: "center", marginBottom: 5, backgroundColor: "#EEE" },
  high: { backgroundColor: "#FFBABA" },
  medium: { backgroundColor: "#FCEABB" },
  low: { backgroundColor: "#D4F1BE" },
  notstarted: { backgroundColor: "#D3D3D3" },
  inprogress: { backgroundColor: "#A0D1FB" },
  done: { backgroundColor: "#C3E88D" },
});

export default AddTaskScreen;
