/**
 * @format
 */

import React from 'react';
import TodoList from './src/screens/TodoList/TodoList';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const App = () => {
  console.log('Flipper is available soon');

  return (
    <View>
      <StatusBar />
      <TodoList />
    </View>
  );
};

export default App;
