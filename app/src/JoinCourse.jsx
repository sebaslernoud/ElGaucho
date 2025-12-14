import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';

const JoinCourse = (props) => {

    const [selectedCourseValue, setselectedCourseValue] = useState('default'); // Set an initial value
    const [selectedRoleValue, setselectedRoleValue] = useState('default');
    
    const handleCourseChange = (itemValue, itemIndex) => {
        setselectedCourseValue(itemValue);
    };

    const handleRoleChange = (itemValue, itemIndex) => {
        setselectedRoleValue(itemValue);
    };
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Unirse al curso</Text>
            </View>
            <View style = {styles.bigBlock}>
                <Text style={styles.chooseTitleContainer}>RELUL 2023</Text>
                <Text style={styles.chooseRoleTitleContainer}>Seleccione su rol</Text>
                <View style = {styles.pickerContainer}>
                    <Picker style={styles.selectableOptionsCourse} mode="dropdown" selectedValue={selectedRoleValue} onValueChange={handleRoleChange}>
                        <Picker.Item label="Capitan" value="elul23" />  
                        <Picker.Item label="Subcapitan" value="elal23" />
                        <Picker.Item label="Asistido" value="elal22" />  
                        <Picker.Item label="Asistente" value="elul22" />
                    </Picker>
                </View>
                <View style = {styles.bottomContainer}>
                    <TouchableOpacity style={styles.addButtom} title="Ir a Curso"
        onPress={() => navigation.navigate('Curso')}>
                        <Text style={styles.buttomText}>Unirme</Text>
                    </TouchableOpacity>
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
        fontSize:35
    },
    bigBlock:{
        marginTop:40,
        width:0.9*width,
        height:0.7*height,
        backgroundColor:"white",
        alignSelf:'center',
        borderRadius:9,
        justifyContent:'center'
    },
    chooseTitleContainer: {
        alignSelf:'center',
        marginTop:30,
        fontSize:35,
        fontWeight:'bold',
        marginBottom:30
    },
    chooseRoleTitleContainer:{
        alignSelf:'center',
        marginTop:20,
        fontSize:25
    },
    pickerContainer:{
        borderColor:"black",
        borderWidth:1,
        borderRadius:9,
        width:(1/2)*width,
        marginLeft:80,
        marginTop:5,
        marginBottom:40
    },
    nameUserContainer:{
        alignItems:'center',
        marginTop:30,
    },
    nameUserTitle:{
        fontSize:25,
    },
    nameUserInputContainer:{
        width:(1/2)*width,
        borderWidth:1,
        borderRadius:5,
        borderColor:"black",
        marginTop:15,
    },
    addButtom:{
        backgroundColor: 'lightblue',
        borderColor:'grey',
        borderWidth:2,
        height:60,
        width:(1/2)*width,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop:30,
        marginLeft:80,
        textAlign:'center',
    },
    uploadPhotoButtom:{
        borderColor:'grey',
        borderWidth:2,
        height:30,
        width:(1/2)*width,
        borderRadius: 5,
        alignItems: 'center',
        marginTop:20,
        marginLeft:80,
        textAlign:'center',
        justifyContent:'center',
    },
    buttomText:{
        fontSize:25,
        fontWeight:'bold'
    },
    buttomImageText:{
        fontSize:15,
        fontWeight:'bold'
    }
});

export default JoinCourse;