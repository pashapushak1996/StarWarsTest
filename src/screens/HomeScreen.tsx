import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect} from 'react';
import {Button, Searchbar, Text, useTheme} from 'react-native-paper';
import {fetchAllPeoples, getCharactersState} from '../redux/characters';
import {useAppDispatch, useAppSelector} from '../hooks/redux.hook';
import FansCard from '../components/FansCard';
import {ScrollView, StyleSheet, View} from 'react-native';
import CharactersTable from '../components/CharactersTable';
import {getFansState} from '../redux/fans/fans.selector';
import {getCharactersByGender} from '../utils/characters.util';
import {clearFans} from '../redux/fans';

export const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const {fans} = useAppSelector(getFansState);
  const maleCharacters = getCharactersByGender('male', fans);
  const femaleCharacters = getCharactersByGender('female', fans);
  const othersCharacters = getCharactersByGender('others', fans);

  const handleClearFans = () => {
    dispatch(clearFans());
  };

  const {colors} = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text variant="headlineLarge">Fans</Text>
          <Button
            mode="outlined"
            onPress={handleClearFans}
            textColor={colors.error}
            style={{borderColor: colors.error}}
            uppercase>
            Clear fans
          </Button>
        </View>
        <View style={styles.fansContainer}>
          <FansCard count={femaleCharacters.length} type={'Female'} />
          <FansCard count={maleCharacters.length} type={'Male'} />
          <FansCard count={othersCharacters.length} type={'Others'} />
        </View>
        <CharactersTable fans={fans} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {paddingHorizontal: 10, flex: 1},
  fansContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
});
