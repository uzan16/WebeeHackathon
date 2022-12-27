import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, combineReducers} from 'redux';
import { IState } from '../interface';
import machineReducer from './reducers/machineReducer';
import categoryReducer from './reducers/categoryReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = combineReducers<IState.AppState>({
  category: categoryReducer,
  machine: machineReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);