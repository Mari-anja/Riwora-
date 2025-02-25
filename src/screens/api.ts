import axios from 'axios';
import type { User } from '../types';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = 'http://127.0.0.1:5001/api'; // Change this to your backend URL


const handleApiError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.error || "An unknown API error occurred";
    }
    return "An unknown error occurred";
};

// export const fetchCustomers = async (): Promise<{ id: string; name: string; phone: string; email: string }[]> => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/new-customers`);
//         return response.data as { id: string; name: string; phone: string; email: string }[] || [];
//     } catch (error) {
//         console.error("Error fetching customers:", error);
//         return [];
//     }
// };

export const fetchNewCustomers = async (userId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/new-customers?user_id=${userId}&type=new`);
        return response.data || [];
    } catch (error) {
        console.error("Error fetching new customers:", error);
        return [];
    }
};


export const fetchCustomerNotes = async (customerId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/customer/${customerId}/notes`);
        const data = response.data;

        console.log("📌 Fetched Notes from API:", data); 

        // Ensure the response is always an array
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error fetching notes:", error);
        return []; // Return empty array on error
    }
};

export const addCustomerNote = async (customerId: string, title: string, content: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/customer/${customerId}/notes`, {
            title,
            content,
        });
        return response.data;
    } catch (error) {
        console.error("Error adding customer note:", error);
        throw new Error(handleApiError(error));
    }
};

// 🔹 User Registration (Sign Up)
export const registerUser = async (first_name: string, last_name: string, company_name: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/signup`, {
            first_name,
            last_name,
            company_name,
            email,
            password
        });
        return response.data;
    } catch (error: unknown) {
        throw new Error(handleApiError(error));
    }
};

// 🔹 User Login
export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
        return response.data;
    } catch (error: unknown) {
        throw new Error(handleApiError(error));
    }
};

// 🔹 Password Recovery (Forgot Password)
export const forgotPassword = async (email: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
        return response.data;
    } catch (error: unknown) {
        throw new Error(handleApiError(error));
    }
};

// 🔹 Reset Password
export const resetPassword = async (token: string, new_password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/reset-password`, { token, new_password });
        return response.data;
    } catch (error: unknown) {
        throw new Error(handleApiError(error));
    }
};

export const updateCustomer = async (customerId: string, updatedData: any) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/customer/${customerId}`, updatedData);
        return response.data;
    } catch (error: unknown) {
        throw new Error(handleApiError(error));
    }
};

// export const addCustomer = async (
//     firstName: string,
//     lastName: string,
//     email: string,
//     phone: string,
//     customerType: string,
//     notes: string
// ) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/add-customer`, {
//             first_name: firstName,
//             last_name: lastName,
//             email,
//             phone,
//             type: customerType,
//             notes,
//         });

//         return response.data;
//     } catch (error: unknown) {
//         throw new Error(handleApiError(error));
//     }
// };

export const addCustomer = async (
    firstName: string, 
    lastName: string, 
    email: string, 
    phone: string, 
    customerType: string, 
    notes: string,
    refreshCallback: () => void
) => {
    try {
        const userId = await AsyncStorage.getItem("user_id"); // Retrieve stored user ID
        if (!userId) {
            console.error("User ID is missing from AsyncStorage");
            throw new Error("User ID is missing");
        }

        const response = await axios.post(`${API_BASE_URL}/add-customer`, {
            user_id: userId,  // ✅ Now correctly sending user_id
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            type: customerType,
            notes: notes
        });

        refreshCallback();
        return response.data;
    } catch (error) {
        console.error("Error adding customer:", error);
        throw error;
    }
};



export const fetchCustomerPurchases = async (customerId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/customer/${customerId}/purchases`);
        return response.data || [];  // ✅ Return an empty array if no purchases
    } catch (error) {
        console.error("Error fetching purchase history:", error);
        return [];  // ✅ Prevent crashing by returning an empty array on error
    }
};

export const fetchMessages = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/messages`);
        return response.data || [];
    } catch (error) {
        return [];
    }
};

// ✅ Add a New Message
export const addMessage = async (content: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/messages`, { content });
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

// ✅ Search Customers, Deals, and Products
export const searchItems = async (query: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search?query=${query}`);
        return response.data || {};
    } catch (error) {
        return {};
    }
};

