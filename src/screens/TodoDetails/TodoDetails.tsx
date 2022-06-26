import React from 'react';
import { Text } from 'react-native';
import { TodoDetailsProps } from './TodoDetails.types';

export const TodoDetails = ({route}: TodoDetailsProps) => {
  return (
    <Text>Hello, {route.params.todoId} </Text>
  );
};