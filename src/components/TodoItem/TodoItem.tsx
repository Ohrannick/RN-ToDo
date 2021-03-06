import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons'

import {Checkbox} from '../Checkbox/Checkbox';
import {styles} from './TodoItem.styles';
import {TodoItemProps} from './TodoItem.types';

export const TodoItem = ({i, todo, onComplete, onDelete, onPress}: TodoItemProps) => {
  const handlePress = () => {
    onPress(todo.id);
  };

  const handleComplete = () => {
    onComplete(todo.id);
  };

  const handleDeletePress = () => {
    onDelete(todo.id)
  }
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={handlePress} style={styles.root}>
        <Checkbox checked={todo.completed} onPress={handleComplete}/>
        <Text style={[styles.todoText, todo.completed &&styles.completed]}>
          {i + 1}: {todo.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeletePress}>
        <Icon name='trash' size={30} color='#900' />
      </TouchableOpacity>
    </View>
  );
};
