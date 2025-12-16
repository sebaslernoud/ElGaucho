import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    StyleSheet, 
    TouchableOpacity, 
    Image, 
    ActivityIndicator 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getCourseById } from './services/courseService'; 

const Members = () => {
    const { courseId } = useLocalSearchParams();
    const router = useRouter();
    const token = useSelector(state => state.auth.token);
    
    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            if (!courseId || !token) return;
            try {
                // Obtenemos los participantes del curso
                const courseData = await getCourseById(courseId, token);
                
                // --- CAMBIO PRINCIPAL: Filtrar solo miembros con status 'accepted' ---
                const acceptedMembers = (courseData.userCourses || []).filter(m => m.status === 'accepted');
                setMembers(acceptedMembers);
                
            } catch (error) {
                console.error("Error fetching members:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, [courseId, token]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#009AFF" />
            </View>
        );
    }

    // Función auxiliar para filtrar miembros por rol
    const getMembersByRole = (role) => members.filter(m => m.roleInCourse === role);

    // Componente para renderizar una sección de roles
    const RenderSection = ({ title, role }) => {
        const roleMembers = getMembersByRole(role);
        
        // Si no hay miembros con ese rol, no mostramos la sección
        if (roleMembers.length === 0) return null;

        return (
            <View style={styles.sectionContainer}>
                <Text style={styles.roleTitle}>{title}</Text>
                <View style={styles.gridContainer}>
                    {roleMembers.map((item) => (
                        <TouchableOpacity 
                            key={item.userId}
                            style={styles.memberCard}
                            onPress={() => router.push({ 
                                pathname: '/src/UserProfile', 
                                params: { userId: item.userId } 
                            })}
                        >
                            <Image 
                                style={styles.avatar} 
                                source={{ 
                                    uri: item.user.profilePictureUrl || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" 
                                }} 
                            />
                            <Text style={styles.memberName} numberOfLines={2}>
                                {item.user.name} {item.user.lastName}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.mainContainer}>
            {/* Header con botón de volver */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Participantes</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Renderizamos las secciones en el orden deseado */}
                <RenderSection title="Capitanes" role="Capitan" />
                <RenderSection title="Subcapitanes" role="Subcapitan" />
                <RenderSection title="Talleristas" role="Tallerista" />
                <RenderSection title="Asistentes de Grupo" role="Asistente de grupo" />
                <RenderSection title="Asistidos" role="Asistido" />

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f5f7fa',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 15,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    backButton: {
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    sectionContainer: {
        marginBottom: 25,
    },
    roleTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#009AFF',
        marginBottom: 12,
        marginLeft: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#e0e0e0',
        paddingBottom: 5,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    memberCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: '30%', 
        margin: '1.5%',
        padding: 10,
        alignItems: 'center',
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 8,
        backgroundColor: '#eee',
    },
    memberName: {
        fontSize: 12,
        textAlign: 'center',
        color: '#333',
        fontWeight: '500',
    },
});

export default Members;