import {DefaultTheme} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4169E1',
    accent: '#f1c40f',
    error: '#ff2a24bf',
  },
};

export default theme;
