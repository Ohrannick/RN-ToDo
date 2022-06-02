import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { TodoItem } from './TodoList.types';
import { TODOS_URL } from '../../utils/constants';

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([])
  console.log(todos)

  useEffect(() => {
    fetch(TODOS_URL)
    .then(res => res.json())
    .then(result => {
      console.log(result)
      setTodos(result.slice(0,20))
    })
    .catch(err => console.warn(err))
  }, [])

  return (
    <ScrollView>
      {todos.map((todo, i) => (
        <Text key={todo.id}>
          {i+1}: {todo.title}
        </Text>
      ))}
    </ScrollView>
  );
};

export default TodoList;