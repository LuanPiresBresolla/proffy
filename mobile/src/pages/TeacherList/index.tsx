import React, { useState, useCallback, useEffect } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import { styles } from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

const Favorites: React.FC = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const loadFavorites = useCallback(() => {
    AsyncStorage.getItem('favorites').then(response => {
      if(response) {
        const favorited = JSON.parse(response);
        const favoritedIds = favorited.map((teacher: Teacher) => {
          return teacher.id;
        })

        setFavorites(favoritedIds);
      }
    });
  }, []);

  const handleToggleFilters = useCallback(() => {
    setFiltersVisible(!filtersVisible)
  }, [filtersVisible]); 

  const searcheTeachers = useCallback(async () => {
    loadFavorites();
    try {
      const response = await api.get('classes', {
        params: {
          week_day,
          subject,
          time,
        }
      });
      setTeachers(response.data);
      setFiltersVisible(false);
    } catch (error) {
      alert('Nenhum dado encontrado');
    }
  }, [subject, time, week_day]);

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis"
        icon={(
          <BorderlessButton onPress={handleToggleFilters}>
            <Feather name="filter" color="#d4c2ff" size={20} />
          </BorderlessButton>
        )}
      >
        {filtersVisible && (
          <View style={styles.searchform}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput 
              placeholderTextColor="#c1bccc" 
              style={styles.input} 
              placeholder="Qual a matéria"
              value={subject}
              onChangeText={text => setSubject(text)}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput 
                  placeholderTextColor="#c1bccc" 
                  style={styles.input} 
                  placeholder="Dia o dia" 
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput 
                  placeholderTextColor="#c1bccc" 
                  style={styles.input} 
                  placeholder="Qual horário?" 
                  value={time}
                  onChangeText={text => setTime(text)}
                />
              </View>
            </View>

            <RectButton style={styles.submitButton} onPress={searcheTeachers}>
              <Text style={styles.submitButtonText}>Pesquisar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem 
            teacher={teacher} 
            key={teacher.id}
            favorited={favorites.includes(Number(teacher.id))}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default Favorites;