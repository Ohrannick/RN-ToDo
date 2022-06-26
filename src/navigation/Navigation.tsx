import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParams} from './Navigation.types';
import { TodoList } from '../screens/TodoList/TodoList';
import { TodoDetails } from '../screens/TodoDetails/TodoDetails';


const RootStack = createNativeStackNavigator<RootStackParams>();

export const Navigation = () => (
  <NavigationContainer>
    <RootStack.Navigator initialRouteName="TodoList">
      <RootStack.Screen name="TodoList" component={TodoList} />
      <RootStack.Screen name="TodoDetails" component={TodoDetails} />
    </RootStack.Navigator>
  </NavigationContainer>
);