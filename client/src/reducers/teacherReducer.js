import { ADD_TEACHER, ADD_TEACHER_SUCCESS, ADD_TEACHER_ERROR} from '../actions/types'

export default function(state = {
  teacher: false,
  loading:false,
  error: false,

}, action) {
  
  switch(action.type){
    case ADD_TEACHER:
      return {
        ...state,
        error:false,
        loading:true,
        status: false,
      }
    case ADD_TEACHER_SUCCESS:
      return {
        ...state,
        teacher: action.payload,
        error:false,
        loading:false,
      }
    case ADD_TEACHER_ERROR:
      return {
        ...state,
        teacher:false,
        error:action.payload,
        loading:false,
      }
    default:
      return state;
   
    
  }
}