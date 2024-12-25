import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import PokemonList from './components/PokemonList';
import './App.css';

const App = () => (
    <Provider store={store}>
      <PokemonList />
    </Provider>
);

export default App;
