import React, { useState } from 'react';
import { View, Text,FlatList, TextInput, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';


const ScanQR = (props) => {
  const navigation = useNavigation();


  const [selectedCourseValue, setselectedCourseValue] = useState('default'); // Set an initial value
    
  const handleCourseChange = (itemValue, itemIndex) => {
      setselectedCourseValue(itemValue);
  };


    return (
        <View style = {styles.container}>
            <View style={styles.bigBlock}>
                    <TouchableOpacity style={styles.rateBottom} >
                        <Text style={styles.rateText}>Abrir camara</Text>
                    </TouchableOpacity>
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
        marginTop:50,
        justifyContent:'center'
    },
      rateBottom :{
        backgroundColor: 'lightblue',
        borderColor:'grey',
        borderWidth:2,
        height:60,
        width:0.7*width,
        borderRadius: 5,
        alignItems: 'center',
        textAlign:'center',
        alignSelf:'center'
      },
      rateText:{
        marginTop:10,
        fontSize:25,
        fontWeight:'bold'
      },
      
});

export default ScanQR;