import React, { useCallback } from 'react';

import wppIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import { api } from '../../services/api';

export interface Teacher {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  subject: string;
  whatsapp: string;
  cost: number;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const createNewConneciton = useCallback(() => {
    api.post('connections', {
      user_id: teacher.id,
    });
  }, [teacher.id]);

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt=""/>
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      
      <p>{teacher.bio}</p>
      
      <footer>
        <p>
          Preço/hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a 
          target="_blank" 
          href={`https://wa.me/${teacher.whatsapp}`} 
          onClick={createNewConneciton}
        >
          <img src={wppIcon} alt="wpp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;