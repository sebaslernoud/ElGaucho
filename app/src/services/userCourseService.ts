import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.30:3000/api'; // Ajusta tu IP si es necesario



export const joinCourse = async (userId: string, courseId: string, roleInCourse: string, token: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user-courses`,
      { userId, courseId, roleInCourse }, // El backend se encarga de poner status 'pending' por defecto
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error joining course:', error);
    throw error;
  }
};

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

export const getUserCoursesByStatus = async (status: string, token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user-courses/status/${status}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    // Solución Robusta:
    // Verificamos directamente si hay una respuesta y si el status es 404
    if (error.response && error.response.status === 404) {
        // No es un error crítico, simplemente no hay datos. Devolvemos array vacío.
        return [];
    }

    // Si es otro tipo de error (500, red, etc.), lo mostramos y lo lanzamos
    console.error(`Error fetching user courses with status ${status}:`, error);
    throw error;
  }
};