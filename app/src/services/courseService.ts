import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.30:3000/api';

interface Course {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  location: string;
  organizerId: string;
  maxParticipants?: number;
  status?: string;
  qrCodeUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Obtener todos los cursos
export const getAllCourses = async (token: string): Promise<Course[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all courses:', error);
    throw error;
  }
};

// Obtener un curso por ID
export const getCourseById = async (id: string, token: string): Promise<Course> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching course by ID:', error);
    throw error;
  }
};

// Crear un nuevo curso
export const createCourse = async (courseData: Partial<Course>, token: string): Promise<Course> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/courses`, courseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

// Actualizar un curso
export const updateCourse = async (id: string, courseData: Partial<Course>, token: string): Promise<Course> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/courses/${id}`, courseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

// Eliminar un curso
export const deleteCourse = async (id: string, token: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};
