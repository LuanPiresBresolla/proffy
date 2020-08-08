import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

const AppTabs: React.FC = () => {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        labelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 13,
          marginLeft: 16,
        },
        inactiveBackgroundColor: '#fafafc',
        activeBackgroundColor: '#ebebf5',
        inactiveTintColor: '#c1bccc',
        activeTintColor: '#32264d',
      }}
    >
      <Screen 
        options={{
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons name="ios-easel" color={focused ? '#8257e5' : color} size={size} />
            );
          }
        }} 
        name="TeacherList" 
        component={TeacherList} 
      />

      <Screen
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons name="ios-heart" color={focused ? '#8257e5' : color} size={size} />
            );
          }
        }} 
        name="Favorites" 
        component={Favorites} 
      />
    </Navigator>
  );
}

export default AppTabs;