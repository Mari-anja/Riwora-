import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Modal, TextInput, Alert, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from './BottomNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { fetchCustomerNotes, addCustomerNote, fetchCustomerPurchases } from './api';
import { Send, Pencil, NotebookPen } from "lucide-react-native";
type CustomerProfileProps = NativeStackScreenProps<RootStackParamList, 'CustomerProfile'>;

const CustomerProfile: React.FC<CustomerProfileProps> = ({ route, navigation }) => {
    const { customer = { name: 'Unknown', id: 'N/A', phone: 'N/A', email: 'N/A' } } =
    route.params || {};
    const [activeTab, setActiveTab] = useState('Notes');
    const [notes, setNotes] = useState<{ id: string; title: string; content: string }[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [purchases, setPurchases] = useState<{ id: string; name: string; sku: string; image: string }[]>([]);


    // useEffect(() => {
    //     const getNotes = async () => {
    //         try {
    //             const data: { id: string; title: string; content: string }[] = await fetchCustomerNotes(customer.id);
    //             console.log(" RAW Notes from Backend:", data);
    
    //             // ✅ Ensure unique notes
    //             const uniqueNotes = Array.from(new Map(data.map(note => [note.id, note])).values());
    //             console.log("Unique Notes After Fix:", uniqueNotes);

    //             setNotes(uniqueNotes);
    //         } catch (error) {
    //             console.error("Error fetching notes:", error);
    //         }
    //     };
    
    //     if (notes.length === 0) {  // ✅ Only fetch if notes are empty
    //         getNotes();
    //     }
    // }, [customer.id]);
    useEffect(() => {
        const getNotes = async () => {
            try {
                const notesData = await fetchCustomerNotes(customer.id);
                console.log("✅ Notes Retrieved from API:", notesData);
    
                if (notesData.length > 0) {
                    const uniqueNotes = Array.from(new Map(notesData.map(note => [note.id, note])).values());
                    setNotes(uniqueNotes);
                } else {
                    console.log("⚠ No notes found for this customer.");
                }
            } catch (error) {
                console.error("❌ Error fetching notes:", error);
            }
        };
    
        getNotes();
    }, [customer.id]);
    


    useEffect(() => {
        const getPurchases = async () => {
            try {
                const data = await fetchCustomerPurchases(customer.id);
                console.log("Fetched Purchases:", data);  // ✅ Debugging output
                setPurchases(data);
            } catch (error) {
                console.error("Error fetching purchases:", error);
            }
        };

        getPurchases();  // Fetch purchases on component mount
    }, [customer.id]);
    
    
    

    // Function to add a new note
    const handleAddNote = async () => {
        if (!noteTitle.trim() || !noteContent.trim()) {
            Alert.alert("Error", "Title and Content cannot be empty.");
            return;
        }
    
        try {
            const newNote = await addCustomerNote(customer.id, noteTitle, noteContent);
            console.log("New Note Added:", newNote);
    
            if (newNote?.id) {
                setNotes((prevNotes) => {
                    const updatedNotes = [...prevNotes, newNote];
    
                    // ✅ Deduplicate notes
                    const uniqueNotes = Array.from(new Map(updatedNotes.map(note => [note.id, note])).values());
                    console.log(" Notes After Adding:", uniqueNotes);  // 🔍 Log after adding
    
                    return uniqueNotes;
                });
            }
    
            setModalVisible(false);
            setNoteTitle('');
            setNoteContent('');
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };
    
    


    return (
        <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
            {/* Header */}

            {/* Profile Info */}
            <View style={styles.profileCard}>
                <View style={styles.profileHeader}>
                    <View>
                        <Text style={styles.profileName}>{customer.name}</Text>
                        <Text style={styles.profileId}>Client ID: {customer.id}</Text>
                    </View>
                    <View style={styles.icons}>
                        <TouchableOpacity onPress={() => navigation.navigate('CustomerEdit', { customer })}>
                        <Pencil size={22} color="#727272" />
                        </TouchableOpacity>
                        <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('MessageDetail', { customerId: customer.id, customerName: customer.name,})} >
                    <Send size={24} color="#727272" />
                    </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.contactText}>{customer.phone}</Text>
                <Text style={styles.contactText}>{customer.email}</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
                <TouchableOpacity style={[styles.tab, activeTab === 'Notes' && styles.activeTab]} onPress={() => setActiveTab('Notes')}>
                    <Text style={activeTab === 'Notes' ? styles.activeTabText : styles.tabText}>Notes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, activeTab === 'Purchases' && styles.activeTab]} onPress={() => setActiveTab('Purchases')}>
                    <Text style={activeTab === 'Purchases' ? styles.activeTabText : styles.tabText}>Purchase History</Text>
                </TouchableOpacity>
            </View>

            {/* Modal for Adding Notes */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add Note</Text>
                        <TextInput placeholder="Note Title" style={styles.input} value={noteTitle} onChangeText={setNoteTitle} />
                        <TextInput placeholder="Write Note Here" style={styles.textArea} value={noteContent} onChangeText={setNoteContent} multiline />
                        <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
                            <Text style={styles.buttonText}>Add Note</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            {/* Content */}
            <View style={styles.content}>
                {activeTab === 'Notes' ? (
                    <FlatList 
                        data={notes} 
                        keyExtractor={(item) => item.id} 
                        renderItem={({ item }) => (
                            <View style={styles.noteItem}>
                                <Text style={styles.noteTitle}>{item.title}</Text>
                                <Text style={styles.noteText}>{item.content}</Text>
                            </View>
                        )}
                    />
                ) : (
                    <FlatList 
                        data={purchases} 
                        keyExtractor={(item) => item.id} 
                        renderItem={({ item }) => (
                            <View style={styles.purchaseItem}>
                                <Image source={{ uri: item.image }} style={styles.purchaseImage} />
                                <View style={styles.purchaseDetails}>
                                    <Text style={styles.purchaseName}>{item.name}</Text>
                                    <Text style={styles.purchaseSku}>{item.sku}</Text>
                                </View>
                            </View>
                        )}
                    />
                )}
            </View>

            {/* Bottom Navigation */}
            <TouchableOpacity style={styles.addTaskButton} onPress={() => setModalVisible(true)}>
                <NotebookPen size={24} color="#fff" />
                <Text style={styles.addTaskButtonText}>Add Note</Text>
            </TouchableOpacity>
            <BottomNavigation navigation={navigation} activeTab="Profile" />
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: { flex: 1, backgroundColor: '#FFF' },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 16,
    },
    profileCard: {
        padding: 16,
        borderRadius: 4,
        backgroundColor: '#f9f9f9',
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    profileHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileId: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
    contactText: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    icons: {
        flexDirection: 'row',
        gap: 10,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#000',
    },
    tabText: {
        fontSize: 16,
        color: '#555',
    },
    activeTabText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    content: {
        flex: 1,
    },
    noteItem: {
        backgroundColor: '#f4f4f4',
        padding: 16,
        borderRadius: 4,
        marginBottom: 8,
    },
    noteTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    noteText: {
        fontSize: 14,
        color: '#555',
    },
    purchaseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    purchaseImage: {
        width: 50,
        height: 50,
        borderRadius: 4,
        marginRight: 16,
    },
    purchaseDetails: {
        flex: 1,
    },
    purchaseName: {
        fontSize: 16,
        fontWeight: '600',
    },
    purchaseSku: {
        fontSize: 12,
        color: '#888',
    },

    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { width: '90%', backgroundColor: '#fff', padding: 20, borderRadius: 8 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 10 },
    textArea: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, height: 100, textAlignVertical: 'top' },
    addButton: { backgroundColor: '#000', padding: 12, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16 },
    cancelText: { textAlign: 'center', marginTop: 10, color: 'red' },

    addTaskButton: {
        position: 'absolute',
        bottom: 100, // ⬆ Increase distance from bottom navigation
        right: 20,
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    
    addTaskButtonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 8,
    },
    
});

export default CustomerProfile;
