import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUserTasks } from "./api"; // Ensure this is the correct API function
import { RootStackParamList } from "../types";

// Define Task interface
interface Task {
  _id: string;
  title: string;
  status: "inProgress" | "notStarted" | "done";
  priority: "high" | "medium" | "low";
  date: string;
  description?: string;
  user_id: string;
  created_at: string;
  deadline?: string | null;
}

type TasksNavigationProp = NativeStackNavigationProp<RootStackParamList, "TasksPage">;

const TaskListScreen = () => {
  const navigation = useNavigation<TasksNavigationProp>();
  const [tasks, setTasks] = useState<Task[]>([]); // ✅ Use correct type
  const [loading, setLoading] = useState(true);

  // Function to fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem("user_id"); // Get logged-in user ID
      if (!userId) {
        console.error("User ID not found in AsyncStorage.");
        return;
      }

      const fetchedTasks = await fetchUserTasks(userId); // Call API to fetch tasks
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.goback} onPress={() => navigation.goBack()}>
          <ChevronLeft size={20} color="#727272" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tasks</Text>
        <View style={{ width: 32 }} /> 
      </View>

      <View style={styles.body}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              <View style={styles.tableHeader}>
                <Text style={[styles.columnHeader, { textAlign: "left", width: 190 }]}>
                  Name
                </Text>
                <View style={styles.verticalLine} />
                <Text style={[styles.columnHeader, { textAlign: "center", width: 120 }]}>
                  Status
                </Text>
                <View style={styles.verticalLine} />
                <Text style={[styles.columnHeader, { textAlign: "center", width: 130 }]}>
                  Deadline
                </Text>
                <View style={styles.verticalLine} />
                <Text style={[styles.columnHeader, { textAlign: "right", width: 90 }]}>
                  Priority
                </Text>
              </View>

              <FlatList
                data={tasks}
                keyExtractor={(item) => item._id} // Ensure the backend provides an "_id"
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.taskRow} onPress={() =>
                    navigation.navigate("TasksPage", {
                      task: { ...item, date: item.deadline ?? "No Deadline" },
                    })
                  }>
                    <Text style={styles.taskName}>{item.title}</Text>

                    {/* Status */}
                    <View style={styles.statusView}>
                      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                        <Text style={styles.statusText}>{formatStatusText(item.status)}</Text>
                      </View>
                    </View>

                    {/* Deadline */}
                    <Text style={styles.deadlineText}>
                      {item.deadline ? new Date(item.deadline).toLocaleDateString("en-GB") : "No Deadline"}
                    </Text>

                    {/* Priority */}
                    <View style={styles.priorityView}>
                      <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
                        <Text style={styles.priorityText}>{item.priority}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

// Function to style priority dynamically
const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "#FFBABA"; // Light Red
    case "medium":
      return "#FCEABB"; // Light Orange
    case "low":
      return "#D4F1BE"; // Light Green
    default:
      return "#D3D3D3"; // Default Grey
  }
};

// Function to style status dynamically
const getStatusColor = (status: string) => {
  switch (status.toLowerCase().replace(/\s+/g, "")) {
    case "done":
      return "#C3E88D"; // Green
    case "notstarted":
      return "#D3D3D3"; // Grey
    case "inprogress":
      return "#A0D1FB"; // Light Blue
    default:
      return "#B0B0B0"; // Default Grey
  }
};

// Function to format status text correctly
const formatStatusText = (status: string) => {
  switch (status.toLowerCase()) {
    case "inprogress":
      return "In Progress";
    case "notstarted":
      return "Not Started";
    case "done":
      return "Done";
    default:
      return status;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFCFC",
  },
  
  body: {
    paddingHorizontal: 16,
  },

  goback: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#DADADA",
    padding: 4,
    alignSelf: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    marginTop: 50,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginLeft: 10,
  },
  tableHeader: {
    marginTop: 30,
    flexDirection: "row",
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 5,
  },
  columnHeader: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E8E7E9",
    padding: 15,
    marginBottom: 10,
  },
  taskName: {
    fontSize: 16,
    width: 200,
  },
  statusView: {
    marginLeft: 10,
    width: 100,
  },
  statusBadge: {
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  deadlineText: {
    marginLeft: 30,
    width: 140,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  priorityView: {
    width: 140,
  },
  priorityBadge: {
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginLeft: 10,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: "500",
  },
  verticalLine: {
    width: 1,
    backgroundColor: "#ddd",
    marginHorizontal: 10,
  },
});

export default TaskListScreen;
