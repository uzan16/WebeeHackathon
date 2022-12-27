import React from 'react';
import {Text, View} from 'react-native';
import { IMachine } from '../../interface';
import style from './index.style';

import { Card, TextInput, Button, Switch } from 'react-native-paper';

import { useDispatch } from 'react-redux';
import { edit, remove } from '../../store/actions/machineAction';
import { fieldTypes } from '../../data/constant';
import DatePicker from '../date-picker';
import { Helper } from '../../utils/helper';
import dayjs from 'dayjs';

interface Props {
  data: IMachine;
  isLast: boolean
}

const MachineCard = ({data, isLast}: Props) => {
  const dispatch = useDispatch();

  const handleChange = (fieldId: number, value: Date | string | boolean | number) => {
    data.fields.filter(x => x.id === fieldId).forEach(x => {
      x.value = value;
    })
    dispatch(edit(data));
  };
  const handleRemove = () => {
    dispatch(remove(data));
  };
  
  const title = () => {
    const {category: {titleFieldId}} = data;
    if (titleFieldId !== undefined) {
      const obj = data.fields.find(x => x.id === titleFieldId);
      if (obj && (obj.value || obj.type === 'checkbox')) {
        switch (obj.type) {
          case 'text':
            return obj.value as string;
          case 'date':
            return dayjs(obj.value as Date).format('MM/DD/YYYY')
          case 'checkbox':
            return `${obj.name} : ${(obj.value as boolean) ? 'true' : 'false'}`
          case 'number':
            return obj.value as number
        }
      }
    }
    return 'Unnamed Field';
  }
  return (
    <Card style={[style.wrapper, Helper.isTablet() ? {width: (Helper.windowWidth() / 2) - 32} : {}, isLast ? {marginBottom: 8} : {}]}>
      <Card.Content style={style.cardContent}>
        <Text style={style.title}>
          {title()}
        </Text>
        {data.fields.map((f) => {
          switch (f.type) {
            case 'text':
              return (
                <TextInput
                  key={`mcn-${data.id}-fd-${f.id}`}
                  label={f.name}
                  mode='outlined'
                  value={f.value as string}
                  onChangeText={(text) => handleChange(f.id, text)}
                  style={style.inputStyle}
                />
              )
            case 'date':
              return (
                <DatePicker
                  key={`mcn-${data.id}-fd-${f.id}`}
                  label={f.name}
                  value={(f.value as Date)}
                  onSelectedChange={(dt) => handleChange(f.id, dt)}
                  style={style.inputStyle}
                />
              );
            case 'checkbox':
              return (
                <View style={[style.row, style.inputStyle]} key={`mcn-${data.id}-fd-${f.id}`}>
                  <Switch 
                    value={f.value as boolean} 
                    onValueChange={(b) => handleChange(f.id, b)}
                  />
                  <Text style={style.switchCaption}>{f.name}</Text>
                </View>
              );
            case 'number':
              return (
                <TextInput
                  key={`mcn-${data.id}-fd-${f.id}`}
                  label={f.name}
                  mode='outlined'
                  keyboardType='numeric'
                  value={f.value as string}
                  onChangeText={(text) => handleChange(f.id, text)}
                  style={style.inputStyle}
                />
              )
          }
        })}
        
        <View style={style.row}>
          <Button
            style={[style.button, {marginLeft: -12}]}
            mode="text" 
            icon='delete'
            uppercase={true}
            onPress={handleRemove}
          >
            Remove
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

export default MachineCard;
