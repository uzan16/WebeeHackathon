import { CATEGORY_ACTION_TYPES } from "../../data/constant";
import { IState } from "../../interface";

const initialState: IState.ICategoryState = {
  data: []
};

export default (state: IState.ICategoryState = initialState, action: IState.CategoryAction) => {
  switch (action.type) {
    case CATEGORY_ACTION_TYPES.ADD: {
      const data = action.payload;
      const lastID = state.data[state.data.length - 1]?.id || 0;
      return {
          ...state,
          data: [
            ...state.data,
            {
              ...data,
              id: lastID + 1
            }
          ]
      };
    }
    case CATEGORY_ACTION_TYPES.EDIT: {
      const data = action.payload;
      const idx = state.data.findIndex(x => x.id === data.id);
      let existing = [...state.data];
      if (idx >= 0) {
        existing[idx] = {
          ...data
        }
      }
      return {
          ...state,
          data: existing
      };
    }
    case CATEGORY_ACTION_TYPES.REMOVE: {
      const data = action.payload;
      const idx = state.data.findIndex(x => x.id === data.id);
      let existing = [...state.data];
      if (idx >= 0) {
        existing.splice(idx, 1);
      }
      return {
          ...state,
          data: existing
      };
    }
    default:
      return state;
  }
};