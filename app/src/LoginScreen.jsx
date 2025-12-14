import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

const { width, height } = Dimensions.get('window');


// const LoginScreen = ({navigation}) => {
    

//   return (
//     <View style={styles.contenedor}>
//         <Image style = {styles.logo} source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEVklEQVR4nO2Za4hVVRTHf2aFMuOQmq8glVBMywcqaVRWWl8CMy0isxKMFPoQDI5oOmlN5aOiCMSiKPCLoB/SfJRGoPgh08ohX5kwajZS42Ocns40zdxY8T+yul3vPefO7t6B7h82nLPP2v+19tl7rbPWPlBCCSWUkBC9gXeA80Cjrq91z+36XT0zmfeBAXQyDAZOAKm01gBMVWvI8PxHYDSdBBXAERl2DJgg43ZlMHyXnln7Un2nO8vKvOUm0cv1XwE8A9QD3+va+iJ0Az7X2A0UGUOBNuAP4JY8x/+qyYyiiHhTRphj54vXxbGaIuKUjBjXAY7R4viOImGgDDgDdOkgVxTRBlIEPCjlHwfg+khcMygCVkj5SwG4XhTXyxQBn0r59ABc08X1CQWG+cQFKb8+oL81BvC3RBgixWcDclrQMM4bKCAeCujoEbYH3Kqx8YKULg/IaVzG+TwFxCYpfSQg50xxbgxB1geoAfYrB2oCvgKWAH2d3HEpvYlwMC7jrHN9/YBq2dAkm/ZrR/ha5x+wvflThtQ7aueAB5S2twPNwFUBJ2JczeKukD3nstjTJHv+NYk2CWwG7gLK1O4GtuhZK7BK17WER624V0mXXX+YxZ42P5k+biWezaKkOu2NrP0PJrI2TUc2e5ZI5kK0zWrcSuTCVqekivCocvwWUHJhi4900XLa8uXCZKdoN3Ad4WBcux3/nQnssQDAz7opjzGwPEMAeA7o34EJ2NilGRy7LMbYHpK1OfC7bqyGjoNfJL/XKTWn+wxYCTwOjFeqYTX81Wq91DdeMia7xwUZz2k64qC75G0Of59ipBK81TrJj9TSmm9dzBImc7WLikwWjca4g4y42zGlAw4O6WZEzMEbJf+w67NtMA1YBqyX39Upm21Ra1RfrWRM9v60LfSEuO15HIyU/AG72aYbSxHiYJ7kLckLjb3inhVTfrb71lyqztbEHFyh9L1dWXAoLJQdJxL463saYwGH23TzbYKi5jGNaVHsN2fOF311Jmx8fwL3xhzXVScvqehMzTpOqsOcNy4WaVWiY8+3tT0tKg0CegLXSPZK3VslOEzGVurQoVkcvyXY3r48PuYXYIELf/5YMxcmKzPNN2JFq/CBDsKTJJjfaPzT6fE4WpXFJMdw7fEoYp1UlIrq+jbd/6DItUfbaZ5S9aR4Q7xHM2XgU/R2rD1K50Wl88+JlxOa75a7qtAnGjlgfvaK7DPffDLXgAXOiXcAN1J8TAC+cDXR3LgD79O3IqVfBlYnjKWw6KKMfLN7sfaf5Y58/gmucZWatcOqX25P8NFKgnL56qsu+ET52MqYGfplMUjE6Wm2Ods+rdZifQMs8btZCWhPpdkReqivv3KkKQoq9lVep5qiNU1HvYomf/ARxNnu0Q+Zr9PS71CtVS/nNa16km9a3rCcaxLwlFZsg352Htb/jkZXtKV0LhB9Sw4CO7USdtAwB7g1ZjFVQgkl/J/xF3hYpt3VcI5SAAAAAElFTkSuQmCC"}} />
//         <View style = {styles.granInput}>
//             <Text style={styles.texto}>Ingrese su correo electronico</Text>
//             <TextInput style={styles.input} placeholder='Correo electronico...'/>
//             <Text style={styles.texto}>Ingrese su contraseña</Text>
//             <TextInput style={styles.input} placeholder='Contraseña...' secureTextEntry={true} />
//         </View>
//         <View style={styles.botones}>
//         <TouchableOpacity style={styles.botonRegistro} title="Ir a Register"
//             onPress={() => navigation.navigate('Register')}>
//                 <Text style={styles.textoRegistro}>Registrarse</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.botonInicio} >
//             <Text style={styles.textoInicio}>Iniciar Sesion</Text>
//         </TouchableOpacity>
        
//         </View>
//     </View>
//   );
// };



