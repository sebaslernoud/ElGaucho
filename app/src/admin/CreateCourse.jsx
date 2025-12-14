import React, { useState } from 'react';
import { View, StyleSheet,ScrollView, Text,Dimensions,Image, TouchableOpacity, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

function Section () {
  const navigation = useNavigation();
  return(
      <View style={styles.boxMembers}>
          <TouchableOpacity style = {styles.memberButton}>
              <Image style={styles.memberImage} source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAChklEQVR4nO2ZTYiNURjHfwxmyGCBzIJ8jFJiw4Zu2SBcFqyEhSIfGxGNFYmJWEmp2SkfxVgJKZJMo2ZEUxLJQiNfYchsyMc908lfvd3c+973Pe91jnp/9azuOf/+zz1fzzkv5OT8VzQABWAf0AF0AheBk8B6YAyB0wi0AW8BUyXeAUUCZQbwOGL2IXBKo7JBI7Ef6Nbv34EzwDICYhLQL4M9wIKY9gfLRugqMI4AuCRDdzS94hgGTAe2Aa/V9xqemQmUgK9Aa4r+04ABJbMCj+ySifMOGocy0HDmikxsdNCYL40neKRXJuIWeDVGAT+BHzqDvPBciaRZH1HsdmyUlBeeysAsBw07Cr8U3kakS4ksctCYKo03eKRTJtY5aCyVxl08ckAmDjtotEujHY8UZeKGg8Y9aSzHI2tlYkClR1ImRnasAh7pkYmdKfuPAI5I4wIe6c/gHFksjS48cl0mNjlo7JDGWTyyXSZeAHtSFowvM6jXnBkZKRyTFn12c/isa8Bln6f6H4YDgyr8mhP0a9Uf8IyAuJlirbSpj727B8NWmXpQ43nSqHVl+6wiIEZHFu3xGtqfU9s+Tc2gWJ2gijUZXMjqRkuKRIKkJU8kMIoakW96fazElMjUWkhgrAQ+RgzaHWw3MBcYqyfReX955H4FLCEACnq7LcW8wFcL2/cWsCblncbpzNgCPHIwXyn6gM1AUz0TmAwcBT7UIYHyeK87vL1BZkaD5vbgP0jAlMUXYG8Wp/8EfS4wnuM2MD5tEs0qAk0gcV87YGI6AjBvyuJ00iTmOG6p9YoSMDtJIicCMG0qxLE071UhRneSRD4FYNhUCPuqWRNNAZg1MVHL1+OcnBx+MwTQ0ifIg+pOMwAAAABJRU5ErkJggg=="}} />
              <Text style={styles.memberText}>Nombre cualquiera</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.memberButton} title="Ir a Curso"
            onPress={() => navigation.navigate('Agregar')}>
              <Image style={styles.memberImage} source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAChklEQVR4nO2ZTYiNURjHfwxmyGCBzIJ8jFJiw4Zu2SBcFqyEhSIfGxGNFYmJWEmp2SkfxVgJKZJMo2ZEUxLJQiNfYchsyMc908lfvd3c+973Pe91jnp/9azuOf/+zz1fzzkv5OT8VzQABWAf0AF0AheBk8B6YAyB0wi0AW8BUyXeAUUCZQbwOGL2IXBKo7JBI7Ef6Nbv34EzwDICYhLQL4M9wIKY9gfLRugqMI4AuCRDdzS94hgGTAe2Aa/V9xqemQmUgK9Aa4r+04ABJbMCj+ySifMOGocy0HDmikxsdNCYL40neKRXJuIWeDVGAT+BHzqDvPBciaRZH1HsdmyUlBeeysAsBw07Cr8U3kakS4ksctCYKo03eKRTJtY5aCyVxl08ckAmDjtotEujHY8UZeKGg8Y9aSzHI2tlYkClR1ImRnasAh7pkYmdKfuPAI5I4wIe6c/gHFksjS48cl0mNjlo7JDGWTyyXSZeAHtSFowvM6jXnBkZKRyTFn12c/isa8Bln6f6H4YDgyr8mhP0a9Uf8IyAuJlirbSpj727B8NWmXpQ43nSqHVl+6wiIEZHFu3xGtqfU9s+Tc2gWJ2gijUZXMjqRkuKRIKkJU8kMIoakW96fazElMjUWkhgrAQ+RgzaHWw3MBcYqyfReX955H4FLCEACnq7LcW8wFcL2/cWsCblncbpzNgCPHIwXyn6gM1AUz0TmAwcBT7UIYHyeK87vL1BZkaD5vbgP0jAlMUXYG8Wp/8EfS4wnuM2MD5tEs0qAk0gcV87YGI6AjBvyuJ00iTmOG6p9YoSMDtJIicCMG0qxLE071UhRneSRD4FYNhUCPuqWRNNAZg1MVHL1+OcnBx+MwTQ0ifIg+pOMwAAAABJRU5ErkJggg=="}} />
              <Text style={styles.memberText}>Agregar</Text>
          </TouchableOpacity>
      </View>
  );
};

