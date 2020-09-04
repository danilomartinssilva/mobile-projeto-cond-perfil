import {combineReducers} from 'redux'
import auth from './auth/reducer'
import profile from './profile/reducer'
import events from './eventos/reducer'
import condominiums from './condominiums/reducer'
import regras from './regras/reducer'
import balances from './balances/reducer'
import files from './files/reducer'
import conventions from './conventions/reducer'
import regulaments from './regulaments/reducer'
import minutes from './minutes/reducer'
import surveys from './surveys/reducer'

export default combineReducers({
  auth,
  profile,
  events,
  condominiums,
  regras,
  balances,
  files,
  conventions,
  regulaments,
  minutes,
  surveys,
})
