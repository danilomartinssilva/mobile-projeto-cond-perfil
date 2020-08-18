import {combineReducers} from 'redux';
import auth from './auth/reducer';
import profile from './profile/reducer';
import events from './eventos/reducer';
import condominiums from './condominiums/reducer';

export default combineReducers({
  auth,
  profile,
  events,
  condominiums,
});
