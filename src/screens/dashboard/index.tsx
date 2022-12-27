import React from 'react';
import { View, SectionList } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../../store/actions/machineAction';
import { SectionTitle } from '../../components';
import { ICategory, IMachine, IMachineField, IState, ScreenProps } from '../../interface';

import style from './index.style';
import ListEmpty from '../../components/list-empty';
import Hoc from '../../components/hoc';
import MachineCard from '../../components/machine-card';
import { Helper } from '../../utils/helper';

const DashboardScreen: React.FC<ScreenProps<'Dashboard'>> = () => {
  const dispatch = useDispatch();

  const {machine, category} = useSelector((state: IState.AppState) => state);

  const groupedMachine = React.useMemo(() => {
    let arr: {category: ICategory; data: IMachine[]}[] = [];
    let keyVal: { [key: number]: IMachine[]; } = {};
    category.data.forEach(x => {
      if (!keyVal[x.id]) 
        keyVal[x.id] = [];
    });
    machine.data.forEach(x => {
      if (keyVal[x.category.id]) 
        keyVal[x.category.id].push(x);
      else
        keyVal[x.category.id] = [x];
    });
    for (let key in keyVal) {
      const obj = category.data.find(x => x.id === +key);
      if (!obj) continue;
      arr.push({
        category: obj,
        data: keyVal[key]
      })
    }
    return arr;
  }, [machine.data, category.data]);
  
  const addButtonHandler = (cat: ICategory) => {
    let fields: IMachineField[] = [];
    cat.attributes.forEach(att => {
      fields.push({
        id: att.id,
        name: att.fieldName,
        type: att.type
      })
    });
    dispatch(add({
      id: 0,
      category: cat,
      fields
    }));
  }

  return (
    <Hoc>
      <SectionList
        sections={groupedMachine}
        keyExtractor={(item, index) => `section-${item.id}`}
        renderItem={({ item, index, section }) => {
          if (Helper.isTablet())
            return index % 2 === 0 ? (
              <View style={{flexDirection: 'row'}}>
                <MachineCard data={section.data[index]} isLast={index === section.data.length - 1}></MachineCard>
                {index + 1 < section.data.length && <MachineCard data={section.data[index + 1]} isLast={index === section.data.length - 1}></MachineCard>}
              </View>
            ) : <></>
          return <MachineCard data={section.data[index]} isLast={index === section.data.length - 1}></MachineCard>
        }}
        renderSectionHeader={({ section }) => (
          <>
            <SectionTitle text={section.category.name}>
              <Button
                style={style.addMachineButton}
                contentStyle={style.addMachineButtonContent}
                labelStyle={style.addMachineButtonLabel}
                mode="contained" 
                onPress={() => addButtonHandler(section.category)}
                uppercase={true}
              >
                Add New Item
              </Button>
            </SectionTitle>
            {section.data.length <= 0 && <ListEmpty text='No Items to display' />}
          </>
        )}
        renderSectionFooter={() => (
          <View style={{marginBottom: 16}}/>
        )}
        ListEmptyComponent={
          <ListEmpty text='No Items to display' />
        }
      />
    </Hoc>
  );
};

export default DashboardScreen;
