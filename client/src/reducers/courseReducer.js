import { ADD_COURSE, ADD_COURSE_ERROR, ADD_COURSE_SUCCESS, FETCH_COURSE } from '../actions/types'

export default function(state = {loading:false, course:false, error:false}, action) {
  
  switch(action.type){
    case ADD_COURSE:
      return {
        ...state,
        loading:true,
        course: false,
        error:false,
      }
    case ADD_COURSE_SUCCESS:
      return {
        ...state,
        error:false,
        loading:false,
        course: action.payload,
      }
    case ADD_COURSE_ERROR:
      return {
        ...state,
        loading:false,
        courseData:false,
        error: action.payload,
      }
    case FETCH_COURSE:
      return{
        ...state,
        loading:false,
        error:false,
        course: action.payload

      }
    default:
      return state;
   
    
  }
}