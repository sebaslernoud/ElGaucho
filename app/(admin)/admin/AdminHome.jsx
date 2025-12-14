import { useRouter, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// Ajusta esta ruta si es necesario (según tu estructura de carpetas)
import { logout } from '../../../redux/slices/authSlice'; 
import { getAllCourses } from '../../src/services/courseService';

const { width, height } = Dimensions.get('window');

const AdminHome = () => {
    const router = useRouter();
    const dispatch = useDispatch(); // Hook para disparar acciones de Redux
    const authState = useSelector(state => state.auth);
    const token = authState?.token;

    // Estados
    const [allCourses, setAllCourses] = useState([]);
    const [activeCourses, setActiveCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    // Función para Cerrar Sesión
    const handleLogout = () => {
        Alert.alert(
            "Cerrar Sesión",
            "¿Estás seguro que quieres salir?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Salir", 
                    style: "destructive", 
                    onPress: () => {
                        dispatch(logout()); // Limpia Redux
                        router.replace('/(auth)/login'); // Te manda al login y borra historial
                    } 
                }
            ]
        );
    };

    const fetchCourses = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const data = await getAllCourses(token);
            const formattedCourses = data.map(item => ({
                id: item.id,
                name: item.title,
                status: item.status,
            }));

            setAllCourses(formattedCourses);
            setActiveCourses(formattedCourses.filter(c => c.status === 'active'));

        } catch (error) {
            console.error('Error fetching courses:', error);
            // Opcional: mostrar alerta solo si es crítico
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchCourses();
        }, [token])
    );

    // Render items
    const renderActiveItem = ({ item }) => (
        <TouchableOpacity style={styles.blockItem} onPress={() => router.push('/admin/ActualCourseAdmin')}>
            <View style={styles.nameBoxItem}>
                <Text style={styles.nameItem}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderAllItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.blockItem} 
            onPress={() => router.push({ pathname: '/admin/AdminHome', params: { screen: 'CourseAdmin', courseId: item.id } })}
        >
            <View style={styles.nameBoxItem}>
                <Text style={styles.nameItem}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={[styles.container, styles.loaderContainer]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header con Título y Botón de Logout */}
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Listado de cursos</Text>
                
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Salir</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bigBlock}>
                <Text style={styles.listTitle}>Cursos activos</Text>
                <View style={styles.requestsContainer}>
                    {activeCourses.length === 0 ? (
                        <Text style={styles.emptyMessage}>No hay cursos activos</Text>
                    ) : (
                        <FlatList
                            data={activeCourses}
                            renderItem={renderActiveItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    )}
                </View>

                <View style={styles.requestsActualContainer}>
                    <Text style={styles.listTitle}>Todos los Cursos</Text>
                    {allCourses.length === 0 ? (
                        <Text style={styles.emptyMessage}>No hay cursos disponibles</Text>
                    ) : (
                        <FlatList
                            data={allCourses}
                            renderItem={renderAllItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    // Header modificado para incluir el botón
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Centra el título
        marginTop: 45,
        marginBottom: 10,
        position: 'relative', // Para poder posicionar el botón absoluto si queremos, o usar flex
        width: '100%'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    logoutButton: {
        position: 'absolute', // Lo fuerza a la derecha sin empujar el título
        right: 20,
        backgroundColor: '#ff4d4d', // Rojo suave
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    bigBlock: {
        marginTop: 10,
        width: 0.9 * width,
        height: 0.75 * height,
        backgroundColor: "white",
        alignSelf: 'center',
        borderRadius: 9,
        paddingBottom: 20
    },
    requestsContainer: {
        height: '20%',
        marginBottom: 10
    },
    requestsActualContainer: {
        height: '70%',
        marginTop: 10
    },
    blockItem: {
        backgroundColor: "lightblue",
        marginTop: 10,
        marginBottom: 5,
        height: 60,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nameBoxItem: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    nameItem: {
        fontSize: 16,
        fontWeight: '500'
    },
    listTitle: {
        marginTop: 15,
        marginBottom: 5,
        fontSize: 20,
        alignSelf: 'center'
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888'
    }
});

export default AdminHome;