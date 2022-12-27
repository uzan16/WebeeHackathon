import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../../store/actions/categoryAction';
import { CategoryCard } from '../../components';
import { IState, ScreenProps } from '../../interface';
import { NEW_CATEGORY } from '../../data/dummy';

import style from './index.style';
import ListEmpty from '../../components/list-empty';
import Hoc from '../../components/hoc';
import { Helper } from '../../utils/helper';

const ManageCategoriesScreen: React.FC<ScreenProps<'ManageCategories'>> = ({navigation}) => {
  const dispatch = useDispatch();

  const category = useSelector((state: IState.AppState) => state.category);
  
  const addButtonHandler = () => {
    dispatch(add({
      ...NEW_CATEGORY,
      attributes: NEW_CATEGORY.attributes.map(x => ({...x}))
    }));
  }

  return (
    <Hoc>
      <View style={{flex: 1}}>
        <FlatList
          data={category.data}
          renderItem={({item, index}) => {
            return (
              <CategoryCard data={item} isLast={index === category.data.length - 1}></CategoryCard>
            );
          }}
          keyExtractor={(item) => `category-${item.id}`}
          removeClippedSubviews={true}
          style={{flex: 1}}
          ListEmptyComponent={
            <ListEmpty text='No Items to display' />
          }
          numColumns={Helper.isTablet() ? 2 : 1}
        />
        <Button
          style={style.addCategoryButton}
          mode="contained" 
          onPress={addButtonHandler}
          uppercase={true}
        >
          Add New Category
        </Button>
      </View>
    </Hoc>
  );
};

export default ManageCategoriesScreen;
