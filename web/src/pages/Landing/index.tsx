import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import landing from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import { api } from '../../services/api';

import './styles.css';

const Landing: React.FC = () => {
  const [connections, setConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then(response => {
      const { total } = response.data;
      setConnections(total);
    })
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logo} alt="Proffy"/>
          <h2>Sua plataforma de estudos online</h2>
        </div>

        <img src={landing} alt="Landing" className="hero-image"/>

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Study"/>
            Estudar
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas"/>
            Dar aulas
          </Link>
        </div>

        <span className="total-connections">
          Total de {connections} conexões já realizadas
          <img src={purpleHeartIcon} alt="sz"/>
        </span>
      </div>
    </div>
  );
}

export { Landing };