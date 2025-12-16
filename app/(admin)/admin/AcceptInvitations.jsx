import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, Alert, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { getPendingRequests, respondToRequest } from '../../src/services/userCourseService';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Usaremos iconos vectoriales mejor

const { width } = Dimensions.get('window');

const AcceptInvitations = () => {
    const authState = useSelector(state => state.auth);
    const token = authState?.token;

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    // Cargar datos al entrar a la pantalla
    const fetchRequests = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const data = await getPendingRequests(token);
            setRequests(data);
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "No se pudieron cargar las invitaciones.");
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchRequests();
        }, [token])
    );

    // Manejar Aceptar/Rechazar
    const handleResponse = async (courseId, userId, status) => {
        try {
            await respondToRequest(courseId, userId, status, token);
            // Actualizar lista localmente eliminando el item procesado
            setRequests(prev => prev.filter(req => !(req.courseId === courseId && req.userId === userId)));
            
            // Feedback visual opcional
            // Alert.alert("Éxito", `Solicitud ${status === 'accepted' ? 'aceptada' : 'rechazada'}`);
        } catch (error) {
            Alert.alert("Error", "No se pudo actualizar la solicitud.");
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <View style={styles.infoContainer}>
                    <Text style={styles.userName}>{item.user.name} {item.user.lastName}</Text>
                    <Text style={styles.userEmail}>{item.roleInCourse}</Text>
                    <Text style={styles.courseName}>Curso: {item.course.title}</Text>
                </View>
                
                <View style={styles.actionsContainer}>
                    {/* Botón Aceptar */}
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.acceptButton]} 
                        onPress={() => handleResponse(item.courseId, item.userId, 'accepted')}
                    >
                        <MaterialCommunityIcons name="check" size={24} color="white" />
                    </TouchableOpacity>

                    {/* Botón Denegar */}
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.denyButton]} 
                        onPress={() => handleResponse(item.courseId, item.userId, 'rejected')}
                    >
                        <MaterialCommunityIcons name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Solicitudes Pendientes</Text>
            </View>

            {requests.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No hay solicitudes pendientes.</Text>
                </View>
            ) : (
                <FlatList
                    data={requests}
                    renderItem={renderItem}
                    keyExtractor={(item) => `${item.userId}-${item.courseId}`}
                    contentContainerStyle={styles.listContent}
                />
            )}
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
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    listContent: {
        padding: 15,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    infoContainer: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    userRole: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    courseName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#009AFF', // Azul temático
    },
    actionsContainer: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    actionButton: {
        width: 45,
        height: 45,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        elevation: 2,
    },
    acceptButton: {
        backgroundColor: '#4CAF50', // Verde
    },
    denyButton: {
        backgroundColor: '#F44336', // Rojo
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    }
});

export default AcceptInvitations;