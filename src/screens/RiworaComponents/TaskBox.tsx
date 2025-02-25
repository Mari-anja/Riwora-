import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface TaskBoxProps {
  title: string;
  status: "inProgress" | "notStarted" | "done" | "archived";
  priority: "high" | "medium" | "low";
  date: string | null;
  onPress?: () => void;
}

export const TaskBox = ({
  title,
  status,
  priority,
  date,
  onPress,
}: TaskBoxProps) => {
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, "");
  const normalizedPriority = priority.toLowerCase();

  const getStatusStyle = () => {
    switch (normalizedStatus) {
      case "inprogress":
        return styles.inProgress;
      case "archived":
        return styles.archived;
      case "notstarted":
        return styles.notStarted;
      case "done":
        return styles.done;
      default:
        return styles.notStarted; // Fallback
    }
  };

  const getPriorityStyle = () => {
    switch (normalizedPriority) {
      case "high":
        return styles.highPriority;
      case "medium":
        return styles.mediumPriority;
      case "low":
        return styles.lowPriority;
      default:
        return styles.mediumPriority; // Fallback
    }
  };


  const getStatusText = () => {
    switch (normalizedStatus) {
      case "done":
        return "✓ Done";
      case "inprogress":
        return "In Progress";
      case "archived":
        return "Archived";
      case "notstarted":
      default:
        return "Not Started";
    }
  };

  return (
    <TouchableOpacity style={styles.taskItem} onPress={onPress}>
      <View style={styles.taskContainer}>
        {/* Title */}
        <Text style={styles.taskTitle}>{title}</Text>

        {/* Status, Priority & Deadline */}
        <View style={styles.metaContainer}>
          {/* Status & Priority Container */}
          <View style={styles.tagsContainer}>
            <View style={[styles.taskStatus, getStatusStyle()]}>
              <Text style={styles.taskStatusText}>{getStatusText()}</Text>
            </View>
            <View style={[styles.taskPriority, getPriorityStyle()]}>
            <Text style={styles.tagText}>{normalizedPriority.charAt(0).toUpperCase() + normalizedPriority.slice(1)}</Text>
            </View>
          </View>

          {/* Deadline */}
          <View style={styles.deadlineContainer}>
            <Text style={styles.deadlineText}>{date ? new Date(date).toLocaleDateString() : "No Deadline"}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E7E9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    textTransform: "capitalize",
  },
  taskContainer: {
    flexDirection: "column", 
    gap: 6, 
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    flex: 1,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "center",
    marginTop: 6,
    width: '100%',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  taskMetaContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "red",
  },
  tagsView: {
    flexDirection: "row",
    gap: 8,
  },
  taskStatus: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  taskStatusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  inProgress: {
    backgroundColor: "#A0D1FB",
  },
  notStarted: {
    backgroundColor: "#D3D3D3",
  },
  done: {
    backgroundColor: "#C3E88D",
  },
  archived: {
    backgroundColor: "#B0B0B0", // Darker Gray for Archived
  },
  taskPriority: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  taskPriorityText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333"
    
  },
  highPriority: {
    backgroundColor: "#FFBABA",
  },
  mediumPriority: {
    backgroundColor: "#FCEABB",
  },
  lowPriority: {
    backgroundColor: "#D4F1BE",
  },
  taskDate: {
    fontSize: 12,
    color: "#888",
  },
  deadlineContainer: {
    backgroundColor: "#EFEFEF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  deadlineText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
  },
});
