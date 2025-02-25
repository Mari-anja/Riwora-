import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ChevronsRight } from "lucide-react-native";

interface MessagesBoxProps {
  title: string;
  count?: number;
  onpress: () => void;
}

export const DealsBox: React.FC<MessagesBoxProps> = ({
  title,
  count,
  onpress,
}) => {
  return (
    <TouchableOpacity style={styles.messageBox} onPress={onpress}>
      <Text style={styles.messageTitle}>{count}</Text>

      <View style={styles.DealsBoxrow}>
        <Text style={styles.DealsBoxtitle}>{title}</Text>
        <TouchableOpacity style={styles.button}>
        <ChevronsRight size={22} color="#727272" />
        </TouchableOpacity>
      </View>
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
    // flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  DealsBoxtitle: {
    fontSize: 16,
  },
  messageTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginRight: 8,
  },
  DealsBoxrow: {
    width: "100%",
    // backgroundColor: "red",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#A0A0A0",
    padding: 2,
  },
});

export default DealsBox;
