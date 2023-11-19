import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Text, useTheme} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';

import FansCard from '../components/FansCard';
import {CharactersTable} from '../components/characters-table';

import {useAppDispatch, useAppSelector} from '../hooks/redux.hook';

import {getFansState} from '../redux/fans/fans.selector';
import {clearFans} from '../redux/fans';

import {getCharactersByGender} from '../utils/characters.util';

export const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const {fans} = useAppSelector(getFansState);
  const maleCharacters = getCharactersByGender('male', fans);
  const femaleCharacters = getCharactersByGender('female', fans);
  const othersCharacters = getCharactersByGender('others', fans);

  const handleClearFans = () => {
    dispatch(clearFans());
  };

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
