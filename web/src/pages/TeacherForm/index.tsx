import React, { useCallback, useState, FormEvent } from 'react';

import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import { api } from '../../services/api';
import { useHistory } from 'react-router-dom';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

const TeacherForm: React.FC = () => {
  const history = useHistory();
  const [scheduleItem, setScheduleItem] = useState<ScheduleItem[]>([
    { week_day: 0, from: '', to: '' }
  ]);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const addNewScheduleItem = useCallback(() => {
    setScheduleItem([...scheduleItem, { week_day: 0, from: '', to: '' }]);
  }, [scheduleItem]);

  const setScheduleItemValue = useCallback((position: number, field: string, value: string) => {
    const newArray = scheduleItem.map((item, index) => {
      if(index === position) {
        return { ...item, [field]: value };
      }

      return item;
    })
    console.log(newArray);
    setScheduleItem(newArray);
  }, [scheduleItem]);

  const handleCreateClass = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    
    try {
      await api.post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItem
      })
      alert('Cadastrado com sucesso');
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }, [avatar, bio, cost, history, name, scheduleItem, subject, whatsapp]);

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Que incrível que você quer dar aulas"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input 
              name="name" 
              label="Nome completo" 
              value={name} 
              onChange={e => setName(e.target.value)} 
            />

            <Input 
              name="avatar" 
              label="Avatar" 
              value={avatar} 
              onChange={e => setAvatar(e.target.value)}
            />

            <Input 
              name="whatsapp" 
              label="Whatsapp" 
              value={whatsapp} 
              onChange={e => setWhatsapp(e.target.value)}
            />  

            <Textarea 
              name="bio" 
              label="Sua biografia"
              value={bio} 
              onChange={e => setBio(e.target.value)}
            />        
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

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

            <Input 
              name="cost" 
              label="Custo da sua hora por aula" 
              value={cost} 
              onChange={e => setCost(e.target.value)}
            />          
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
            </legend>

            {scheduleItem.map((item, index) => (
              <div className="schedule-item" key={item.week_day}>
                <Select 
                  name="week_day" 
                  label="Dia da semana"
                  value={item.week_day}
                  onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                  name="from" 
                  label="Das"
                  value={item.from}
                  onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                />

                <Input 
                  type="time" 
                  name="to" 
                  label="Até"
                  value={item.to}
                  onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                />
              </div>
            ))} 
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Warning"/>
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
      </form>
      </main>
    </div>
  );
}

export { TeacherForm };