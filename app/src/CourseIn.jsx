import React, { useState } from 'react';
import { View, Text,FlatList, TextInput, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');



  
const TalksList = () => {
  const navigation = useNavigation();
    const talks = [
        { id: '1', title:   'Liderar'},
        { id: '2', title: 'Negociar'},
        { id: '3', title: 'Emprender'},
        // Agrega más cursos aquí según sea necesario
    ];
    const renderItem = ({ item }) => {
    return(
        <View style = {styles.talkElement}>
            <View style={styles.imageContainer}>
                    <Image style={styles.image}  source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAChklEQVR4nO2ZTYiNURjHfwxmyGCBzIJ8jFJiw4Zu2SBcFqyEhSIfGxGNFYmJWEmp2SkfxVgJKZJMo2ZEUxLJQiNfYchsyMc908lfvd3c+973Pe91jnp/9azuOf/+zz1fzzkv5OT8VzQABWAf0AF0AheBk8B6YAyB0wi0AW8BUyXeAUUCZQbwOGL2IXBKo7JBI7Ef6Nbv34EzwDICYhLQL4M9wIKY9gfLRugqMI4AuCRDdzS94hgGTAe2Aa/V9xqemQmUgK9Aa4r+04ABJbMCj+ySifMOGocy0HDmikxsdNCYL40neKRXJuIWeDVGAT+BHzqDvPBciaRZH1HsdmyUlBeeysAsBw07Cr8U3kakS4ksctCYKo03eKRTJtY5aCyVxl08ckAmDjtotEujHY8UZeKGg8Y9aSzHI2tlYkClR1ImRnasAh7pkYmdKfuPAI5I4wIe6c/gHFksjS48cl0mNjlo7JDGWTyyXSZeAHtSFowvM6jXnBkZKRyTFn12c/isa8Bln6f6H4YDgyr8mhP0a9Uf8IyAuJlirbSpj727B8NWmXpQ43nSqHVl+6wiIEZHFu3xGtqfU9s+Tc2gWJ2gijUZXMjqRkuKRIKkJU8kMIoakW96fazElMjUWkhgrAQ+RgzaHWw3MBcYqyfReX955H4FLCEACnq7LcW8wFcL2/cWsCblncbpzNgCPHIwXyn6gM1AUz0TmAwcBT7UIYHyeK87vL1BZkaD5vbgP0jAlMUXYG8Wp/8EfS4wnuM2MD5tEs0qAk0gcV87YGI6AjBvyuJ00iTmOG6p9YoSMDtJIicCMG0qxLE071UhRneSRD4FYNhUCPuqWRNNAZg1MVHL1+OcnBx+MwTQ0ifIg+pOMwAAAABJRU5ErkJggg=="}} />
            </View>
        <TouchableOpacity style={styles.talk} title="Ir a Charla"
            onPress={() => navigation.navigate('Charla')}>
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      </View>
      )
    };
  
    return (
      <FlatList style = {styles.coursesList}
        data={talks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );
  }; 


const ParticipantsList = () => {
    const navigation = useNavigation();
    const participants = [
        { id: '1', title: 'Sebastian', role: "Asistido" },
        { id: '2', title: 'Joaquin', role: "Tallerista" },
        { id: '3', title: 'Pedro', role: "Asistente" },        
        // Agrega más participantes aquí según sea necesario
    ];

    

    const renderItem = ({ item,index }) => {
        if (index === participants.length - 1) {
            // Si es el último elemento, aplicar propiedades especiales
            return (
                <TouchableOpacity style={styles.item} title="Ir a Miembros"
                onPress={() => navigation.navigate('Miembros')}>
                <Image style={styles.memberImage} source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAChklEQVR4nO2ZTYiNURjHfwxmyGCBzIJ8jFJiw4Zu2SBcFqyEhSIfGxGNFYmJWEmp2SkfxVgJKZJMo2ZEUxLJQiNfYchsyMc908lfvd3c+973Pe91jnp/9azuOf/+zz1fzzkv5OT8VzQABWAf0AF0AheBk8B6YAyB0wi0AW8BUyXeAUUCZQbwOGL2IXBKo7JBI7Ef6Nbv34EzwDICYhLQL4M9wIKY9gfLRugqMI4AuCRDdzS94hgGTAe2Aa/V9xqemQmUgK9Aa4r+04ABJbMCj+ySifMOGocy0HDmikxsdNCYL40neKRXJuIWeDVGAT+BHzqDvPBciaRZH1HsdmyUlBeeysAsBw07Cr8U3kakS4ksctCYKo03eKRTJtY5aCyVxl08ckAmDjtotEujHY8UZeKGg8Y9aSzHI2tlYkClR1ImRnasAh7pkYmdKfuPAI5I4wIe6c/gHFksjS48cl0mNjlo7JDGWTyyXSZeAHtSFowvM6jXnBkZKRyTFn12c/isa8Bln6f6H4YDgyr8mhP0a9Uf8IyAuJlirbSpj727B8NWmXpQ43nSqHVl+6wiIEZHFu3xGtqfU9s+Tc2gWJ2gijUZXMjqRkuKRIKkJU8kMIoakW96fazElMjUWkhgrAQ+RgzaHWw3MBcYqyfReX955H4FLCEACnq7LcW8wFcL2/cWsCblncbpzNgCPHIwXyn6gM1AUz0TmAwcBT7UIYHyeK87vL1BZkaD5vbgP0jAlMUXYG8Wp/8EfS4wnuM2MD5tEs0qAk0gcV87YGI6AjBvyuJ00iTmOG6p9YoSMDtJIicCMG0qxLE071UhRneSRD4FYNhUCPuqWRNNAZg1MVHL1+OcnBx+MwTQ0ifIg+pOMwAAAABJRU5ErkJggg=="}} />
                <Text style={styles.title}>Ver todos</Text>
              </TouchableOpacity>
            );
        }
        return(
          <TouchableOpacity style={styles.item} title="Ir a Perfil"
          onPress={() => navigation.navigate('Perfil')}>
            <Image style={styles.memberImage} source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAChklEQVR4nO2ZTYiNURjHfwxmyGCBzIJ8jFJiw4Zu2SBcFqyEhSIfGxGNFYmJWEmp2SkfxVgJKZJMo2ZEUxLJQiNfYchsyMc908lfvd3c+973Pe91jnp/9azuOf/+zz1fzzkv5OT8VzQABWAf0AF0AheBk8B6YAyB0wi0AW8BUyXeAUUCZQbwOGL2IXBKo7JBI7Ef6Nbv34EzwDICYhLQL4M9wIKY9gfLRugqMI4AuCRDdzS94hgGTAe2Aa/V9xqemQmUgK9Aa4r+04ABJbMCj+ySifMOGocy0HDmikxsdNCYL40neKRXJuIWeDVGAT+BHzqDvPBciaRZH1HsdmyUlBeeysAsBw07Cr8U3kakS4ksctCYKo03eKRTJtY5aCyVxl08ckAmDjtotEujHY8UZeKGg8Y9aSzHI2tlYkClR1ImRnasAh7pkYmdKfuPAI5I4wIe6c/gHFksjS48cl0mNjlo7JDGWTyyXSZeAHtSFowvM6jXnBkZKRyTFn12c/isa8Bln6f6H4YDgyr8mhP0a9Uf8IyAuJlirbSpj727B8NWmXpQ43nSqHVl+6wiIEZHFu3xGtqfU9s+Tc2gWJ2gijUZXMjqRkuKRIKkJU8kMIoakW96fazElMjUWkhgrAQ+RgzaHWw3MBcYqyfReX955H4FLCEACnq7LcW8wFcL2/cWsCblncbpzNgCPHIwXyn6gM1AUz0TmAwcBT7UIYHyeK87vL1BZkaD5vbgP0jAlMUXYG8Wp/8EfS4wnuM2MD5tEs0qAk0gcV87YGI6AjBvyuJ00iTmOG6p9YoSMDtJIicCMG0qxLE071UhRneSRD4FYNhUCPuqWRNNAZg1MVHL1+OcnBx+MwTQ0ifIg+pOMwAAAABJRU5ErkJggg=="}} />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
          )
    };
  
    return (
      <FlatList style = {styles.participantsList}
        data={participants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    );
  }; 

const CourseIn = (props) => {
  const navigation = useNavigation()
    return (<View style = {styles.window}>  
            <View style={styles.textContainer}>
                <Text style={styles.courseName}>RELUL 2024</Text>
            </View>
            <View style={styles.descriptionBoxContainer}>
              <Text style={styles.personalTitle}>Descripcion</Text>
              <View style={styles.descriptionBox}>
                <Text style={styles.courseDescription}>Escuela de liderazgo para america edicion 2024. Se realizo en Pilar, asistieron +120 personas de distintos paises de latinoamerica buscando lograr una region mas solidaria y fraterna</Text>
              </View>
            </View>
          <Text style={styles.personalTitle}>Participantes</Text>
        <View style = {styles.attendedCourses}>
            <ParticipantsList></ParticipantsList>
        </View>
        <Text style={styles.personalTitle}>Charlas</Text>
        <View>
            <TalksList />
        </View>
    </View>
)
};  

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
    },
    imageContainer:{
        marginTop:15,
        marginLeft: 5
    },textContainer:{
        marginTop:20,
        alignItems:'center'
    },
    courseName:{
        fontSize: 30,
        fontWeight:'bold'   
    },
    personalTitle:{
        textDecorationLine: 'underline',
        fontSize:23,
        marginLeft:15,
        marginTop:30,
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
        borderBlockColor:"black",
        borderWidth:2,
        borderRadius:20,
        marginTop:15,
        marginLeft:10,
        marginRight:10,
        width: 110,
        height:110,
        alignItems:'center',
      },
      title: {
        fontSize: 20,
        textAlign:'center'
      },
      talk: {
        backgroundColor: '#ADD8E6',
        height: 40,
        marginVertical: 8,
        marginHorizontal: 16,
        width:250,
        marginLeft:40,
        borderRadius:7,
        justifyContent:'center'
      },
      image:{
        width: 30,
        height: 30,
        borderRadius: 25,
    },
    talkElement:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:20,
        marginLeft:15,
    },
    imageContainer:{
        alignItems:'center',
        marginLeft:15
    },
    memberImage:{
      width:60,
      height:60
    },
    descriptionBox:{
      height:140,
      width:0.9*width,
      backgroundColor:"lightgrey",
      borderRadius:10,
      marginLeft:10,

    },
    courseDescription:{
      fontSize:17,
      marginLeft:5,
      marginTop:8
    },
    descriptionBoxContainer:{
      marginTop:5,
    },
});
export default CourseIn;