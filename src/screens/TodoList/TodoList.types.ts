import { TodoListNavigationProp } from '../../navigation/Navigation.types';

export type Todo = {
  completed: boolean;
  id: number;
  title: string;
  userId?: number;
};

export type TodoListProp = {
  navigation: TodoListNavigationProp;
}