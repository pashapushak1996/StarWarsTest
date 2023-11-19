import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CharacterCard} from '../components/CharacterCard';
import {useSelector} from 'react-redux';
import {getCharacterById} from '../redux/characters';
import {swapiService} from '../services/swapi.service';

export const CharacterDetailScreen = ({route}) => {
  const {characterId} = route.params;
  const character = useSelector(getCharacterById(characterId));
  const [localCharacter, setLocalCharacter] = useState(null);

  useEffect(() => {
    if (!character) {
      swapiService.getCharacterById(characterId).then(res => {
        setLocalCharacter(res.data);
      });
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CharacterCard character={character || localCharacter} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {paddingHorizontal: 10, flex: 1},
});
