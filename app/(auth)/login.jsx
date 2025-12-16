import { Link, useRouter } from 'expo-router';
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
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para ver/ocultar contraseña

  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Campos vacíos", "Por favor, ingresa tu correo electrónico y contraseña.");
      return;
    }

    // Despachar el thunk de loginUser
    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.rejected.match(resultAction)) {
      Alert.alert("Error de inicio de sesión", resultAction.payload || "Credenciales incorrectas.");
    } else {
      // El redireccionamiento lo maneja tu AuthRedirector, pero por si acaso:
      console.log('Login exitoso');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header con Logo */}
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEVklEQVR4nO2Za4hVVRTHf2aFMuOQmq8glVBMywcqaVRWWl8CMy0isxKMFPoQDI5oOmlN5aOiCMSiKPCLoB/SfJRGoHgh08ohX5kwajZS42Ocns40zdxY8T+yul3vPefO7t6B7h82nLPP2v+19tl7rbPWPlBCCSWUkBC9gXeA80Cjrq91z+36XT0zmfeBAXQyDAZOAKm01gBMVWvI8PxHYDSdBBXAERl2DJgg43ZlMHyXnln7Un2nO8vKvOUm0cv1XwE8A9QD3+va+iJ0Az7X2A0UGUOBNuAP4JY8x/+qyYyiiHhTRphj54vXxbGaIuKUjBjXAY7R4viOImGgDDgDdOkgVxTRBlIEPCjlHwfg+khcMygCVkj5SwG4XhTXyxQBn0r59ABc08X1CQWG+cQFKb8+oL81BvC3RBgixWcDclrQMM4bKCAeCujoEbYH3Kqx8YKULg/IaVzG+TwFxCYpfSQg50xxbgxB1geoAfYrB2oCvgKWAH2d3HEpvYlwMC7jrHN9/YBq2dAkm/ZrR/ha5x+wvflThtQ7aueAB5S2twPNwFUBJ2JczeKukD3nstjTJHv+NYk2CWwG7gLK1O4GtuhZK7BK17WER624V0mXXX+YxZ42P5k+biWezaKkOu2NrP0PJrI2TUc2e5ZI5kK0zWrcSuTCVqpekivCocvwWUHJhi4900XLa8uXCZKdoN3Ad4WBcux3/nQnssQDAz7opjzGwPEMAeA7o34EJ2NilGRy7LMbYHpK1OfC7bqyGjoNfJL/XKTWn+wxYCTwOjFeqYTX81Wq91DdeMia7xwUZz2k64qC75G0Of59ipBK81TrJj9TSmm9dzBImc7WLikwWjca4g4y42zGlAw4O6WZEzMEbJf+w67NtMA1YBqyX39Upm21Ra1RfrWRM9v60LfSEuO15HIyU/AG72aYbSxHiYJ7kLckLjb3inhVTfrb71lyqztbEHFyh9L1dWXAoLJQdJxL463saYwGH23TzbYKi5jGNaVHsN2fOF311Jmx8fwL3xhzXVScvqehMzTpOqsOcNy4WaVWiY8+3tT0tKg0CegLXSPZK3VslOEzGVurQoVkcvyXY3r48PuYXYIELf/5YMxcmKzPNN2JFq/CBDsKTJJjfaPzT6fE4WpXFJMdw7fEoYp1UlIrq+jbd/6DItUfbaZ5S9aR4Q7xHM2XgU/R2rD1K50Wl88+JlxOa75a7qtAnGjlgfvaK7DPffDLXgAXOiXcAN1J8TAC+cDXR3LgD79O3IqVfBlYnjKWw6KKMfLN7sfaf5Y58/gmucZWatcOqX25P8NFKgnL56qsu+ET52MqYGfplMUjE6Wm2Ods+rdZifQMs8btZCWhPpdkReqivv3KkKQoq9lVep5qiNU1HvYomf/ARxNnu0Q+Zr9PS71CtVS/nNa16km9a3rCcaxLwlFZsg352Htb/jkZXtKV0LhB9Sw4CO7USdtAwB7g1ZjFVQgkl/J/xF3hYpt3VcI5SAAAAAElFTkSuQmCC" }}
          />
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
        </View>

        {/* Formulario */}
        <View style={styles.formContainer}>
          
          {/* Input Email */}
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="email-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder='Correo electrónico'
              placeholderTextColor="#999"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Input Contraseña */}
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="lock-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder='Contraseña'
              placeholderTextColor="#999"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons 
                name={showPassword ? "eye-off" : "eye"} 
                size={24} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>

          {/* Botón Iniciar Sesión */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>

          {/* Enlace Registro */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿No tienes cuenta? </Text>
            <Link href="/register" asChild>
              <TouchableOpacity>
                <Text style={styles.registerLink}>Regístrate aquí</Text>
              </TouchableOpacity>
            </Link>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa', // Fondo gris muy suave, más moderno que lightblue
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    // Sombra suave
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
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
  loginButton: {
    backgroundColor: '#009AFF',
    borderRadius: 12,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: "#009AFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  registerText: {
    color: '#666',
    fontSize: 15,
  },
  registerLink: {
    color: '#009AFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default LoginScreen;