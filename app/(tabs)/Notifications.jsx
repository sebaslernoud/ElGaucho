import React, { useState } from 'react';
import {
View,
Text,
FlatList,
StyleSheet,
Dimensions,
TouchableOpacity,
} from 'react-native';
import { Link } from 'expo-router'; // Importamos Link de expo-router

const { width, height } = Dimensions.get('window');

const allCourses = [
{ id: '1', name: 'RELUL 2020', content: 'Usted fue aceptado en RELUL 2020' },
{ id: '2', name: 'RELUL 2022', content: 'Se sumó un participante a RELUL2022' },
{ id: '3', name: 'RELAL 2023', content: 'Usted fue aceptado en RELUL 2020' },
// Agrega más cursos aquí según sea necesario
];

const AllCoursesList = () => {
// No necesitamos useNavigation aquí
const renderItem = ({ item, index }) => {
  return (
    // Usamos Link con asChild para envolver TouchableOpacity
    // La ruta es '/courseIn' porque así la definiste en app/_layout.tsx
    <Link href="../CourseIn" asChild>
      <TouchableOpacity style={styles.blockItem}>
        <View style={styles.titleNotifContainer}>
          <Text style={styles.titleNotif}>{item.name}</Text>
        </View>
        <View style={styles.textNotifContainer}>
          <Text style={styles.textNotif}>{item.content}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

return (
  <FlatList
    style={styles.coursesList}
    data={allCourses}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}
  />
);
};

const Notifications = (props) => {
return (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Notificaciones</Text>
    </View>
    <View style={styles.bigBlock}>
      <View style={styles.requestsContainer}>
        <AllCoursesList />
      </View>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1, // Asegura que el contenedor ocupe toda la pantalla
  backgroundColor: 'lightblue', // Color de fondo para toda la pantalla
},
titleContainer: {
  alignItems: 'center',
  marginTop: 35,
},
title: {
  fontSize: 25,
},
bigBlock: {
  marginTop: 30,
  width: 0.9 * width,
  height: 0.7 * height,
  backgroundColor: 'white',
  alignSelf: 'center',
  borderRadius: 9,
  paddingVertical: 10, // Añadir padding para que el contenido no se pegue a los bordes
},
requestTitleContainer: {
  alignItems: 'center',
  marginTop: 20,
},
requestTitle: {
  fontSize: 20,
},
blockItem: {
  backgroundColor: 'lightblue',
  marginTop: 15,
  marginBottom: 7,
  height: 80,
  marginLeft: 15,
  marginRight: 15,
  borderRadius: 9,
  padding: 10, // Añadir padding para el contenido interno
},
titleNotifContainer: {
  flexDirection: 'row', // Poner en horizontal
  marginBottom: 5, // Espacio entre título y contenido
  // marginLeft: 15, // Ya cubierto por el padding del blockItem
},
textNotifContainer: {
  // marginLeft: 15, // Ya cubierto por el padding del blockItem
},
titleNotif: {
  fontSize: 18,
  fontWeight: 'bold', // Para que el título se destaque
},
textNotif: {
  fontSize: 15,
  color: '#555', // Un color más suave para el contenido
},
courseBoxItem: {
  flexDirection: 'row',
  alignSelf: 'center',
},
acceptImage: {
  width: 30,
  height: 30,
},
denyImage: {
  width: 30,
  height: 30,
},
acceptButtom: {
  marginLeft: 50,
},
denyButtom: {
  marginLeft: 35,
},
listTitle: {
  fontSize: 20,
  alignSelf: 'center',
},
requestsContainer: {
  marginTop: 15,
},
});

export default Notifications;