import { Link } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // Importar hooks de Redux
import { loginUser } from '../../redux/slices/authSlice'; // Importar el thunk de login

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const dispatch = useDispatch();
const { isLoading, error } = useSelector((state) => state.auth); // Obtener estado de authSlice
const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert("Error", "Por favor, ingresa tu correo electrónico y contraseña.");
    return;
  }

  console.log('Starting login with:', email);
  
  // Despachar el thunk de loginUser
  const resultAction = await dispatch(loginUser({ email, password }));

  console.log('Login result action:', resultAction);
  console.log('Action type:', resultAction.type);
  console.log('Payload:', resultAction.payload);

  if (loginUser.rejected.match(resultAction)) {
    // Si el login fue rechazado (fallido)
    console.error('Login rejected:', resultAction.payload);
    Alert.alert("Error de inicio de sesión", resultAction.payload || "Correo electrónico o contraseña incorrectos.");
  } else {
    console.log('Login succeeded!');
  }
};

return (
  <View style={styles.contenedor}>
    <Image
      style={styles.logo}
      source={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEVklEQVR4nO2Za4hVVRTHf2aFMuOQmq8glVBMywcqaVRWWl8CMy0isxKMFPoQDI5oOmlN5aOiCMSiKPCLoB/SfJRGoHgh08ohX5kwajZS42Ocns40zdxY8T+yul3vPefO7t6B7h82nLPP2v+19tl7rbPWPlBCCSWUkBC9gXeA80Cjrq91z+36XT0zmfeBAXQyDAZOAKm01gBMVWvI8PxHYDSdBBXAERl2DJgg43ZlMHyXnln7Un2nO8vKvOUm0cv1XwE8A9QD3+va+iJ0Az7X2A0UGUOBNuAP4JY8x/+qyYyiiHhTRphj54vXxbGaIuKUjBjXAY7R4viOImGgDDgDdOkgVxTRBlIEPCjlHwfg+khcMygCVkj5SwG4XhTXyxQBn0r59ABc08X1CQWG+cQFKb8+oL81BvC3RBgixWcDclrQMM4bKCAeCujoEbYH3Kqx8YKULg/IaVzG+TwFxCYpfSQg50xxbgxB1geoAfYrB2oCvgKWAH2d3HEpvYlwMC7jrHN9/YBq2dAkm/ZrR/ha5x+wvflThtQ7aueAB5S2twPNwFUBJ2JczeKukD3nstjTJHv+NYk2CWwG7gLK1O4GtuhZK7BK17WER624V0mXXX+YxZ42P5k+biWezaKkOu2NrP0PJrI2TUc2e5ZI5kK0zWrcSuTCVqpekivCocvwWUHJhi4900XLa8uXCZKdoN3Ad4WBcux3/nQnssQDAz7opjzGwPEMAeA7o34EJ2NilGRy7LMbYHpK1OfC7bqyGjoNfJL/XKTWn+wxYCTwOjFeqYTX81Wq91DdeMia7xwUZz2k64qC75G0Of59ipBK81TrJj9TSmm9dzBImc7WLikwWjca4g4y42zGlAw4O6WZEzMEbJf+w67NtMA1YBqyX39Upm21Ra1RfrWRM9v60LfSEuO15HIyU/AG72aYbSxHiYJ7kLckLjb3inhVTfrb71lyqztbEHFyh9L1dWXAoLJQdJxL463saYwGH23TzbYKi5jGNaVHsN2fOF311Jmx8fwL3xhzXVScvqehMzTpOqsOcNy4WaVWiY8+3tT0tKg0CegLXSPZK3VslOEzGVurQoVkcvyXY3r48PuYXYIELf/5YMxcmKzPNN2JFq/CBDsKTJJjfaPzT6fE4WpXFJMdw7fEoYp1UlIrq+jbd/6DItUfbaZ5S9aR4Q7xHM2XgU/R2rD1K50Wl88+JlxOa75a7qtAnGjlgfvaK7DPffDLXgAXOiXcAN1J8TAC+cDXR3LgD79O3IqVfBlYnjKWw6KKMfLN7sfaf5Y58/gmucZWatcOqX25P8NFKgnL56qsu+ET52MqYGfplMUjE6Wm2Ods+rdZifQMs8btZCWhPpdkReqivv3KkKQoq9lVep5qiNU1HvYomf/ARxNnu0Q+Zr9PS71CtVS/nNa16km9a3rCcaxLwlFZsg352Htb/jkZXtKV0LhB9Sw4CO7USdtAwB7g1ZjFVQgkl/J/xF3hYpt3VcI5SAAAAAElFTkSuQmCC" }}
    />
    <View style={styles.granInput}>
      <Text style={styles.texto}>Ingrese su correo electronico</Text>
      <TextInput
        style={styles.input}
        placeholder='Correo electronico...'
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.texto}>Ingrese su contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder='Contraseña...'
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
    </View>
    <View style={styles.botones}>
      <Link href="/register" asChild>
        <TouchableOpacity style={styles.botonRegistro}>
          <Text style={styles.textoRegistro}>Registrarse</Text>
        </TouchableOpacity>
      </Link>
      <TouchableOpacity
        style={styles.botonInicio}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoInicio}>Iniciar Sesion</Text>
        )}
      </TouchableOpacity>
    </View>
  </View>
);
};


const styles = StyleSheet.create({
contenedor: {
  width: width,
  height: height,
  backgroundColor: 'lightblue',
  justifyContent: 'center', // Centra verticalmente el contenido
  alignItems: 'center',     // Centra horizontalmente el contenido
},
granInput: {
  width: '90%', // Ocupa el 90% del ancho del contenedor
  paddingHorizontal: 20, // Espaciado interno horizontal
  marginBottom: 30,
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
botones: {
  width: '90%', // Ocupa el 90% del ancho del contenedor
  alignItems: 'center', // Centra los botones horizontalmente
},
botonInicio: {
  backgroundColor: '#009AFF',
  borderColor: 'grey',
  borderWidth: 3,
  height: 50,
  width: '100%', // Ocupa todo el ancho disponible en 'botones'
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
  justifyContent: 'center', // Centra el texto/spinner verticalmente
  marginTop: 30,
},
botonRegistro: {
  backgroundColor: 'lightblue',
  borderRadius: 5,
  // No necesita marginLeft si el contenedor de botones está centrado
},
textoRegistro: {
  fontSize: 20,
  textDecorationLine: 'underline',
},
textoInicio: {
  fontSize: 20,
  color: '#fff', // Color de texto blanco para el botón de inicio de sesión
},
logo: {
  width: 100, // Aumenté el tamaño del logo para que se vea mejor
  height: 100,
  marginBottom: 50, // Espacio debajo del logo
  // No necesita marginLeft si el contenedor está centrado
},
texto: {
  fontSize: 20,
},
});

export default LoginScreen;