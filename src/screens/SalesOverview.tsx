import React, { useState }  from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ChevronLeft, ListFilter } from "lucide-react-native";
import { SalesBox } from "./RiworaComponents/salesBox";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Calendar } from "react-native-calendars";


type SalesNavigationProp = NativeStackNavigationProp<RootStackParamList, "TasksPage">;

const SalesOverviewScreen = () => {
  const navigation = useNavigation<SalesNavigationProp>();

  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const formattedDateRange = startDate && endDate ? `${startDate} - ${endDate}` : "Select Date Range";

  const handleDayPress = (day: { dateString: string }) => {
    if (!startDate || (startDate && endDate)) {
      // First date selection
      setStartDate(day.dateString);
      setEndDate(null); // Reset end date
    } else if (!endDate && startDate) {
      // Second date selection (should be after startDate)
      if (new Date(day.dateString) > new Date(startDate)) {
        setEndDate(day.dateString);
        setShowCalendar(false); // Close modal after range selection
      } else {
        // Reset and start over if invalid range
        setStartDate(day.dateString);
      }
    }
  };

  // 🎨 Generate Marked Dates for UI Highlighting
  const getMarkedDates = () => {
    let markedDates: Record<string, any> = {};
    if (startDate) {
      markedDates[startDate] = { selected: true, selectedColor: "#007AFF" };
    }
    if (endDate) {
      markedDates[endDate] = { selected: true, selectedColor: "#007AFF" };

      // Highlight range between start and end date
      let current = new Date(startDate!);
      while (current < new Date(endDate)) {
        const dateString = current.toISOString().split("T")[0];
        if (dateString !== startDate) {
          markedDates[dateString] = { color: "#D6EAF8", textColor: "#000" };
        }
        current.setDate(current.getDate() + 1);
      }
    }
    return markedDates;
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.goback} onPress={() => navigation.goBack()}>
          <ChevronLeft size={20} color="#727272" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sales Overview</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Time Filters */}
      <View style={styles.filterContainer}>
        <SalesBox title="Week" count={10} />
        <SalesBox title="Month" count={16} />
        <SalesBox title="Year" count={34} />
      </View>

      {/* Date Range & Filter */}
      <View style={styles.dateFilterContainer}>
        <Text style={styles.dateText}>{formattedDateRange}</Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowCalendar(true)}>
          <ListFilter size={20} color="black" />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>


      {/* Total Sales */}
      <Text style={styles.totalSales}>
        $30,000 <Text style={styles.past30Days}>Past 30 Days</Text>
      </Text>

      <LineChart
        data={{
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          datasets: [
            {
              data: [5567, 3000, 4000, 7000],
            },
          ],
        }}
        width={Dimensions.get("window").width - 40} // from react-native
        height={200}
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `#92C0DE`,
          labelColor: (opacity = 1) => `black`,
          style: {
            borderRadius: 0,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffffff",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 4,
        }}
      />
      {/* 📅 Calendar Modal for Date Range */}
      <Modal visible={showCalendar} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Date Range</Text>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={getMarkedDates()}
              theme={{
                selectedDayBackgroundColor: "#007AFF",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#FF5733",
                arrowColor: "#007AFF",
              }}
            />
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowCalendar(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    marginTop: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  filterBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    padding: 15,
    width: 80,
  },
  filterText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7064FF",
  },
  filterLabel: {
    fontSize: 12,
    color: "#8e8e8e",
  },
  dateFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    // borderWidth: 1,
  },
  dateText: {
    flex: 1,
    fontSize: 14,
    borderColor: "#EBEBEB",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginRight: 8,
  },
  filterButton: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#f3f3f3",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#5E5E5E",
    alignItems: "center",
  },
  filterButtonText: {
    marginLeft: 4,
    // width: 100,
    // backgroundColor: "red",
  },
  totalSales: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 16,
    // textAlign: "center",
  },
  past30Days: {
    fontSize: 14,
    color: "#8e8e8e",
  },
  goback: {
    // backgroundColor: "red",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#DADADA",
    padding: 4,
    alignSelf: "flex-start",
  },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10, width: "90%", alignItems: "center" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  cancelButton: { marginTop: 10, padding: 10, backgroundColor: "#ddd", borderRadius: 5 },
  closeButtonText: { fontSize: 16, color: "#007AFF", marginTop: 10, textAlign: "center" },

});

export default SalesOverviewScreen;
