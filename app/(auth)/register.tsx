import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { validateRegisterData } from '../../validation/registerValidation';
import axios from 'axios';

const { width } = Dimensions.get('window');

const Register = () => {
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
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const formattedDate = fechaNacimiento ? fechaNacimiento.toISOString() : undefined;

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
      Alert.alert('Datos incompletos', firstError || 'Completa todos los campos requeridos');
      return;
    }

    // Asegúrate de que esta IP sea correcta
    const API_BASE_URL = 'http://192.168.0.30:3000/api'; 
    
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/auth/register`, formData);
      Alert.alert('¡Bienvenido!', 'Tu cuenta ha sido creada exitosamente.', [
        { text: 'Iniciar Sesión', onPress: () => router.push('/(auth)/login') }
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'No se pudo completar el registro.');
    } finally {
      setLoading(false);
    }
  };

  // Helper para renderizar Inputs con Icono
  const renderInput = (
    label: string, 
    value: string, 
    setValue: (text: string) => void, 
    placeholder: string, 
    icon: any, 
    isPassword = false,
    keyboardType: any = 'default'
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <MaterialCommunityIcons name={icon} size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={setValue}
          secureTextEntry={isPassword}
          keyboardType={keyboardType}
          autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
        />
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <MaterialCommunityIcons name="arrow-left" size={28} color="#333" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Image
                    style={styles.logo}
                    source={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEVklEQVR4nO2Za4hVVRTHf2aFMuOQmq8glVBMywcqaVRWWl8CMy0isxKMFPoQDI5oOmlN5aOiCMSiKPCLoB/SfJRGoHgh08ohX5kwajZS42Ocns40zdxY8T+yul3vPefO7t6B7h82nLPP2v+19tl7rbPWPlBCCSWUkBC9gXeA80Cjrq91z+36XT0zmfeBAXQyDAZOAKm01gBMVWvI8PxHYDSdBBXAERl2DJgg43ZlMHyXnln7Un2nO8vKvOUm0cv1XwE8A9QD3+va+iJ0Az7X2A0UGUOBNuAP4JY8x/+qyYyiiHhTRphj54vXxbGaIuKUjBjXAY7R4viOImGgDDgDdOkgVxTRBlIEPCjlHwfg+khcMygCVkj5SwG4XhTXyxQBn0r59ABc08X1CQWG+cQFKb8+oL81BvC3RBgixWcDclrQMM4bKCAeCujoEbYH3Kqx8YKULg/IaVzG+TwFxCYpfSQg50xxbgxB1geoAfYrB2oCvgKWAH2d3HEpvYlwMC7jrHN9/YBq2dAkm/ZrR/ha5x+wvflThtQ7aueAB5S2twPNwFUBJ2JczeKukD3nstjTJHv+NYk2CWwG7gLK1O4GtuhZK7BK17WER624V0mXXX+YxZ42P5k+biWezaKkOu2NrP0PJrI2TUc2e5ZI5kK0zWrcSuTCVqpekivCocvwWUHJhi4900XLa8uXCZKdoN3Ad4WBcux3/nQnssQDAz7opjzGwPEMAeA7o34EJ2NilGRy7LMbYHpK1OfC7bqyGjoNfJL/XKTWn+wxYCTwOjFeqYTX81Wq91DdeMia7xwUZz2k64qC75G0Of59ipBK81TrJj9TSmm9dzBImc7WLikwWjca4g4y42zGlAw4O6WZEzMEbJf+w67NtMA1YBqyX39Upm21Ra1RfrWRM9v60LfSEuO15HIyU/AG72aYbSxHiYJ7kLckLjb3inhVTfrb71lyqztbEHFyh9L1dWXAoLJQdJxL463saYwGH23TzbYKi5jGNaVHsN2fOF311Jmx8fwL3xhzXVScvqehMzTpOqsOcNy4WaVWiY8+3tT0tKg0CegLXSPZK3VslOEzGVurQoVkcvyXY3r48PuYXYIELf/5YMxcmKzPNN2JFq/CBDsKTJJjfaPzT6fE4WpXFJMdw7fEoYp1UlIrq+jbd/6DItUfbaZ5S9aR4Q7xHM2XgU/R2rD1K50Wl88+JlxOa75a7qtAnGjlgfvaK7DPffDLXgAXOiXcAN1J8TAC+cDXR3LgD79O3IqVfBlYnjKWw6KKMfLN7sfaf5Y58/gmucZWatcOqX25P8NFKgnL56qsu+ET52MqYGfplMUjE6Wm2Ods+rdZifQMs8btZCWhPpdkReqivv3KkKQoq9lVep5qiNU1HvYomf/ARxNnu0Q+Zr9PS71CtVS/nNa16km9a3rCcaxLwlFZsg352Htb/jkZXtKV0LhB9Sw4CO7USdtAwB7g1ZjFVQgkl/J/xF3hYpt3VcI5SAAAAAElFTkSuQmCC" }}
                />
                <Text style={styles.title}>Crear Cuenta</Text>
                <Text style={styles.subtitle}>Únete a la comunidad Gaucho</Text>
            </View>
        </View>

        {/* Formulario */}
        <View style={styles.formCard}>
            
            {/* Sección Personal */}
            <Text style={styles.sectionTitle}>Datos Personales</Text>
            {renderInput("Nombre", nombre, setNombre, "Ej: Juan", "account")}
            {renderInput("Apellido", apellido, setApellido, "Ej: Pérez", "account-outline")}
            
            {/* Fecha de Nacimiento */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Fecha de Nacimiento</Text>
                <TouchableOpacity onPress={() => setMostrarPicker(true)} style={styles.dateButton}>
                    <MaterialCommunityIcons name="calendar" size={20} color="#666" style={styles.inputIcon} />
                    <Text style={fechaNacimiento ? styles.dateText : styles.placeholderText}>
                        {fechaNacimiento
                        ? fechaNacimiento.toLocaleDateString()
                        : 'Seleccionar fecha'}
                    </Text>
                </TouchableOpacity>
                {mostrarPicker && (
                    <DateTimePicker
                        mode="date"
                        value={fechaNacimiento || new Date(2000, 0, 1)}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(event, selectedDate) => {
                            setMostrarPicker(Platform.OS === 'ios');
                            if (selectedDate) setFechaNacimiento(selectedDate);
                        }}
                        maximumDate={new Date()}
                    />
                )}
            </View>

            <View style={styles.divider} />

            {/* Sección Ubicación */}
            <Text style={styles.sectionTitle}>Ubicación</Text>
            {renderInput("País de Nacimiento", paisNacimiento, setPaisNacimiento, "Ej: Argentina", "earth")}
            {renderInput("Ciudad de Residencia", ciudadVives, setCiudadVives, "Ej: Buenos Aires", "map-marker")}

            <View style={styles.divider} />

            {/* Sección Académica */}
            <Text style={styles.sectionTitle}>Formación</Text>
            {renderInput("Universidad", universidad, setUniversidad, "Nombre de la universidad", "school")}
            {renderInput("Carrera", carrera, setCarrera, "Ej: Ingeniería", "book-open-variant")}

            <View style={styles.divider} />

            {/* Sección Cuenta */}
            <Text style={styles.sectionTitle}>Cuenta</Text>
            {renderInput("Correo Electrónico", email, setEmail, "correo@ejemplo.com", "email", false, "email-address")}
            {renderInput("Contraseña", password, setPassword, "••••••••", "lock", true)}

            {/* Botón de Registro */}
            <TouchableOpacity 
                style={[styles.registerButton, loading && styles.disabledButton]} 
                onPress={handleRegister}
                disabled={loading}
            >
                <Text style={styles.registerButtonText}>
                    {loading ? 'Creando cuenta...' : 'Registrarse'}
                </Text>
            </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
  titleContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#009AFF',
    marginBottom: 15,
    marginTop: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    fontWeight: '500',
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    height: 50,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#333',
    fontSize: 16,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    height: 50,
    paddingHorizontal: 15,
  },
  dateText: {
    color: '#333',
    fontSize: 16,
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 15,
  },
  registerButton: {
    backgroundColor: '#009AFF',
    borderRadius: 12,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: "#009AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: '#a0d9ff',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Register;