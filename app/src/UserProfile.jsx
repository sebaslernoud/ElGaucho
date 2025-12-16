import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getUserProfileById } from './services/userService'; // Importamos el servicio nuevo

const UserProfile = () => {
  const { userId } = useLocalSearchParams(); // Obtenemos el ID del participante
  const router = useRouter();
  const token = useSelector(state => state.auth.token);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
        if (!userId || !token) return;
        try {
            const data = await getUserProfileById(userId, token);
            setUser(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    fetchUser();
  }, [userId, token]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#009AFF" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text>Usuario no encontrado.</Text>
      </View>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'No definida';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      {/* Botón Volver */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerContainer}>
            <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={{
                        uri: user.profilePictureUrl || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
                        }}
                    />
                </View>
                
                <View style={styles.headerText}>
                    <Text style={styles.name}>{user.name} {user.lastName}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                    <View style={styles.roleBadge}>
                        <Text style={styles.roleText}>{user.role?.toUpperCase() || 'PARTICIPANTE'}</Text>
                    </View>
                </View>
            </View>

            {/* Tarjeta de Información */}
            <View style={styles.infoCard}>
                <Text style={styles.cardTitle}>Información Personal</Text>
                
                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="earth" size={20} color="#009AFF" style={styles.icon} />
                    <View>
                        <Text style={styles.label}>País / Ciudad</Text>
                        <Text style={styles.value}>
                            {user.countryOfBirth || 'N/A'}, {user.cityOfResidence || 'N/A'}
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="school" size={20} color="#009AFF" style={styles.icon} />
                    <View>
                        <Text style={styles.label}>Universidad</Text>
                        <Text style={styles.value}>{user.university || 'No especificada'}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="book-open-variant" size={20} color="#009AFF" style={styles.icon} />
                    <View>
                        <Text style={styles.label}>Carrera</Text>
                        <Text style={styles.value}>{user.career || 'No especificada'}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="cake-variant" size={20} color="#009AFF" style={styles.icon} />
                    <View>
                        <Text style={styles.label}>Fecha de Nacimiento</Text>
                        <Text style={styles.value}>{formatDate(user.dateOfBirth)}</Text>
                    </View>
                </View>
            </View>
        </View>
      </ScrollView>
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
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    elevation: 3,
  },
  headerContainer: {
    marginHorizontal: 20,
    marginTop: 40, // Espacio para el botón de volver
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#e6f7ff',
  },
  headerText: {
    flex: 1,
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
  // Info Card
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
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
    marginVertical: 10,
    marginLeft: 50,
  },
});

export default UserProfile;