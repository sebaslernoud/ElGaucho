import React, { useState } from 'react';
import { View, Text,FlatList, TextInput, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const Stars = () => {
    const talkers = [
        { id: '1', value: 1},
        { id: '2', value: 1},
        { id: '3', value: 1},
        { id: '4', value: 1},
        { id: '5', value: 0},
       // Agrega más participantes aquí según sea necesario
    ];

    const renderItem = ({ item }) => {
        if (item.value == 1){
            return(
                <View style = {styles.starContainer}>
                    <Image style={styles.star} source={{uri: "data:image/png;base64,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"}} />
                </View>
            )
        }else{
            return(
                <View style = {styles.starContainer}>
                    
                </View>
            );
        }
        };


    return (
        <FlatList style = {styles.stars}
          data={talkers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
        />
      );
}


const TalkersList = () => {
  const navigation = useNavigation();
    const talkers = [
        { id: '1', name: 'Delfina' },
        { id: '2', name: 'Santiago'},
       // Agrega más participantes aquí según sea necesario
    ];
    const renderItem = ({ item }) => {
    return(
      <TouchableOpacity style={styles.item} title="Ir a Perfil"
      onPress={() => navigation.navigate('Perfil')}>
        <Image style={styles.talkerImage} source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAChklEQVR4nO2ZTYiNURjHfwxmyGCBzIJ8jFJiw4Zu2SBcFqyEhSIfGxGNFYmJWEmp2SkfxVgJKZJMo2ZEUxLJQiNfYchsyMc908lfvd3c+973Pe91jnp/9azuOf/+zz1fzzkv5OT8VzQABWAf0AF0AheBk8B6YAyB0wi0AW8BUyXeAUUCZQbwOGL2IXBKo7JBI7Ef6Nbv34EzwDICYhLQL4M9wIKY9gfLRugqMI4AuCRDdzS94hgGTAe2Aa/V9xqemQmUgK9Aa4r+04ABJbMCj+ySifMOGocy0HDmikxsdNCYL40neKRXJuIWeDVGAT+BHzqDvPBciaRZH1HsdmyUlBeeysAsBw07Cr8U3kakS4ksctCYKo03eKRTJtY5aCyVxl08ckAmDjtotEujHY8UZeKGg8Y9aSzHI2tlYkClR1ImRnasAh7pkYmdKfuPAI5I4wIe6c/gHFksjS48cl0mNjlo7JDGWTyyXSZeAHtSFowvM6jXnBkZKRyTFn12c/isa8Bln6f6H4YDgyr8mhP0a9Uf8IyAuJlirbSpj727B8NWmXpQ43nSqHVl+6wiIEZHFu3xGtqfU9s+Tc2gWJ2gijUZXMjqRkuKRIKkJU8kMIoakW96fazElMjUWkhgrAQ+RgzaHWw3MBcYqyfReX955H4FLCEACnq7LcW8wFcL2/cWsCblncbpzNgCPHIwXyn6gM1AUz0TmAwcBT7UIYHyeK87vL1BZkaD5vbgP0jAlMUXYG8Wp/8EfS4wnuM2MD5tEs0qAk0gcV87YGI6AjBvyuJ00iTmOG6p9YoSMDtJIicCMG0qxLE071UhRneSRD4FYNhUCPuqWRNNAZg1MVHL1+OcnBx+MwTQ0ifIg+pOMwAAAABJRU5ErkJggg=="}} />
        <Text style={styles.talkerName}>{item.name}</Text>
      </TouchableOpacity>
      )
    };
  
    return (
      <FlatList style = {styles.talkersList}
        data={talkers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    );
  };

const Talk = (props) => {

    return (
        <View style = {styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Liderazgo</Text>
            </View>
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Resumen</Text>
                <View style={styles.summaryTextContainer}>
                    <Text style={styles.summary}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra.
                    Donec vel egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra. Duis a arcu convallis, gravida purus eget, mollis diam.</Text>
                </View>
                <View>
                    <Text></Text>
                </View>
            </View>
            <View style = {styles.talkersContainer}>
                <Text style={styles.talkersTitle}>Charlistas</Text>
                <TalkersList></TalkersList>
            </View>
            <View style={styles.starsContainer}>
                <Text style={styles.starsTitle}>Puntuacion</Text>
                <Stars></Stars>
                <TouchableOpacity style={styles.rateBottom}>
                    <Text style={styles.rateText}>Puntuar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{

    },
    titleContainer:{
        alignItems:'center',
        marginTop:20
    },
    title:{
        fontSize:30,
        fontWeight:'bold'
    },
    summaryContainer:{
        marginTop:30,
        marginLeft:15,
        marginRight:15
    },
    summaryTitle:{
        textDecorationLine:'underline',
        fontSize:20,
    },
    summaryTextContainer:{
        borderBlockColor: "black",
        borderWidth:1,
        borderRadius:10,
        marginTop:10,
        backgroundColor:"#f0ffff",

    },
    summary:{
        fontSize:14,
        padding:15
    },
    talkersContainer:{
        marginTop:10,
        marginLeft:15
    },
    talkersTitle:{
        textDecorationLine:'underline',
        fontSize:20,
    },
    talkersList:{

    },
    item: {
        backgroundColor: '#f0ffff',
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
      talkerImage:{
        width:60,
        height:60,
        marginTop:5
      },
      talkerName:{
        fontSize: 20,
        textAlign:'center'
      },
      stars:{
        marginTop:15,

      },
      starsContainer:{
        marginTop:20,
        marginLeft:15
      },
      starsTitle:{
        textDecorationLine:'underline',
        fontSize:20,    
      },
      starContainer:{
        width:50,
        height:50,
      },
      star:{
        width:40,
        height:40,
      },
      rateBottom :{
        backgroundColor: '#009AFF',
        borderColor:'grey',
        borderWidth:3,
        height:60,
        width:width - width/15 -25,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop:20,
        marginLeft:15,
        textAlign:'center',
      },
      rateText:{
        fontSize:25,
        fontWeight:'bold'
      }


});

export default Talk;