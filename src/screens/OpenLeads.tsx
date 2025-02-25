import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../types';
import { useNavigation } from "@react-navigation/native";
import { fetchUserOpenDeals } from "./api"; 
import AsyncStorage from "@react-native-async-storage/async-storage";



type OpenLeadsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OpenLeads"
>;

interface OpenLeadsProps {
  navigation: OpenLeadsNavigationProp;
}

interface Lead {
  title: string;
  description: string;
}

interface Deal {
  id: string;
  title: string;
  description: string;
}


const OpenLeads = () => {
  const navigation = useNavigation<OpenLeadsNavigationProp>();  
  const [leads, setLeads] = useState<Lead[]>([]);
  useEffect(() => {
    const loadDeals = async () => {
      const userId = await AsyncStorage.getItem("user_id");
      if (!userId) return;
      const deals = await fetchUserOpenDeals(userId);
      setLeads(deals);
    };
    loadDeals();
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

      <ScrollView style={styles.scrollView}>
      {leads.length > 0 ? (
          leads.map((lead, index) => (  // ✅ Fix leads mapping
            <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate("LeadPage", { lead })}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{lead.title}</Text>
                <Text style={styles.cardDescription}>{lead.description}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noDealsText}>No open deals found.</Text>  // ✅ Show message if empty
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
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
  noDealsText: { textAlign: "center", color: "gray", fontSize: 16, marginTop: 20 },
});

export default OpenLeads;
