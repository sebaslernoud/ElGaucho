import { Slot } from 'expo-router';
import React from 'react';
import { Provider } from 'react-redux'; // Importar Provider
import { store } from '../redux/store'; // Importar tu store
// import { loadAuthData } from './redux/slices/authSlice'; // Importar el thunk para cargar datos
// import { useSelector, useDispatch } from 'react-redux'; // Importar hooks de Redux
// import { router, useSegments } from 'expo-router'; // Importar router y useSegments
import AuthRedirector from './components/AuthRedirector';

// Componente para manejar la redirección de autenticación con Redux

// Componente principal del layout
export default function RootLayout() {
return (
  <Provider store={store}>
    <AuthRedirector>
      <Slot />
    </AuthRedirector>
  </Provider>
);
}