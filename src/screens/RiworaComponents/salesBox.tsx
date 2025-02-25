import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface MessagesBoxProps {
  title: string;
  count?: number;
}

export const SalesBox: React.FC<MessagesBoxProps> = ({ title, count }) => {
  return (
    <TouchableOpacity style={styles.filterBox}>
      <Text style={styles.filterText}>{count}</Text>
      <Text style={styles.filterLabel}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  filterBox: {
    alignItems: "flex-start",
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: "32%",
  },
  filterText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  filterLabel: {
    fontSize: 16,
    color: "#8e8e8e",
  },
});
