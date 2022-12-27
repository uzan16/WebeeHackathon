import { CATEGORY_ACTION_TYPES } from "../../data/constant";
import { ICategory, IState } from "../../interface";

export const add = (payload: ICategory): IState.AddTypeAction<ICategory> => {
  return {
    type: CATEGORY_ACTION_TYPES.ADD,
    payload
  };
};

export const edit = (payload: ICategory): IState.EditTypeAction<ICategory> => {
  return {
    type: CATEGORY_ACTION_TYPES.EDIT,
    payload
  };
};

export const remove = (payload: ICategory): IState.RemoveTypeAction<ICategory> => {
  return {
    type: CATEGORY_ACTION_TYPES.REMOVE,
    payload
  };
};