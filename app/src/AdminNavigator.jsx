// import React from "react"; //Importo toda la libreria de React
// import {Text, View, Button, FlatList, StyleSheet, ScrollView, Image } from "react-native"; // importo solo los modulos view y text
// //import { NavigationContainer } from '@react-navigation/native';
// //import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import LoginScreen from './LoginScreen';
// import Register from "./Register";
// import Profile from "./Profile";
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import CreateCourse from "./admin/CreateCourse";
// import AddParticipants from "./admin/AddParticipants";
// import AcceptInvitations from "./admin/AcceptInvitations";
// import CreateTalk from "./admin/CreateTalk";
// import AdminHome from "./admin/AdminHome";
// import Home from "./Home";
// import Notifications from "./Notifications";
// import AdminNotifications from "./admin/AdminNotifications";
// import { createStackNavigator } from '@react-navigation/stack';
// import Course from "./Course";
// import Members from "./Members";
// import Talk from "./Talk";
// //import CourseAdmin from "./admin/CourseAdmin";
// import ActualCourseAdmin from "./admin/ActualCourseAdmin";
// import ScanQR from "./admin/ScanQR";

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();


// function MyTabs() {
//   const [loggedInUser, setLoggedInUser] = React.useState(null);
//   return (
//     <Tab.Navigator screenOptions={{ headerShown: false }}>
//       {loggedInUser ?
//           <>
//               <Tab.Screen name="Cursos" options={{
//           tabBarIcon: ({ color, size }) => (
//             <Image
//                 source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVklEQVR4nO3VQQqAMAxE0X88S29tb2K9hyJ0EQQhbirCf5BVFgOBISBNVIEd6ECZGdyBY8x227WwezPtq+A1E1xG+BW6pO8kJdjjyB7rn6r/OLDHEk9OW8N7ef+eTPQAAAAASUVORK5CYII=' }}
//                 style={{ width: size, height: size, tintColor: color }}
//               />
//           ),
//         }}>
//                   {props => <AdminHome {...props} userId={loggedInUser}/>}
//               </Tab.Screen>
//               <Tab.Screen name="Crear Curso" options={{
//           tabBarIcon: ({ color, size }) => (
//             <Image
//                 source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA10lEQVR4nO2WQQrCMBBF30lE3LYX6Ma14jG8lcfRRY/gSkTrpisR3EcKUwhtpGMzVYQ8CLRN2sefDKGQmI45UAJ3YMsXyYAacCLvsQFusmDseACFlzST61zkTfIelbH0LLLcS94872EtbedqL3mQsdInsJRvzIBTZ/4CLKzF0VJ+JcV74VOipGPF3UZyct92bzGFeChpId1uKh5KikidpVi7p+ogTrlwp2wkc/FB2b3m4iOwl+TBs3cqsZYkfksqdSzqClaRfyGhcdWI18byRrqKrlvi73gBKDL6RkKoU30AAAAASUVORK5CYII=' }}
//                 style={{ width: size, height: size, tintColor: color }}
//               />
//           ),
//         }}>
//                 {props => <CreateCourse {...props} userId={loggedInUser}/>}
//               </Tab.Screen>
              