const LoginScreen = ({navigation,...props}) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    console.log(JSON.stringify(props));


    async function handleLogin(email, password, loginFunction) {
        const loginCheck = await fetch("http://localhost:3000/users/login?email=" + email + "&password=" + password)
        if (loginCheck.ok) {
            let data = await loginCheck.json()
            loginFunction(data.id)
        }
        else {
            Alert.alert("No se encontró el usuario")
            console.log(loginCheck.status)
        }
    }


  return (
    <View style={styles.contenedor}>
        <Image style = {styles.logo} source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEVklEQVR4nO2Za4hVVRTHf2aFMuOQmq8glVBMywcqaVRWWl8CMy0isxKMFPoQDI5oOmlN5aOiCMSiKPCLoB/SfJRGoPgh08ohX5kwajZS42Ocns40zdxY8T+yul3vPefO7t6B7h82nLPP2v+19tl7rbPWPlBCCSWUkBC9gXeA80Cjrq91z+36XT0zmfeBAXQyDAZOAKm01gBMVWvI8PxHYDSdBBXAERl2DJgg43ZlMHyXnln7Un2nO8vKvOUm0cv1XwE8A9QD3+va+iJ0Az7X2A0UGUOBNuAP4JY8x/+qyYyiiHhTRphj54vXxbGaIuKUjBjXAY7R4viOImGgDDgDdOkgVxTRBlIEPCjlHwfg+khcMygCVkj5SwG4XhTXyxQBn0r59ABc08X1CQWG+cQFKb8+oL81BvC3RBgixWcDclrQMM4bKCAeCujoEbYH3Kqx8YKULg/IaVzG+TwFxCYpfSQg50xxbgxB1geoAfYrB2oCvgKWAH2d3HEpvYlwMC7jrHN9/YBq2dAkm/ZrR/ha5x+wvflThtQ7aueAB5S2twPNwFUBJ2JczeKukD3nstjTJHv+NYk2CWwG7gLK1O4GtuhZK7BK17WER624V0mXXX+YxZ42P5k+biWezaKkOu2NrP0PJrI2TUc2e5ZI5kK0zWrcSuTCVqekivCocvwWUHJhi4900XLa8uXCZKdoN3Ad4WBcux3/nQnssQDAz7opjzGwPEMAeA7o34EJ2NilGRy7LMbYHpK1OfC7bqyGjoNfJL/XKTWn+wxYCTwOjFeqYTX81Wq91DdeMia7xwUZz2k64qC75G0Of59ipBK81TrJj9TSmm9dzBImc7WLikwWjca4g4y42zGlAw4O6WZEzMEbJf+w67NtMA1YBqyX39Upm21Ra1RfrWRM9v60LfSEuO15HIyU/AG72aYbSxHiYJ7kLckLjb3inhVTfrb71lyqztbEHFyh9L1dWXAoLJQdJxL463saYwGH23TzbYKi5jGNaVHsN2fOF311Jmx8fwL3xhzXVScvqehMzTpOqsOcNy4WaVWiY8+3tT0tKg0CegLXSPZK3VslOEzGVurQoVkcvyXY3r48PuYXYIELf/5YMxcmKzPNN2JFq/CBDsKTJJjfaPzT6fE4WpXFJMdw7fEoYp1UlIrq+jbd/6DItUfbaZ5S9aR4Q7xHM2XgU/R2rD1K50Wl88+JlxOa75a7qtAnGjlgfvaK7DPffDLXgAXOiXcAN1J8TAC+cDXR3LgD79O3IqVfBlYnjKWw6KKMfLN7sfaf5Y58/gmucZWatcOqX25P8NFKgnL56qsu+ET52MqYGfplMUjE6Wm2Ods+rdZifQMs8btZCWhPpdkReqivv3KkKQoq9lVep5qiNU1HvYomf/ARxNnu0Q+Zr9PS71CtVS/nNa16km9a3rCcaxLwlFZsg352Htb/jkZXtKV0LhB9Sw4CO7USdtAwB7g1ZjFVQgkl/J/xF3hYpt3VcI5SAAAAAElFTkSuQmCC"}} />
        <View style = {styles.granInput}>
            <Text style={styles.texto}>Ingrese su correo electronico</Text>
            <TextInput style={styles.input} placeholder='Correo electronico...' onChangeText={setEmail}/>
            <Text style={styles.texto}>Ingrese su contraseña</Text>
            <TextInput style={styles.input} placeholder='Contraseña...' onChangeText={setPassword} secureTextEntry={true} />
        </View>
        <View style={styles.botones}>
        <TouchableOpacity style={styles.botonRegistro} title="Ir a registro"
            onPress={() => navigation.navigate('Register')}>
                <Text style={styles.textoRegistro}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonInicio} onPress={() => handleLogin(email, password, props.loginFn)}>
            <Text style={styles.textoInicio}>Iniciar Sesion</Text>
        </TouchableOpacity>
        
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    contenedor:{
        width:width,
        height:height,
        backgroundColor:'lightblue',
    },
    granInput :{
        marginTop:80,
        marginBottom:30,
        marginLeft:20,
        marginRight:20,
    },
    input: {
        textAlign:'left',
        borderRadius:8,
        borderColor: 'grey',
        borderWidth:2,
        marginTop:10,
        marginBottom:10,
        
    },
    botonInicio : {
        backgroundColor: '#009AFF',
        borderColor:'grey',
        borderWidth:3,
        height:50,
        width:width - width/15 -15,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop:30,
        marginLeft:20,
        textAlign:'center',
    },
    botonRegistro : {
        backgroundColor: 'lightblue',
        borderRadius: 5,
        marginLeft:20,
    },
    textoRegistro : {
        fontSize:20,
        textDecorationLine: 'underline',
    },
    textoInicio: {
        fontSize:20,
    },
    logo: {
        width:50,
        height:50,
        marginLeft:170,
        marginTop:100,
    },
    texto:{
        fontSize:20,
    }
});



export default LoginScreen;
