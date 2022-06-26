import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { styles } from './TextField.styles';
import { TextFieldProps } from './TextField.types';

const TextField = ({onSubmit}: TextFieldProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value) {
      onSubmit(value);
      setValue('');
    }
  }

  return (
    <TextInput 
      placeholder="Введите заголовок задачи"
      style={styles.root} 
      value={value} 
      onChangeText={setValue}
      onSubmitEditing={handleSubmit}
    />
  );
};

export default TextField;