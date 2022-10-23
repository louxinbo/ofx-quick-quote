/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-perf/jsx-no-new-array-as-prop */
import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Platform,
  KeyboardTypeOptions,
} from 'react-native';
import { useIsLandscape } from '../hooks';
import { DropdownDataKeyType, DropdownDataType } from '../utils';
import { DropdownMenu } from './DropdownMenu';

type Props =
  | {
      type: 'text';
      label: string;
      value: string;
      placeholder?: string;
      isRequired?: boolean;
      isFullLenth?: boolean;
      onChangeText: (value: string) => void;
      dropdownData?: DropdownDataKeyType;
      width?: string;
      keyboardType: KeyboardTypeOptions;
      zIndex?: number;
    }
  | {
      type: 'dropdown';
      label: string;
      value: DropdownDataType;
      isRequired?: boolean;
      isFullLenth?: boolean;
      onSelect: (selectedItem: DropdownDataType) => void;
      dropdownData: DropdownDataKeyType;
      width?: string;
      zIndex?: number;
    };

export function FormInput(props: Props) {
  const IsLandscape = useIsLandscape();
  const isDropdown = props.type === 'dropdown';

  return (
    <View
      style={[
        styles.container,
        {
          width:
            props.width || (!IsLandscape || props.isFullLenth ? '100%' : '50%'),
        },
        Platform.OS !== 'android' && props.zIndex
          ? { zIndex: props.zIndex }
          : null,
      ]}
    >
      <Text style={styles.labelText}>
        {props.label}
        {props.isRequired && <Text style={styles.asteriskText}> *</Text>}
      </Text>
      {isDropdown ? (
        <DropdownMenu
          data={props.dropdownData}
          onSelect={props.onSelect}
          zIndex={props.zIndex}
          value={props.value}
        />
      ) : (
        <TextInput
          value={props.value}
          style={styles.input}
          multiline={false}
          numberOfLines={1}
          placeholder={props.placeholder}
          placeholderTextColor="#f2f2f2"
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  input: {
    paddingHorizontal: 10,
    height: 60,
    justifyContent: 'center',
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#f4f4f4',
  },
  labelText: {
    fontSize: 16,
  },
  asteriskText: {
    fontSize: 16,
    color: 'red',
  },
});
