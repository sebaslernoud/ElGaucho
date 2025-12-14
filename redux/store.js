import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Lo crearemos en el siguiente paso

export const store = configureStore({
  reducer: {
    auth: authReducer,
    //courses: courseReducer, // (Ejemplo) Reducer para cursos
    //notifications: notificationReducer, // (Ejemplo) Reducer para notificaciones

    // Aquí puedes añadir otros reducers para diferentes partes de tu estado
    // Por ejemplo: courses: coursesReducer, notifications: notificationsReducer
  },
  // configureStore ya incluye redux-thunk y Redux DevTools Extension por defecto
  // No necesitas applyMiddleware(thunk) explícitamente aquí
});