import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.30:3000/api'; // Ajusta tu IP si es necesario

// Obtener solicitudes pendientes
export const getPendingRequests = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user-courses/pending`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    throw error;
  }
};

// Responder a una solicitud (Aceptar/Rechazar)
export const respondToRequest = async (courseId: string, userId: string, status: 'accepted' | 'rejected', token: string) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/user-courses/${courseId}/${userId}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating request status to ${status}:`, error);
    throw error;
  }
};