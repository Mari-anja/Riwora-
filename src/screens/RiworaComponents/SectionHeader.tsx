import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ChevronsRight } from "lucide-react-native";

interface SectionHeaderProps {
  title: string;
  onPress?: () => void;
}

export const SectionHeader = ({ title, onPress }: SectionHeaderProps) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={onPress}>  {/* Make ChevronRight clickable */}
        <ChevronsRight size={24} color="#727272" /> 
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    // marginBottom: 15,
  },
});
