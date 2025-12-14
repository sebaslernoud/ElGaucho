import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importar el calendario
import { createCourse } from '../../../src/services/courseService';

const { width } = Dimensions.get('window');

const CreateCourse = () => { 
  const router = useRouter();
  
  // Obtener token de Redux
  const authState = useSelector(state => state.auth);
  const token = authState?.token;

  // Estados del formulario
  const [courseType, setCourseType] = useState('RELUL'); // Estado para el TIPO, no el título final
  const [description, setDescription] = useState('');
  
  // Estados para Fechas (Objetos Date)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
  // Estados para mostrar/ocultar calendarios
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [location, setLocation] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');

  // Efecto para actualizar el Título Automático cuando cambia el Tipo o la Fecha de Inicio
  useEffect(() => {
    if (startDate) {
        const monthNames = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        const month = monthNames[startDate.getMonth()];
        const year = startDate.getFullYear();
        setPreviewTitle(`${courseType} ${month} ${year}`);
    }
  }, [courseType, startDate]);

  // Manejador de cambio de fecha
  const onDateChange = (event, selectedDate, type) => {
    if (type === 'start') {
        setShowStartPicker(Platform.OS === 'ios'); // En iOS se mantiene, en Android se cierra
        if (selectedDate) setStartDate(selectedDate);
    } else {
        setShowEndPicker(Platform.OS === 'ios');
        if (selectedDate) setEndDate(selectedDate);
    }
  };

  const handleCreate = async () => {
    if (!token) {
        Alert.alert("Error", "No estás autenticado.");
        return;
    }

    if (!location) {
        Alert.alert("Campos incompletos", "Por favor completa la ubicación.");
        return;
    }

    // Validación básica: Fecha fin no puede ser antes de fecha inicio
    if (endDate < startDate) {
        Alert.alert("Error en fechas", "La fecha de fin no puede ser anterior a la de inicio.");
        return;
    }

    setLoading(true);

    try {
        const courseData = {
            title: previewTitle, // Usamos el título generado automáticamente
            description,
            startDate: startDate.toISOString(), // Enviamos formato ISO completo
            endDate: endDate.toISOString(),
            location,
            maxParticipants: maxParticipants ? parseInt(maxParticipants) : null,
            status: 'upcoming'
        };

        await createCourse(courseData, token);
        
        Alert.alert("Éxito", `Curso "${previewTitle}" creado correctamente`, [
            { text: "OK", onPress: () => router.back() }
        ]);

    } catch (error) {
        console.error("Error creando curso:", error);
        Alert.alert("Error", "Hubo un problema al crear el curso. Revisa tu conexión.");
    } finally {
        setLoading(false);
    }
  };

  // Helper para mostrar fecha legible en el botón
  const formatDateForDisplay = (date) => {
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return(
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.bigContainer}
    >
      <View style= {styles.titleContainer}>
        <Text style= {styles.title}>Crear un curso</Text>
      </View>
      
      <View style= {styles.createContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            
            {/* Tipo de Curso */}
            <View style = {styles.inputGroup}>
              <Text style = {styles.label}>Tipo de Curso</Text>
              <View style = {styles.pickerContainer}>
                <Picker 
                    style={styles.picker} 
                    selectedValue={courseType} 
                    onValueChange={(itemValue) => setCourseType(itemValue)}
                >
                  <Picker.Item label="RELUL" value="RELUL" />  
                  <Picker.Item label="RELAL" value="RELAL" />
                </Picker>
              </View>
            </View>

            {/* Vista Previa del Título */}
            <View style={styles.previewContainer}>
                <Text style={styles.previewLabel}>Nombre del curso será:</Text>
                <Text style={styles.previewText}>{previewTitle}</Text>
            </View>

            {/* Fechas con Calendario */}
            <View style={styles.row}>
                {/* Fecha Inicio */}
                <View style = {[styles.inputGroup, styles.halfInput]}>
                    <Text style = {styles.label}>Fecha Inicio</Text>
                    <TouchableOpacity 
                        style={styles.dateButton} 
                        onPress={() => setShowStartPicker(true)}
                    >
                        <Text style={styles.dateText}>{formatDateForDisplay(startDate)}</Text>
                    </TouchableOpacity>
                    
                    {showStartPicker && (
                        <DateTimePicker
                            value={startDate}
                            mode="date"
                            display="default"
                            onChange={(e, d) => onDateChange(e, d, 'start')}
                        />
                    )}
                </View>

                {/* Fecha Fin */}
                <View style = {[styles.inputGroup, styles.halfInput]}>
                    <Text style = {styles.label}>Fecha Fin</Text>
                    <TouchableOpacity 
                        style={styles.dateButton} 
                        onPress={() => setShowEndPicker(true)}
                    >
                        <Text style={styles.dateText}>{formatDateForDisplay(endDate)}</Text>
                    </TouchableOpacity>

                    {showEndPicker && (
                        <DateTimePicker
                            value={endDate}
                            mode="date"
                            display="default"
                            minimumDate={startDate} // No permite seleccionar antes del inicio
                            onChange={(e, d) => onDateChange(e, d, 'end')}
                        />
                    )}
                </View>
            </View>

            {/* Ubicación */}
            <View style = {styles.inputGroup}>
              <Text style = {styles.label}>Ubicación</Text>
              <TextInput 
                style={styles.input} 
                placeholder='Ej: Buenos Aires, Argentina' 
                value={location}
                onChangeText={setLocation}
              />
            </View>

            {/* Máx Participantes */}
            <View style = {styles.inputGroup}>
              <Text style = {styles.label}>Máx. Participantes</Text>
              <TextInput 
                style={styles.input} 
                placeholder='Ej: 100' 
                value={maxParticipants}
                onChangeText={setMaxParticipants}
                keyboardType="numeric"
              />
            </View>

            {/* Descripción */}
            <View style = {styles.inputGroup}>
              <Text style = {styles.label}>Descripción</Text>
              <TextInput 
                style={[styles.input, styles.textArea]} 
                placeholder='Ej: Curso de liderazgo para universitarios...' 
                multiline={true}
                numberOfLines={3}
                value={description}
                onChangeText={setDescription}
              />
            </View>
            
            {loading ? (
                <ActivityIndicator size="large" color="lightblue" style={{marginTop: 20}} />
            ) : (
                <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                    <Text style={styles.createButtonText}>Crear Curso</Text>
                </TouchableOpacity>
            )}

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
  },
  titleContainer:{
    alignItems:'center',
    marginTop: 10,
    marginBottom: 10
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333'
  },
  createContainer:{
    backgroundColor: "white",
    width: width * 0.9,
    alignSelf: 'center',
    borderRadius: 15,
    padding: 10,
    flex: 1, 
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scrollContent: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  label:{
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600',
    color: '#555',
    marginLeft: 5
  },
  pickerContainer:{
    borderWidth: 2,
    borderColor: "lightblue",
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input:{
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderColor: 'lightblue',
    borderWidth: 2,
    paddingHorizontal: 10,
    height: 50,
    fontSize: 16
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top', 
    paddingTop: 10
  },
  // Estilos para el botón de fecha (que parece input)
  dateButton: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderColor: 'lightblue',
    borderWidth: 2,
    paddingHorizontal: 10,
    height: 50,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  // Estilos para la vista previa del título
  previewContainer: {
    backgroundColor: '#e6f7ff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#1890ff',
  },
  previewLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  previewText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004080',
    marginTop: 2,
  },
  createButton:{
    backgroundColor: 'lightblue',
    borderColor: '#87CEEB',
    borderWidth: 1,
    height: 55,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    elevation: 3,
  },
  createButtonText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
});

export default CreateCourse;