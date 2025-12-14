import { Link } from 'expo-router'; // Para navegación entre pantallas
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice'; // Acción para cerrar sesión
import axios from 'axios';
import { useEffect, useState } from 'react';
import CoursesList from '../src/CoursesList';

const { width, height } = Dimensions.get('window');

const Profile = () => {
  const dispatch = useDispatch();

  // Accedemos al estado global de Redux
  const { user, isAuthenticated, isLoading, token } = useSelector((state) => state.auth);
  //const courses = useSelector((state) => state.courses.courses); // Ejemplo: Cursos desde Redux

  // Mostrar indicador de carga mientras se obtienen los datos
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  // Si no está autenticado, mostramos un mensaje
  if (!isAuthenticated) {
    return (
      <View style={styles.window}>
        <Text style={styles.message}>No estás autenticado. Por favor, inicia sesión.</Text>
      </View>
    );
  }

  // Datos de ejemplo para la información personal
  const personalInfo = {
    email: user?.email || 'N/A',
    country: user?.countryOfBirth,
    city: user?.cityOfResidence ,
    university: user?.university,
    dob: user?.dateOfBirth ,
  };

  return (
    <View style={styles.window}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri:
                user?.profilePictureUrl ||
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAChklEQVR4nO2ZTYiNURjHfwxmyGCBzIJ8jFJiw4Zu2SBcFqyEhSIfGxGNFYmJWEmp2SkfxVgJKZJMo2ZEUxLJQiNfYchsyMc908lfvd3c+973Pe91jnp/9azuOf/+zz1fzzkv5OT8VzQABWAf0AF0AheBk8B6YAyB0wi0AW8BUyXeAUUCZQbwOGL2IXBKo7JBI7Ef6Nbv34EzwDICYhLQL4M9wIKY9gfLRugqMI4AuCRDdzS94hgGTAe2Aa/V9xqemQmUgK9Aa4r+04ABJbMCj+ySifMOGocy0HDmikxsdNCYL40neKRXJuIWeDVGAT+BHzqDvPBciaRZH1HsdmyUlBeeysAsBw07Cr8U3kakS4ksctCYKo03eKRTJtY5aCyVxl08ckAmDjtotEujHY8UZeKGg8Y9aSzHI2tlYkClR1ImRnasAh7pkYmdKfuPAI5I4wIe6c/gHFksjS48cl0mNjlo7JDGWTyyXSZeAHtSFowvM6jXnBkZKRyTFn12c/isa8Bln6f6H4YDgyr8mhP0a9Uf8IyAuJlirbSpj727B8NWmXpQ43nSqHVl+6wiIEZHFu3xGtqfU9s+Tc2gWJ2gijUZXMjqRkuKRIKkJU8kMIoakW96fazElMjUWkhgrAQ+RgzaHWw3MBcYqyfReX955H4FLCEACnq7LcW8wFcL2/cWsCblncbpzNgCPHIwXyn6gM1AUz0TmAwcBT7UIYHyeK87vL1BZkaD5vbgP0jAlMUXYG8Wp/8EfS4wnuM2MD5tEs0qAk0gcV87YGI6AjBvyuJ00iTmOG6p9YoSMDtJIicCMG0qxLE071UhRneSRD4FYNhUCPuqWRNNAZg1MVHL1+OcnBx+MwTQ0ifIg+pOMwAAAABJRU5ErkJggg==",
            }}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.profileName}>{user?.name || 'Usuario Desconocido'}</Text>
        </View>
      </View>
      <Text style={styles.personalTitle}>Información Personal</Text>
      <View style={styles.personalInfocontainer}>
        <Text style={styles.personalInfo}>{personalInfo.email}</Text>
        <Text style={styles.personalInfo}>{personalInfo.country}</Text>
        <Text style={styles.personalInfo}>{personalInfo.city}</Text>
        <Text style={styles.personalInfo}>{personalInfo.university}</Text>
        <Text style={styles.personalInfo}>{personalInfo.dob}</Text>
      </View>
      <Text style={styles.personalTitle}>Cursos Asistidos</Text>
      <View style={styles.attendedCourses}>
        <CoursesList userId={user.id} token = {token}/>
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => dispatch(logout())} // Cerrar sesión
      >
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
window: {
  flex: 1,
  backgroundColor: 'lightblue',
},
loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'lightblue',
},
container: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 20,
  marginTop: 30,
},
imageContainer: {
  marginTop: 10,
  marginLeft: 5,
},
image: {
  width: 100,
  height: 100,
  borderRadius: 50,
  backgroundColor: '#ccc',
},
textContainer: {
  marginLeft: 25,
  marginTop: 5,
},
profileName: {
  fontSize: 30,
  marginLeft: 10,
  fontWeight: 'bold',
},
personalTitle: {
  textDecorationLine: 'underline',
  fontSize: 23,
  marginLeft: 15,
  marginTop: 20,
  fontWeight: 'bold',
},
personalInfocontainer: {
  paddingHorizontal: 15,
},
personalInfo: {
  fontSize: 20,
  marginTop: 14,
  borderBottomColor: 'black',
  borderBottomWidth: 1,
  paddingBottom: 5,
},
attendedCourses: {
  flex: 1,
},
logoutButton: {
  backgroundColor: '#FF6347',
  padding: 15,
  margin: 20,
  borderRadius: 8,
  alignItems: 'center',
},
logoutText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},
});

export default Profile;