import { DEDUCT_CREDIT } from '../actions/types'

export default function(state = [], action) {
  
  switch(action.type){
    case DEDUCT_CREDIT:
      return action.payload || false
    default:
      return state;
   
    
  }
}