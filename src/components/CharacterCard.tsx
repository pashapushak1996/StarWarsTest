import React from 'react';
import {Avatar, Card, Paragraph, Title} from 'react-native-paper';
import {View} from 'react-native';

import {CharacterModel} from '../models/character.model';
import {generateImageUri} from '../utils/characters.util';

interface CharacterCardProps {
  character: CharacterModel | null;
}

const LeftContent = ({gender, size}: {gender: string; size: number}) => {
  const humanGenders = ['male', 'female'];
  return (
    <Avatar.Icon
      size={size}
      icon={!humanGenders.includes(gender) ? 'atom' : `human-${gender}`}
    />
  );
};

export const CharacterCard: React.FC<CharacterCardProps> = ({character}) => {
  if (!character) {
    return null;
  }

  const {name, gender, films, hair_color, eye_color, height, mass} = character;

  const characterImageUri = generateImageUri(character.id);

  return (
    <Card>
      <Card.Title
        titleVariant={'headlineMedium'}
        subtitleVariant={'bodyLarge'}
        title={name}
        subtitle={gender}
        left={() => <LeftContent gender={gender} size={50} />}
      />
      <View style={{alignItems: 'center'}}>
        <Card.Cover
          style={{
            aspectRatio: 3 / 4,
          }}
          source={{
            uri: characterImageUri,
          }}
        />
      </View>
      <Card.Content>
        <Title>Hair Color:</Title>
        <Paragraph>{hair_color}</Paragraph>

        <Title>Eye Color:</Title>
        <Paragraph>{eye_color}</Paragraph>

        <Title>Height:</Title>
        <Paragraph>{height} cm</Paragraph>

        <Title>Mass:</Title>
        <Paragraph>{mass} kg</Paragraph>

        <Title>Films:</Title>
        <Paragraph>{films.length} films</Paragraph>
      </Card.Content>
    </Card>
  );
};
