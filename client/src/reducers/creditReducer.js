import { UNLOCK_COURSE } from '../actions/types'

export default function(state = [], action) {
  
  switch(action.type){
    case UNLOCK_COURSE:
      return action.payload || false
    default:
      return state;
   
    
  }
}