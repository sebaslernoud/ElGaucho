import React, { useState } from 'react';
import {
View,
Text,
TextInput,
ScrollView,
Button,
StyleSheet,
Dimensions,
TouchableOpacity,
Image,
Alert, // Para mostrar mensajes al usuario
} from 'react-native';
import { router } from 'expo-router'; // Importamos router de expo-router
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import {validateRegisterData}  from '../../validation/registerValidation';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const Register = () => {
// Aquí puedes añadir estados para cada campo del formulario
const [nombre, setNombre] = useState('');
const [apellido, setApellido] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [paisNacimiento, setPaisNacimiento] = useState('');
const [ciudadVives, setCiudadVives] = useState('');
const [carrera, setCarrera] = useState('');
const [universidad, setUniversidad] = useState('');
const [fechaNacimiento, setFechaNacimiento] = useState<Date | undefined>(undefined);
const [mostrarPicker, setMostrarPicker] = useState(false);

// Función para manejar el registro (simulada)
const handleRegister = async () => {
  const formattedDate = fechaNacimiento
  ? fechaNacimiento.toISOString(): undefined;

  const formData = {
    name: nombre,
    lastName: apellido,
    email,
    password,
    countryOfBirth: paisNacimiento || undefined,
    cityOfResidence: ciudadVives || undefined,
    career: carrera || undefined,
    university: universidad || undefined,
    dateOfBirth: formattedDate,
  };
  
  const { isValid, errors } = validateRegisterData(formData);
  
  if (!isValid) {
    const firstError = Object.values(errors)[0];
    Alert.alert('Error de validación', firstError || 'Completa todos los campos requeridos');
    return;
  }
  const API_BASE_URL = 'http://192.168.0.30:3000/api';
  try {
    console.log(formData);
    const response = await axios.post(`${API_BASE_URL}/auth/register`, formData);
    console.log(response);
    Alert.alert('Registro exitoso', '¡Tu cuenta ha sido creada!');
    router.push('/(auth)/login');
  } catch (error: any) {
    Alert.alert('Error', error.message || 'No se pudo completar el registro.');
  }
};


return (
  <View style={styles.container}>
    <Text style={styles.title1}>Bienvenido</Text>
    <Text style={styles.title2}>Gaucho</Text>

    <ScrollView style={styles.register}>
      <Text style={styles.description}>Ingrese su nombre</Text>
      <TextInput
        style={styles.input}
        placeholder='Nombre...'
        value={nombre}
        onChangeText={setNombre}
      />
      <Text style={styles.description}>Apellido</Text>
      <TextInput
        style={styles.input}
        placeholder='Apellido...'
        value={apellido}
        onChangeText={setApellido}
      />
      <Text style={styles.description}>Correo electronico</Text>
      <TextInput
        style={styles.input}
        placeholder='Correo electronico...'
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.description}>Contraseña </Text>
      <TextInput
        style={styles.input}
        placeholder='Contraseña...'
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Text style={styles.description}>Pais de nacimiento</Text>
      <TextInput
        style={styles.input}
        placeholder='País de nacimiento...'
        value={paisNacimiento}
        onChangeText={setPaisNacimiento}
      />
      <Text style={styles.description}>Ciudad donde vives</Text>
      <TextInput
        style={styles.input}
        placeholder='Ciudad...'
        value={ciudadVives}
        onChangeText={setCiudadVives}
      />
      <Text style={styles.description}>Carrera que estudias/te</Text>
      <TextInput
        style={styles.input}
        placeholder='Carrera...'
        value={carrera}
        onChangeText={setCarrera}
      />
      <Text style={styles.description}>Universidad</Text>
      <TextInput
        style={styles.input}
        placeholder='Universidad...'
        value={universidad}
        onChangeText={setUniversidad}
      />
      <Text style={styles.description}>Fecha de nacimiento</Text>
      <TouchableOpacity onPress={() => setMostrarPicker(true)} style={styles.input}>
        <Text>
          {fechaNacimiento
            ? `${fechaNacimiento.getDate().toString().padStart(2, '0')}/${(fechaNacimiento.getMonth() + 1)
                .toString()
                .padStart(2, '0')}/${fechaNacimiento.getFullYear()}`
            : 'Seleccionar fecha'}
        </Text>
      </TouchableOpacity>

      {mostrarPicker && (
        <DateTimePicker
          mode="date"
          value={fechaNacimiento || new Date(2000, 0, 1)}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setMostrarPicker(Platform.OS === 'ios'); // iOS mantiene el picker visible
            if (selectedDate) {
              setFechaNacimiento(selectedDate);
            }
          }}
          maximumDate={new Date()} // No permite fechas futuras
        />
      )}
      <TouchableOpacity style={styles.botonRegistro} onPress={handleRegister}>
        <Text style={styles.textoRegistro}>Registrarse</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1, // Asegura que el contenedor ocupe toda la pantalla
  backgroundColor: 'lightblue',
  paddingTop: 50, // Espacio superior para el título
},
title1: {
  fontSize: 30,
  textAlign: 'center',
  marginTop: 10,
},
title2: {
  fontSize: 30,
  textAlign: 'center',
  marginBottom: 20, // Espacio debajo del título
},
input: {
  textAlign: 'left',
  borderRadius: 8,
  borderColor: 'grey',
  borderWidth: 2,
  marginTop: 10,
  marginBottom: 10,
  padding: 10, // Añadir padding para que el texto no esté pegado al borde
},
description: {
  fontSize: 20,
},
register: {
  paddingHorizontal: 20, // Espaciado horizontal para el ScrollView
},
botonRegistro: {
  backgroundColor: '#009AFF',
  borderColor: 'grey',
  borderWidth: 3,
  height: 60,
  width: '100%', // Ocupa todo el ancho disponible en el ScrollView
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
  justifyContent: 'center', // Centra el texto verticalmente
  marginTop: 30,
  marginBottom: 100, // Espacio extra al final para que el contenido no quede pegado al borde
},
textoRegistro: {
  fontSize: 25,
  color: '#fff', // Color de texto blanco para el botón
},
});

export default Register;