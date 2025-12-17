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
          tabBarLabel: 'Photo',
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
          tabBarLabel: 'Invitaciones',
          headerTitle: 'Aceptar Invitaciones',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="check-circle" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
