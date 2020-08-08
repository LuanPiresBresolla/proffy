import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import landing from '../../assets/images/landing.png';
import study from '../../assets/images/icons/study.png';
import giveClasses from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

const Landing: React.FC = () => {
  const { navigate } = useNavigation();
  const [connections, setConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then(response => {
      const { total } = response.data;
      setConnections(total);
    });
  }, []);

  const handleNavigateToGiveClassesPage = useCallback(() => {
    navigate('GiveClasses');
  }, []);

  const handleNavigateToStudy = useCallback(() => {
    navigate('Study');
  }, []);

  return (
    <View style={styles.container}>
      <Image source={landing} style={styles.banner}/>

      <Text style={styles.title}>
        Seja bem-vindo, {`\n`}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton 
          style={[styles.button, styles.buttonPrimary]}
          onPress={handleNavigateToStudy}
        >
          <Image source={study} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton 
          style={[styles.button, styles.buttonSecondary]} 
          onPress={handleNavigateToGiveClassesPage}
        >
          <Image source={giveClasses} />
          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {connections} conexões já realizadas {' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
}

export default Landing;