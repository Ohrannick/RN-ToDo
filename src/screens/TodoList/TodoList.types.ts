import {Asset} from 'react-native-image-picker';

import {TodoListNavigationProp} from '../../navigation/Navigation.types';

export type Todo = {
  completed: boolean;
  id: number;
  title: string;
  userId?: number;
  imgs: Asset[];
  notificationIsOn?: boolean;
};

export type TodoListProps = {
  navigation: TodoListNavigationProp;
};