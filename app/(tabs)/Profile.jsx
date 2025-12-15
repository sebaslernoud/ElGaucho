import React, { useState, useCallback } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useRouter } from 'expo-router'; // <--- Importamos useRouter
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { logout } from '../../redux/slices/authSlice';
// Importamos el servicio para obtener cursos del usuario
import { getUserCoursesByStatus } from '../src/services/userCourseService';

const { width } = Dimensions.get('window');

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter(); // <--- Inicializamos el router
  const { user, isAuthenticated, isLoading, token } = useSelector((state) => state.auth);

  // Estados para el historial de cursos
  const [historyCourses, setHistoryCourses] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Función para obtener cursos aceptados
  const fetchHistory = async () => {
    if (!token) return;
    setLoadingHistory(true);
    try {
        // Pedimos al backend solo los cursos donde el usuario ha sido aceptado
        const data = await getUserCoursesByStatus('accepted', token);
        setHistoryCourses(data);
    } catch (error) {
        console.error("Error fetching course history:", error);
    } finally {
        setLoadingHistory(false);
    }
  };

  // Recargar historial cada vez que se entra al perfil
  useFocusEffect(
    useCallback(() => {
        fetchHistory();
    }, [token])
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#009AFF" />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View style={[styles.container, styles.center]}>
        <MaterialCommunityIcons name="account-alert" size={50} color="#888" />
        <Text style={styles.message}>Inicia sesión para ver tu perfil.</Text>
      </View>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'No definida';
    return new Date(dateString).toLocaleDateString();
  };

  // Renderizado de cada tarjeta de curso (AHORA CON NAVEGACIÓN)
  const renderCourseItem = ({ item }) => (
    <TouchableOpacity 
        style={styles.courseCard}
        onPress={() => router.push({
            pathname: '/src/CourseIn', // Ruta a la vista de curso inscrito
            params: { courseId: item.course.id } // Pasamos el ID
        })}
    >
        <View style={styles.courseIconContainer}>
            <MaterialCommunityIcons name="school" size={24} color="#009AFF" />
        </View>
        <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>{item.course.title}</Text>
            <Text style={styles.courseDetails}>
                {new Date(item.course.startDate).toLocaleDateString()} • {item.course.location}
            </Text>
        </View>
        <View style={styles.statusBadge}>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
        </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Fijo */}
      <View style={styles.headerContainer}>
        <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={{
                    uri: user?.profilePictureUrl || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
                    }}
                />
                <TouchableOpacity style={styles.editIcon}>
                    <MaterialCommunityIcons name="pencil" size={16} color="white" />
                </TouchableOpacity>
            </View>
            
            <View style={styles.headerText}>
                <Text style={styles.name}>{user?.name} {user?.lastName}</Text>
                <Text style={styles.email}>{user?.email}</Text>
                <View style={styles.roleBadge}>
                    <Text style={styles.roleText}>{user?.role?.toUpperCase() || 'USUARIO'}</Text>
                </View>
            </View>

            <TouchableOpacity 
                style={styles.logoutBtn} 
                onPress={() => dispatch(logout())}
            >
                <MaterialCommunityIcons name="logout" size={24} color="#FF6347" />
            </TouchableOpacity>
        </View>

        {/* Tarjeta de Información */}
        <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Información Personal</Text>
            
            <View style={styles.infoRow}>
                <MaterialCommunityIcons name="earth" size={20} color="#009AFF" style={styles.icon} />
                <View>
                    <Text style={styles.label}>País / Ciudad</Text>
                    <Text style={styles.value}>
                        {user?.countryOfBirth || 'N/A'}, {user?.cityOfResidence || 'N/A'}
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
                <MaterialCommunityIcons name="school" size={20} color="#009AFF" style={styles.icon} />
                <View>
                    <Text style={styles.label}>Universidad</Text>
                    <Text style={styles.value}>{user?.university || 'No especificada'}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
                <MaterialCommunityIcons name="cake-variant" size={20} color="#009AFF" style={styles.icon} />
                <View>
                    <Text style={styles.label}>Fecha de Nacimiento</Text>
                    <Text style={styles.value}>{formatDate(user?.dateOfBirth)}</Text>
                </View>
            </View>
        </View>
      </View>

      {/* Sección Historial de Cursos */}
      <View style={styles.coursesSection}>
        <Text style={styles.sectionHeader}>Historial de Cursos</Text>
        
        {loadingHistory ? (
            <View style={styles.loadingContainer}>
                <ActivityIndicator color="#009AFF" />
            </View>
        ) : (
            <FlatList
                data={historyCourses}
                renderItem={renderCourseItem}
                keyExtractor={(item) => `${item.courseId}-${item.userId}`}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No tienes cursos aceptados en tu historial.</Text>
                }
                showsVerticalScrollIndicator={false}
            />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  message: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  // Header
  headerContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#e6f7ff',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#009AFF',
    borderRadius: 12,
    padding: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  headerText: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  roleBadge: {
    backgroundColor: '#e6f7ff',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  roleText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#009AFF',
  },
  logoutBtn: {
    padding: 10,
    backgroundColor: '#fff0f0',
    borderRadius: 12,
  },
  // Info Card
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    padding: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  icon: {
    marginRight: 15,
    backgroundColor: '#f0f9ff',
    padding: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  label: {
    fontSize: 12,
    color: '#999',
  },
  value: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
    marginLeft: 50,
  },
  // Courses Section
  coursesSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginLeft: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  // Estilos para tarjeta de curso
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  courseIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#e6f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  courseDetails: {
    fontSize: 12,
    color: '#888',
  },
  statusBadge: {
    marginLeft: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontStyle: 'italic',
  }
});

export default Profile;