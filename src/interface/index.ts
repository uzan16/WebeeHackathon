import { DrawerScreenProps } from '@react-navigation/drawer';
import * as IState from './state';

export type RootNavigationParamList = {
  Dashboard: undefined;
  ManageCategories: undefined;
  MachineByCategory: { category: ICategory };
};

export type ScreenProps<RouteName extends keyof RootNavigationParamList> = DrawerScreenProps<RootNavigationParamList, RouteName>;

export type TFieldType = 'date' | 'text' | 'checkbox' | 'number';;

export interface IAttribute {
  id: number;
  fieldName: string;
  type: TFieldType;
}

export interface ICategory {
  id: number;
  name: string;
  attributes: IAttribute[];
  titleFieldId?: number;
  titleFieldName?: string;
}

export interface IMachineField {
  id: number;
  name: string;
  type: TFieldType;
  value?: Date | string | boolean | number;
}

export interface IMachine {
  id: number;
  fields: IMachineField[];
  category: ICategory;
}

export {IState};