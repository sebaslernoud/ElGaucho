import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // <--- Importar Picker

import { getCourseById } from './services/courseService'; //
import { joinCourse } from './services/userCourseService'; //

const { width } = Dimensions.get('window');

const Course = () => {
    const { courseId } = useLocalSearchParams();
    const router = useRouter();
    
    const authState = useSelector(state => state.auth);
    const token = authState?.token;
    const user = authState?.user;

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState(false);
    
    // Estado para el rol seleccionado (por defecto 'Asistido')
    const [selectedRole, setSelectedRole] = useState('Asistido');

    useEffect(() => {
        const fetchDetails = async () => {
            if (!token || !courseId) return;
            try {
                const data = await getCourseById(courseId, token);
                setCourse(data);
            } catch (error) {
                Alert.alert("Error", "No se pudo cargar la información del curso.");
                router.back();
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [courseId, token]);

    const handleJoin = async () => {
        if (!user?.id) return;
        
        setJoining(true);
        try {
            // Enviamos el rol seleccionado al servicio
            await joinCourse(user.id, courseId, selectedRole, token);
            
            Alert.alert(
                "Solicitud Enviada", 
                `Tu solicitud para unirte como "${selectedRole}" ha sido enviada.`,
                [{ text: "Volver a Inicio", onPress: () => router.replace('/(tabs)/Home') }]
            );
        } catch (error) {
            const msg = error.response?.status === 409 
                ? "Ya tienes una solicitud pendiente o ya estás inscrito en este curso." 
                : "Hubo un error al intentar unirse.";
            Alert.alert("Aviso", msg);
        } finally {
            setJoining(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#009AFF" style={styles.loader} />;
    }

    if (!course) return null;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Header Visual */}
            <View style={styles.headerCard}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="school" size={60} color="#009AFF" />
                </View>
                <Text style={styles.title}>{course.title}</Text>
                <Text style={styles.statusBadge}>INSCRIPCIÓN ABIERTA</Text>
            </View>

            {/* Información del Curso */}
            <View style={styles.infoBlock}>
                <Text style={styles.sectionTitle}>Detalles</Text>
                <Text style={styles.description}>{course.description || "Sin descripción disponible."}</Text>
                
                <View style={styles.row}>
                    <MaterialCommunityIcons name="calendar" size={20} color="#666" />
                    <Text style={styles.rowText}>
                        Inicio: {new Date(course.startDate).toLocaleDateString()}
                    </Text>
                </View>
                
                <View style={styles.row}>
                    <MaterialCommunityIcons name="map-marker" size={20} color="#666" />
                    <Text style={styles.rowText}>{course.location}</Text>
                </View>
            </View>

            {/* Selector de Rol */}
            <View style={styles.roleBlock}>
                <Text style={styles.sectionTitle}>¿Cómo quieres participar?</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedRole}
                        onValueChange={(itemValue) => setSelectedRole(itemValue)}
                        style={styles.picker}
                        mode="dropdown" // Android: dropdown, iOS: wheel (default)
                    >
                        <Picker.Item label="Asistido" value="Asistido" />
                        <Picker.Item label="Asistente de grupo" value="Asistente de grupo" />
                        <Picker.Item label="Tallerista" value="Tallerista" />
                        <Picker.Item label="Subcapitán" value="Subcapitan" />
                        <Picker.Item label="Capitán" value="Capitan" />
                    </Picker>
                </View>
            </View>

            {/* Botón de Acción */}
            <View style={styles.footer}>
                <TouchableOpacity 
                    style={[styles.joinButton, joining && styles.disabledButton]} 
                    onPress={handleJoin}
                    disabled={joining}
                >
                    {joining ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <>
                            <MaterialCommunityIcons name="account-plus" size={24} color="white" style={{marginRight: 10}} />
                            <Text style={styles.joinButtonText}>Solicitar Unirse</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    contentContainer: {
        padding: 20,
    },
    headerCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    iconContainer: {
        backgroundColor: '#e6f7ff',
        padding: 20,
        borderRadius: 50,
        marginBottom: 15,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    statusBadge: {
        backgroundColor: '#E8F5E9',
        color: '#2E7D32',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 'bold',
        overflow: 'hidden',
    },
    infoBlock: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20, // Reducido para dar espacio al siguiente bloque
        elevation: 2,
    },
    roleBlock: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        marginBottom: 30,
        elevation: 2,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: '#f9f9f9',
        overflow: 'hidden', // Para que el picker respete el borde redondeado en Android
    },
    picker: {
        height: 50,
        width: '100%',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    rowText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#444',
    },
    footer: {
        marginTop: 10,
        marginBottom: 40
    },
    joinButton: {
        backgroundColor: '#009AFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        elevation: 3,
        shadowColor: "#009AFF",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    disabledButton: {
        backgroundColor: '#a0d9ff',
    },
    joinButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Course;