import React, { useState } from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import PageHeader from '../../components/PageHeader';
import { ScrollView } from 'react-native-gesture-handler';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Favorites: React.FC = () => {
  const [teachers, setTeachers] = useState([]);

  useFocusEffect(() => {
    AsyncStorage.getItem('favorites').then(response => {
      if(response) {
        const favorited = JSON.parse(response);
        setTeachers(favorited);
      }
    });
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

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
            favorited
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default Favorites;