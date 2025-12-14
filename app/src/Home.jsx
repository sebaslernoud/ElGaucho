import React, { useState } from 'react';
import { View, Text,FlatList, TextInput, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const allCourses = [
    { id: '1', name: 'RELUL 2020'},
    { id: '2', name: 'RELUL 2022'},
    { id: '3', name: 'RELAL 2023'},

];

const coursesRunningIn = [
    { id: '3', name: 'RELUL 2023'},

];

const CoursesIn = [
    { id: '4', name: 'RELAL 2023'},
    { id: '5', name: 'RELUL 2023'},

];
const AllCoursesList = () => {
    const navigation = useNavigation();
    const renderItem = ({ item, index }) => {
        return(
            <TouchableOpacity style={styles.blockItem} title="Ir a Curso"
            onPress={() => navigation.navigate('Curso')}>
                <View style={styles.nameBoxItem}>
                    <Text style={styles.nameItem}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    };
  
    return (
      <FlatList style = {styles.coursesList}
        data={allCourses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );
};

const AllCoursesInList = () => {
    const navigation = useNavigation();
    const renderItem = ({ item, index }) => {
        return(
            <TouchableOpacity style={styles.blockItem} title="Ir a Curso que participas"
            onPress={() => navigation.navigate('Curso que participas')}>
                <View style={styles.nameBoxItem}>
                    <Text style={styles.nameItem}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    };
  
    return (
      <FlatList style = {styles.coursesList}
        data={CoursesIn}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );
};

const AllCoursesRunningInList = () => {
    const navigation = useNavigation();
    const renderItem = ({ item, index }) => {
        return(
            <TouchableOpacity style={styles.blockItem} title="Ir a Curso actual"
            onPress={() => navigation.navigate('Curso actual')}>
                <View style={styles.nameBoxItem}>
                    <Text style={styles.nameItem}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    };
  
    return (
      <FlatList style = {styles.coursesList}
        data={coursesRunningIn}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );
};

const Home = (props) => {

    return(
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Listado de cursos</Text>
            </View>
            <View style = {styles.bigBlock}>
                <View style = {styles.requestsContainer}>
                    <Text style={styles.listTitle}>Cursos actuales</Text>
                    <AllCoursesRunningInList></AllCoursesRunningInList>
                </View>
                <View style = {styles.requestsContainer}>
                    <Text style={styles.listTitle}>Cursos que hiciste</Text>
                    <AllCoursesInList></AllCoursesInList>
                </View>
                <View style = {styles.requestsContainer}>
                    <Text style={styles.listTitle}>Todos los cursos</Text>
                    <AllCoursesList></AllCoursesList>
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
        marginTop:30    ,
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
        marginTop:10,
        marginBottom:15,
        height:50,
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
        fontSize:20,
        alignSelf:'center'
    },
    requestsContainer:{
        marginTop:10
    }
});


export default Home;