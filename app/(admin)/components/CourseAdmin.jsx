import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { getCourseById } from '../../src/services/courseService';

const { width } = Dimensions.get('window');

const CourseAdmin = () => {
    const { courseId } = useLocalSearchParams(); // Recibimos el ID desde la navegación
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
                        {/* Botón para crear charla (opcional, redirige a CreateTalk) */}
                        <TouchableOpacity 
                            onPress={() => router.push({ pathname: '/components/CreateTalk', params: { courseId: course.id } })}
                        >
                            <Text style={styles.addButton}>+ Agregar</Text>
                        </TouchableOpacity>
                    </View>

                    {course.talks && course.talks.length > 0 ? (
                        <FlatList
                            data={course.talks}
                            renderItem={renderTalkItem}
                            keyExtractor={item => item.id}
                            scrollEnabled={false} // Usamos el scroll del padre
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
        backgroundColor: '#f5f5f5',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    scrollContent: {
        padding: 15,
        paddingBottom: 40
    },
    headerBlock: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    courseTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    courseStatus: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1890ff',
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    infoLabel: {
        fontWeight: '600',
        width: 100,
        color: '#555',
    },
    infoText: {
        color: '#333',
        flex: 1,
    },
    description: {
        marginTop: 15,
        color: '#666',
        lineHeight: 20,
        fontStyle: 'italic',
    },
    sectionBlock: {
        marginBottom: 25,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 5
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    addButton: {
        color: '#1890ff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cardItem: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: 'lightblue',
        elevation: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    cardDetail: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
    badge: {
        marginTop: 8,
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 12,
    },
    badgeGreen: {
        backgroundColor: '#e6fffa',
        borderWidth: 1,
        borderColor: '#38b2ac',
    },
    badgeGray: {
        backgroundColor: '#edf2f7',
        borderWidth: 1,
        borderColor: '#cbd5e0',
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        fontStyle: 'italic',
        marginTop: 10,
    }
});

export default CourseAdmin;