import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { 
  Dimensions, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Image, 
  Alert, 
  ActivityIndicator, 
  TextInput, 
  FlatList, 
  Keyboard 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// [CORREGIDO] Ruta de importación solicitada
import { getAllUsers } from '../../src/services/userService'; 

const { width, height } = Dimensions.get('window');

// [CORREGIDO] Nombre del componente cambiado a Photo
const Photo = () => {
  const router = useRouter();
  const token = useSelector(state => state.auth.token);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Estados para la selección y búsqueda
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [image, setImage] = useState(null);

  // 1. Cargar usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const usersData = await getAllUsers(token);
        setUsers(usersData);
        setFilteredUsers(usersData); // Inicialmente mostramos todos
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
        Alert.alert("Error", "No se pudieron cargar los usuarios.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  // Filtro de búsqueda
  const handleSearch = (text) => {
    setSearchText(text);
    setSelectedUserId(null); // Reseteamos selección al escribir
    setShowDropdown(true);

    if (text) {
      const newData = users.filter(item => {
        const fullName = `${item.name} ${item.lastName}`.toUpperCase();
        const textData = text.toUpperCase();
        return fullName.indexOf(textData) > -1;
      });
      setFilteredUsers(newData);
    } else {
      setFilteredUsers(users);
    }
  };

  const handleSelectUser = (item) => {
    setSelectedUserId(item.id);
    setSearchText(`${item.name} ${item.lastName}`); // Solo mostramos nombre y apellido
    setShowDropdown(false);
    Keyboard.dismiss();
  };

  // 2. Función para abrir la cámara
  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permiso denegado", "Es necesario acceder a la cámara.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 3. Función para subir la imagen (Simulada para Service)
  const uploadImage = async () => {
    if (!selectedUserId) {
      Alert.alert("Atención", "Por favor busque y seleccione un usuario.");
      return;
    }
    if (!image) {
      Alert.alert("Atención", "Por favor tome una foto primero.");
      return;
    }

    setUploading(true);
    try {
      // TODO: Llamar al servicio de subida aquí
      console.log("Subiendo foto para usuario ID:", selectedUserId);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulación

      Alert.alert("Éxito", "Foto subida correctamente.");
      setImage(null);
      setSearchText('');
      setSelectedUserId(null);
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={1} 
      onPress={() => { setShowDropdown(false); Keyboard.dismiss(); }}
    >
      <View style={styles.bigBlock}>
        <Text style={styles.title}>Asignar Foto de Perfil</Text>

        {/* --- Componente 1: Buscador de Usuario --- */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Buscar Usuario:</Text>
          
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              placeholder="Escriba el nombre..."
              value={searchText}
              onChangeText={handleSearch}
              onFocus={() => setShowDropdown(true)}
            />
            {selectedUserId && (
               <MaterialCommunityIcons name="check-circle" size={24} color="green" style={{marginRight: 10}}/>
            )}
          </View>

          {/* Lista Desplegable (Dropdown) */}
          {showDropdown && (
            <View style={styles.dropdownList}>
              {loading ? (
                <ActivityIndicator color="#009AFF" style={{padding: 10}} />
              ) : (
                <FlatList
                  data={filteredUsers}
                  keyExtractor={(item) => item.id}
                  keyboardShouldPersistTaps="handled"
                  nestedScrollEnabled={true}
                  style={{ maxHeight: 150 }}
                  renderItem={({ item }) => (
                    <TouchableOpacity 
                      style={styles.dropdownItem} 
                      onPress={() => handleSelectUser(item)}
                    >
                      <Text style={styles.itemText}>{item.name} {item.lastName}</Text>
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={
                    <Text style={styles.emptyText}>No se encontraron usuarios.</Text>
                  }
                />
              )}
            </View>
          )}
        </View>

        {/* Vista previa */}
        {image && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: image }} style={styles.imagePreview} />
          </View>
        )}

        {/* --- Componente 2: Botón Cámara --- */}
        <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
          <Text style={styles.buttonText}>
            {image ? "Tomar otra foto" : "Abrir cámara"}
          </Text>
        </TouchableOpacity>

        {/* --- Componente 3: Botón Subir --- */}
        {image && (
          <TouchableOpacity 
            style={[styles.uploadButton, uploading && styles.disabledButton]} 
            onPress={uploadImage}
            disabled={uploading}
          >
            {uploading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.uploadButtonText}>Subir Imagen</Text>
            )}
          </TouchableOpacity>
        )}

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
  },
  bigBlock: {
    width: 0.9 * width,
    minHeight: 0.65 * height, // Un poco más alto para acomodar la lista
    backgroundColor: "white",
    alignSelf: 'center',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1, // Para que la lista flote correctamente en algunos casos
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    zIndex: 10, // Importante para que el dropdown quede por encima de otros elementos
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fafafa',
    height: 50,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  dropdownList: {
    position: 'absolute',
    top: 80, // Altura del label + input
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 100, // Máxima prioridad visual
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    padding: 15,
    fontStyle: 'italic',
    color: '#999',
    textAlign: 'center',
  },
  imagePreviewContainer: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    zIndex: 1,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  cameraButton: {
    backgroundColor: 'lightblue',
    borderColor: '#87CEEB',
    borderWidth: 1,
    height: 50,
    width: '80%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    zIndex: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    height: 50,
    width: '80%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  uploadButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  disabledButton: {
    backgroundColor: '#A5D6A7',
  }
});

export default Photo;