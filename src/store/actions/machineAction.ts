import { MACHINE_ACTION_TYPES } from "../../data/constant";
import { ICategory, IMachine, IState } from "../../interface";

export const add = (payload: IMachine): IState.AddTypeAction<IMachine> => {
  return {
    type: MACHINE_ACTION_TYPES.ADD,
    payload
  };
};

export const edit = (payload: IMachine): IState.EditTypeAction<IMachine> => {
  return {
    type: MACHINE_ACTION_TYPES.EDIT,
    payload
  };
};

export const remove = (payload: IMachine): IState.RemoveTypeAction<IMachine> => {
  return {
    type: MACHINE_ACTION_TYPES.REMOVE,
    payload
  };
};

export const changeAttribute = (payload: IState.ChangeAttributPayloadType): IState.ChangeAttributeAction => {
  return {
    type: MACHINE_ACTION_TYPES.CHANGE_ATTRIBUTE,
    payload
  };
};

export const addAttribute = (payload: ICategory): IState.EditTypeAction<ICategory> => {
  return {
    type: MACHINE_ACTION_TYPES.ADD_ATTRIBUTE,
    payload
  };
};

export const removeAttribute = (payload: IState.ChangeAttributPayloadType): IState.ChangeAttributeAction => {
  return {
    type: MACHINE_ACTION_TYPES.REMOVE_ATTRIBUTE,
    payload
  };
};

export const changeCategory = (payload: ICategory): IState.EditTypeAction<ICategory> => {
  return {
    type: MACHINE_ACTION_TYPES.CHANGE_CATEGORY,
    payload
  };
};