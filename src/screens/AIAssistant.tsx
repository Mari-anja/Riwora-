import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Send, Mic } from "lucide-react-native";
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const AIAssistant = () => {
    const navigation = useNavigation();
    const [message, setMessage] = useState('');

    return (
        <LinearGradient
            colors={['#D1E7F5', '#F6D5C2']} // ✅ Gradient background
            style={styles.gradientContainer}
        >
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.goback} onPress={() => navigation.goBack()}>
                        <ChevronLeft size={20} color="#727272" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Ai Assistant</Text>
                    <View style={{ width: 32 }} /> 
                </View>

                {/* Chat Area - Ensuring it remains visible */}
                <View style={styles.chatWrapper}>
                    <View style={styles.aiMessageContainer}>
                        {/* AI Logo */}
                        <Image 
                            source={require('../assets/images/midbutton.png')}  
                            style={styles.aiLogo} 
                        />
                        {/* Message Bubble */}
                        <View style={styles.messageBubble}>
                            <Text style={styles.messageText}>
                                Welcome To Riwora AI! I'm Here To Help You Connect With Customers, 
                                Close Deals Faster, And Keep Everything Organized.
                                {"\n\n"}
                                Let's Make Your Sales Journey Easier—Just Ask, And I'll Handle The Rest!
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Chat Input */}
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.micButton}>
                        <Mic size={20} color="#727272" />
                    </TouchableOpacity>
                    <View style={styles.textInputContainer}>
                        <TextInput 
                            placeholder="Ask question here: "
                            style={styles.input}
                            placeholderTextColor="#888"
                        />
                        <TouchableOpacity style={styles.sendButton}>
                            <Send size={20} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 40,
        justifyContent: "space-between", // ✅ Ensures chat stays visible
    },
    goback: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: "#fff",
        padding: 4,
        alignSelf: "flex-start",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "600",
        marginLeft: 10,
    },
    chatWrapper: {
        flex: 1, // ✅ Ensures chat messages remain visible
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    aiMessageContainer: {
        flexDirection: "row", // ✅ Align AI logo and message bubble horizontally
        alignItems: "flex-start", // ✅ Align AI logo to top-left
    },
    aiLogo: {
        width: 36, 
        height: 36,
        borderRadius: 18,
        marginRight: 8, // ✅ Spacing between logo and bubble
        marginTop: 6, // ✅ Aligns the logo with the top of the message
    },
    messageBubble: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 10,
        maxWidth: width * 0.75, // ✅ Responsive width (75% of screen)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '400',
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'transparent',
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 14,
        paddingHorizontal: 14,
        fontSize: 16,
        backgroundColor: 'transparent', 
    },
    micButton: {
        padding: 14,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        marginRight: 8,
    },
    sendButton: {
        marginLeft: 5,
        padding: 8,
        borderRadius: 8,
        backgroundColor: "#E0E0E0", // ✅ Gray background
    },
});

export default AIAssistant;
