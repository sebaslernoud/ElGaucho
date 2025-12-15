import React, { useState, useCallback } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useSelector } from 'react-redux';

// Servicios
import { getAllCourses } from '../src/services/courseService'; //
import { getUserCoursesByStatus } from '../src/services/userCourseService'; //

const { width } = Dimensions.get('window');

// Componente visual para el item, ahora acepta onPress
const CourseItem = ({ item, onPress }) => (
  <TouchableOpacity style={styles.blockItem} onPress={onPress}>
    <View style={styles.nameBoxItem}>
      <Text style={styles.nameItem}>{item.name}</Text>
    </View>
  </TouchableOpacity>
);

const Home = () => {
  const router = useRouter(); // Hook para navegación
  const authState = useSelector(state => state.auth);
  const token = authState?.token;

  // Estados
  const [activeGlobalCourses, setActiveGlobalCourses] = useState([]); 
  const [myAcceptedCourses, setMyAcceptedCourses] = useState([]);     
  const [allCoursesList, setAllCoursesList] = useState([]);           
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      // 1. Obtener TODOS los cursos
      const allData = await getAllCourses(token);
      const formattedAll = allData.map(c => ({
        id: c.id,
        name: c.title,
        status: c.status
      }));
      setAllCoursesList(formattedAll);

      // 2. Filtrar "Cursos Actuales" (Activos)
      const activeData = formattedAll.filter(c => c.status === 'active');
      setActiveGlobalCourses(activeData);

      // 3. Obtener SOLO los cursos aceptados del usuario
      const acceptedData = await getUserCoursesByStatus('accepted', token);
      
      const formattedAccepted = acceptedData.map(item => ({
        id: item.course.id,
        name: item.course.title,
      }));
      setMyAcceptedCourses(formattedAccepted);

    } catch (error) {
      console.error("Error fetching home data:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [token])
  );

  // Helper para saber si estoy inscrito
  const isUserEnrolled = (courseId) => {
    return myAcceptedCourses.some(myCourse => myCourse.id === courseId);
  };

  // Función de navegación unificada
  const handleCoursePress = (courseId) => {
    // Si el usuario ya está inscrito (accepted), va a la vista completa (CourseIn)
    // Si no, va a la vista pública/previa (Course)
    const targetPath = isUserEnrolled(courseId) 
      ? '/src/CourseIn' 
      : '/src/Course';

    router.push({
      pathname: targetPath,
      params: { courseId: courseId }
    });
  };

  // Definición de las secciones
  const sections = [
    { 
      type: 'active_global', 
      title: 'Cursos actuales (Activos)', 
      data: activeGlobalCourses, 
      emptyMessage: 'No hay cursos activos en este momento.' 
    },
    { 
      type: 'my_accepted', 
      title: 'Mis Cursos (Inscrito)', 
      data: myAcceptedCourses, 
      emptyMessage: 'No estás inscrito en ningún curso.' 
    },
    { 
      type: 'all', 
      title: 'Todos los cursos', 
      data: allCoursesList, 
      emptyMessage: 'No hay cursos disponibles.' 
    },
  ];

  const renderSection = ({ item: section }) => (
    <View style={styles.requestsContainer}>
      <Text style={styles.listTitle}>{section.title}</Text>
      
      {section.data.length === 0 ? (
        <Text style={styles.emptyText}>{section.emptyMessage}</Text>
      ) : (
        section.data.map((courseItem) => (
          <CourseItem 
            key={`${section.type}-${courseItem.id}`} 
            item={courseItem} 
            onPress={() => handleCoursePress(courseItem.id)}
          />
        ))
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Listado de cursos</Text>
      </View>
      <View style={styles.bigBlock}>
        <FlatList
          data={sections}
          renderItem={renderSection}
          keyExtractor={(item) => item.type}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
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
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 45,
    marginBottom: 10
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333'
  },
  bigBlock: {
    marginTop: 10,
    width: 0.9 * width,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 5,
    flex: 1,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  blockItem: {
    backgroundColor: '#e6f7ff',
    marginTop: 8,
    marginBottom: 8,
    height: 55,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#b3e0ff'
  },
  nameBoxItem: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  nameItem: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0050b3',
  },
  listTitle: {
    fontSize: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginLeft: 15,
    fontWeight: 'bold',
    color: '#333'
  },
  requestsContainer: {
    marginTop: 10,
    marginBottom: 25,
  },
  emptyText: {
    marginLeft: 15,
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 10
  }
});

export default Home;