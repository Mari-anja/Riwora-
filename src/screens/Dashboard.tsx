import React, { createContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Animated,
} from "react-native";
import {  Search, ChevronsLeft } from "lucide-react-native";
import { MessagesBox } from "./RiworaComponents/MessagesBox";
import Cards from "./RiworaComponents/Cards";
import DealsBox from "./RiworaComponents/DealsBox";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { SectionHeader } from "./RiworaComponents/SectionHeader";
import { TaskBox } from "./RiworaComponents/TaskBox";
import { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { fetchDashboardInfo } from './api';
import BottomNavigation from "./BottomNavigation";
import AddDealModal from "./AddDealModal"; 
import { fetchUserTasks } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";







const Dashboard = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [subModalVisible, setSubModalVisible] = useState(false);
  const [dealTitle, setDealTitle] = useState("");
  const [dealDescription, setDealDescription] = useState("");

  const [tasks, setTasks] = useState<Task[]>([]);


  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeModalType, setActiveModalType] = useState<"customer" | "deal" | null>(null);
  const [showDealModal, setShowDealModal] = useState(false);


  const [modalVisible, setModalVisible] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const [activeModal, setActiveModal] = useState("main");
  const RefreshContext = createContext({
    refreshTrigger: false,
    setRefreshTrigger: (value: boolean) => {},
  });

  const openSubModal = () => {
    Animated.timing(translateX, {
      toValue: -300, // Move left
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setActiveModal("sub");
    });
  };
  
  


  const closeSubModal= () => {
    Animated.timing(translateX, {
      toValue: 0, // Move back right
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setActiveModal("main");
    });
  };

  type TasksNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "ClosedLeads"
  >;

  interface TasksProps {
    navigation: TasksNavigationProp;
  }

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

const [refreshTrigger, setRefreshTrigger] = useState(false);


useEffect(() => {
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem("user_id"); // Get logged-in user ID
      if (!userId) {
        console.error("User ID is missing");
        return;
      }

      const fetchedTasks = await fetchUserTasks(userId);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchTasks();
}, []);

useEffect(() => {
  const fetchData = async () => {
      try {
          setLoading(true);
          console.log("🔄 Refresh Trigger Changed:", refreshTrigger);
          
          const data = await fetchDashboardInfo();
          console.log("📊 Dashboard Data Updated:", data);

         // ✅ Force re-render
         setDashboardData(null);
          setTimeout(() => {
              setDashboardData(data); // ✅ Set data after delay
          }, 50);  // Small delay forces UI to re-render
      } catch (error) {
          console.error("❌ Error fetching dashboard data:", error);
      } finally {
          setLoading(false);
      }
  };

  fetchData();
}, [refreshTrigger]);

