import React, { ReactNode } from 'react';
import {Text, View} from 'react-native';
import style from './index.style';

interface Props {
  text: string;
  children?: ReactNode;
}

const SectionTitle = ({text, children}: Props) => {
  return (
    <>
      <View style={style.wrapper}>
        <Text style={style.title}>
          {text}
        </Text>
        {children !== undefined && children}
      </View>
      <View style={style.line} />
    </>
  );
};

export default SectionTitle;