const CreateCourse = (props) =>{ 
  const navigation = useNavigation();

  const [selectedCourseValue, setselectedCourseValue] = useState('default'); // Set an initial value
    
  const handleCourseChange = (itemValue, itemIndex) => {
      setselectedCourseValue(itemValue);
  };

  const options = ['RELUL', 'RELAL'];
  return(
    <View style={styles.bigContainer}>
      <View style= {styles.titleContainer}>
        <Text style= {styles.title}>Crear un curso</Text>
      </View>
      <View  style= {styles.createContainer}>
        <View style = {styles.optionContainer}>
          <Text style = {styles.optionTitle}>Elija un curso</Text>
          <View style = {styles.containerSelecOptionCourse}>
            <Picker style={styles.selectableOptionsCourse} mode="dropdown" selectedValue={selectedCourseValue} onValueChange={handleCourseChange}>
              <Picker.Item label="RELUL" value="java" />  
              <Picker.Item label="RELAL" value="js" />
            </Picker>
          </View>
        </View>
        <View style = {styles.dateContainer}>
          <Text style = {styles.dateTitle}>Ingrese fecha</Text>
          <View style = {styles.containerSelecDateCourse}>
            <TextInput style={styles.input} placeholder='formato: 08-03-2024' ></TextInput>
          </View>
        </View>
          
            <TouchableOpacity style={styles.createButtom} title="Ir a menu"
            onPress={() => navigation.navigate('Curso admin')}>
              <Text style={styles.createButtomText}>Crear</Text>
            </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  titleContainer:{
    alignItems:'center',
    marginTop:10,
    marginBottom:20
  },
  title:{
    fontSize:30
  },
  optionTitle:{
    fontSize:25,
    marginBottom:10,
    marginLeft:20
  },
  createContainer:{
    backgroundColor:"white",
    width:width-(1/10)*width,
    alignSelf:'center',
    borderRadius:9,
    height:height*0.8,
    justifyContent:'center',
    alignItems:'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dropdownContainer: {
    width: 200,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  dropdown: {
    height: 50,
    width: 200,
  },
  optionContainer:{
    width: width/2,
    height:100,
    marginTop:10
  },
  containerSelecOptionCourse:{
    borderWidth:2,
    borderColor:"lightblue",
    borderRadius:8,
  },
  dateTitle:{
    fontSize:25,
    marginBottom:10,
  },
  dateContainer:{
    width: width/2,
    height:100,
    marginTop:50
  },
  input:{
    textAlign:'left',
    borderRadius:8,
    borderColor: 'lightblue',
    borderWidth:2,
},
boxMembers:{
  flexWrap:'wrap',
  flexDirection:'row',
  alignItems: 'center',
  width: '100%'
},
memberButton:{
       
  borderColor:"lightblue",
  borderWidth:2,
  borderRadius:20,
  marginTop:15,
  marginLeft:10,
  marginRight:10,
  width: 85,
  height:85,
  alignItems:'center'
},
memberImage:{
  width:50,
  height:50
},
memberText:{
  fontSize:13
},
rolesText:{
  fontSize:25,
    marginLeft:50
},
importantRolesContainer:{
  marginTop:30,
  alignItems:'center'
},
createButtomText:{
  fontSize:23,
},
createButtom:{
  backgroundColor: 'lightblue',
  borderColor:'grey',
  borderWidth:2,
  height:50,
  width:0.5*width,
  padding: 10,
  borderRadius: 5,
  alignSelf: 'center',
  alignItems:'center',
  marginTop:60,
  marginLeft:15,
  marginBottom:10,
},
  
});


export default CreateCourse;