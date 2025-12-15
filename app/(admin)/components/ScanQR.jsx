import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const { width, height } = Dimensions.get('window');


const ScanQR = (props) => {
  const router = useRouter();


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