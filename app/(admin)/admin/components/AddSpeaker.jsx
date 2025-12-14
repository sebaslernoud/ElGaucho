import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { createSpeaker } from '../../../src/services/speakerService';

const { width, height } = Dimensions.get('window');

const AddParticipants = () => {
    const router = useRouter();
    
    // Obtener token de Redux
    const authState = useSelector(state => state.auth);
    const token = authState?.token;

    // Estados del formulario
    const [speakerName, setSpeakerName] = useState('');
    const [bio, setBio] = useState('');
    const [expertise, setExpertise] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateSpeaker = async () => {
        if (!token) {
            Alert.alert("Error", "No estás autenticado.");
            return;
        }

        if (!speakerName || !bio || !expertise) {
            Alert.alert("Campos incompletos", "Por favor completa todos los campos del orador.");
            return;
        }

        setLoading(true);

        try {
            await createSpeaker({ speakerName, bio, expertise }, token);
            Alert.alert("Éxito", "Disertante creado correctamente", [
                { text: "OK", onPress: () => router.back() }
            ]);
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "No se pudo crear el disertante. Verifica tu conexión.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Crear Disertante</Text>
                </View>

                <View style={styles.formContainer}>
                    
                    {/* Nombre del Orador */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nombre del Orador</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder='Ej: Dr. Juan Pérez'
                            value={speakerName}
                            onChangeText={setSpeakerName}
                        />
                    </View>

                    {/* Expertise / Especialidad */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Especialidad (Expertise)</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder='Ej: Derecho Internacional'
                            value={expertise}
                            onChangeText={setExpertise}
                        />
                    </View>

                    {/* Biografía */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Biografía</Text>
                        <TextInput 
                            style={[styles.input, styles.textArea]} 
                            placeholder='Breve descripción de la trayectoria...'
                            multiline={true}
                            numberOfLines={4}
                            value={bio}
                            onChangeText={setBio}
                            textAlignVertical="top"
                        />
                    </View>

                    {/* Botón de Acción */}
                    <View style={styles.buttonContainer}>
                        {loading ? (
                            <ActivityIndicator size="large" color="lightblue" />
                        ) : (
                            <TouchableOpacity style={styles.addButtom} onPress={handleCreateSpeaker}>
                                <Text style={styles.buttomText}>Crear</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2' // Un fondo suave grisáceo
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 35,
        marginBottom: 20
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333'
    },
    formContainer: {
        width: 0.9 * width,
        backgroundColor: "white",
        alignSelf: 'center',
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    inputGroup: {
        marginBottom: 20
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: '500',
        color: '#555'
    },
    input: {
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#333'
    },
    textArea: {
        height: 120,
        paddingTop: 12, // Para que el texto empiece arriba
    },
    buttonContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    addButtom: {
        backgroundColor: 'lightblue',
        borderColor: '#87CEEB',
        borderWidth: 1,
        height: 55,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    buttomText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default AddParticipants;