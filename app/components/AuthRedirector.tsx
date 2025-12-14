import { router, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importar useDispatch
import { loadAuthData } from '../../redux/slices/authSlice'; // Asegúrate de que esta ruta sea correcta

export default function AuthRedirector({ children }: { children: React.ReactNode }) {
const dispatch = useDispatch();
const { isAuthenticated, isLoading, user } = useSelector((state: any) => state.auth);
const segments = useSegments();
const [isRouterReady, setIsRouterReady] = useState(false);
// Determina si la ruta actual es una ruta de autenticación
// `segments[0]` puede ser `(auth)` o `(tabs)` o incluso `_` para la raíz
const isAuthRoute = segments[0] === '(auth)';
const isRootRoute = segments.length === 0 || segments[0] === '_'; // Considera la ruta raíz también

console.log('Segments:', segments);
console.log('Is Authenticated:', isAuthenticated);
console.log('User Role:', user?.role);
console.log('Is Loading:', isLoading);
console.log('Is Auth Route:', isAuthRoute);
console.log('Is Router ready:', isRouterReady);

useEffect(() => {
  // Cargar los datos de autenticación al inicio de la aplicación
  // Esto es crucial para que `isAuthenticated` tenga el valor correcto
  // antes de que se ejecuten las redirecciones.
  dispatch(loadAuthData());
}, [dispatch]); // Solo se ejecuta una vez al montar el componente

useEffect(()=> {
  if(segments.length > 0 || segments[0] === '_'){
    setIsRouterReady(true);
  }
},[segments]);

useEffect(() => {
  // No hacer nada si aún estamos cargando los datos de autenticación
  if (isLoading) {
    console.log('Still loading auth data, returning...');
    return;
  }

  if(!isRouterReady){
    console.log("Router not ready");
    return;
  }

  console.log('Executing redirection logic. isAuthenticated:', isAuthenticated, 'segments:', segments);

  // Lógica de redirección
  if (!isAuthenticated) {
    // Si el usuario NO está autenticado
    if (segments.length === 0) {
      console.log('Segments are empty, waiting...');
      return;
    }
    if (!isAuthRoute) {
      // Y NO está en una ruta de autenticación, redirigir a login
      console.log('Not authenticated and not on auth route, redirecting to login...');
      router.replace('/(auth)/login');
    }
    console.log('Not authenticated and already on auth route, staying put.');
  } else {
    // Si el usuario SÍ está autenticado
    // Redirigir si está en auth route O si segments está vacío (justo después de login)
    if (isAuthRoute || segments.length === 0) {
      const userRole = user?.role;
      console.log('User is authenticated with role:', userRole, 'redirecting...');
      
      if (userRole === 'admin') {
        console.log('Admin detected, redirecting to admin dashboard...');
        router.replace('/(admin)/admin/AdminHome');
      } else {
        console.log('User detected, redirecting to Home...');
        router.replace('/(tabs)/Home');
      }
    }
    // Si ya está en una ruta de app (admin o tabs) y segments no está vacío, no hacer nada
    console.log('Authenticated and already on app route, staying put.');
  }
}, [isAuthenticated, isLoading, segments, isAuthRoute, user]);

return <>{children}</>;
}