import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import { ICategory, TFieldType } from '../../interface';
import style from './index.style';

import { Card, TextInput, IconButton, Button, Menu } from 'react-native-paper';

import { useDispatch } from 'react-redux';
import { edit, remove } from '../../store/actions/categoryAction';
import { changeCategory, changeAttribute, addAttribute, removeAttribute } from '../../store/actions/machineAction';
import { fieldTypes } from '../../data/constant';
import { Helper } from '../../utils/helper';

interface Props {
  data: ICategory;
  isLast: boolean
}

const CategoryCard = ({data, isLast}: Props) => {
  const dispatch = useDispatch();
  const [menuTypeVisible, setMenuTypeVisible] = React.useState(false);
  const [menuTitleVisible, setMenuTitleVisible] = React.useState(false);
  const [menuChangeTypeVisible, setMenuChangeTypeVisible] = React.useState<boolean[]>(new Array(data.attributes.length).fill(false));

  const showMenu = (type: 'type' | 'title' | 'changetype', index?: number) => {
    switch (type) {
      case 'type':
        setMenuTypeVisible(true);
        setMenuTitleVisible(false);
        setMenuChangeTypeVisible(prev => prev.map(_ => false));
        break;
      case 'title':
        setMenuTypeVisible(false);
        setMenuTitleVisible(true);
        setMenuChangeTypeVisible(prev => prev.map(_ => false));
        break;
      case 'changetype':
        setMenuTypeVisible(false);
        setMenuTitleVisible(false);
        setMenuChangeTypeVisible(prev => prev.map((_, i) => i === index ? true : false));
    }
  }

  const handleCategoryChange = (name: string) => {
    const payload = {
      ...data,
      name
    };
    dispatch(edit(payload));
    dispatch(changeCategory(payload))
  };
  const handleRemove = () => {
    dispatch(remove(data));
  };
  const handleAddAttribute = (type: TFieldType) => {
    let attributes = [...data.attributes];
    const lastID = attributes[attributes.length - 1]?.id || 0;
    attributes.push({
      type,
      fieldName: '',
      id: lastID + 1
    })
    const payload = {
      ...data,
      attributes
    };
    dispatch(edit(payload));
    dispatch(addAttribute(payload));
    setMenuTypeVisible(false);
  };
  const handleChangeAttribute = (index: number, name: string, fieldType: TFieldType) => {
    let attributes = [...data.attributes];
    const isTypeChanged = attributes[index].type !== fieldType;
    attributes[index].fieldName = name;
    attributes[index].type = fieldType;
    const payload = {
      ...data,
      attributes
    };
    dispatch(edit(payload));
    dispatch(changeAttribute({
      attributeId: attributes[index].id,
      category: payload,
      isTypeChanged
    }));
    setMenuChangeTypeVisible(prev => prev.map(_ => false));
  };
  const handleDeleteAttribute = (index: number) => {
    if (data.attributes.length <= 1) {
      Alert.alert('Delete Failed', 'Must have at least 1 attribute');
      return;
    }
    let attributes = [...data.attributes];
    const attributeId = attributes[index].id;
    attributes.splice(index, 1);
    const payload = {
      ...data,
      attributes
    };
    dispatch(edit(payload));
    dispatch(removeAttribute({
      attributeId,
      category: payload
    }));
  };
  const handleChangeTitleField = (titleFieldId: number) => {
    const payload = {
      ...data,
      titleFieldId
    };
    dispatch(edit(payload));
    dispatch(changeCategory(payload))
    setMenuTitleVisible(false);
  };
  return (
    <Card style={[style.wrapper, Helper.isTablet() ? {width: (Helper.windowWidth() / 2) - 32} : {}, isLast ? {marginBottom: 8} : {}]}>
      <Card.Content>
        <Text style={style.title}>
          {data.name}
        </Text>
        <TextInput
          label="Category Name"
          mode='outlined'
          value={data.name}
          onChangeText={handleCategoryChange}
        />
        {data.attributes.map((att, index) => (
          <View style={style.row} key={`cat-${data.id}-att-${att.id}`}>
            <TextInput
              style={style.inputRow}
              label="Field"
              mode='outlined'
              value={att.fieldName}
              onChangeText={(text) => handleChangeAttribute(index, text, att.type)}
            />
            <Menu
              visible={menuChangeTypeVisible[index]}
              onDismiss={() => setMenuChangeTypeVisible(prev => prev.map(_ => false))}
              anchor={
                <TouchableOpacity
                  onPress={() => showMenu('changetype', index)}
                  style={{flex: 1}}
                >
                  <View style={style.typeRowWrapper}>
                    <Text style={style.typeRowText}>{att.type}</Text>
                  </View>
                </TouchableOpacity>
              }
            >
              {fieldTypes.map((ft) => (
                <Menu.Item
                  key={`cat-${data.id}-fdtypechange-${ft}`}
                  titleStyle={style.menuText}
                  onPress={() => {handleChangeAttribute(index, att.fieldName, ft)}} 
                  title={ft}
                />
              ))}
            </Menu>
            {data.attributes.length > 1 && (
              <IconButton
                icon="delete"
                size={24}
                style={style.deleteIcon}
                onPress={() => handleDeleteAttribute(index)}
              />
            )}
          </View>
        ))}
        <Menu
          visible={menuTitleVisible}
          onDismiss={() => setMenuTitleVisible(false)}
          anchor={
            <Button
              style={style.titleFieldButton}
              mode="contained" 
              onPress={() => showMenu('title')}
              uppercase={true}
            >
              Title Field: {data.attributes.find(x => x.id === data.titleFieldId)?.fieldName || 'Unnamed Field'}
            </Button>
          }
        >
          {data.attributes.filter(x => !!x.fieldName).map((att) => (
            <Menu.Item
              key={`cat-${data.id}-att-${att.id}`}
              titleStyle={style.menuText}
              onPress={() => {handleChangeTitleField(att.id)}} 
              title={att.fieldName}
            />
          ))}
        </Menu>
        
        <View style={style.row}>
          <Menu
            visible={menuTypeVisible}
            onDismiss={() => setMenuTypeVisible(false)}
            anchor={
              <Button
                style={style.addFieldButton}
                mode="outlined" 
                onPress={() => showMenu('type')}
                uppercase={true}
              >
                Add New Field
              </Button>
            }
          >
            {fieldTypes.map((att, index) => (
              <Menu.Item
                key={`cat-${data.id}-fdtype-${index}`}
                titleStyle={style.menuText}
                onPress={() => {handleAddAttribute(att)}} 
                title={att}
              />
            ))}
          </Menu>
          
          <Button
            style={style.addFieldButton}
            mode="text" 
            icon='delete'
            onPress={handleRemove}
            uppercase={true}
          >
            Remove
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CategoryCard;