export const fetchUserProfile = async (userId: string): Promise<User | null> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/profile?user_id=${userId}`);
      console.log("User Profile Response:", response.data);
      const userData = response.data;

        if (!userData.notifications) {
            userData.notifications = {  // ✅ Ensure default values exist
                pushNotifications: false,
                newMessages: false,
                newCustomers: false,
                newTasks: false,
            };
        }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };
  
  export const fetchDashboardInfo = async () => {
    try {
        const storedUserId = await AsyncStorage.getItem("user_id");
        if (!storedUserId) {
            console.error("User ID is missing from AsyncStorage");
            return { newCustomers: 0, activeListings: 0, sales: 0, beBackCustomers: 0, openDeals: 0, closedDeals: 0, tasks: [] };
        }
        console.log("📡 Fetching Dashboard Data...");
        const response = await axios.get(`${API_BASE_URL}/dashboard/${storedUserId}?refresh=${Date.now()}`);
        console.log("Dashboard API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return { newCustomers: 0, activeListings: 0, sales: 0, openDeals: 0, closedDeals: 0, tasks: [] };
    }
};


export const fetchUserOpenDeals = async (userId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/open-deals?user_id=${userId}`);
        return response.data || [];
    } catch (error) {
        console.error("Error fetching user deals:", error);
        return [];
    }
};



export const addNewDeal = async (title: string, description: string, userId: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/add-deal`, {
        user_id: userId,
        title,
        description,
        status: "open", // ✅ Deals start as "open"
      });
  
      return response.data;
    } catch (error) {
      console.error("Error adding deal:", error);
      throw new Error("Failed to add deal");
    }
  };


  export const fetchPendingCustomers = async (userId: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/pending-customers?user_id=${userId}`);
        return response.json() || [];
    } catch (error) {
        console.error("Error fetching pending customers:", error);
        return [];
    }
};






export const fetchBeBackCustomers = async () => {
    try {
        const userId = await AsyncStorage.getItem("user_id");  // ✅ Retrieve user_id
        if (!userId) {
            console.error("User ID is missing from AsyncStorage");
            return [];
        }

        const response = await axios.get(`${API_BASE_URL}/beback-customers?user_id=${userId}`);
        return response.data || [];  // ✅ Return empty array if no data
    } catch (error) {
        console.error("Error fetching Be Back customers:", error);
        return [];
    }
};


export const fetchUserClosedDeals = async (userId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/closed-deals?user_id=${userId}`);
        return response.data.length > 0 ? response.data : [];  // ✅ Return empty array if no deals
    } catch (error) {
        console.error("Error fetching closed deals:", error);
        return [];
    }
};


export const fetchUserTasks = async (userId: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks?user_id=${userId}`);
      return response.data || []; // Ensure empty array if no tasks
    } catch (error) {
      console.error("Error fetching user tasks:", error);
      return [];
    }
  };

  export const addTask = async (title: string, status: string, priority: string, deadline: string, description: string ) => {
    try {
      const userId = await AsyncStorage.getItem("user_id");
      if (!userId) {
        throw new Error("User ID is missing");
      }
  
      const response = await axios.post(`${API_BASE_URL}/add-task`, {
        user_id: userId,
        title,
        status,
        priority,
        deadline,  // ✅ Make sure this matches the backend field
        description,
      });
  
      return response.data;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  };




  export const updateUserProfile = async (user_id: string, updates: any) => {
    console.log("Updating profile:", JSON.stringify({ user_id, updates }));
    
    const response = await fetch(`${API_BASE_URL}/profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, updates }),
    });

    const data = await response.json();
    if (!response.ok) {
        console.error("Profile update failed:", data);
        throw new Error(data.error || "Failed to update profile");
    }

    return data;
};


export const updateNotificationPreferences = async (userId: string, updates: any) => {
    try {
        console.log("📡 Sending update request to backend:", updates);  // ✅ Debugging log
        const response = await fetch(`${API_BASE_URL}/notifications`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId, updates }),
        });

        const data = await response.json();
        console.log("✅ Server Response:", data); // ✅ Debugging log

        if (!response.ok) {
            throw new Error(data.error || "Failed to update notifications");
        }

        return data;
    } catch (error) {
        console.error("⚠️ Error updating notifications:", error);
        throw error;
    }
};


export const updateUserPassword = async (userId, currentPassword, newPassword) => {
    try {
      console.log("📡 Sending request to:", `${API_BASE_URL}/security/change-password`);
      
      const response = await fetch(`${API_BASE_URL}/security/change-password`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });
  
      const data = await response.json();
      console.log("✅ Server Response:", data); // Debugging log
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to update password");
      }
  
      return data;
    } catch (error) {
      console.error("⚠️ Error updating password:", error);
      throw error;
    }
  };
  
  