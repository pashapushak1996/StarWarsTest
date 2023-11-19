import * as React from 'react';
import {
  ActivityIndicator,
  DataTable,
  IconButton,
  Searchbar,
  Text,
} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {useEffect, useMemo, useState} from 'react';
import debounce from 'lodash/debounce';
import {useNavigation} from '@react-navigation/native';

import {CharacterModel} from '../../models/character.model';
import TableRow from './TableRow';
import {useAppDispatch, useAppSelector} from '../../hooks/redux.hook';

import {addFun} from '../../redux/fans';
import {fetchAllPeoples, getCharactersState} from '../../redux/characters';
import {setCurrentPage} from '../../redux/characters/characters.slice';

interface CharactersTableProps {
  fans: CharacterModel[];
}

export const CharactersTable: React.FC<CharactersTableProps> = ({fans}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  const {loading, characters, totalCount, page} =
    useAppSelector(getCharactersState);

  const [searchValue, setSearchValue] = useState('');

  const handleClickCharacter = (characterId: string) => {
    navigation.navigate('CharacterDetails' as never, {characterId} as never);
  };

  const isFanCharacter = (id: string) => {
    return fans.some(el => el.id === id);
  };

  const itemsPerPage = 10;

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, totalCount!);

  const handlePressFavorite = (id: string) => {
    const fun = characters.find(character => character.id === id);

    dispatch(addFun(fun));
  };

  const debouncedFetchAllPeoples = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(fetchAllPeoples({page: page + 1, searchValue: value}));
      }, 700),
    [dispatch],
  );

  useEffect(() => {
    debouncedFetchAllPeoples(searchValue);
  }, [searchValue]);

  useEffect(() => {
    dispatch(fetchAllPeoples({page: page + 1, searchValue: searchValue}));
  }, [page]);

  useEffect(() => {
    dispatch(setCurrentPage(0));
  }, [totalCount]);

  const sortedCharacters = sortOrder
    ? [...characters].sort((a, b) => {
        if (a.name < b.name) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (a.name > b.name) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      })
    : [...characters];

  const handleClickSort = () => {
    setSortOrder(prevState =>
      prevState === undefined || prevState === 'desc' ? 'asc' : 'desc',
    );
  };

  const getSortIcon = (sortingOrder: string | null) => {
    switch (sortingOrder) {
      case 'asc':
        return 'arrow-up-left-bold';
      case 'desc':
        return 'arrow-down-left-bold';
      default:
        return 'arrow-collapse';
    }
  };

  return (
    <DataTable>
      <Searchbar
        value={searchValue}
        onChangeText={setSearchValue}
        placeholder={'Search'}
        style={{marginTop: 10}}
      />
      <DataTable.Header>
        <DataTable.Title>
          <IconButton icon={'heart'} size={15} />
        </DataTable.Title>
        <DataTable.Title>
          <IconButton
            onPress={handleClickSort}
            icon={getSortIcon(sortOrder)}
            size={15}
          />
        </DataTable.Title>
        <DataTable.Title
          onPress={handleClickSort}
          style={{flex: 2}}
          textStyle={styles.tableHeaderTitle}>
          <Text>Name</Text>
        </DataTable.Title>
        <DataTable.Title textStyle={styles.tableHeaderTitle}>
          Birth
        </DataTable.Title>
        <DataTable.Title textStyle={styles.tableHeaderTitle}>
          Gender
        </DataTable.Title>
        <DataTable.Title textStyle={styles.tableHeaderTitle}>
          Home
        </DataTable.Title>
        <DataTable.Title textStyle={styles.tableHeaderTitle}>
          Species
        </DataTable.Title>
      </DataTable.Header>
      {loading ? (
        <ActivityIndicator style={{marginTop: 10}} size={'small'} />
      ) : sortedCharacters.length ? (
        <>
          {sortedCharacters.map(character => (
            <TableRow
              onPressCharacter={handleClickCharacter}
              isFavorite={isFanCharacter(character.id)}
              key={character.id}
              onPressFavorite={handlePressFavorite}
              character={character}
            />
          ))}
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(totalCount! / itemsPerPage)}
            onPageChange={page => {
              dispatch(setCurrentPage(page));
            }}
            label={`${from + 1}-${to} of ${totalCount}`}
            numberOfItemsPerPage={itemsPerPage}
            showFastPaginationControls
          />
        </>
      ) : (
        <Text style={{marginTop: 10}} variant="titleLarge">
          There aren't any results for you
        </Text>
      )}
    </DataTable>
  );
};

const styles = StyleSheet.create({
  loaderWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tableHeaderTitle: {fontSize: 10, marginRight: 5},
});
