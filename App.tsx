import React from 'react';
import RootNavigation from './src/navigations/root-navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider>
          <RootNavigation />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
