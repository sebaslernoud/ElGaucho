import React, { useState } from 'react';
import { View, Text,FlatList, TextInput, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const requests = [
    { id: '1', name: 'RELUL 2020'},
    { id: '2', name: 'RELUL 2022'},
    { id: '3', name: 'RELAL 2023'},
    { id: '4', name: 'RELAL 2023'},
    // Agrega más cursos aquí según sea necesario
];

const RequestList = () => {
    const navigation = useNavigation();
    const renderItem = ({ item, index }) => {
        return(
        <TouchableOpacity style={styles.blockItem} title="Ir a Curso"
        onPress={() => navigation.navigate('Curso admin')}>
            <View style={styles.nameBoxItem}>
                <Text style={styles.nameItem}>{item.name}</Text>
            </View>
        </TouchableOpacity>
        )
    };
  
    return (
      <FlatList style = {styles.coursesList}
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );
};

const ActualCoursesList = () => {
    const curso = [
        { id: '5', name: 'RELUL 2023'},
        // Agrega más cursos aquí según sea necesario
    ];
    const navigation = useNavigation();
    const renderItem = ({ item, index }) => {
        return(
        <TouchableOpacity style={styles.blockItem} title="Ir a Curso"
        onPress={() => navigation.navigate('Curso actual admin')}>
            <View style={styles.nameBoxItem}>
                <Text style={styles.nameItem}>{item.name}</Text>
            </View>
        </TouchableOpacity>
        )
    };
  
    return (
      <FlatList style = {styles.coursesList}
        data={curso}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );
};



const AdminHome = (props) => {

    return(
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Listado de cursos</Text>
            </View>
            <View style = {styles.bigBlock}>
                <Text style={styles.listTitle}>Cursos actuales</Text>
                <View style = {styles.requestsContainer}>
                    <ActualCoursesList></ActualCoursesList>
                </View>
                <View style = {styles.requestsActualContainer}>
                    <Text style={styles.listTitle}>Todos los Cursos</Text>
                    <RequestList></RequestList>
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
    
});


export default AdminHome;