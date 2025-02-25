

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    SignUp: undefined;
    Recovery: undefined;
    Profile: { user: any };
    Security: undefined;
    Notifications: undefined;
    IntegrationSettings: undefined;
    TwoFactorAuth: undefined;
    PasswordChange: undefined;
    NotificationsPage: undefined;
    NotificationDetail: undefined;
    Sent: undefined;
    MessageDetail: { customerId: string; customerName: string };
    Product: undefined;
    ProductDetail: undefined;
    Customer: { customerType: string; refreshTrigger: boolean  };
    CustomerAudioPage: undefined;
    NewCustomers: undefined;
    CustomerDetails: { customerId: string };
    CustomerEdit: { customer: { id: string; name: string; phone: string; email: string } };
    CustomerProfile: { customer: { id: string; name: string; phone: string; email: string } };
    RecentSearch: undefined;
    SearchResultsByCustomer: { customer: { email: string; phone: string;id: string; first_name: string; last_name: string; clientId: string } };
    OrderDetails: { order: any; customer: { id: string; first_name: string; last_name: string; clientId: string }} ;
    Dashboard: { refreshTrigger?: number };
    OpenLeads: undefined;
    ClosedLeads: undefined;
    LeadPage: { lead: { title: string; description: string } };
    PendingCustomers: undefined;
    BeBackCustomers: undefined;
    AddTaskScreen: { refreshTasks?: () => Promise<void> };
    SalesOverview: undefined;
    Tasks: undefined;
    EditProfile: { user: any };
    AIAssistant: undefined;
    TasksPage: { task: { title: string; status: string; priority: string; date?: string; description?: string } };
  };
  
  export type User = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    notifications?: {  // ✅ Ensure this exists
      pushNotifications: boolean;
      newMessages: boolean;
      newCustomers: boolean;
      newTasks: boolean;
    };
  };
  