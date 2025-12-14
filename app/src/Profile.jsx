import React, { useState } from 'react';
import { View, Text,FlatList, TextInput, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

// Estos los tengo que obtener de la base de datos

const courses = [
    { id: '1', title: 'RELAL 2020', role: "Asistido" },
    { id: '2', title: 'RELUL 2022', role: "Tallerista" },
    { id: '3', title: 'RELUL 2023', role: "Asistente" },
    // Agrega más cursos aquí según sea necesario
];
  
const CoursesList = () => {
    const navigation = useNavigation();
    const renderItem = ({ item, index }) => {
        if (index === courses.length - 1) {
            // Si es el último elemento, aplicar propiedades especiales
            return (
                <TouchableOpacity style={styles.lastItem} title="Ir a Curso"
                onPress={() => navigation.navigate('Curso')}>
                <Text style={styles.title}>{item.title}{"              "}{item.role}</Text>
              </TouchableOpacity>
            );
          }
    return(
      <TouchableOpacity style={styles.item} title="Ir a Curso"
      onPress={() => navigation.navigate('Curso que participas')}>
        <Text style={styles.title}>{item.title}{"              "}{item.role}</Text>
      </TouchableOpacity>
      )
    };
  
    return (
      <FlatList style = {styles.coursesList}
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );
  }; 


const Profile = (props) => {

    return(
        <View style = {styles.window}>
        <View style = {styles.container}>
            <TouchableOpacity style={styles.imageContainer}>
                <Image style={styles.image}  source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAChklEQVR4nO2ZTYiNURjHfwxmyGCBzIJ8jFJiw4Zu2SBcFqyEhSIfGxGNFYmJWEmp2SkfxVgJKZJMo2ZEUxLJQiNfYchsyMc908lfvd3c+973Pe91jnp/9azuOf/+zz1fzzkv5OT8VzQABWAf0AF0AheBk8B6YAyB0wi0AW8BUyXeAUUCZQbwOGL2IXBKo7JBI7Ef6Nbv34EzwDICYhLQL4M9wIKY9gfLRugqMI4AuCRDdzS94hgGTAe2Aa/V9xqemQmUgK9Aa4r+04ABJbMCj+ySifMOGocy0HDmikxsdNCYL40neKRXJuIWeDVGAT+BHzqDvPBciaRZH1HsdmyUlBeeysAsBw07Cr8U3kakS4ksctCYKo03eKRTJtY5aCyVxl08ckAmDjtotEujHY8UZeKGg8Y9aSzHI2tlYkClR1ImRnasAh7pkYmdKfuPAI5I4wIe6c/gHFksjS48cl0mNjlo7JDGWTyyXSZeAHtSFowvM6jXnBkZKRyTFn12c/isa8Bln6f6H4YDgyr8mhP0a9Uf8IyAuJlirbSpj727B8NWmXpQ43nSqHVl+6wiIEZHFu3xGtqfU9s+Tc2gWJ2gijUZXMjqRkuKRIKkJU8kMIoakW96fazElMjUWkhgrAQ+RgzaHWw3MBcYqyfReX955H4FLCEACnq7LcW8wFcL2/cWsCblncbpzNgCPHIwXyn6gM1AUz0TmAwcBT7UIYHyeK87vL1BZkaD5vbgP0jAlMUXYG8Wp/8EfS4wnuM2MD5tEs0qAk0gcV87YGI6AjBvyuJ00iTmOG6p9YoSMDtJIicCMG0qxLE071UhRneSRD4FYNhUCPuqWRNNAZg1MVHL1+OcnBx+MwTQ0ifIg+pOMwAAAABJRU5ErkJggg=="}} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.profileName}>Juan sebastian Lernoud</Text>
            </View>
        </View>
        <Text style={styles.personalTitle}>Informacion personal</Text>
        <View style = {styles.personalInfocontainer}>
            <Text style={styles.personalInfo}>jorgitolopa@gmail.com</Text>
            <Text style={styles.personalInfo}>Argentina</Text>
            <Text style={styles.personalInfo}>Buenos Aires</Text>
            <Text style={styles.personalInfo}>Universidad Catolica Argentina</Text>
            <Text style={styles.personalInfo}>10/07/99</Text>
        </View>
        <Text style={styles.personalTitle}>Cursos asistidos</Text>
        <View style = {styles.attendedCourses}>
            <CoursesList></CoursesList>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        padding:20
    },
    imageContainer:{
        marginTop:10,
        marginLeft: 5
    },
    image:{
        width: 100,
        height: 100,
        borderRadius: 25,
    },
    textContainer:{
        marginLeft:25,
        marginTop:5
    },
    profileName:{
        fontSize: 30,
        marginLeft: 10,
    },
    personalTitle:{
        textDecorationLine: 'underline',
        fontSize:23,
        marginLeft:15,
        marginTop:20,
    },
    personalInfocontainer:{

    },
    personalInfo:{
        fontSize:20,
        marginTop:14,
        marginLeft:10,
        marginRight:10,
        borderBottomColor:"black", 
        borderBottomWidth:1, 
    },
    item: {
        backgroundColor: '#ADD8E6',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 20,
      },
      lastItem:{
        backgroundColor: '#ADD8E6',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        marginBottom:20
      }

});

export default Profile;