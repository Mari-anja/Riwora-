import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface MessagesBoxProps {
  title: string;
  badgeCount?: number;
}

export const MessagesBox: React.FC<MessagesBoxProps> = ({
  title,
  badgeCount,
}) => {
  return (
    <TouchableOpacity style={styles.messageBox}>
      <Text style={styles.messageTitle}>{title}</Text>
      {badgeCount && (
        <View style={styles.badge}>
          <Text>{badgeCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  messageBox: {
    backgroundColor: "#fff",
    width: 165,
    padding: 12,
    borderRadius: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E8E7E9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 8,
  },
  badge: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#C1C1C1",
    borderRadius: 4,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MessagesBox;
