import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AdminLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#009AFF',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tabs.Screen
        name="AdminHome"
        options={{
          title: 'Cursos',
          tabBarLabel: 'Cursos',
          headerTitle: 'Panel de Administración',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-variant" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Photo"
        options={{
          title: 'Fotos',
          tabBarLabel: 'Fotos',
          headerTitle: 'Photo',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="camera" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="AcceptInvitations"
        options={{
          title: 'Invitaciones',
          tabBarLabel: 'Solicitudes',
          headerTitle: 'Aceptar Invitaciones',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="check-circle" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="CreateCourse"
        options={{
          title: 'Crear Curso',
          tabBarLabel: 'Crear Curso',
          headerTitle: 'Crear Curso',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document-edit-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="AddSpeaker"
        options={{
          title: 'Crear Orador',
          tabBarLabel: 'Crear Orador',
          headerTitle: 'Crear Orador',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="microphone" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
