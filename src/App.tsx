import React from 'react';
import { RootStackParamList } from './types';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen'; // login page
import SignScreen from './screens/SignScreen'; // Sign Up page 
import RecoveryScreen from './screens/RecoveryScreen'; // Forgot Up page 
import ProfileScreen from './screens/ProfileScreen'; // Forgot Up page 
import SecurityScreen from './screens/SecurityScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import IntegrationSettingsScreen from './screens/IntegrationSettingsScreen'; 
import TwoFactorAuth from './screens/TwoFactorAuth'; 
import PasswordChange from './screens/PasswordChange'; 
import NotificationsPage from './screens/NotificationsPage'; 
import NotificationDetail from './screens/NotificationDetail'; 
import SentPage from './screens/SentPage'; 
import MessageDetail from './screens/MessageDetail'; 
import ProductPage from './screens/ProductPage'; 
import ProductDetail from './screens/ProductDetail'; 
import CustomerAdd from './screens/CustomerAdd'; 
import CustomerAudioPage from './screens/CustomerAudioPage'; 
import NewCustomers from './screens/NewCustomers'; 
import CustomerEdit from './screens/CustomerEdit'; 
import CustomerProfile from './screens/CustomerProfile'; 
import RecentSearch from './screens/RecentSearch'; 
import SearchResultsByCustomer from './screens/SearchResultsByCustomer'; 
import OrderDetails from './screens/OrderDetails'; 
import OpenLeads from "./screens/OpenLeads";
import Dashboard from "./screens/Dashboard";
import ClosedLeads from "./screens/ClosedLeads";
import LeadPage from "./screens/LeadPage"; 
import PendingCustomers from "./screens/PendingCustomers"; 
import BeBackCustomers from "./screens/BeBackCustomers"; 
import AddTaskScreen from "./screens/AddTaskScreen"; 
import SalesOverview from "./screens/SalesOverview"; 
import Tasks from "./screens/Tasks"; 
import TasksPage from "./screens/TasksPage"; 
import EditProfile from "./screens/EditProfile"; 
import AIAssistant from "./screens/AIAssistant"; 








import { Dimensions, Image, View, Text  } from "react-native";

const screenWidth = Dimensions.get("window").width; 







const Stack = createStackNavigator<RootStackParamList>();


export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignScreen} />
        <Stack.Screen name="Recovery" component={RecoveryScreen} /> 
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/> 
        <Stack.Screen name="Security" component={SecurityScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="IntegrationSettings" component={IntegrationSettingsScreen} options={{ title: "Integration Settings" }} />
        <Stack.Screen name="TwoFactorAuth" component={TwoFactorAuth} options={{ title: "Two Factor Auth" }}/>
        <Stack.Screen name="PasswordChange" component={PasswordChange} options={{ title: "Password Change" }}/>
        <Stack.Screen name="NotificationsPage" component={NotificationsPage}  options={{ headerShown: false }}/>
        <Stack.Screen name="NotificationDetail" component={NotificationDetail} options={{ title: "Notification Detail" }}/>
        <Stack.Screen name="Sent" component={SentPage} options={{ headerShown: false }}/> 
        <Stack.Screen name="MessageDetail" component={MessageDetail} options={{ headerShown: false }}/> 
        <Stack.Screen name="Product" component={ProductPage} /> 
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: "Product Detail" }}/> 
        <Stack.Screen name="Customer" component={CustomerAdd} /> 
        {/* <Stack.Screen name="CustomerAudioPage" component={CustomerAudioPage} />  */}
        <Stack.Screen name="NewCustomers" component={NewCustomers} options={{ headerShown: false }} />
        <Stack.Screen name="CustomerEdit" component={CustomerEdit} options={{ title: "Customer Edit" }}/> 
        <Stack.Screen name="CustomerProfile" component={CustomerProfile} options={{ title: "Customer Profile" }}/> 
        <Stack.Screen name="RecentSearch" component={RecentSearch} options={{ title: "Recent Search" }}/>
        <Stack.Screen name="SearchResultsByCustomer" component={SearchResultsByCustomer} options={{ title: "" }}/>
        <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ title: "Order Details" }}/>
        <Stack.Screen name="PendingCustomers" component={PendingCustomers} options={{ headerShown: false }} /> 
        <Stack.Screen name="BeBackCustomers" component={BeBackCustomers} options={{ headerShown: false }} /> 
        <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} /> 
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="SalesOverview" component={SalesOverview} options={{  headerShown: false }}/> 
        <Stack.Screen name="Tasks" component={Tasks} options={{ headerShown: false }} /> 
        <Stack.Screen name="TasksPage" component={TasksPage} options={{ headerShown: false }} /> 
        <Stack.Screen name="AIAssistant" component={AIAssistant} options={{ headerShown: false }} /> 
        
        

        
        
       
        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Image 
                  source={require('./assets/logo.png')} 
                  style={{ width: screenWidth * 0.08, height: screenWidth * 0.1 }} 
                  resizeMode="contain"
                />
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000', marginLeft: 8 }}>
                  Riwora
                </Text>
              </View>
            ),
            headerTitleAlign: 'center',
            headerLeft: () => null,
          }}
        />


          
        <Stack.Screen name="OpenLeads" component={OpenLeads} options={{
                    headerTitle: () => (
                      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", marginLeft: 70 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000"}}>Open Deals</Text>
                        <Text style={{ fontSize: 16, color: "gray", marginRight: 10}}></Text>
                      </View>
                    ),
                    headerTitleAlign: "center",
                    headerShown: false,
                  }} 
                />
        <Stack.Screen name="ClosedLeads" component={ClosedLeads} options={{
                    headerTitle: () => (
                      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", marginLeft: 70 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000"}}>Closed Deals</Text>
                        <Text style={{ fontSize: 16, color: "gray", marginRight: 10}}></Text>
                      </View>
                    ),
                    headerTitleAlign: "center",
                  }} 
                />
        <Stack.Screen name="LeadPage" component={LeadPage} options={{ title: "Lead Page" }}/>


        


        
        


      </Stack.Navigator>
    </NavigationContainer>

  );
}
