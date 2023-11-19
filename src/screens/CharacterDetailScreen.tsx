import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import {CharacterCard} from '../components';
import {getCharacterById} from '../redux/characters';
import {RootNavigatorParamsList} from '../navigation/navigation.types';
import {swapiService} from '../services/swapi.service';

type CharacterDetailScreenProps = NativeStackScreenProps<
  RootNavigatorParamsList,
  'CharacterDetails'
>;

export const CharacterDetailScreen: React.FC<CharacterDetailScreenProps> = ({
  route,
}) => {
  const {characterId} = route.params;
  const character = useSelector(getCharacterById(characterId));
  const [localCharacter, setLocalCharacter] = useState(null);

  useEffect(() => {
    if (!character) {
      swapiService.getCharacterById(characterId).then(res => {
        setLocalCharacter(res.data);
      });
    }
  }, [character, characterId]);

  return (
    <SafeAreaView style={styles.container}>
      <CharacterCard character={character || localCharacter} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {paddingHorizontal: 10, flex: 1},
});
