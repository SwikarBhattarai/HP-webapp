import { ADD_COURSE } from '../actions/types'

export default function(state = [], action) {
  
  switch(action.type){
    case ADD_COURSE:
      return action.payload || false
    default:
      return state;
   
    
  }
}