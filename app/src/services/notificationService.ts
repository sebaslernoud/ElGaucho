import axios from 'axios';

// Asegúrate de que la IP sea la correcta para tu entorno local
const API_BASE_URL = 'http://192.168.0.30:3000/api';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  relatedCourseId?: string;
  relatedTalkId?: string;
}

// Obtener todas las notificaciones del usuario
export const getUserNotifications = async (token: string): Promise<Notification[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId: string, token: string) => {
  try {
    // La ruta debe ser EXACTAMENTE: /notifications/:id/read
    // El error 404 suele ser por olvidar '/api' o escribir mal esta parte
    const response = await axios.patch(
      `${API_BASE_URL}/notifications/${notificationId}/read`, 
      {}, // Body vacío para PATCH
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};