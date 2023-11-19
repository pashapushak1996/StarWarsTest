/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';

import {persistor, store} from './redux/store';
import {MainNavigator} from './navigation/main.navigator';
import theme from './themes/theme';
import {PersistGate} from 'redux-persist/integration/react';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <MainNavigator />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
