import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { dySize } from '../utils/responsive';

interface ButtonProps {
  title: string;
  btnColor?: string;
  height?: number;
  width?: number;
  textStyle?: any;
  onPress: any;
}

const Button: React.FC<ButtonProps> = ({
  title,
  btnColor = 'purple',
  width = dySize(345),
  height = dySize(40),
  textStyle = {},
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: btnColor,
        height,
        width,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
      }}
    >
      <Text style={[styles.button, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    color: 'white',
    fontSize: dySize(16),
  },
});

export default Button;
