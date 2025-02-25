import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Voice, { SpeechResultsEvent, SpeechErrorEvent } from '@react-native-voice/voice';

const CustomerAudioPage = () => {
    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (Voice) {
            Voice.onSpeechResults = onSpeechResults;
            Voice.onSpeechError = onSpeechError;
        } else {
            console.error('Voice module is null. Ensure it is properly linked.');
        }
    
        return () => {
            if (Voice) {
                Voice.destroy().then(Voice.removeAllListeners);
            }
        };
    }, []);

    const onSpeechResults = (event: SpeechResultsEvent) => {
        const spokenText = event.value?.[0] || '';
        setText(spokenText);
    };

    const onSpeechError = (error: SpeechErrorEvent) => {
        console.error('Speech error:', error);
        setIsListening(false);
    };

    const startListening = async () => {
        try {
            await Voice.start(Platform.OS === 'ios' ? 'en-US' : 'en');
            setIsListening(true);
        } catch (e) {
            console.error('Error starting speech recognition:', e);
        }
    };

    const stopListening = async () => {
        try {
            await Voice.stop();
            setIsListening(false);
        } catch (e) {
            console.error('Error stopping speech recognition:', e);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add New Customer</Text>
            <View style={styles.notesContainer}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder="Speak or type customer details here..."
                    style={styles.textInput}
                    multiline
                    editable
                />
            </View>
            <View style={styles.controlsContainer}>
                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={isListening ? stopListening : startListening}
                >
                    <Text style={styles.buttonText}>{isListening ? 'Pause' : 'Start'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.manualButton}>
                    <Text style={styles.manualButtonText}>Enter Manually</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    notesContainer: {
        flex: 1,
        backgroundColor: '#FDF3E3',
        borderRadius: 15,
        padding: 15,
        marginVertical: 20,
    },
    textInput: {
        fontSize: 16,
        color: '#000',
        textAlignVertical: 'top',
        flex: 1,
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    controlButton: {
        backgroundColor: '#FFF',
        borderColor: '#D59C00',
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    buttonText: {
        color: '#D59C00',
        fontSize: 16,
        fontWeight: 'bold',
    },
    manualButton: {
        backgroundColor: '#FFF',
        borderColor: '#D59C00',
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        flex: 1,
        marginLeft: 10,
    },
    manualButtonText: {
        color: '#D59C00',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomerAudioPage;
