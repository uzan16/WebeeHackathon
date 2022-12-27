import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../../store/actions/machineAction';
import { CategoryCard, SectionTitle } from '../../components';
import { IMachineField, IState, ScreenProps } from '../../interface';
import { NEW_CATEGORY } from '../../data/dummy';

import style from './index.style';
import ListEmpty from '../../components/list-empty';
import Hoc from '../../components/hoc';
import MachineCard from '../../components/machine-card';
import { Helper } from '../../utils/helper';

const MachineByCategoryScreen: React.FC<ScreenProps<'MachineByCategory'>> = ({route}) => {
  const {params: {category}} = route;

  const dispatch = useDispatch();

  const machine = useSelector((state: IState.AppState) => state.machine);

  const filteredMachine = React.useMemo(() => {
    return machine.data.filter(x => x.category.id === category.id);
  }, [machine.data, category]);
  
  const addButtonHandler = () => {
    let fields: IMachineField[] = [];
    category.attributes.forEach(att => {
      fields.push({
        id: att.id,
        name: att.fieldName,
        type: att.type
      })
    });
    dispatch(add({
      id: 0,
      category,
      fields
    }));
  }

  return (
    <Hoc>
      <SectionTitle text={category.name}>
        <Button
          style={style.addMachineButton}
          contentStyle={style.addMachineButtonContent}
          labelStyle={style.addMachineButtonLabel}
          mode="contained" 
          onPress={addButtonHandler}
          uppercase={true}
        >
          Add New Item
        </Button>
      </SectionTitle>
      <View style={{flex: 1}}>
        <FlatList
          data={filteredMachine}
          renderItem={({item, index}) => (
            <MachineCard data={item} isLast={index === filteredMachine.length - 1}></MachineCard>
          )}
          keyExtractor={(item) => `machine-${item.id}`}
          removeClippedSubviews={true}
          style={{flex: 1}}
          ListEmptyComponent={
            <ListEmpty text='No Items to display' />
          }
          numColumns={Helper.isTablet() ? 2 : 1}
        />
      </View>
    </Hoc>
  );
};

export default MachineByCategoryScreen;
