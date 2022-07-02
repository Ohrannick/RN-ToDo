import React from 'react';
import {Alert, Button, Dimensions, Image, View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeTodo } from '../../store/actions';
import { selectTodoById } from '../../store/selectors';

import {ImgFullProps} from './ImgFull.types';

const {width, height} = Dimensions.get('window');

export const ImgFull = ({route, navigation}: ImgFullProps) => {

  const dispatch = useDispatch();

  const todo = useSelector(selectTodoById(route.params.todoId));

  const handleConfirm = () => {
    const newTodo = {
      ...todo,
      imgs: todo.imgs.filter(({uri}) => uri !== route.params.uri),
    };
    dispatch(changeTodo(newTodo));
    navigation.pop()
  }

  const handlePress = () => {
    Alert.alert('Delete image?', undefined, [
      {
        text: 'Delete',
        onPress: handleConfirm,
      },
      {
        text: 'Cancel',
      },
    ]);
  };

  return (
    <View style={{flex: 1}}>
      <Image
        source={{uri: route.params.uri}}
        resizeMode="contain"
        style={{width: width * 0.9, height: height * 0.6}}
      />
      <Button title='Delete image' onPress={handlePress} />
    </View>
  );
};