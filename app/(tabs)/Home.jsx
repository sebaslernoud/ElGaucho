import React, { useState } from 'react';
import {
View,
Text,
FlatList,
StyleSheet,
Dimensions,
TouchableOpacity,
} from 'react-native';
import { router, Link } from 'expo-router';

const { width, height } = Dimensions.get('window');

const allCourses = [
{ id: '1', name: 'RELUL 2020' },
{ id: '2', name: 'RELUL 2022' },
{ id: '3', name: 'RELAL 2023' },
];

const coursesRunningIn = [
{ id: '3', name: 'RELUL 2023' },
];

const CoursesIn = [
{ id: '4', name: 'RELAL 2023' },
{ id: '5', name: 'RELUL 2023' },
];

// Componente reutilizable para renderizar un ítem de curso
const CourseItem = ({ item, onPress, style }) => (
<TouchableOpacity style={[styles.blockItem, style]} onPress={onPress}>
  <View style={styles.nameBoxItem}>
    <Text style={styles.nameItem}>{item.name}</Text>
  </View>
</TouchableOpacity>
);

const Home = (props) => {
// Datos para la FlatList principal (puedes usar un array vacío o un array de secciones)
// Aquí usaremos un array de secciones para demostrar ListHeaderComponent
const sections = [
  { type: 'running', title: 'Cursos actuales', data: coursesRunningIn, route: '../src/ActualCourse' },
  { type: 'done', title: 'Cursos que hiciste', data: CoursesIn, route: '../src/CourseIn' },
  { type: 'all', title: 'Todos los cursos', data: allCourses, route: '../src/Course' },
];

// Renderiza cada sección como un grupo de elementos
const renderSection = ({ item: section }) => (
  <View style={styles.requestsContainer}>
    <Text style={styles.listTitle}>{section.title}</Text>
    {/* Aquí renderizamos los ítems de cada sub-lista */}
    {section.data.map((courseItem) => (
      <Link href={section.route} asChild key={courseItem.id}>
        <CourseItem item={courseItem} />
      </Link>
    ))}
  </View>
);

return (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Listado de cursos</Text>
    </View>
    <View style={styles.bigBlock}>
      {/*
        Aquí usamos una FlatList principal para manejar el desplazamiento.
        Cada "sección" de cursos se renderiza como un ítem de esta FlatList.
        Esto evita anidar FlatList dentro de ScrollView.
      */}
      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item) => item.type}
        // Si tuvieras un encabezado que no se desplaza con la lista, iría aquí
        // ListHeaderComponent={() => <Text>Encabezado Fijo</Text>}
        // Si el contenido es corto y no necesita desplazamiento, puedes usar ScrollView
        // Pero si hay FlatLists dentro, esta es la forma correcta.
      />
    </View>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: 'lightblue',
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
  // height: 0.75 * height, // Eliminar altura fija si el contenido es dinámico y FlatList maneja el scroll
  backgroundColor: 'white',
  alignSelf: 'center',
  borderRadius: 9,
  paddingVertical: 10,
  flex: 1, // Permite que bigBlock ocupe el espacio restante y la FlatList interna se desplace
},
blockItem: {
  backgroundColor: 'lightblue',
  marginTop: 10,
  marginBottom: 15,
  height: 50,
  marginLeft: 15,
  marginRight: 15,
  borderRadius: 9,
  alignItems: 'center',
  justifyContent: 'center',
},
nameBoxItem: {
  flexDirection: 'row',
  alignSelf: 'center',
},
nameItem: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
},
listTitle: {
  fontSize: 20,
  alignSelf: 'center',
  marginBottom: 10,
},
requestsContainer: {
  marginTop: 10,
  marginBottom: 20,
},
});

export default Home;