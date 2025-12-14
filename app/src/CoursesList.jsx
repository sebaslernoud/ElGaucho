import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Link } from 'expo-router';
import axios from 'axios';

const CoursesList = ({ userId, token }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const API_BASE_URL = 'http://192.168.0.30:3000/api';
        const response = await axios.get(`${API_BASE_URL}/user-courses/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const courseTitles = response.data.map(item => ({
          id: item.courseId,
          title: item.course.title,
          role: item.roleInCourse,
        }));

        setCourses(courseTitles);
      } catch (error) {
        console.error('Error fetching user courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [userId, token]);

  const renderItem = ({ item, index }) => (
    <Link href="../CourseIn" asChild>
      <TouchableOpacity style={index === courses.length - 1 ? styles.lastItem : styles.item}>
        <Text style={styles.courseTitle}>
          {item.title} {' - '} {item.role}
        </Text>
      </TouchableOpacity>
    </Link>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      style={styles.coursesList}
      data={courses}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#ADD8E6',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  lastItem: {
    backgroundColor: '#ADD8E6',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 8,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CoursesList;