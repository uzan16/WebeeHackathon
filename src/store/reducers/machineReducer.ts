import { CATEGORY_ACTION_TYPES, MACHINE_ACTION_TYPES } from "../../data/constant";
import { ICategory, IMachine, IState } from "../../interface";

const initialState: IState.IMachineState = {
  data: []
};

export default (state: IState.IMachineState = initialState, action: IState.MachineAction) => {
  switch (action.type) {
    case MACHINE_ACTION_TYPES.ADD: {
      const data = <IMachine>action.payload;
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
    case MACHINE_ACTION_TYPES.EDIT: {
      const data = <IMachine>action.payload;
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
    case MACHINE_ACTION_TYPES.REMOVE: {
      const data = <IMachine>action.payload;
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
    case MACHINE_ACTION_TYPES.CHANGE_ATTRIBUTE: {
      const {category, attributeId, isTypeChanged} = <IState.ChangeAttributPayloadType>action.payload;
      let existing = [...state.data];
      const attribute = category.attributes.find(x => x.id === attributeId);
      if (!attribute) {
        return state;
      }
      existing.filter(x => x.category.id === category.id).forEach(x => {
        x.category = category;
        x.fields.filter(f => f.id === attributeId).forEach(f => {
          if (isTypeChanged) {
            f.value = undefined;
          }
          f.name = attribute.fieldName;
          f.type = attribute.type;
        });
      })

      return {
        ...state,
        data: existing
      };
    }
    case MACHINE_ACTION_TYPES.REMOVE_ATTRIBUTE: {
      const {category, attributeId} = <IState.ChangeAttributPayloadType>action.payload;
      let existing = [...state.data];
      existing.filter(x => x.category.id === category.id).forEach(x => {
        x.category = category;
        x.fields = x.fields.filter(f => f.id !== attributeId);
      })

      return {
        ...state,
        data: existing
      };
    }
    case MACHINE_ACTION_TYPES.ADD_ATTRIBUTE: {
      const category = <ICategory>action.payload;
      let existing = [...state.data];
      existing.filter(x => x.category.id === category.id).forEach(x => {
        x.category = category;
        const fids = x.fields.map(f => f.id);
        const newAttributes = category.attributes.filter(att => !fids.includes(att.id));
        if (newAttributes.length <= 0) {
          return;
        }
        newAttributes.forEach(att => {
          x.fields.push({
            id: att.id,
            name: att.fieldName,
            type: att.type
          })
        });
      });

      return {
        ...state,
        data: existing
      };
    }
    
    case MACHINE_ACTION_TYPES.CHANGE_CATEGORY: {
      const category = <ICategory>action.payload;
      let existing = [...state.data];
      existing.filter(x => x.category.id === category.id).forEach(x => {
        x.category = category
      })
      return {
        ...state,
        data: existing
      };
    }
    case CATEGORY_ACTION_TYPES.REMOVE: {
      const category = <ICategory>action.payload;
      let existing = [...state.data];
      existing = existing.filter(x => x.category.id !== category.id);
      return {
        ...state,
        data: existing
      };
    }
    default:
      return state;
  }
};