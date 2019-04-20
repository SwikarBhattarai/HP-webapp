import {
  ADD_COURSE,
  ADD_COURSE_ERROR,
  ADD_COURSE_SUCCESS,
  FETCH_COURSE,
  FETCH_SINGLE_COURSE,
  FETCH_SINGLE_COURSE_SUCCESS,
  FETCH_SINGLE_COURSE_ERROR,
  FETCH_TEACHERS,
  EDIT_COURSE,
  EDIT_COURSE_SUCCESS,
  EDIT_COURSE_ERROR,
  UPDATE_COURSE,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_ERROR,
  DELETE_COURSE,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_ERROR,
  CLEAR_DATA
} from "../actions/types";

export default function(
  state = {
    loading: false,
    course: false,
    image: false,
    error: false,
    singleCourse: false,
    teachers: false,
    updatedCourse: false,
    deleteStatus: false,
  },
  action
) {
  switch (action.type) {
    case ADD_COURSE:
      return {
        ...state,
        loading: true,
        course: false,
        error: false
      };
    case ADD_COURSE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        course: action.payload
      };
    case ADD_COURSE_ERROR:
      return {
        ...state,
        loading: false,
        courseData: false,
        error: action.payload
      };
    case FETCH_COURSE:
      return {
        ...state,
        loading: false,
        error: false,
        course: action.payload
      };

    case FETCH_SINGLE_COURSE:
      return {
        ...state,
        singleCourse: false,
        loading: true,
        error: false
      };
    case FETCH_SINGLE_COURSE_SUCCESS:
      return {
        ...state,
        singleCourse: action.payload,
        loading: false,
        error: false
      };
    case FETCH_SINGLE_COURSE_ERROR:
      return {
        ...state,
        singleCourse: false,
        loading: false,
        error: action.payload
      };
    case FETCH_TEACHERS:
      return {
        ...state,
        teachers: action.payload,
        loading:false,
        error:false,
      }
    case EDIT_COURSE:
      return {
        ...state,
        course: false,
        loading:true,
        error: false,
      }
    case EDIT_COURSE_SUCCESS:
      return{
        ...state,
        course: action.payload,
        loading:false,
        error:false,
      }
    case EDIT_COURSE_ERROR:
      return{
        ...state,
        course:false,
        loading:false,
        error:true,
      }
    case UPDATE_COURSE: 
      return {
        ...state,
        updatedCourse: false,
        loading:true,
        error:false,
      }
    case UPDATE_COURSE_SUCCESS:
      return{
        ...state,
        updatedCourse:action.payload,
        loading:false,
        error:false,
      }
    case UPDATE_COURSE_ERROR:
      return{
        ...state,
        updatedCourse:false,
        loading:false,
        error:true,
      }
    case DELETE_COURSE:
      return{
        ...state,
        loading:true,
        error:false,
        deleteStatus:false,
      }
    case DELETE_COURSE_SUCCESS:
      return{
        ...state,
        loading:false,
        error:false,
        deleteStatus:true,

      }
    case DELETE_COURSE_ERROR:
      return{
        ...state,
        error:true,
        loading:false,
        deleteStatus:false,
      }
    case CLEAR_DATA:
      return{
        ...state,
        error:false,
        loading:false,
        course:false,
        singleCourse:false,
        
      }
    default:
      return state;
  }
}
