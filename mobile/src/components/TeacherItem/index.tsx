import React, { useCallback, useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { styles } from './styles';
import { RectButton } from 'react-native-gesture-handler';

import heartIcon from '../../assets/images/icons/heart-outline.png';
import unFavorite from '../../assets/images/icons/unfavorite.png';
import wpp from '../../assets/images/icons/whatsapp.png';

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
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  const handleToWhatsapp = useCallback(() => {
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
  }, []);

  const handleToggleFavorite = useCallback(async () => {
    const favorites = await AsyncStorage.getItem('favorites');

      let favoritesArray = [];

      if(favorites) {
        favoritesArray = JSON.parse(favorites);
      }

    if(isFavorited) {
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
        return teacherItem.id === teacher.id
      });
      favoritesArray.splice(favoriteIndex, 1);
      setIsFavorited(false);
    } else {    
      favoritesArray.push(teacher);
      setIsFavorited(true);
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image 
          style={styles.avatar}
          source={{ uri: teacher.avatar }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/Hora {'   '}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton 
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton, 
              isFavorited ? styles.favorited : {}
            ]}
          >                    
            {isFavorited ? <Image source={unFavorite} /> : <Image source={heartIcon} /> }            
          </RectButton>

          <RectButton style={styles.contactButton} onPress={handleToWhatsapp}>
            <Image source={wpp} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;