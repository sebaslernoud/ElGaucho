import { Picker } from '@react-native-picker/picker';
// [MODIFICADO] Importar useLocalSearchParams
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, ActivityIndicator, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux'; 

import { getAllCourses } from '../../src/services/courseService';
import { getAllSpeakers } from '../../src/services/speakerService'; 
import { createTalk } from '../../src/services/talkService'; 

const { width, height } = Dimensions.get('window');

const CreateTalk = () => {
  const router = useRouter();
  // [MODIFICADO] Obtener parámetros de navegación (courseId)
  const params = useLocalSearchParams(); 
  const preSelectedCourseId = params.courseId; 

  const token = useSelector(state => state.auth.token); 

  const [selectedCourseId, setSelectedCourseId] = useState(null); 
  const [selectedSpeakerId, setSelectedSpeakerId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [room, setRoom] = useState('');           

  // Estados Fechas
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date'); 

  // Data
  const [courses, setCourses] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const coursesData = await getAllCourses(token);
        setCourses(coursesData);
        
        // [MODIFICADO] Lógica de selección inicial
        if (preSelectedCourseId) {
            // Si viene un ID por parámetros, lo usamos
            setSelectedCourseId(preSelectedCourseId);
        } else if (coursesData.length > 0) {
            // Si no, seleccionamos el primero por defecto
            setSelectedCourseId(coursesData[0].id);
        }
        
        const speakersData = await getAllSpeakers(token);
        setSpeakers(speakersData);
      } catch (err) {
        setError("Error al cargar datos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, preSelectedCourseId]); // [MODIFICADO] Dependencia añadida

  // Helper para obtener nombre del curso seleccionado
  const getSelectedCourseTitle = () => {
      const course = courses.find(c => c.id === selectedCourseId);
      return course ? course.title : "Cargando...";
  };

  const validateDateInCourseRange = (dateToCheck) => {
    const course = courses.find(c => c.id === selectedCourseId);
    if (!course) return true;

    const courseStart = new Date(course.startDate);
    const courseEnd = new Date(course.endDate);
    
    if (dateToCheck < courseStart || dateToCheck > courseEnd) {
        Alert.alert(
            "Fecha Inválida", 
            `La charla debe ocurrir durante el curso.\n\nInicio del Curso: ${courseStart.toLocaleDateString()}\nFin del Curso: ${courseEnd.toLocaleDateString()}`
        );
        return false;
    }
    return true;
  };

  const onChangeStart = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate) {
        if (pickerMode === 'date') {
            setStartDate(selectedDate);
            setPickerMode('time');
            setShowStartPicker(true);
        } else {
            if (validateDateInCourseRange(selectedDate)) setStartDate(selectedDate);
            setPickerMode('date');
        }
    } else setPickerMode('date');
  };

  const onChangeEnd = (event, selectedDate) => {
    setShowEndPicker(false);
    if (selectedDate) {
        if (pickerMode === 'date') {
            setEndDate(selectedDate);
            setPickerMode('time');
            setShowEndPicker(true);
        } else {
            if (validateDateInCourseRange(selectedDate)) {
                 if (selectedDate < startDate) Alert.alert("Error", "La hora de fin no puede ser anterior a la de inicio.");
                 else setEndDate(selectedDate);
            }
            setPickerMode('date');
        }
    } else setPickerMode('date');
  };

  const showPicker = (type) => {
    setPickerMode('date');
    if (type === 'start') setShowStartPicker(true);
    if (type === 'end') setShowEndPicker(true);
  };
  
  const formatDateTime = (date) => `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;

  const handleCreateTalk = async () => {
    if (!selectedCourseId || !selectedSpeakerId || !title || !room) {
        Alert.alert("Error", "Complete todos los campos.");
        return;
    }

    setLoading(true);
    const newTalk = {
      courseId: selectedCourseId,
      speakerId: selectedSpeakerId,
      title,
      description,
      startTime: startDate.toISOString(), 
      endTime: endDate.toISOString(),
      room,
      status: 'upcoming' 
    };

    try {
        await createTalk(newTalk, token);
        Alert.alert("Éxito", "Charla creada correctamente", [
            { text: "OK", onPress: () => router.push('/admin/AdminHome') }
        ]);
    } catch (error) {
        console.error("Error al crear charla:", error);
        Alert.alert("Error", "Hubo un problema al crear la charla.");
    } finally {
        setLoading(false);
    }
  };

  if (loading && !courses.length) {
      return <ActivityIndicator size="large" color="lightblue" style={{flex:1, alignSelf:'center'}}/>;
  }

  const hasCourses = courses.length > 0;
  const hasSpeakers = speakers.length > 0;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={{ flex: 1 }}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Crear Charla</Text>
      </View>
      
      <View style={styles.createContainer}>
        
        {/* Selector de Curso: CONDICIONAL */}
        <View style={styles.inputGroup}>
          <Text style={styles.labelTitle}>Curso</Text>
          {preSelectedCourseId ? (
              // [MODIFICADO] Si hay curso preseleccionado, mostramos solo Texto (no editable)
              <View style={[styles.textInput, { justifyContent: 'center', backgroundColor: '#e9e9e9' }]}>
                  <Text style={{ fontSize: 16, color: '#555' }}>{getSelectedCourseTitle()}</Text>
              </View>
          ) : (
              // Si no, mostramos el Picker normal
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={selectedCourseId}
                  onValueChange={(itemValue) => setSelectedCourseId(itemValue)}
                  enabled={hasCourses}
                >
                  <Picker.Item label={hasCourses ? "Seleccione curso" : "Sin cursos"} value={null} />
                  {courses.map((c) => <Picker.Item key={c.id} label={c.title} value={c.id} />)}
                </Picker>
              </View>
          )}
        </View>

        {/* Nombre */}
        <View style={styles.inputGroup}>
          <Text style={styles.labelTitle}>Nombre de la charla</Text>
          <TextInput 
            style={styles.textInput} 
            placeholder='Título...'
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Descripción */}
        <View style={styles.inputGroup}>
          <Text style={styles.labelTitle}>Descripción</Text>
          <TextInput 
            style={[styles.textInput, styles.multilineInput]} 
            placeholder='Descripción...'
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Charlista */}
        <View style={styles.inputGroup}>
          <Text style={styles.labelTitle}>Charlista</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedSpeakerId}
              onValueChange={(itemValue) => setSelectedSpeakerId(itemValue)}
              enabled={hasSpeakers}
            >
              <Picker.Item label={hasSpeakers ? "Seleccione charlista" : "Sin speakers"} value={null} />
              {speakers.map((s) => <Picker.Item key={s.id} label={s.speakerName} value={s.id} />)}
            </Picker>
          </View>
        </View>
        
        {/* FECHAS */}
        <View style={styles.dateGroup}>
            <View style={styles.dateInputContainer}>
                <Text style={styles.labelTitle}>Inicio</Text>
                <TouchableOpacity onPress={() => showPicker('start')} style={styles.dateButton}>
                    <Text style={styles.dateText}>{formatDateTime(startDate)}</Text>
                </TouchableOpacity>
                {showStartPicker && (
                    <DateTimePicker
                        value={startDate}
                        mode={pickerMode}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeStart}
                    />
                )}
            </View>

            <View style={styles.dateInputContainer}>
                <Text style={styles.labelTitle}>Fin</Text>
                <TouchableOpacity onPress={() => showPicker('end')} style={styles.dateButton}>
                    <Text style={styles.dateText}>{formatDateTime(endDate)}</Text>
                </TouchableOpacity>
                {showEndPicker && (
                    <DateTimePicker
                        value={endDate}
                        mode={pickerMode}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeEnd}
                    />
                )}
            </View>
        </View>

        {/* Sala */}
        <View style={styles.inputGroup}>
          <Text style={styles.labelTitle}>Sala / Ubicación</Text>
          <TextInput 
            style={styles.textInput} 
            placeholder='Ej: Sala B'
            value={room}
            onChangeText={setRoom}
          />
        </View>

        <TouchableOpacity 
            style={styles.createButton} 
            onPress={handleCreateTalk}
            disabled={loading}
        >
          <Text style={styles.createButtonText}>{loading ? 'Creando...' : 'Crear charla'}</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    backgroundColor: '#f0f2f5', 
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  createContainer: {
    backgroundColor: "white",
    width: width * 0.85, 
    alignSelf: 'center',
    borderRadius: 12,
    padding: 25, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
  },
  labelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
    marginLeft: 4,
  },
  pickerWrapper: {
    borderWidth: 1.5,
    borderColor: "lightblue",
    borderRadius: 8,
    backgroundColor: '#fff',
    height: 50,
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: '#fff', 
    borderRadius: 8,
    borderColor: 'lightblue',
    borderWidth: 1.5,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  multilineInput: {
    height: 80,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  dateGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 15,
  },
  dateInputContainer: {
    width: '48%', 
  },
  dateButton: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  createButton: {
    backgroundColor: 'lightblue',
    borderColor: '#4A90E2', 
    borderWidth: 1,
    height: 50,
    width: '100%', 
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', 
  },
});

export default CreateTalk;