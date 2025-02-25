import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

interface CardsProps {
  label: string;
  number: string;
  description: string;
  subtitle?: string;
  isActive?: boolean;
  onPress?: () => void;
}

const Cards: React.FC<CardsProps> = ({
  label,
  number,
  description,
  subtitle,
  onPress,
}) => {
  return (
    <LinearGradient
    colors={["rgba(146, 192, 222, 0.6)", "rgba(255, 255, 255, 0.6)", "rgba(254, 135, 67, 0.6)"]}
    locations={[0.1, 0.5, 0.9]}
    style={styles.categoryCard}
    start={{ x: 0, y: 0.5 }} // Start from Left
    end={{ x: 1, y: 0.5 }} // Ends at bottom
>
      <TouchableOpacity style={styles.innerCard} onPress={onPress} activeOpacity={0.7}>
        

          <View style={styles.categoryView}>
            <Text style={styles.categoryLabel}>{label}</Text>
          </View>
          <Text style={styles.categoryNumber}>{number}</Text>
          {subtitle && <Text style={styles.categorySubtitle}>{subtitle}</Text>}
          <Text style={styles.categoryDescription}>{description}</Text>
      </TouchableOpacity>
    </LinearGradient> 
  
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    height: 150,
    width: 241,
    borderRadius: 4, // Ensures gradient stays inside
    overflow: "hidden", // Prevents color leaks
    padding: 1,
    marginRight: 16,

    
  },
  innerCard: {
    flex: 1, // Makes TouchableOpacity fill the entire space
    padding: 16,
    borderRadius: 4,
  },

  categoryView: {
    borderWidth: 1,
    borderColor: "#677076",
    borderRadius: 4,
    paddingHorizontal: 10,
    padding: 4,
    alignSelf: "flex-start",
  },
  categoryLabel: {
    fontSize: 14,
    color: "#666",
  },
  categoryNumber: {
    marginVertical: 8,
    fontSize: 18,
    fontWeight: "600",
  },
  categorySubtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  categoryDescription: {
    color: "#666",
    fontSize: 14,
  },
  activeCard: {
    backgroundColor: "#f5f9ff",
  },
});

export default Cards;
