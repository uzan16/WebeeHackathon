import { ICategory, IMachine } from ".";

export type AppState = {
  category: ICategoryState,
  machine: IMachineState,
}

export type ChangeAttributPayloadType = {
  category: ICategory,
  attributeId: number,
  isTypeChanged?: boolean
}

export interface ICategoryState {
  data: ICategory[]
}

export interface IMachineState {
  data: IMachine[]
}

export type AddTypeAction<T> = {
  type: string;
  payload: T;
}
export type EditTypeAction<T> = {
  type: string;
  payload: T;
}
export type RemoveTypeAction<T> = {
  type: string;
  payload: T;
}
export type ChangeAttributeAction = {
  type: string;
  payload: ChangeAttributPayloadType;
}

export type CategoryAction = 
  AddTypeAction<ICategory> | 
  EditTypeAction<ICategory> | 
  RemoveTypeAction<ICategory>;

export type MachineAction = 
  AddTypeAction<IMachine> | 
  EditTypeAction<IMachine> | 
  RemoveTypeAction<IMachine> | 
  ChangeAttributeAction |
  EditTypeAction<ICategory>;

