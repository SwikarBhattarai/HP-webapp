import { DEDUCT_CREDIT, UNLOCK_COURSE, UNLOCK_COURSE_ERROR, UNLOCK_COURSE_SUCCESS } from '../actions/types'

export default function(state = {
  status: false,
  loading:false,
  error: false,

}, action) {
  
  switch(action.type){
    case DEDUCT_CREDIT:
      return action.payload || false
    case UNLOCK_COURSE:
      return {
        ...state,
        error:false,
        loading:true,
        status: false,
      }
    case UNLOCK_COURSE_SUCCESS:
      return {
        ...state,
        status: action.payload,
        error:false,
        loading:false,
      }
    case UNLOCK_COURSE_ERROR:
      return {
        ...state,
        status:false,
        error:true,
        loading:false,
      }
    default:
      return state;
   
    
  }
}