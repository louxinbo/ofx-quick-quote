/* eslint-disable react-native/no-raw-text */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable func-names */
/* eslint-disable react/jsx-no-bind */
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  Text,
} from 'react-native';
import React, { useCallback, useState } from 'react';

import { FormInput, Header } from '../components';
import {
  CurrencyCodeType,
  DropdownConfig,
  DropdownDataMap,
  DropdownDataType,
  FORM_FIELDS,
  numberWithCommas,
  TextConfig,
} from '../utils';
import { MainButton } from '../components/MainButton';
import { getQuote } from '../utils/apis';
import { validators } from '../utils/validators';

type Quote = {
  CustomerRate: number;
  CustomerAmount: number;
};
const formFieldsKeys = Object.keys(FORM_FIELDS);
type State = Record<typeof formFieldsKeys[0], string | DropdownDataType>;
const InitialState: State = {};
formFieldsKeys.forEach((item) => {
  const {
    type,
    config: { dropdownData },
  } = FORM_FIELDS[item] as {
    type: 'text' | 'dropdown';
    config: TextConfig & DropdownConfig;
  };

  InitialState[item] = type === 'text' ? '' : DropdownDataMap[dropdownData][0];
});

// Modify the above imported FORM_FIELDS config, the UI will auto updated
export function QuickQuote() {
  // form Data state's shape: { formfield : value}
  const [formData, setFormdata] = useState(InitialState);

  // error arr from validation or ajax request
  const [errorArr, setErrArr] = useState<string[]>([]);
  const [quote, setQuote] = useState<null | Quote>(null);

  const onPressGetQuote = useCallback(async () => {
    const validationArr: string[] = [];
    formFieldsKeys.forEach((item) => {
      const { validation } = FORM_FIELDS[item].config as TextConfig;
      const value = formData[item] as string;
      if (validation) {
        const err = validators[validation](item, value);
        if (err) {
          validationArr.push(err);
        }
      }
    });
    validationArr.length > 0 && setErrArr(validationArr);
    if (validationArr.length > 0) {
      return;
    }
    const result = await getQuote(
      (formData.fromCurrency as CurrencyCodeType).CurrencyCode,
      (formData.toCurrency as CurrencyCodeType).CurrencyCode,
      formData.amount as string
    );
    if (result.ok) {
      const newQuote = await result.json();
      setQuote(newQuote);
    } else {
      const newErr = await result.json();
      setErrArr((errArr) => [...errArr, newErr.Message]);
    }
  }, [formData]);

  const restart = useCallback(() => {
    setFormdata(InitialState);
    setErrArr([]);
    setQuote(null);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.contentContainer2}>
          <Header title="Quick Quote" />
          {formFieldsKeys.map((item) => {
            const {
              type,
              config: {
                label,
                placeholder,
                isRequired,
                isFullLenth,
                dropdownData,
                keyboardType,
                width,
                zIndex,
              },
            } = FORM_FIELDS[item] as {
              type: 'text' | 'dropdown';
              config: TextConfig & DropdownConfig;
            };

            return (
              <FormInput
                key={item}
                value={formData[item]}
                type={type}
                label={label}
                placeholder={placeholder}
                isRequired={isRequired}
                isFullLenth={isFullLenth}
                dropdownData={dropdownData}
                width={width}
                keyboardType={keyboardType}
                zIndex={zIndex}
                onChangeText={(value: string) =>
                  setFormdata((state) => ({ ...state, [item]: value }))
                }
                onSelect={(value: DropdownDataType) =>
                  setFormdata((state) => ({ ...state, [item]: value }))
                }
              />
            );
          })}
          <View style={styles.buttonContainer}>
            <MainButton text="Get Quote" onPress={onPressGetQuote} />
          </View>
        </View>
      </ScrollView>
      <Modal
        transparent
        visible={errorArr.length > 0 || !!quote}
        onRequestClose={() => {}}
      >
        <View style={styles.ModalContainer}>
          <View style={styles.ModalDialog}>
            <Header
              title={
                errorArr.length > 0 ? 'Something wrong' : 'OFX Customer Rate'
              }
            />
            {errorArr.length > 0 ? (
              errorArr.map((err: string) => (
                <Text key={err} style={styles.modalErrText}>
                  {err}
                </Text>
              ))
            ) : (
              <>
                <Text style={styles.rateText}>{quote?.CustomerRate}</Text>
                <View>
                  <Text style={styles.modalLabelText}>From</Text>
                  <Text style={styles.modalCurrencyText}>
                    {`${
                      (formData.fromCurrency as CurrencyCodeType).CurrencyCode
                    } `}
                    <Text style={styles.modalAmountText}>
                      {formData.amount as string}
                    </Text>
                  </Text>
                </View>
                <View>
                  <Text style={styles.modalLabelText}>To</Text>
                  <Text style={styles.modalCurrencyText}>
                    {`${
                      (formData.toCurrency as CurrencyCodeType).CurrencyCode
                    } `}
                    <Text style={styles.modalAmountText}>
                      {numberWithCommas(quote?.CustomerAmount.toFixed(2))}
                    </Text>
                  </Text>
                </View>
              </>
            )}
            <MainButton text="Start New Quote" onPress={restart} />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 30 },
  contentContainer: {
    flexGrow: 1,
  },
  contentContainer2: {
    flex: 1,
    maxWidth: 800,
    alignSelf: 'center',
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  ModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalDialog: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 10,
    width: '90%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalErrText: {
    fontSize: 16,
    color: 'red',
  },
  rateText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#56aa90',
    marginBottom: 20,
  },
  modalLabelText: {
    fontSize: 22,
  },
  modalCurrencyText: {
    fontSize: 28,
  },
  modalAmountText: { color: '#337baf' },
});
