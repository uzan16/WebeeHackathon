import React from 'react';
import {TouchableOpacity, Modal, TouchableWithoutFeedback, SafeAreaView, View, StyleProp, ViewStyle} from 'react-native';
import DP from 'react-native-modern-datepicker';
import { TextInput } from 'react-native-paper';
import dayjs from 'dayjs';
import style from './index.style';

interface Props {
  value: Date;
  label: string;
  onSelectedChange: (date: Date) => void;
  style?: StyleProp<ViewStyle>;
}

const DatePicker = ({
  value,
  label,
  onSelectedChange,
  style: styleCustom
}: Props) => {
  const [chooserVisible, setChooserVisible] = React.useState(false);
  
  const handdleChange = (dateStr: string) => {
    onSelectedChange(dayjs(dateStr, 'YYYY/MM/DD').toDate());
    setChooserVisible(false);
  }
  return (
    <>
      <View
        style={style.wrapper}
      >
        <TextInput
          style={styleCustom}
          label={label}
          mode='outlined'
          value={value ? dayjs(value).format('MM/DD/YYYY') : value}
          editable={false}
        />
        <TouchableOpacity
          style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}
          activeOpacity={0.7}
          onPress={() => setChooserVisible(true)}
        ></TouchableOpacity>
      </View>
      <Modal
        visible={chooserVisible}
        animationType={'fade'}
        hardwareAccelerated={true}
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => {
          setChooserVisible(false);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setChooserVisible(false)}>
          <SafeAreaView
            style={[
              style.modalWrapper
            ]}
          >
            <View
              style={[
                style.modalContainer
              ]}
            >
              <DP
                mode="calendar"
                onSelectedChange={handdleChange}
              />
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default DatePicker;
