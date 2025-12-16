import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View, ScrollView,TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { getCourseById } from './services/courseService';

const CourseIn = () => {
    const { courseId } = useLocalSearchParams();
    const authState = useSelector(state => state.auth);
    const token = authState?.token;
    const router = useRouter();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!token || !courseId) return;
            try {
                // getCourseById trae 'talks' y 'userCourses' (con 'user')
                const data = await getCourseById(courseId, token);
                setCourse(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [courseId, token]);

    if (loading) return <ActivityIndicator size="large" color="#009AFF" style={{marginTop: 50}} />;
    if (!course) return <Text style={{textAlign:'center', marginTop: 50}}>Curso no encontrado</Text>;

    // Renderizador de Charlas
    const renderTalkItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.cardItem}
            onPress={() => router.push({
                pathname: '/src/Talk', // Navegar a la pantalla Talk
                params: { talkId: item.id } // Pasamos el ID de la charla
            })}
        >
            <View style={styles.timeBox}>
                <Text style={styles.timeText}>
                    {new Date(item.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </Text>
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>
                    <MaterialCommunityIcons name="microphone" size={14} color="#666" /> 
                    {' '}{item.speaker?.speakerName || 'Por definir'}
                </Text>
                <Text style={styles.roomText}>Aula: {item.room}</Text>
            </View>
            {/* Flechita indicando que es clickeable */}
            <MaterialCommunityIcons name="chevron-right" size={24} color="#ddd" />
        </TouchableOpacity>
    );

    // Renderizador de Miembros
    const renderMemberItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.memberCard}
            onPress={() => router.push({
                pathname: '/src/UserProfile', // Navegamos a la nueva pantalla
                params: { userId: item.user.id } // Pasamos el ID del usuario
            })}
        >
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                    {item.user.name?.charAt(0).toUpperCase()}{item.user.lastName?.charAt(0).toUpperCase()}
                </Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={styles.memberName}>{item.user.name} {item.user.lastName}</Text>
                <Text style={styles.memberRole}>
                    {item.roleInCourse === 'admin' || item.roleInCourse === 'organizer' ? 'Organizador' : item.roleInCourse || 'Participante'}
                </Text>
            </View>
            {/* Indicador visual de que es clickeable */}
            <MaterialCommunityIcons name="chevron-right" size={24} color="#ddd" />
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            
            {/* Portada del Curso */}
            <View style={styles.headerBlock}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <View style={styles.badgeContainer}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>INSCRITO</Text>
                    </View>
                </View>

                <Text style={styles.description}>{course.description}</Text>

                <View style={styles.infoGrid}>
                    <View style={styles.infoItem}>
                        <MaterialCommunityIcons name="calendar-range" size={24} color="#009AFF" />
                        <Text style={styles.infoLabel}>Inicio</Text>
                        <Text style={styles.infoValue}>{new Date(course.startDate).toLocaleDateString()}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <MaterialCommunityIcons name="map-marker-radius" size={24} color="#009AFF" />
                        <Text style={styles.infoLabel}>Lugar</Text>
                        <Text style={styles.infoValue}>{course.location}</Text>
                    </View>
                </View>
            </View>

            {/* Cronograma / Charlas */}
            <View style={styles.sectionBlock}>
                <Text style={styles.sectionTitle}>Charlas</Text>
                {course.talks && course.talks.length > 0 ? (
                    <FlatList
                        data={course.talks}
                        renderItem={renderTalkItem}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                    />
                ) : (
                    <Text style={styles.emptyText}>No hay charlas programadas aún.</Text>
                )}
            </View>

            {/* Sección Miembros del Curso */}
            <View style={styles.sectionBlock}>
                {/* Título clickeable para ir a la vista completa */}
                <TouchableOpacity 
                    style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15}}
                    onPress={() => router.push({ pathname: '/src/Members', params: { courseId: course.id } })}
                >
                    <Text style={styles.sectionTitle}>Participantes ({course.userCourses?.length || 0})</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: '#009AFF', fontSize: 14, marginRight: 5}}>Ver todos</Text>
                        <MaterialCommunityIcons name="chevron-right" size={24} color="#009AFF" />
                    </View>
                </TouchableOpacity>

                {course.userCourses && course.userCourses.length > 0 ? (
                    <FlatList
                        data={course.userCourses.slice(0, 3)} // Mostramos solo los primeros 3 como vista previa
                        renderItem={renderMemberItem}
                        keyExtractor={item => item.userId + item.courseId}
                        scrollEnabled={false}
                        contentContainerStyle={styles.membersList}
                    />
                ) : (
                    <Text style={styles.emptyText}>No hay participantes visibles.</Text>
                )}
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
    },
    scrollContent: {
        paddingTop: 60, // AUMENTADO: Margen superior solicitado
        paddingBottom: 40,
    },
    headerBlock: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 15, // Un poco de margen a los lados queda mejor visualmente
        borderRadius: 20, // Bordes más redondeados
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 25,
    },
    courseTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 10,
    },
    badgeContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    badge: {
        backgroundColor: '#e6f7ff',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#91d5ff',
    },
    badgeText: {
        color: '#0050b3',
        fontWeight: 'bold',
        fontSize: 12,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
        marginBottom: 20,
    },
    infoGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#f9fafb',
        borderRadius: 15,
        padding: 15,
    },
    infoItem: {
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 2,
    },
    sectionBlock: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        marginLeft: 5,
    },
    // Estilos para Charlas
    cardItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 12,
        padding: 15,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    timeBox: {
        paddingRight: 15,
        borderRightWidth: 1,
        borderRightColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        width: 70,
    },
    timeText: {
        fontWeight: 'bold',
        color: '#009AFF',
        fontSize: 16,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    roomText: {
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic',
    },
    // Estilos para Miembros
    membersList: {
        marginTop: 5,
    },
    memberCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 12,
        marginBottom: 10,
        borderRadius: 12,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#e6e6e6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    avatarText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
    },
    memberName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    memberRole: {
        fontSize: 13,
        color: '#888',
        marginTop: 2,
        textTransform: 'capitalize',
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 10,
        fontStyle: 'italic',
    }
});

export default CourseIn;