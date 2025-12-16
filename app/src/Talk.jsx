import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getTalkById } from './services/talkService';

const Talk = () => {
  const { talkId } = useLocalSearchParams();
  const router = useRouter();
  const token = useSelector(state => state.auth.token);

  const [talk, setTalk] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTalkDetails = async () => {
        if (!talkId || !token) return;
        try {
            const data = await getTalkById(talkId, token);
            setTalk(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    fetchTalkDetails();
  }, [talkId, token]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#009AFF" />
      </View>
    );
  }

  if (!talk) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>No se encontró la charla.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Botón Volver flotante */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Encabezado */}
        <View style={styles.headerCard}>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="microphone-variant" size={40} color="#009AFF" />
            </View>
            <Text style={styles.title}>{talk.title}</Text>
            <View style={styles.roomBadge}>
                <MaterialCommunityIcons name="map-marker" size={16} color="#666" />
                <Text style={styles.roomText}>Aula: {talk.room}</Text>
            </View>
        </View>

        {/* Info del Speaker (MODIFICADO) */}
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Disertante</Text>
            {/* Se eliminó el avatar y se muestra speakerName y expertise */}
            <View style={styles.speakerCard}>
                <View>
                    <Text style={styles.speakerName}>
                        {talk.speaker?.speakerName || 'A confirmar'}
                    </Text>
                    <Text style={styles.speakerExpertise}>
                        {talk.speaker?.expertise || 'Speaker Invitado'}
                    </Text>
                </View>
            </View>
        </View>

        {/* Horario y Descripción */}
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Detalles</Text>
            
            <View style={styles.infoRow}>
                <MaterialCommunityIcons name="clock-outline" size={22} color="#009AFF" style={styles.infoIcon} />
                <View>
                    <Text style={styles.infoLabel}>Horario</Text>
                    <Text style={styles.infoValue}>
                        {new Date(talk.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 
                        {' - '}
                        {new Date(talk.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            <Text style={styles.descriptionLabel}>Descripción</Text>
            <Text style={styles.description}>
                {talk.description || "Sin descripción disponible para esta charla."}
            </Text>
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
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
  headerCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: '#e6f7ff',
    padding: 15,
    borderRadius: 50,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  roomBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  roomText: {
    marginLeft: 5,
    color: '#555',
    fontWeight: '600',
    fontSize: 14,
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  speakerCard: {
    // Ya no necesita flexDirection: 'row' si no hay imagen al lado
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  speakerName: {
    fontSize: 18, // Aumenté un poco el tamaño
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4, // Espacio para el expertise
  },
  speakerExpertise: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic', // Estilo itálico para diferenciarlo
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoIcon: {
    marginRight: 15,
    backgroundColor: '#f0f9ff',
    padding: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  descriptionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
  },
});

export default Talk;