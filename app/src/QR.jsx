import React, { useState } from 'react';
import { View, Text,FlatList, TextInput, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';


const QR = (props) => {
  const navigation = useNavigation();


  const [selectedCourseValue, setselectedCourseValue] = useState('default'); // Set an initial value
    
  const handleCourseChange = (itemValue, itemIndex) => {
      setselectedCourseValue(itemValue);
  };


    return (
        <View style = {styles.container}>
            <View style={styles.bigBlock}>
                    <Image style={styles.fotoQR} source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAb0lEQVR4nO2UUQrAMAhDc/9jTXau7Gsw7Nx0Tj9KA/2wDT4IVmApqB0A1ZHL+3nn9Q/SZqqGVm35TYBVZ/19AFZFJDfm7QHw5p9QdGZeNkXMArxiVeM0ILqL2PXRfl8V/BpRG4BVEUlwF7F6XDG/DrRBoJCBlLiVAAAAAElFTkSuQmCC"}}/>    
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
      fotoQR:{
        height:0.5*height,
        width: 0.8*width,
      }
      
});

export default QR;