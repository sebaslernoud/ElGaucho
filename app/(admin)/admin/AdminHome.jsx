import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getAllCourses } from '../../src/services/courseService';
const { width, height } = Dimensions.get('window');

const RequestList = ({ token }) => {
    const router = useRouter();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const allCourses = await getAllCourses(token);
                const courseList = allCourses.map(item => ({
                    id: item.id,
                    name: item.title,
                }));

                setCourses(courseList);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchCourses();
        }
    }, [token]);

    const renderItem = ({ item, index }) => {
        return(
        <TouchableOpacity style={styles.blockItem} title="Ir a Curso"
        onPress={() => router.push({ pathname: '/admin/AdminHome', params: { screen: 'CourseAdmin' } })}>
            <View style={styles.nameBoxItem}>
                <Text style={styles.nameItem}>{item.name}</Text>
            </View>
        </TouchableOpacity>
        )
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    if (courses.length === 0) {
        return <Text style={styles.emptyMessage}>No hay cursos disponibles</Text>;
    }
  
    return (
      <FlatList style = {styles.coursesList}
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
};

const ActualCoursesList = ({ token }) => {
    const router = useRouter();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const allCourses = await getAllCourses(token);
                // Filtrar solo los cursos con status = 'active'
                const activeCoursesFiltered = allCourses.filter(item => item.status === 'active').map(item => ({
                    id: item.id,
                    name: item.title,
                }));

                setCourses(activeCoursesFiltered);
            } catch (error) {
                console.error('Error fetching active courses:', error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchCourses();
        }
    }, [token]);

    const renderItem = ({ item, index }) => {
        return(
        <TouchableOpacity style={styles.blockItem} title="Ir a Curso"
        onPress={() => router.push('/admin/ActualCourseAdmin')}>
            <View style={styles.nameBoxItem}>
                <Text style={styles.nameItem}>{item.name}</Text>
            </View>
        </TouchableOpacity>
        )
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    if (courses.length === 0) {
        return <Text style={styles.emptyMessage}>No hay cursos activos</Text>;
    }
  
    return (
      <FlatList style = {styles.coursesList}
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
};



const AdminHome = (props) => {
    const authState = useSelector(state => state.auth);
    const token = authState?.token;

    return(
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Listado de cursos</Text>
            </View>
            <View style = {styles.bigBlock}>
                <Text style={styles.listTitle}>Cursos activos</Text>
                <View style = {styles.requestsContainer}>
                    <ActualCoursesList token={token}></ActualCoursesList>
                </View>
                <View style = {styles.requestsActualContainer}>
                    <Text style={styles.listTitle}>Todos los Cursos</Text>
                    <RequestList token={token}></RequestList>
                </View>
            </View>

        </View>
    )

};

const styles = StyleSheet.create({
    titleContainer:{
        alignItems:'center',
        marginTop:35
    },
    title:{
        fontSize:25
    },
    bigBlock:{
        marginTop:20    ,
        width:0.9*width,
        height:0.75*height,
        backgroundColor:"white",
        alignSelf:'center',
        borderRadius:9
    },
    requestTitleContainer:{
        alignItems:'center',
        marginTop:20,
    },
    requestTitle:{
        fontSize:20
    },
    blockItem:{
        backgroundColor:"lightblue",
        marginTop:20,
        marginBottom:15,
        height:60,
        marginLeft: 15,
        marginRight: 15,
        borderRadius:9,
        alignItems:'center',
        justifyContent:'center'
    },
    nameBoxItem:{
        flexDirection: 'row', // Poner en horizontal
        marginBottom:15,
        marginTop:10,
        alignSelf:'center'
    },
    courseBoxItem:{
        flexDirection: 'row',
        alignSelf:'center'
    },
    acceptImage:{
        width:30,
        height:30,
    },
    denyImage:{
        width:30,
        height:30,
    },
    acceptButtom:{
        marginLeft:50
    },
    denyButtom:{
        marginLeft:35
    },
    listTitle:{
        marginTop:25,
        fontSize:20,
        alignSelf:'center'
    },
    loader:{
        marginTop:20
    },
    emptyMessage:{
        textAlign:'center',
        marginTop:20,
        fontSize:16,
        color:'#888'
    },
    
});


export default AdminHome;