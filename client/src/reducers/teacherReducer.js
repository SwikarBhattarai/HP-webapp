import { ADD_TEACHER, ADD_TEACHER_SUCCESS, ADD_TEACHER_ERROR, FETCH_ALL_TEACHER, FETCH_ALL_STUDENT} from '../actions/types'

export default function(state = {
  teacher: false,
  loading:false,
  error: false,
  allTeacher:false,
  allStudent:false,

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
    case FETCH_ALL_TEACHER:
      return{
        ...state,
        allTeacher: action.payload
      }
    case FETCH_ALL_STUDENT:
      return{
        ...state,
        allStudent: action.payload
      }
    default:
      return state;
   
    
  }
}