//               <Tab.Screen name="Notificaciones" options={{
//           tabBarIcon: ({ color, size }) => (
//             <Image
//                 source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADeklEQVR4nNWaS0hVQRzGf5rZi9RMepiFvaCgXRItjJ4UuOhJq4IoKqMnbVxVizAoaBkFFZGLoBApyCgKW1UUSYX2sKjoSVQWqZELLeNf343h4tVrnjn33A8GZJz5vu/MmZkz//9c8IcioBpoVakBppJmKAK+AF1xxerGkUaolvGLMm6lVnXnSCO0yrQ7+uNV9400wgeZtikW/yD2v8hjALAAeCXTtXoYK5dUZ/+bD2QSQWQBW4D33SzwROUtsFl9I4HJwAPH4EOgElgKnAE+AR+BKmAxsBe457S3vyem+iFmO9vsE6AMyEiy70KgUX2bgVmkCFM02mbkNDD0PzgGAyfFYVz2dkNf1HdloKqfC9fe4Clx3Ql7E9gm4cca1f5iEPBInOWEBBuxlxK1rTYo2JoxzudhvZUlEmzwwN0g7kWEgMMS2+OBe5+4DxECbklsngfu+eK+QQh4J7FCD9xF4n5DCPghsSB2q3gMEbdpeEWWhDo8anRIw75V3jBcIhZv+EKbNIZ51GCUROwQ6AufpVHgUYMZErGvsC80SWO6R40/x3ATuepRo04a9qX3hnKJ2InVF05JY5NHDY5JZKdHjd3SOOJR419kN8ejxlxp1PsSGA380vaY7UuEv0f678BP7ZKBY5dG6jz+cUFaO4ImHqCY3MiX4R8rnG0+0NhkgxP0hJG+GegEb+uDIrWEQItI1xAe1kqzJYikRL6zU13uQ6onCGQAV5zcl3n5L0xQss2IXvg++yRAgbS7lAOz/HGf4/JmZ8Gl8k6jSNmaWCLPvCWF1U5MYNNpJKnHSGeadchjr3ijDvsjljHPlCfz9jqZDrEpNY3oYbq8WczSK06o8VOghOigBHgmb8eT6TDCyZLHYg+7xygmfBRL+5rjp1Eek47NDzofwlh5r8DnKFABrNNVgo3WTGCSyhiJ5TicOaob47Sbqb5l4qoQd103l0Yt8mTe+ow8YCNw1omlwyyfpW0ecgn4KF+q888BrSf7IcB13VrFbnPbga9Ap2OqU3XtTibmvvrWiKtS3KXSShluyqSdXhNhldpY28iiTSZtSiZCvtpY28iiVSZ7WpC5IST5+o3bMrm8hzYr1cay+pHFdueGt7tdJk8fWmuzlQgj24lfmrToc1RWOg9Rrygw0iiM+0FAfLGHGEuaIFs3v7YObHeyYtutTScvb+I3s5wzY2t+2hoAAAAASUVORK5CYII=' }}
//                 style={{ width: size, height: size, tintColor: color }}
//               />
//           ),
//         }}>
//                 {props => <AdminNotifications {...props} userId={loggedInUser}/>}
//               </Tab.Screen>
//              <Tab.Screen name="Crear charla" options={{
//           tabBarIcon: ({ color, size }) => (
//             <Image
//                 source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA10lEQVR4nO2WQQrCMBBF30lE3LYX6Ma14jG8lcfRRY/gSkTrpisR3EcKUwhtpGMzVYQ8CLRN2sefDKGQmI45UAJ3YMsXyYAacCLvsQFusmDseACFlzST61zkTfIelbH0LLLcS94872EtbedqL3mQsdInsJRvzIBTZ/4CLKzF0VJ+JcV74VOipGPF3UZyct92bzGFeChpId1uKh5KikidpVi7p+ogTrlwp2wkc/FB2b3m4iOwl+TBs3cqsZYkfksqdSzqClaRfyGhcdWI18byRrqKrlvi73gBKDL6RkKoU30AAAAASUVORK5CYII=' }}
//                 style={{ width: size, height: size, tintColor: color }}
//               />
//           ),
//         }}>
//                 {props => <CreateTalk {...props} userId={loggedInUser}/>}
//               </Tab.Screen> 
//               <Tab.Screen name="Solicitudes" options={{
//           tabBarIcon: ({ color, size }) => (
//             <Image
//                 source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAERUlEQVR4nO2aXYhVVRTHf6ONM4aaNuo4CRn4kmkiJqLgixSW4RdG0KQ9WKQpaToYgoKj+KLpQ5LYk2D05IM+mJZipBhSlIipqY2DD+YH2hcY6ExWIwv/J5Zzz/Wer3vOEP7hMGfO3nvttfdee63/2vvCQ/x/MQiYA2wG9gPngd+BTuAvvbcBnwNbVLeBHoI6YB5wEPgb6Ir53AEOAPOBPkUMoC/QAlxxSnUAh4G1mu1RWqVaPfb+jMrWA0e0UkF7k9WS54CmA+1OgRPAQmBgAllmWu8AZ5y8duAlqoh6YLvr8KQGVZOBbJMxCzgn2f8CH6vPTNEIHFcnt4EVwCNZd8I9E1wtB2F9fQMMc+VJVv0/PAVckGD7O47q4zngkp4mfXsbuAZMTLoSwSC+A4aQH5qA0Xp/3jmGBXEF1TtzskH0pxg8rRhkemxMIiDY2BdyXgmPwc5D7gZ6ERPT3cbOY0+UC7ZHpYdZxqP6PjxOsAtmwQJUEagBPpEOPwNP6PtbwI9RPWaLixPVcLFRsEY6/NnNIk7ru3mwissZ0A4zryLwqgLiPwqSHs2OzljMKYt5jnZkEbHjYiJw6wFm3cvRme6DvA8HVcm4U96wTXxZ/e+IYPp7ylUYJCrekZYKJIDFqB+k4KEKZtMkPS1APhZWYY4EfUW+6A3sU9/nIk5i4JanhRVuUaHlE3niQ/X7CzAyYpsP1KY1rDCYldnkh8UuKZsS07N1KaUuQZsKLbPLAy8q1TVX+0bMtmNdrCvBbyp8PIZt7wLeJD5ssv5QfxsSerguRf0SBMlM1Jz5FZfNLY2hxFDgotruShiv+qq9xZzUAzG8qwgclWJbanAshAjGRZ3bW6lNK8B82bq13fYAqm0z/6nqXY7DYkMwRHJuhBX+lGKzz9XsWPudZchmq8pvAs+SDqNd3CnB/pTud6qUNBl7u52ABETQIvJM0mOu66cEmzMIiJNcWvol0A+YrATNvi0jG6yXvE1hhbNVaKeFaWBmc9Xl+tfd/skKRyVzRljhQEcajUCmwUjnYu35IsMkrUGE0Z4B5SodUMeLMuhwmBjt2YzZ9BLpaJSqLF7POLGy2XuS7FAjWmI6vlYp0ATJzcv0PMxy1KRi4F6uyqcKPHwIQ61LcyNRonp3TLqSnoNV0um8LCcyxQ64zHiKxwTpYkH1hbiNt7mLF2OsRaHRufKtSQTUKaCZgO8LOsQe4A7Sv01zLTdYNhnQ7jxXptENol3/k/aip80JHJ/TnrioPo2Vj8hK8FBnZrbp3q90ZJkQtfJOHc6cMr/SsD3zkeNPp0TasrwMPePS563Vvqqe5kwtOMlYnCCzDCjMEkc7urQnY7vYNKvznqhCoECn6HWrEp8xUrSPngZ9s7J1wNfdfjBgF59L4wS7rAfUrOzyTsKfcOwTASzkJxzlfP5MHWd+pnz6V61Up97PKj3dpP1V1AXrQ1Bt3AVSX1y/4Zx+TQAAAABJRU5ErkJggg==' }}
//                 style={{ width: size, height: size, tintColor: color }}
//               />
//           ),
//         }}>
//                 {props => <AcceptInvitations {...props} userId={loggedInUser}/>}
//               </Tab.Screen> 
//               <Tab.Screen name="Escanear" options={{
//           tabBarIcon: ({ color, size }) => (
//             <Image
//                 source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAU0lEQVR4nO2UMQoAIAgA/f+nr8klkDSzEDpwCLQDtUQ+QTBCsc5W/juBwqIgmn9PQNsZ9AdnS8q2iKzAC1UXpwW7a6qUvYPjXwXZFpULaDuDj8wMmeyjXR3+JYQAAAAASUVORK5CYII=' }}
//                 style={{ width: size, height: size, tintColor: color }}
//               />
//           ),
//         }}>
//                 {props => <ScanQR {...props} userId={loggedInUser}/>}
//               </Tab.Screen>
//           </>
//           :
//           <>
//               <Tab.Screen name="Login" options={{tabBarVisible:false, tabBarStyle:{display:'none'}}}>
//                   {props => <LoginScreen {...props} loginFn={setLoggedInUser} />}
//               </Tab.Screen>
//           </>
//       }
//     </Tab.Navigator>
//   );
// }



