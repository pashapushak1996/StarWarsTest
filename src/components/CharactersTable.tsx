import * as React from 'react';
import {
  ActivityIndicator,
  DataTable,
  IconButton,
  Searchbar,
} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {Character} from '../models/Character';
import TableRow from './characters-table/TableRow';
import {useAppDispatch, useAppSelector} from '../hooks/redux.hook';
import {addFun} from '../redux/fans';
import {fetchAllPeoples, getCharactersState} from '../redux/characters';
import { useEffect, useMemo, useState} from 'react';
import debounce from 'lodash/debounce';

interface CharactersTableProps {
  fans: Character[];
}

const CharactersTable: React.FC<CharactersTableProps> = ({fans}) => {
  const {loading, characters, totalCount} = useAppSelector(getCharactersState);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState<number>(0);
  const [localLoading, setLocalLoading] = useState(true);

  const isFanCharacter = (id: string) => {
    return fans.some(el => el.id === id);
  };

  const itemsPerPage = 10;

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, totalCount!);

  const handlePressFavorite = (id: string) => {
    const character = characters.find(character => character.id === id);

    dispatch(addFun(character));
  };

  const debouncedFetchAllPeoples = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(fetchAllPeoples({page: page + 1, searchValue: value}));
        setLocalLoading(false);
      }, 700),
    [dispatch, page],
  );

  useEffect(() => {
    setPage(0);
  }, [totalCount]);

  useEffect(() => {
    debouncedFetchAllPeoples(searchValue);
  }, [debouncedFetchAllPeoples, searchValue]);

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
        <DataTable.Title
          sortDirection="ascending"
          style={{flex: 2}}
          textStyle={styles.tableHeaderTitle}>
          Name
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
      {loading || localLoading ? (
        <ActivityIndicator size={'small'} />
      ) : (
        <>
          {characters.map(character => (
            <TableRow
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
              setPage(page);
              setLocalLoading(true);
            }}
            label={`${from + 1}-${to} of ${totalCount}`}
            numberOfItemsPerPage={itemsPerPage}
            showFastPaginationControls
          />
        </>
      )}
    </DataTable>
  );
};

export default CharactersTable;

const styles = StyleSheet.create({
  loaderWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tableHeaderTitle: {fontSize: 10, marginRight: 5},
});
