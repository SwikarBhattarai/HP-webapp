import { FETCH_USER, LOGIN_USER, LOGIN_USER_SUCCESS} from '../actions/types'

export default function(state = null, action) {
  
  switch(action.type){
    case FETCH_USER:
      return action.payload || false
    case LOGIN_USER_SUCCESS:
      return action.payload || false
    default:
      return state;
  }
}