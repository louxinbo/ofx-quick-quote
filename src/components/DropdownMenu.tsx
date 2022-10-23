/* eslint-disable import/no-extraneous-dependencies */
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { useToggle } from '../hooks/useToggle';
import {
  CountryCodeType,
  CurrencyCodeType,
  DropdownDataKeyType,
  DropdownDataMap,
  DropdownDataType,
} from '../utils';

type Props = {
  value: DropdownDataType;
  onSelect: (selectedItem: DropdownDataType) => void;
  data: DropdownDataKeyType | undefined;
  zIndex?: number;
};

export function DropdownMenu({ data, onSelect, zIndex, value }: Props) {
  const [open, toggleOpen] = useToggle(false);

  return (
    <View>
      <TouchableOpacity onPress={toggleOpen} style={styles.dropdownInput}>
        <Text>
          {data === 'countryCode'
            ? (value as CountryCodeType).dial_code
            : `${(value as CurrencyCodeType).CurrencyName} (${
                (value as CurrencyCodeType).CurrencyCode
              })`}
        </Text>
        <Entypo name="chevron-down" size={24} color="#337baf" />
      </TouchableOpacity>
      {open && (
        <View
          // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
          style={[
            styles.container,
            Platform.OS === 'android' && zIndex ? { zIndex } : null,
          ]}
        >
          <ScrollView nestedScrollEnabled>
            {data &&
              DropdownDataMap[data].map((item) => {
                const text =
                  data === 'countryCode'
                    ? (item as CountryCodeType).dial_code
                    : `${(item as CurrencyCodeType).CurrencyName} (${
                        (item as CurrencyCodeType).CurrencyCode
                      })`;
                const key =
                  data === 'countryCode'
                    ? `${(item as CountryCodeType).dial_code} ${
                        (item as CountryCodeType).name
                      } `
                    : `${(item as CurrencyCodeType).CurrencyName} (${
                        (item as CurrencyCodeType).CurrencyCode
                      })`;
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => {
                      onSelect(item);
                      toggleOpen();
                    }}
                    style={styles.dropdownInput}
                  >
                    <Text>{text}</Text>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    backgroundColor: '#fff',
  },
  dropdownInput: {
    width: '100%',
    paddingHorizontal: 10,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#f4f4f4',
    backgroundColor: '#fff',
  },
});
