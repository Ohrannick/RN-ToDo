import React, {useEffect, useState} from 'react';
import {Button, ScrollView, Switch, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';

import {SaveButton} from '../../components/SaveButton/SaveButton';
import {TextField} from '../../components/TextField/TextField';
import {changeTodo} from '../../store/actions';
import {selectTodoById} from '../../store/selectors';
import {TodoDetailsProps} from './TodoDetails.types';
import {Gallery} from '../../components/Gallery/Gallery';
import notifee, { AndroidImportance, RepeatFrequency, TimestampTrigger, TriggerType } from '@notifee/react-native';

export const TodoDetails = ({route, navigation}: TodoDetailsProps) => {
  const dispatch = useDispatch();

  const todo = useSelector(selectTodoById(route.params.todoId));
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleSetPush = async () => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  const date = new Date();
  date.setHours(12);
  date.setMinutes(0);
  date.setSeconds(0);

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
    repeatFrequency: RepeatFrequency.DAILY, // repeat once a week
  };
  await notifee.createTriggerNotification(
    {
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        asForegroundService: true,
        pressAction: {
          id: 'default',
        },
      },
      data: {
        id: todo.id+'',
      },
    },
    trigger,
  );
};

  const handleCancelPush = async () => {
    await notifee.cancelTriggerNotification(todo.id+'');
  };
  const handleSwitch = async () => {
    if (todo.notificationIsOn) {
      await handleCancelPush();
    } else {
      await handleSetPush();
    }
    dispatch(changeTodo({...todo, notificationIsOn: !todo.notificationIsOn}));
  };

  useEffect(() => {
    navigation.setOptions({
      title: todo.title,
    });
  }, [navigation, todo]);

  const handleChangeTodo = () => {
    const newTodo = {
      ...todo,
      title: editedTitle,
    };

    dispatch(changeTodo(newTodo));
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SaveButton
          disabled={editedTitle === todo.title}
          onPress={handleChangeTodo}
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, todo.title, editedTitle]);

  const handlePress = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0,
      },
      ({assets}) => {
        if (assets) {
          const newTodo = {
            ...todo,
            imgs: [...todo.imgs, ...assets],
          };
          dispatch(changeTodo(newTodo));
        }
      },
    );
  };

  const handleImagePress = (imgUri?: string) => {
    navigation.navigate('ImgFull', {uri: imgUri || '', todoId: todo.id});
  };

  return (
    <ScrollView>
      <View>
        <Text>Notification</Text>
        <Switch value={todo.notificationIsOn} onChange={handleSwitch} />
      </View>
      <TextField onChangeText={setEditedTitle} initialValue={todo.title} />
      <Text style={{fontSize: 20}}>Hello, {todo.title}</Text>
      <Gallery onPress={handleImagePress} imgs={todo.imgs} />
      <Button onPress={handlePress} title="Select Image" />
    </ScrollView>
  );
};