// function AdminNavigator(){
//   return (
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="Tabs" component={MyTabs}  />
//           <Stack.Screen name="Register" component={Register} />
//           <Stack.Screen name="Curso admin" component={CourseAdmin}  />
//           <Stack.Screen name="Curso actual admin" component={ActualCourseAdmin}  />
//           <Stack.Screen name="Miembros" component={Members}  />
//           <Stack.Screen name="Charla" component={Talk}  />
//           <Stack.Screen name="Perfil" component={Profile}  />
//           <Stack.Screen name="Agregar" component={AddParticipants}  />
//           <Stack.Screen name="Crear curso" component={CreateCourse}  />
//         </Stack.Navigator>
//       </NavigationContainer>    
//   );
// };


// export default AdminNavigator;

/* <Tab.Screen name="Agregar" options={{
          tabBarIcon: ({ color, size }) => (
            <Image
                source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADWElEQVR4nO2ay08UQRDGf0Zk12BEFhCPcjQY9Z9QQVGBG4o3DV5Egl59nNGTCQl/hwYJJGoQ3w/Ui4LISeVgxJsLBM2ait8knbiz7M727s4SvmSyj66prpqurq7+emATGxcpoAu4CYwBs8BPYFWXff+oNpM5BTQQEySBs8Ak8AfIFHj9BiaAPiBRCQe2A5eBRceoFeABcFUjs09PfJuuBv1nbdeAh7onuP8bMKSHUxYcBxYcA14B54D6CLp2AeeB146+z0AHJYQ9qVGnwzfAEY/624G3jv6RUozOHhluHfwCLgJbfXfCP52XgLQz2i2+lLdquDPKOvspPQ4Ac+pzXjYUhWZH4UugifKhAXisvhcUFZGQdMLpKVBH+VEHPHfCLNKcGXXCyRa7SqHRiQpLAAWn2GBil2NO5DNn0rLJslvei12wTlh2igsGncmfV4hdcdaJUqTYqKgB3sk2cyonEioVTPgw8cMx2ba43qj0ORkijtjiZNLTuQQnJWS1ky+8AJ551NcvG8fDBFIqq1ciFoBhCGonnwvlKrAWZme3OryPX/h2xDAlnSfIgltqtP1E3B25IZ3D2RrH1HiyChzpls472Ro/qdF2cXF3pE06jRf4D0tqTFWBI03S+T1b46oaayMono5APASX3VsoEg5PEBtHHvl2ZKmKQqs5V2htmMk+pkZjAOPuSE+u9BssiEaeVfWC2KVGYwurpUTpDCvGgqLRGMC4OpJyisadYUIT6tRoTF+Yjphiw3BBNt4LlQDOSMi42LhurGZkY+96C81XCR4lfuiUbV/yOYYYkvBMDMmH97JtIJ8bkg7Xa4RyXDAkm+YKORTq0E1pkWOVxiFgWTYVfJQx4jwBoy0rhWaRcmbL7SgKkqKFMiKSK0Fi7xALk9FnopinMescK9jvciEFPHGO44o+8Gl1htbC7CDlmRPz6tOq8r2+FLc4YZYW92rp0DdqlJ2WnXDa7buTpJMAMiKUOzyu2HaUEawTwcQu6dl7uzPsAWvfH/EthpRqp6DsyCiUfJ4Wrzs6g045k1FFauX1dfFObUrbtboadWjUI5kphycIyo6BSr0BkRArPq4tQKHEw5p2pr2VciAb6sXF2q7trs4efzgv1dj3D9qeDks2dD+xCaocfwGfzEwBMfegNQAAAABJRU5ErkJggg==' }}
                style={{ width: size, height: size, tintColor: color }}
              />
          ),
        }}>
                {props => <AddParticipants {...props} userId={loggedInUser}/>}
              </Tab.Screen> */