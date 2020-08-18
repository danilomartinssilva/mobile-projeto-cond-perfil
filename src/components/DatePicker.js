import React, {useMemo, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format, parse} from 'date-fns';
import locale from 'date-fns/locale/pt';
import {
  Platform,
  TextInput as TextInputNative,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import DatePickerIOS from './DatePickerIOS';
import InputForm from './InputForm';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const formatDate = (date, pattern = 'dd/MM/yyyy') => {
  return date ? String(format(date, pattern, {locale})) : date;
};

export const parseDate = (date, pattern = 'dd/MM/yyyy') => {
  return date ? parse(date, pattern, new Date()) : new Date();
};

const DatePicker = (props) => {
  const [visible, setVisible] = useState(false);
  const {onChangeText, value, enabled, change} = props;

  const isAndroid = Platform.OS === 'android';
  const isIOS = Platform.OS === 'ios';

  const memorized = useMemo(() => value, [visible]);

  const onChangeDate = (_event, date) => {
    isAndroid ? setVisible(false) : false;
    date ? onChangeText(date) : false;
  };

  const onCancel = () => {
    value ? onChangeText(parseDate(memorized)) : false;
  };

  const onOk = () => {
    value ? false : onChangeText(parseDate(value));
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <View>
          <InputForm
            {...props}
            editable={false}
            disabled={!enabled}
            value={value}
            pointEvents={'none'}
          />
        </View>
      </TouchableWithoutFeedback>

      {isAndroid && visible && change && (
        <DateTimePicker
          {...props}
          onChange={onChangeDate}
          value={parseDate(value)}
        />
      )}

      {isIOS && visible && change && (
        <DatePickerIOS
          {...props}
          onCancel={onCancel}
          onOk={onOk}
          onDismiss={setVisible}
          visible={visible}>
          <DateTimePicker
            style={{backgroundColor: 'white'}}
            onChange={onChangeDate}
            value={parseDate(value)}
          />
        </DatePickerIOS>
      )}
    </>
  );
};

DatePicker.defaultProps = {
  enabled: true,
};

export default DatePicker;