const refreshTasks = async () => {
  try {
    setLoading(true);
    const userId = await AsyncStorage.getItem("user_id");
    if (!userId) return;

    const fetchedTasks = await fetchUserTasks(userId);
    setTasks(fetchedTasks);
  } catch (error) {
    console.error("Error refreshing tasks:", error);
  } finally {
    setLoading(false);
  }
};




  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.mainView}>
          
          {/* Wrap the entire searchContainer in TouchableOpacity */}
          <TouchableOpacity 
            style={styles.searchContainer} 
            onPress={() => navigation.navigate("RecentSearch")}
            activeOpacity={1} // Prevents flickering
          >
            <View style={styles.inputWrapper}>
              <Search color="#727272" size={20} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#666"
                editable={false} // Prevents keyboard from opening
              />
            </View>

            {/* Plus button to open modal */}
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}> 
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </TouchableOpacity>

  
          <Text style={styles.sectionTitle}>Customer Categories</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesContainer}
            >
              <Cards
                label="New Customers"
                number={`${dashboardData?.newCustomers || 0} New customers`}  // ✅ Ensure number is always defined
                description={`You have ${dashboardData?.newCustomers || 0} new customers this week`}
                onPress={() => navigation.navigate("NewCustomers")}
              />
              <Cards
                label="Pending Deals"
                number={`${dashboardData?.pendingCustomers || 0} Pending Deals`}
                description={`You have ${dashboardData?.pendingCustomers || 0} new customers this week`}
                onPress={() => navigation.navigate("PendingCustomers")}
              />
              <Cards
              label="be back"
              number={`${dashboardData?.beBackCustomers || 0} Return Appointments`}  // ✅ Shows count or "Nothing Found"
              description={`You have ${dashboardData?.beBackCustomers || 0} Be Back customers`}
              onPress={() => navigation.navigate("BeBackCustomers")}  // ✅ Navigates to Be Back Page
            />

            </ScrollView>
          )}

          <SectionHeader title="Messages" />

          <View style={styles.messagesRow}>
            <MessagesBox title="Draft" badgeCount={0} />
            <MessagesBox title="Inactive Deals" badgeCount={0} />
            <MessagesBox title="Maintenance" badgeCount={0} />
            <MessagesBox title="New Inquiries" badgeCount={0} />
          </View>

          <SectionHeader title="Sales Overview" />

          <TouchableOpacity onPress={() => navigation.navigate("SalesOverview")}>
          <View style={styles.salesCard}>
          <Text style={styles.salesAmount}>
              ${dashboardData?.sales ?? "0"}
            </Text>
            <Text style={styles.salesPeriod}>past 30 days</Text>
          </View>
          </TouchableOpacity>
        


          <SectionHeader title="Deals" />

          <View style={styles.dealsView}>
            <DealsBox
              title="Opened Deals"
              count={dashboardData?.openDeals || 0}

              onpress={() => navigation.navigate("OpenLeads")}
            />
            <DealsBox
              title="Closed Deals"
              count={dashboardData?.closedDeals || 0}

              onpress={() => navigation.navigate("ClosedLeads")}
            />
          </View>

          <SectionHeader title="Tasks" onPress={() => navigation.navigate("Tasks")}  />
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : tasks.length > 0 ? (
            tasks.map((task, index) => (

              
            
              <TaskBox
                key={index}
                title={task.title}
                status={task.status}
                priority={task.priority}
                date={task.deadline ?? "No Deadline"} 
                onPress={() => {
                  console.log("Navigating to TasksPage...");
                  navigation.navigate("TasksPage", {
                    task: { ...task, date: task.deadline ?? "No Deadline" }, // ✅ Ensure date is populated
                  });
                }}
              />
          
           
            ))
          ) : (
            <Text style={{ textAlign: "center", fontSize: 16, color: "#888" }}>
              No tasks found.
            </Text>
          )}
              
        </View>
      </ScrollView>
        <BottomNavigation navigation={navigation} /> 
        


        {/* Main Modal */}
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add</Text>

            {/* New Customer */}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                setActiveModalType("customer");
                setSubModalVisible(true);
              }}
            >
              <Text style={styles.modalButtonText}>New Customer</Text>
            </TouchableOpacity>

            {/* New Deal */}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                setShowDealModal(true);
              }}
            >
              <Text style={styles.modalButtonText}>New Deal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("AddTaskScreen", { refreshTasks });
              }}
            >
              <Text style={styles.modalButtonText}>New Task</Text>
            </TouchableOpacity>

            {/* Close Button */}
            <TouchableOpacity style={[styles.modalButton, styles.closeButton]} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      {showDealModal && (
  <AddDealModal
    onClose={() => setShowDealModal(false)}
    setRefreshTrigger={setRefreshTrigger}
  />
)}

      <Modal animationType="fade" transparent={true} visible={subModalVisible} onRequestClose={() => setSubModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {activeModalType === "customer" ? (
              <>
                <View style={styles.modalHeader}>
                  <TouchableOpacity
                    onPress={() => {
                      setSubModalVisible(false);
                      setTimeout(() => setModalVisible(true), 300);
                    }}
                  >
                    <ChevronsLeft size={22} color="#727272" />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>New Customer</Text>
                  <View style={{ width: 24 }} />
                </View>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setSubModalVisible(false);
                    navigation.navigate("Customer", { customerType: "new", refreshTrigger: true });
                  }}
                >
                  <Text style={styles.modalButtonText}>Add New Customer</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setSubModalVisible(false);
                    navigation.navigate("Customer", { customerType: "be_back", refreshTrigger: true });
                  }}
                >
                  <Text style={styles.modalButtonText}>Be Backs</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setSubModalVisible(false);
                    navigation.navigate("Customer", { customerType: "pending", refreshTrigger: true });
                  }}
                >
                  <Text style={styles.modalButtonText}>Pending Deals</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.modalButton, styles.closeButton]} onPress={() => setSubModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            ) : activeModalType === "deal" ? (
              <>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={() => setSubModalVisible(false)}>
                    <ChevronsLeft size={22} color="#727272" />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Add New Deal</Text>
                  <View style={{ width: 24 }} />
                </View>

                <TextInput placeholder="Deal Title" style={styles.inputWrapper} />
                <TextInput placeholder="Write About The Deal" style={[styles.inputWrapper, { height: 100, textAlignVertical: "top" }]} multiline={true} />

                <TouchableOpacity style={styles.modalButton} onPress={() => setSubModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Add Deal</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.modalButton, styles.closeButton]} onPress={() => setSubModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
  
};

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "#FDFCFC",
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(229, 229, 229, 0.8)",
    // backdropFilter: "blur(20px)",
  },
  headerTitle: {
    alignItems: "center",
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  logo: {
    width: 110,
    height: 30,
    resizeMode: "contain",
  },
  searchContainer: {
    marginHorizontal: 0,
    marginVertical: 18,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 24,
    marginBottom: 20,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 16,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    height: 42,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 8,
  },
  addButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    width: 42,
    height: 42,
    borderWidth: 1,
    borderColor: "#DADADA",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 20,
    color: "#000",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 15,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryCard: {
    backgroundColor: "#fff5f5",
    padding: 20,
    borderRadius: 12,
    width: 250,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  messageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  messageBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 4,
    // width: "48%",
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
  },
  badge: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#C1C1C1",
    borderRadius: 4,
    width: 20,
    height: 20,
    color: "black",
    textAlign: "center",
    textAlignVertical: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  salesCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#eee",
  },
  salesAmount: {
    fontSize: 28,
    fontWeight: "600",
  },
  salesPeriod: {
    color: "#666",
    marginTop: 5,
  },
  messagesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  dealsView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  tasksContainer: {
    marginTop: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Darken background
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    width: '100%',
    alignItems: "center",
    borderTopLeftRadius: 20,  // Round top corners only
    borderTopRightRadius: 20,
    paddingBottom: 40, 
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 10,
  },
  modalButton: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    alignItems: "center",
    marginBottom: 6,
  },
  modalButtonText: {
    fontSize: 16,
    color: "#000",
  },
  closeButton: {
    marginTop: 10,
    borderBottomWidth: 0,
    backgroundColor: "#EEE",
  },
  backButton: {
    fontSize: 20,
    marginBottom: 10,
},
modalHeader: {
  flexDirection: "row",  // Align items in a row
  alignItems: "center",  // Keep items vertically aligned
  justifyContent: "space-between", // Push arrow to left, title center
  width: "100%", 
  paddingVertical: 10,  // Add padding for spacing
  paddingHorizontal: 20, // Ensure left and right spacing
},
});

export default Dashboard;
