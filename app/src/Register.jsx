import React, { useState } from 'react';
import { View, Text, TextInput,ScrollView, Button, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

const Register= ({navigation}) => {
    return (
        <View style = {styles.container}>
            <Text style = {styles.title1}>Bienvenido</Text>
            <Text style = {styles.title2}>Gaucho</Text>

            <ScrollView style = {styles.register}>
                <Text style={styles.description}>Ingrese su nombre</Text>
                <TextInput style={styles.input} placeholder='Correo electronico...' />
                <Text style={styles.description}>Apellido</Text>
                <TextInput style={styles.input} placeholder='Contraseña...' />
                <Text style={styles.description}>Correo electronico</Text>
                <TextInput style={styles.input} placeholder='Correo electronico...' />
                <Text style={styles.description}>Contraseña </Text>
                <TextInput style={styles.input} placeholder='Contraseña...' />
                <Text style={styles.description}>Pais de nacimeinto</Text>
                <TextInput style={styles.input} placeholder='Correo electronico...' />
                <Text style={styles.description}>Ciudad donde vives</Text>
                <TextInput style={styles.input} placeholder='Contraseña...' />
                <Text style={styles.description}>Carrera que estudias/te</Text>
                <TextInput style={styles.input} placeholder='Contraseña...' />
                <Text style={styles.description}>Universidad</Text>
                <TextInput style={styles.input} placeholder='Correo electronico...' />
                <Text style={styles.description}>Fecha de nacimiento</Text>
                <TextInput style={styles.input} placeholder='Contraseña...' />
                <TouchableOpacity style={styles.botonRegistro} title="Ir a Login"
            onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.textoRegistro}>Registrarse</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
};


const styles = StyleSheet.create({
    title1: {
        fontSize: 30,
        textAlign: 'center',
        marginTop:10
      },
      title2: {
        fontSize: 30,
        textAlign: 'center',
      },
    input:{
        textAlign:'left',
        borderRadius:8,
        borderColor: 'grey',
        borderWidth:2,
        marginTop:10,
        marginBottom:10,
    },
    description: {
        fontSize:20,
    },
    register:{
        marginTop:20,
        marginBottom:30,
        marginLeft:20,
        marginRight:20,
    },
    botonRegistro:{
        backgroundColor: '#009AFF',
        borderColor:'grey',
        borderWidth:3,
        height:60,
        width:width - width/15 -15,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop:30,
        marginLeft:2,
        textAlign:'center',
        marginBottom:100,
    },
    textoRegistro:{
        fontSize:25,
    }
});

export default Register;

