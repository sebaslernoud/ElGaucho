import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AdminLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#009AFF',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tabs.Screen
        name="admin/AdminHome"
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
        name="admin/AdminNotifications"
        options={{
          title: 'Notificaciones',
          tabBarLabel: 'Notificaciones',
          headerTitle: 'Notificaciones',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="admin/AcceptInvitations"
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
