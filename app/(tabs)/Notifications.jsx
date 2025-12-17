import React, { useState, useCallback } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  Alert
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importamos el nuevo servicio
import { getUserNotifications, markNotificationAsRead } from '../src/services/notificationService';

const { width } = Dimensions.get('window');

const Notifications = () => {
  const authState = useSelector(state => state.auth);
  const token = authState?.token;

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Función principal de carga y ordenamiento
  const fetchNotifications = async () => {
    if (!token) return;
    try {
      const data = await getUserNotifications(token);
      
      // LOGICA DE ORDENAMIENTO:
      // 1. Filtramos
      const unread = data.filter(n => !n.isRead).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const read = data.filter(n => n.isRead).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      // 2. Concatenamos: Primero NO LEÍDAS, luego LEÍDAS
      setNotifications([...unread, ...read]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Cargar al entrar a la pantalla
  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [token])
  );

  // Manejar el "Pull to refresh"
  const onRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  // Manejar click en notificación
  const handleNotificationPress = async (item) => {
    if (!item.isRead) {
      try {
        // 1. Llamar al backend para marcar como leída
        await markNotificationAsRead(item.id, token);
        
        // 2. Actualizar estado local para reflejar el cambio inmediatamente (optimistic update)
        setNotifications(prev => {
            // Buscamos la notificación y la cambiamos a leída
            const updatedList = prev.map(n => 
                n.id === item.id ? { ...n, isRead: true } : n
            );
            
            // Re-ordenamos para que baje a la sección de leídas
            const unread = updatedList.filter(n => !n.isRead).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const read = updatedList.filter(n => n.isRead).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            
            return [...unread, ...read];
        });

      } catch (error) {
        console.error("Error al marcar como leída", error);
      }
    } else {
        // Si ya está leída, quizás solo mostrar un detalle o no hacer nada
        // Alert.alert("Detalle", item.message);
    }
  };

  // Renderizado de cada item
  const renderItem = ({ item }) => {
    const isUnread = !item.isRead;

    return (
      <TouchableOpacity
        style={[
          styles.notificationCard,
          isUnread ? styles.unreadCard : styles.readCard
        ]}
        onPress={() => handleNotificationPress(item)}
        activeOpacity={0.7}
      >
        {/* Icono izquierdo según tipo */}
        <View style={[styles.iconContainer, isUnread ? styles.unreadIconBg : styles.readIconBg]}>
            <MaterialCommunityIcons 
                name={item.type === 'alert' ? 'alert-circle-outline' : 'bell-outline'} 
                size={24} 
                color={isUnread ? '#009AFF' : '#888'} 
            />
        </View>

        {/* Contenido */}
        <View style={styles.textContainer}>
          <View style={styles.headerRow}>
            <Text style={[styles.cardTitle, isUnread && styles.boldText]}>
              {item.title}
            </Text>
            {isUnread && <View style={styles.dot} />}
          </View>
          
          <Text style={[styles.cardMessage, !isUnread && styles.readText]}>
            {item.message}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#009AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Notificaciones</Text>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="bell-sleep" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No tienes notificaciones</Text>
          </View>
        }
      />
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
  headerContainer: {
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    padding: 15,
    paddingBottom: 20,
  },
  // Estilos de la tarjeta
  notificationCard: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  // Estilos específicos NO LEÍDA
  unreadCard: {
    backgroundColor: '#e6f7ff', // Azul muy suave
    borderColor: '#b3e0ff',
  },
  // Estilos específicos LEÍDA
  readCard: {
    backgroundColor: 'white',
    borderColor: '#eee',
  },
  // Iconos
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  unreadIconBg: {
    backgroundColor: 'white',
  },
  readIconBg: {
    backgroundColor: '#f0f0f0',
  },
  // Textos
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#0050b3', // Azul más fuerte para título no leído
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#009AFF',
    marginLeft: 5,
  },
  cardMessage: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    lineHeight: 20,
  },
  readText: {
    color: '#888', // Texto más gris si ya está leído
  },
  dateText: {
    fontSize: 11,
    color: '#999',
    textAlign: 'right',
  },
  // Estado vacío
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#888',
  }
});

export default Notifications;