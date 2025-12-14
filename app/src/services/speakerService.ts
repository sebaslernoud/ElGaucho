import axios from 'axios';

// Asegúrate de que la IP sea la correcta para tu entorno local
const API_BASE_URL = 'http://192.168.0.30:3000/api';

export interface Speaker {
  id: string;
  speakerName: string;
  bio?: string;
  expertise?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 1. Obtener todos los speakers
export const getAllSpeakers = async (token?: string): Promise<Speaker[]> => {
  try {
    // Si envías token, lo adjunta, si no, hace la petición sin auth (útil si la ruta es pública)
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    
    const response = await axios.get(`${API_BASE_URL}/speakers`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching speakers:', error);
    throw error;
  }
};

// 2. Obtener un speaker por ID
export const getSpeakerById = async (id: string, token?: string): Promise<Speaker> => {
  try {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

    const response = await axios.get(`${API_BASE_URL}/speakers/${id}`, config);
    return response.data;
  } catch (error) {
    console.error(`Error fetching speaker with id ${id}:`, error);
    throw error;
  }
};

// 3. Crear un nuevo speaker
export const createSpeaker = async (speakerData: { speakerName: string; bio?: string; expertise?: string }, token: string): Promise<Speaker> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/speakers`, speakerData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating speaker:', error);
    throw error;
  }
};

// 4. Actualizar un speaker existente
export const updateSpeaker = async (id: string, speakerData: Partial<Speaker>, token: string): Promise<Speaker> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/speakers/${id}`, speakerData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating speaker ${id}:`, error);
    throw error;
  }
};

// 5. Eliminar un speaker
export const deleteSpeaker = async (id: string, token: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/speakers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(`Error deleting speaker ${id}:`, error);
    throw error;
  }
};