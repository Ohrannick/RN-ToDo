/**
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';

import {persistor, store} from './src/store';
import {Navigation} from './src/navigation/Navigation';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* <SafeAreaView style={backgroundStyle}> */}
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Navigation />
        {/* </SafeAreaView> */}
      </PersistGate>
    </Provider>
  );
};

export default App;