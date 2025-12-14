import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';

const AddParticipants = (props) => {

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
                <Text style={styles.title}>Agregar disertante</Text>
            </View>
            <View style = {styles.bigBlock}>
                <Text style={styles.chooseTitleContainer}>Elija un curso</Text>
                <View style = {styles.pickerContainer}>
                    <Picker style={styles.selectableOptionsCourse} mode="dropdown" selectedValue={selectedCourseValue} onValueChange={handleCourseChange}>
                        <Picker.Item label="RELUL 2023" value="elul23" />  
                        <Picker.Item label="RELAL 2023" value="elal23" />
                        <Picker.Item label="RELAL 2022" value="elal22" />  
                        <Picker.Item label="RELUL 2022" value="elul22" />
                    </Picker>
                </View>
                
                <View style = {styles.nameUserContainer}>
                    <Text style={styles.nameUserTitle}>Nombre del disertante</Text>
                    <View style={styles.nameUserInputContainer}>
                        <TextInput style={styles.nameUserInput} placeholder='Nombre...'></TextInput>
                    </View>
                </View>
                <View style = {styles.bottomPhotoContainer}>
                    <TouchableOpacity style={styles.uploadPhotoButtom} >
                        <Text style={styles.buttomImageText}>Subir foto</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.bottomContainer}>
                    <TouchableOpacity style={styles.addButtom} title="Ir a crear curso"
        onPress={() => navigation.navigate('Crear curso')}>
                        <Text style={styles.buttomText}>Agregar</Text>
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
        fontSize:25
    },
    bigBlock:{
        marginTop:40    ,
        width:0.9*width,
        height:0.7*height,
        backgroundColor:"white",
        alignSelf:'center',
        borderRadius:9
    },
    chooseTitleContainer: {
        alignSelf:'center',
        marginTop:60,
        fontSize:25
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
    },
    nameUserContainer:{
        alignItems:'center',
        marginTop:40,
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
        marginTop:40,
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

export default AddParticipants;