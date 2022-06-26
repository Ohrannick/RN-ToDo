import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParams = {
  TodoList: undefined;
  TodoDetails: {
    todoId: number;
  };
};

export type TodoListNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  'TodoList'
>

export type TodoDetailsRouteProp = RouteProp<RootStackParams, 'TodoDetails'>