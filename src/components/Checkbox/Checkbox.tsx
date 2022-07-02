import React, { useRef } from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import {styles} from './Checkbox.styles';
import {CheckboxProps} from './Checkbox.types';

export const Checkbox = ({checked, onPress}: CheckboxProps) => {
  const checkboxScale = useRef(new Animated.Value(0));

  const handlePress = () => {
    Animated.spring(checkboxScale.current, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      checkboxScale.current.setValue(0);
      onPress();
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View
        style={[
          styles.box,
          checked && styles.filled,
          {
            transform: [
              {
                scale: checkboxScale.current.interpolate({
                  inputRange: [0, 0.7, 1],
                  outputRange: [1, 1.3, 1],
                }),
              },
            ],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

