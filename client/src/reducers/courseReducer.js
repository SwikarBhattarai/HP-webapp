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
  CLEAR_DATA,
  SEARCH_COURSE,
  SEARCH_COURSE_SUCCESS,
  SEARCH_COURSE_ERROR,
  FETCH_TEACHER_COURSE,
  FETCH_TEACHER_COURSE_SUCCESS,
  UNLOCK_COURSE,
  UNLOCK_COURSE_SUCCESS,
  UNLOCK_COURSE_ERROR,
  FETCH_USER_COURSE,
  FETCH_USER_COURSE_SUCCESS,
  FETCH_USER_COURSE_ERROR
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
    value: false,
    teacherCourse:false,
    unlockedCourse:false,
    userCourse:false,
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
        value:false,
        
      }
    case SEARCH_COURSE:
      return{
        ...state,
        error:false,
        loading:true,
        value:false,
      }
    case SEARCH_COURSE_SUCCESS:
      return{
        ...state,
        error:false,
        value:action.payload,
        loading:false,
      }
    case SEARCH_COURSE_ERROR:
      return{
        ...state,
        error:action.payload,
        value:false,
        loading:false,
      }
    case FETCH_TEACHER_COURSE:
      return {
        ...state,
        loading:true,
        teacherCourse:false,
        error:false,
      }
    case FETCH_TEACHER_COURSE_SUCCESS:
      return {
        ...state,
        loading:false,
        error:false,
        teacherCourse:action.payload,
      }
    case FETCH_TEACHER_COURSE_SUCCESS:
      return {
        ...state,
        loading:false,
        error:true,
        teacherCourse:false,
      }
    case UNLOCK_COURSE:
      return {
        ...state,
        loading:true,
        error:false,
        unlockedCourse:false,
      }
    case UNLOCK_COURSE_SUCCESS:
      return {
        ...state,
        loading:false,
        error:false,
        unlockedCourse:action.payload,
      }
    case UNLOCK_COURSE_ERROR:
      return {
        ...state,
        loading:false,
        unlockedCourse:false,
        error:true,
      }
    case FETCH_USER_COURSE:
      return {
        ...state,
        loading:true,
        userCourse:false,
        error:false,
      }
      case FETCH_USER_COURSE_SUCCESS:
      return {
        ...state,
        loading:false,
        userCourse:action.payload,
        error:false,
      }
      case FETCH_USER_COURSE_ERROR:
      return {
        ...state,
        loading:true,
        userCourse:false,
        error:action.payload,
      }
    default:
      return state;
  }
}
