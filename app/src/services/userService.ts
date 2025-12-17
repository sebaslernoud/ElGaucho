import axios from 'axios';

// Asegúrate de que coincida con tu IP
const API_BASE_URL = 'http://192.168.0.30:3000/api'; 

export const getUserProfileById = async (userId: string, token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};


export const getAllUsers = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

export const uploadUserPhoto = async (userId: string, imageUri: string, token: string) => {
  try {
    const formData = new FormData();
    
    // Preparar archivo. React Native requiere uri, type y name.
    const filename = imageUri.split('/').pop() || 'photo.jpg';
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image/jpeg`;

    // TypeScript en RN a veces se queja con FormData, se usa 'any' o una interfaz específica para evitarlo
    formData.append('profilePicture', {
      uri: imageUri,
      name: filename,
      type,
    } as any);

    const response = await axios.post(`${API_BASE_URL}/users/${userId}/profile-picture`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Axios suele ponerlo automático, pero mejor asegurar
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw error;
  }
};