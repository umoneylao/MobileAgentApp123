/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './src/reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './src/sagas';
import AppContainer from './src/screens/AppContainer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/es/integration/react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: 'root',
  storage,

}
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};
const persistedReducer = persistReducer(persistConfig, allReducers)

let store = createStore(persistedReducer, undefined, compose(
  applyMiddleware(sagaMiddleware),
));
let persistor = persistStore(store)
export default class App extends Component<{}> {
  render() {
    return (
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppContainer />
          </PersistGate>
        </Provider>
      </PaperProvider>
    );
  }
}

sagaMiddleware.run(rootSaga);




