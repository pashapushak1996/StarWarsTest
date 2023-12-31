import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen, CharacterDetailScreen} from '../screens';
import {RootNavigatorParamsList} from './navigation.types';

const Stack = createNativeStackNavigator<RootNavigatorParamsList>();

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name={'Home'}
          component={HomeScreen}
        />
        <Stack.Screen
          options={{headerShown: true, title: 'Character Detail'}}
          name={'CharacterDetails'}
          component={CharacterDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
