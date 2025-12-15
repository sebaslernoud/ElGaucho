import { Tabs } from 'expo-router';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: '#009AFF', // Color del icono activo (puedes cambiarlo)
        tabBarInactiveTintColor: '#888',  // Color del icono inactivo
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Cursos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-variant" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Notifications"
        options={{
          title: 'Notificaciones',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}