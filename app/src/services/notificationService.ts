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

// Marcar una notificación como leída
export const markNotificationAsRead = async (id: string, token: string): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/notifications/${id}/read`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(`Error marking notification ${id} as read:`, error);
    throw error;
  }
};