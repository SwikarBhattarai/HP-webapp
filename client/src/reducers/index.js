import {combineReducers} from 'redux'
import authReducer from './authReducer'
import creditReducer from './creditReducer'
import courseReducer from './courseReducer'

export default combineReducers({
  auth: authReducer,
  credit: creditReducer,
  course: courseReducer,
})