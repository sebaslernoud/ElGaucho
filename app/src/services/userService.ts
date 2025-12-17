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