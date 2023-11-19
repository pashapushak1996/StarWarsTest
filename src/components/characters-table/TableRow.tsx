import {
  ActivityIndicator,
  DataTable,
  Divider,
  IconButton,
} from 'react-native-paper';

import React, {useEffect, useState} from 'react';
import {Character} from '../../models/Character';
import {StyleSheet} from 'react-native';
import {swapiService} from '../../services/swapi.service';

interface TableRowProps {
  isFavorite: boolean;
  character: Character;
  onPressFavorite: (id: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  isFavorite,
  character,
  onPressFavorite,
}) => {
  const [homeworld, setHomeworld] = useState('');
  const [specie, setSpecie] = useState<string | null>(null);
  const loadAdditionalProperties = async (character: Character) => {
    const {data: homeworld} = await swapiService.getPlanetById(
      character.homeworld,
    );

    setHomeworld(homeworld.name);

    const {data: specie} = character.species.length
      ? await swapiService.getSpeciesById(character.species[0])
      : {data: null};

    if (specie) {
      setSpecie(specie.name);
    } else {
      setSpecie('');
    }
  };

  useEffect(() => {
    loadAdditionalProperties(character);
  }, [character]);

  return (
    <>
      <DataTable.Row>
        <DataTable.Cell>
          <IconButton
            onPress={() => {
              onPressFavorite(character.id);
            }}
            icon={isFavorite ? 'heart' : 'heart-outline'}
            size={15}
            iconColor={'red'}
          />
        </DataTable.Cell>
        <DataTable.Cell style={{flex: 2}} textStyle={styles.tableBodyText}>
          {character.name}
        </DataTable.Cell>
        <DataTable.Cell textStyle={styles.tableBodyText}>
          {character.birth_year}
        </DataTable.Cell>
        <DataTable.Cell textStyle={styles.tableBodyText}>
          {character.gender}
        </DataTable.Cell>
        <DataTable.Cell textStyle={styles.tableBodyText}>
          {homeworld || <ActivityIndicator size="small" />}
        </DataTable.Cell>
        <DataTable.Cell textStyle={styles.tableBodyText}>
          {specie ?? <ActivityIndicator size="small" />}
        </DataTable.Cell>
      </DataTable.Row>
      <Divider />
    </>
  );
};

export default TableRow;

const styles = StyleSheet.create({
  tableBodyText: {fontSize: 12},
});