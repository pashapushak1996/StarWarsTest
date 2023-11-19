import * as React from 'react';
import {Card, Text} from 'react-native-paper';

interface FansCardProps {
  count: number;
  type: 'Female' | 'Male' | 'Others';
}

const FansCard: React.FC<FansCardProps> = ({type, count}) => {
  const subtitleText = type !== 'Others' ? `${type} Fans` : type;
  return (
    <Card style={{flex: 1}}>
      <Card.Content>
        <Text variant="headlineLarge">{count}</Text>
        <Text variant="bodyMedium">{subtitleText}</Text>
      </Card.Content>
    </Card>
  );
};
export default FansCard;
