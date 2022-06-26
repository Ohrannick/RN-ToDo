import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row', 
    marginVertical: 10, 
    alignItems: 'center',
    width: '75%',
    paddingLeft: 20,
  },
  todoText: {
    fontSize: 17,
    marginLeft: 17,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'darkgreen'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});