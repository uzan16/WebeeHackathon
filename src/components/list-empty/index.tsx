import React from 'react';
import {Text, View} from 'react-native';
import style from './index.style';

interface Props {
  text: string;
}

const ListEmpty = ({text}: Props) => {
  return (
    <View style={style.wrapper}>
      <Text style={style.text}>{text}</Text>
    </View>
  );
};

export default ListEmpty;
