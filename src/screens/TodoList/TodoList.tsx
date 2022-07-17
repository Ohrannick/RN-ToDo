import React, {useEffect, useMemo} from 'react';
import {Button, ListRenderItemInfo, SectionList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TextField} from '../../components/TextField/TextField';
import notifee, {AndroidImportance, EventType, TimestampTrigger, TriggerType} from '@notifee/react-native';

import {TodoItem} from '../../components/TodoItem/TodoItem';
import {changeTodo, deleteTodo, getTodos} from '../../store/actions';
import {selectTodos} from '../../store/selectors';
import {styles} from './TodoList.styles';
import {Todo, TodoListProps} from './TodoList.types';

export const TodoList = ({navigation}: TodoListProps) => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  const handlePressTodo = (id: number) => {
    const updatedTodo = {...todos[id], completed: !todos[id].completed};
    dispatch(changeTodo(updatedTodo));
  };

  const handleAddTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      completed: false,
      title: text,
      imgs: [],
    };

    dispatch(changeTodo(newTodo));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const toDetails = (id: number) => {
    navigation.navigate('TodoDetails', {todoId: id});
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(getTodos());
  }, [dispatch]);

  const renderTodo = ({item, index}: ListRenderItemInfo<Todo>) => (
    <TodoItem
      todo={item}
      i={index}
      onPress={toDetails}
      onComplete={handlePressTodo}
      onDelete={handleDeleteTodo}
      key={item.id}
    />
  );

  const sections = useMemo(() => {
    return Object.values(todos).reduce<{completed: Todo[]; notCompl: Todo[]}>(
      (acc, el) => {
        if (el.completed) {
          acc.completed.push(el);
        } else {
          acc.notCompl.push(el);
        }
        return acc;
      },
      {completed: [], notCompl: []},
    );
  }, [todos]);

  const sendPush = async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default',
      importance: AndroidImportance.HIGH,
    })

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + 3000,
    };

    await notifee.createTriggerNotification({
      title: 'My Notification',
      body: 'Body of my Notification',
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        }
      },
      data: {
        id: '1',
      }
    }, 
    trigger
    );
  }

  const isAppOpenedByNotifee = async () => {
    const initNotifee = await notifee.getInitialNotification()
    if(initNotifee) {
      const id = initNotifee.notification.data?.id;
      navigation.navigate('TodoDetails', {
        todoId: +(id as string),
      })
    }
    await notifee.cancelNotification(initNotifee?.notification.id as string);
    console.log(initNotifee);
  }

  useEffect(() => {
    isAppOpenedByNotifee();
  }, [])

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification);
        break;
      case EventType.PRESS:
        console.log('User pressed notification', detail.notification);
        break;
      }
    });
  }, []);

  return (
    <>
      <Button title='Send push notification' onPress={sendPush} />
      <SectionList
        contentContainerStyle={styles.container}
        style={styles.root}
        ListHeaderComponent={() => <TextField onSubmit={handleAddTodo} />}
        sections={[
          {title: 'Completed', data: sections.completed},
          {title: 'Not Completed', data: sections.notCompl},
        ]}
        renderSectionHeader={({section}) => <Text>{section.title}</Text>}
        renderItem={renderTodo}
      />
    </>
  );
};