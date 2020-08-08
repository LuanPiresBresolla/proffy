import React, { useCallback } from 'react';
import { View, ImageBackground, Text } from 'react-native';

import background from '../../assets/images/give-classes-background.png';

import { styles } from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const GiveClasses: React.FC = () => {
  const { goBack } = useNavigation();

  const handleBackToLanding = useCallback(() => {
    goBack();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground resizeMode="contain" source={background} style={styles.content}>
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa plataforma web.
        </Text>
      </ImageBackground>

      <RectButton style={styles.button} onPress={handleBackToLanding}>
        <Text style={styles.buttonText}>Tudo bem</Text>
      </RectButton>
    </View>
  );
}

export default GiveClasses;