import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'
import { rootReducer } from './reducers/reducers.js'
import {createInitialState} from './store/store.js'
import { selectQuestionActionCreator} from './actions/actions.js'
import Game from './components/Game';

render(  
  <Game />, 
  document.getElementById('root')
);