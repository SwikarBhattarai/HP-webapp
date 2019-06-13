import {
  FETCH_USER,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR
} from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case LOGIN_USER:
      return false;

    case LOGIN_USER_SUCCESS:
      return action.payload || false;

    case LOGIN_USER_ERROR:
      return false;
    default:
      return state;
  }
  
}


