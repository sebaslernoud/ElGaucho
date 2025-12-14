import React, { useState } from 'react';
import { View, Text,FlatList, TextInput, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const allCourses = [
    { id: '1', name: 'RELUL 2020',content: "Usted fue aceptado en RELUL 2020"},
    { id: '2', name: 'RELUL 2022',content: "Se sumó un participante a RELUL2022"},
    { id: '3', name: 'RELAL 2023',content: "Usted fue aceptado en RELUL 2020"},
    
    // Agrega más cursos aquí según sea necesario
];

const AllCoursesList = () => {
    const navigation = useNavigation();
    const renderItem = ({ item, index }) => {
        return(
            <TouchableOpacity style={styles.blockItem} title="Ir a Curso"
            onPress={() => navigation.navigate('Curso que participas')}>
                <View style={styles.titleNotifContainer}>
                    <Text style={styles.titleNotif}>{item.name}</Text>
                </View>
                <View style={styles.textNotifContainer}>
                    <Text style={styles.textNotif}>{item.content}</Text>
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


const Notifications = (props) => {

    return(
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Notificaciones</Text>
            </View>
            <View style = {styles.bigBlock}>
                <View style = {styles.requestsContainer}>
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
        height:0.7*height,
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
        marginTop:15,
        marginBottom:7,
        height:80,
        marginLeft: 15,
        marginRight: 15,
        borderRadius:9,
    },
    titleNotifContainer:{
        flexDirection: 'row', // Poner en horizontal
        marginBottom:10,
        marginTop:10,
        marginLeft:15
    },
    textNotifContainer:{
        marginLeft:15,
    },
    titleNotif:{
        fontSize:18
    },
    textNotif:{
        fontSize:15
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
        marginTop:15
    }
});


export default Notifications;