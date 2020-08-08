import React, { useState, useEffect, useCallback, FormEvent } from 'react';

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';
import { api } from '../../services/api';

const TeacherList: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {}, []);

  const searcheTeachers = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.get('classes', {
        params: {
          week_day,
          subject,
          time,
        }
      });

      setTeachers(response.data);
    } catch (error) {
      alert('Nenhum dado encontrado');
    }
  }, [subject, time, week_day]);

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis">
        <form id="search-teachers" onSubmit={searcheTeachers}>
        <Select 
            name="subject" 
            label="Matéria"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Educação Física', label: 'Educação Física' },
              { value: 'História', label: 'História' },
              { value: 'Programação', label: 'Programação' },
            ]}
          />
          
          <Select 
            name="week_day" 
            label="Dia da semana"
            value={week_day}
            onChange={e => setWeekDay(e.target.value)}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sabado' },
            ]}
          />

          <Input 
            type="time" 
            name="time" 
            label="Hora" 
            value={time}
            onChange={e => setTime(e.target.value)}
          />     

          <button type="submit">Buscar</button>     
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  );
}

export { TeacherList };