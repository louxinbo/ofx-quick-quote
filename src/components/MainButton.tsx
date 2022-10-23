/* eslint-disable react-perf/jsx-no-new-array-as-prop */
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';

type Props = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  // testID?: string | undefined;
};

export function MainButton({ text, onPress, disabled, style }: Props) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#337baf',
    marginVertical: 20,
    borderRadius: 50,
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
});
