import axios from 'axios';

// Asegúrate de que esta IP sea la correcta
const API_BASE_URL = 'http://192.168.0.30:3000/api'; 

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