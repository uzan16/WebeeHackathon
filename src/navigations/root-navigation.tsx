import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

import {ICategory, IState, RootNavigationParamList} from '../interface' 
import DashboardScreen from '../screens/dashboard';
import ManageCategoriesScreen from '../screens/manage-categories';
import MachineByCategory from '../screens/machine-by-category';

const Drawer = createDrawerNavigator<RootNavigationParamList>();

const RootNavigation = () => {
  const category = useSelector((state: IState.AppState) => state.category);
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName='Dashboard'
          drawerContent={(props) => <CustomDrawerContent drawerProps={props} categories={category.data} />}
          screenOptions={{
            unmountOnBlur: true
          }}
        >
          <Drawer.Screen
            name={'Dashboard'}
            component={DashboardScreen}
            options={{
              headerTitle: 'Dashboard'
            }}
          />
          <Drawer.Screen
            name={'MachineByCategory'}
            component={MachineByCategory}
            options={(f) => {
              return {
                headerTitle: f.route.params?.category.name
              }
            }}
          />  
          <Drawer.Screen
            name={'ManageCategories'}
            component={ManageCategoriesScreen}
            options={{
              headerTitle: 'Manage Categories'
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};


function CustomDrawerContent({drawerProps, categories}: {
  drawerProps: DrawerContentComponentProps,
  categories: ICategory[]
}) {
  const {navigation, state} = drawerProps;
  return (
    <DrawerContentScrollView {...drawerProps}>
      <DrawerItem
        label='Dashboard'
        onPress={() => navigation.navigate(state.routeNames[0])}
        focused={state.index === 0}
      />
      {categories.map(category => (
        <DrawerItem
          key={`drawerc-${category.id}`}
          label={category.name}
          onPress={() => navigation.navigate(state.routeNames[1], {category})}
          focused={state.index === 1 && (state.routes[state.index].params as any)?.category.id === category.id}
        />
      ))}
      <DrawerItem
        label='Manage Categories'
        onPress={() => navigation.navigate(state.routeNames[2])}
        focused={state.index === 2}
      />
    </DrawerContentScrollView>
  );
}

export default RootNavigation;
