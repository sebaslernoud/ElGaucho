import React, { useState } from 'react';
import { View, Text,FlatList, TextInput, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';

const TalkersList = () => {
  const navigation = useNavigation();
    const talkers = [
        { id: '1', name: 'Agregar' },
       // Agrega más participantes aquí según sea necesario
    ];
    const renderItem = ({ item }) => {
    return(
      <TouchableOpacity style={styles.item} title="Ir a agregar"
      onPress={() => navigation.navigate('Agregar')}>
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

const CreateTalk = (props) => {
  const navigation = useNavigation();


  const [selectedCourseValue, setselectedCourseValue] = useState('default'); // Set an initial value
    
  const handleCourseChange = (itemValue, itemIndex) => {
      setselectedCourseValue(itemValue);
  };


    return (
        <View style = {styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Crear charla</Text>
            </View>
            <View style = {styles.bigBlock}>
                <Text style={styles.chooseCourseTitle}>Elija el curso</Text>
                <View style = {styles.pickerContainer}>
                        <Picker style={styles.selectableOptionsCourse} mode="dropdown" selectedValue={selectedCourseValue} onValueChange={handleCourseChange}>
                            <Picker.Item label="RELUL 2023" value="elul23" />  
                            <Picker.Item label="RELAL 2023" value="elal23" />
                            <Picker.Item label="RELAL 2022" value="elal22" />  
                            <Picker.Item label="RELUL 2022" value="elul22" />
                        </Picker>
                    </View>
                <View style = {styles.nameCourseContainer}>
                    <Text style={styles.nameCourseTitle}>Nombre de la charla</Text>
                    <View style={styles.nameCourseInputContainer}>
                        <TextInput style={styles.nameCourseInput} placeholder='Nombre...'></TextInput>
                    </View>
                </View>
                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryTitle}>Resumen</Text>
                    <View style={styles.summaryTextContainer}>
                    <TextInput style={styles.nameCourseInput} placeholder='Ingrese el resumen de la charla...'></TextInput>
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
                
                    <TouchableOpacity style={styles.rateBottom} title="Ir a Charla"
            onPress={() => navigation.navigate('Charla')}>
                        <Text style={styles.rateText}>Crear charla</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    bigBlock:{
        width:0.9*width,
        height:0.8*height,
        backgroundColor:"white",
        alignSelf:'center',
        borderRadius:9,
        marginTop:20
    },
    titleContainer:{
        alignItems:'center',
        marginTop:5
    },
    title:{
        fontSize:30,
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
        borderColor: "lightblue",
        borderWidth:1,
        borderRadius:10,
        marginTop:10,
    

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
      
        borderColor:"lightblue",
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
        backgroundColor: 'lightblue',
        borderColor:'grey',
        borderWidth:2,
        height:60,
        width:0.7*width,
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
      },
      nameCourseContainer:{
        alignItems:'center',
        marginTop:15,
      },
      nameCourseTitle:{
        fontSize:25,
      },
      nameCourseInputContainer:{
        width:(1/2)*width,
        borderWidth:2,
        borderRadius:5,
        borderColor:"lightblue",
        marginTop:15,
    
      },
      pickerContainer:{
        borderColor:"lightblue",
        borderWidth:2,
        borderRadius:9,
        width:(1/2)*width,
        marginTop:5,
        alignSelf:'center'
    },
    chooseCourseTitle:{
        fontSize:25,
        alignSelf:'center'
    }
      
});

export default CreateTalk;