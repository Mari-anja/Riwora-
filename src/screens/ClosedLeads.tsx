import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {  EllipsisVertical } from "lucide-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../types';
import { fetchUserClosedDeals } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";



type ClosedLeadsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ClosedLeads"
>;

interface ClosedLeadsProps {
  navigation: ClosedLeadsNavigationProp;
}

interface Lead {
  title: string;
  description: string;
}

interface ClosedDeal {
  id: string;
  title: string;
  description: string;
  created_at: string;
}


const ClosedLeads = ({ navigation }: ClosedLeadsProps) => {
  const [closedDeals, setClosedDeals] = useState<ClosedDeal[]>([]);

  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchDeals = async () => {
          try {
              const userId = await AsyncStorage.getItem("user_id");
              if (!userId) {
                  console.error("User ID not found");
                  return;
              }

              const deals = await fetchUserClosedDeals(userId);
              setClosedDeals(deals);
          } catch (error) {
              console.error("Error fetching closed deals:", error);
          } finally {
              setLoading(false);
          }
      };

      fetchDeals();
  }, []);

  return (
    <View style={styles.container}>
       


       {loading ? (
                <ActivityIndicator size="large" color="#000" />
            ) : closedDeals.length === 0 ? (
                <Text style={styles.noDeals}>There are no closed deals.</Text>
            ) : (
                <FlatList
                    data={closedDeals}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.dealCard}>
                            <Text style={styles.dealTitle}>{item.title}</Text>
                            <Text style={styles.dealDescription}>{item.description}</Text>
                            <Text style={styles.dealDate}>{new Date(item.created_at).toLocaleDateString()}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    // marginRight: -10,
  },
  foundText: {
    color: "gray",
    fontSize: 14,
    width: 70,
    textAlign: "center",
    // backgroundColor: "red",
  },
  scrollView: {
    paddingTop: 24,
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 4,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#E8E7E9",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    // elevation: 3,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "gray",
    lineHeight: 20,
  },
  moreButton: {
    borderWidth: 1,
    padding: 4,
  },
  EllipsisVertical: {},
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  noDeals: { fontSize: 16, color: "#666", textAlign: "center", marginTop:20 },
  dealCard: { padding: 15, backgroundColor: "#f9f9f9", marginBottom: 10, borderRadius: 8 },
  dealTitle: { fontSize: 18, fontWeight: "bold" },
  dealDescription: { fontSize: 14, color: "#555", marginVertical: 5 },
  dealDate: { fontSize: 12, color: "#888" },
});

export default ClosedLeads;
