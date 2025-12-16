import axios from 'axios';

// Asegúrate de que esta IP sea la correcta para tu entorno local
const API_BASE_URL = 'http://192.168.0.30:3000/api';

// Definimos la interfaz para los datos de la charla para mejor tipado (opcional pero recomendado)
export interface TalkData {
  courseId: string;
  title: string;
  description: string;
  startTime: string; // Se envía como string ISO
  endTime: string;   // Se envía como string ISO
  room: string;
  speakerId: string;
  status?: string;
}

// 1. Obtener todas las charlas
export const getAllTalks = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/talks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all talks:', error);
    throw error;
  }
};

// 2. Obtener una charla por ID
export const getTalkById = async (talkId: string, token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/talks/${talkId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching talk details:', error);
    throw error;
  }
};

// 3. Crear una nueva charla
export const createTalk = async (talkData: TalkData, token: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/talks`, talkData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating talk:', error);
    throw error;
  }
};

// 4. Actualizar una charla existente
export const updateTalk = async (id: string, talkData: Partial<TalkData>, token: string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/talks/${id}`, talkData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating talk ${id}:`, error);
    throw error;
  }
};

// 5. Eliminar una charla
export const deleteTalk = async (id: string, token: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/talks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(`Error deleting talk ${id}:`, error);
    throw error;
  }
};