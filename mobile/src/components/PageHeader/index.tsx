import React, { useCallback, ReactNode } from 'react';
import { View, Image, Text } from 'react-native';

import { styles } from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';

import backIcon from '../../assets/images/icons/back.png';
import logo from '../../assets/images/logo.png';
import { useNavigation } from '@react-navigation/native';

interface PageHeaderProps {
  title: string;
  icon?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children, icon }) => {
  const { navigate } = useNavigation();

  const handleGoback = useCallback(() => {
    navigate('Landing');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoback}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>

        <Image source={logo} resizeMode="contain" />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        { icon && icon }
      </View>

      {children}
    </View>
  );
}

export default PageHeader;