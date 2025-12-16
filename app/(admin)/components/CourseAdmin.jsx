import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { getCourseById } from '../../src/services/courseService';

const { width } = Dimensions.get('window');

const CourseAdmin = () => {
    const { courseId } = useLocalSearchParams(); 
    const router = useRouter();
    const authState = useSelector(state => state.auth);
    const token = authState?.token;

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCourseDetails = async () => {
        if (!courseId || !token) return;
        setLoading(true);
        try {
            const data = await getCourseById(courseId, token);
            setCourse(data);
        } catch (error) {
            console.error('Error fetching course details:', error);
            Alert.alert("Error", "No se pudo cargar la información del curso.");
            router.back();
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchCourseDetails();
        }, [courseId, token])
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    if (!course) return null;

    // Renderizadores de items para las listas
    const renderTalkItem = ({ item }) => (
        <View style={styles.cardItem}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>Speaker: {item.speaker?.speakerName || 'Sin asignar'}</Text>
            <Text style={styles.cardDetail}>{new Date(item.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {item.room}</Text>
        </View>
    );

    const renderParticipantItem = ({ item }) => (
        <View style={styles.cardItem}>
            <Text style={styles.cardTitle}>{item.user.name} {item.user.lastName}</Text>
            <Text style={styles.cardSubtitle}>{item.user.email}</Text>
            <View style={[styles.badge, item.status === 'accepted' ? styles.badgeGreen : styles.badgeGray]}>
                <Text style={styles.badgeText}>{item.status}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* Header del Curso */}
                <View style={styles.headerBlock}>
                    <Text style={styles.courseTitle}>{course.title}</Text>
                    <Text style={styles.courseStatus}>{course.status.toUpperCase()}</Text>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>📅 Inicio:</Text>
                        <Text style={styles.infoText}>{new Date(course.startDate).toLocaleDateString()}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>📍 Ubicación:</Text>
                        <Text style={styles.infoText}>{course.location}</Text>
                    </View>
                    <Text style={styles.description}>{course.description}</Text>
                </View>

                {/* Sección Charlas */}
                <View style={styles.sectionBlock}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Charlas </Text>
                        <TouchableOpacity 
                            onPress={() => router.push({ pathname: 'components/CreateTalk', params: { courseId: course.id } })}
                        >
                            <Text style={styles.addButton}>+ Agregar</Text>
                        </TouchableOpacity>
                    </View>

                    {course.talks && course.talks.length > 0 ? (
                        <FlatList
                            data={course.talks}
                            renderItem={renderTalkItem}
                            keyExtractor={item => item.id}
                            scrollEnabled={false} 
                        />
                    ) : (
                        <Text style={styles.emptyText}>No hay charlas programadas.</Text>
                    )}
                </View>

                {/* Sección Participantes */}
                <View style={styles.sectionBlock}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Participantes</Text>
                    </View>

                    {course.userCourses && course.userCourses.length > 0 ? (
                        <FlatList
                            data={course.userCourses}
                            renderItem={renderParticipantItem}
                            keyExtractor={item => item.userId + item.courseId}
                            scrollEnabled={false}
                        />
                    ) : (
                        <Text style={styles.emptyText}>No hay participantes registrados.</Text>
                    )}
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f4f7', // Un gris muy suave para el fondo
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    scrollContent: {
        paddingVertical: 30, // Más padding vertical global
        alignItems: 'center', // [CENTRADO] Alinea los bloques al centro horizontalmente
        paddingBottom: 50
    },
    headerBlock: {
        backgroundColor: 'white',
        borderRadius: 16, // Bordes más redondeados
        padding: 20, // [PADDING AUMENTADO]
        marginTop: 10,
        marginBottom: 25,
        width: width * 0.9, // [ANCHO CONTROLADO] Ocupa el 90% del ancho
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 4,
    },
    courseTitle: {
        fontSize: 22, // [LETRA MAS CHICA] (Antes 26)
        fontWeight: 'bold',
        color: '#2d3436',
        marginBottom: 5,
        textAlign: 'center', // Título centrado
    },
    courseStatus: {
        fontSize: 12, // [LETRA MAS CHICA] (Antes 14)
        fontWeight: 'bold',
        color: '#0984e3',
        marginBottom: 20,
        textAlign: 'center',
        letterSpacing: 1,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 10, // Un poco más de espacio entre filas
        alignItems: 'center',
    },
    infoLabel: {
        fontWeight: '600',
        width: 90,
        fontSize: 13, // [LETRA MAS CHICA]
        color: '#636e72',
    },
    infoText: {
        color: '#2d3436',
        flex: 1,
        fontSize: 13, // [LETRA MAS CHICA]
    },
    description: {
        marginTop: 20,
        color: '#636e72',
        lineHeight: 22, // Mejor interlineado para lectura
        fontSize: 13, // [LETRA MAS CHICA]
        textAlign: 'justify',
    },
    sectionBlock: {
        width: width * 0.9, // [ANCHO CONTROLADO] Alineado con el header
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 5
    },
    sectionTitle: {
        fontSize: 18, // [LETRA MAS CHICA] (Antes 20)
        fontWeight: '700',
        color: '#2d3436',
    },
    addButton: {
        color: '#0984e3',
        fontWeight: '600',
        fontSize: 14, // [LETRA MAS CHICA]
    },
    cardItem: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20, // [PADDING AUMENTADO] (Antes 15)
        marginBottom: 15,
        borderLeftWidth: 4,
        borderLeftColor: 'lightblue',
        // Sombras más suaves
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 15, // [LETRA MAS CHICA] (Antes 16)
        fontWeight: 'bold',
        color: '#2d3436',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 13, // [LETRA MAS CHICA]
        color: '#636e72',
        marginBottom: 4,
    },
    cardDetail: {
        fontSize: 12, // [LETRA MAS CHICA]
        color: '#b2bec3',
        fontStyle: 'italic',
        marginTop: 5,
    },
    badge: {
        marginTop: 10,
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    badgeGreen: {
        backgroundColor: '#e3f9e5', // Un verde más pastel
        borderWidth: 0, // Quitamos borde para estilo más limpio
    },
    badgeGray: {
        backgroundColor: '#f1f2f6',
        borderWidth: 0,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#2d3436',
        textTransform: 'uppercase',
    },
    emptyText: {
        textAlign: 'center',
        color: '#b2bec3',
        fontStyle: 'italic',
        marginTop: 15,
        fontSize: 13,
    }
});

export default CourseAdmin;