import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.30:3000/api'; // <--- ¡CAMBIA ESTO!

// Thunk para el login asíncrono
export const loginUser = createAsyncThunk(
'auth/loginUser',
async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {  email: email,
      password: password})
    const { token: receivedToken, user: userData } = response.data;
    
    await AsyncStorage.setItem('userToken', receivedToken);
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    return { token: receivedToken, user: userData };
  } catch (error) {
    // Usa rejectWithValue para pasar el error al reducer
    return rejectWithValue(error.response?.data?.message || error.message || 'Error desconocido al iniciar sesión');
  }
}
);

// Thunk para cargar el estado de autenticación desde AsyncStorage
export const loadAuthData = createAsyncThunk(
'auth/loadAuthData',
async (_, { rejectWithValue }) => {
  try {
    const storedToken = await AsyncStorage.getItem('userToken');
    const storedUser = await AsyncStorage.getItem('userData');
    if (storedToken && storedUser) {
      return { token: storedToken, user: JSON.parse(storedUser) };
    }
    return null; // No hay datos de autenticación
  } catch (error) {
    return rejectWithValue(error.message || 'Error al cargar datos de autenticación');
  }
}
);

const authSlice = createSlice({
name: 'auth',
initialState: {
  user: null,
  token: null,
  isLoading: true, // Para la carga inicial del estado de autenticación
  isAuthenticated: false,
  error: null,
},
reducers: {
  // Reducer para el logout
  logout: (state) => {
    state.user = null;
    state.token = null;
    state.isAuthenticated = false;
    state.error = null;
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userData');
  },
  // Puedes añadir otros reducers síncronos aquí si los necesitas
},
extraReducers: (builder) => {
  builder
    // Manejo del loginUser
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload; // El error que pasamos con rejectWithValue
    })
    // Manejo de loadAuthData
    .addCase(loadAuthData.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loadAuthData.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      } else {
        state.isAuthenticated = false;
      }
    })
    .addCase(loadAuthData.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    });
},
});

export const { logout } = authSlice.actions; // Exporta la acción de logout
export default authSlice.reducer; // Exporta el reducer por defecto