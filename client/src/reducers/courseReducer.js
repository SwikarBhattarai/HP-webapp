import { ADD_COURSE, ADD_COURSE_ERROR, ADD_COURSE_SUCCESS, FETCH_COURSE, UPLOAD_IMAGE, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_ERROR, UPLOAD_VIDEOS, UPLOAD_VIDEOS_SUCCESS, UPLOAD_VIDEOS_ERROR, FETCH_SINGLE_COURSE } from '../actions/types'

export default function(state = {loading:false, course:false, videos:false,image:false, error:false, singleCourse: false}, action) {
  
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
      case UPLOAD_IMAGE:
        return {
          ...state,
          loading:true,
          error:false,
          image: false,
        }
      case UPLOAD_IMAGE_SUCCESS:
        return {
          ...state,
          loading:false,
          image:action.payload,
          error:false,
        }
      case UPLOAD_IMAGE_ERROR:
        return {
          ...state,
          loading:false,
          image:false,
          error:action.payload
        }
        case UPLOAD_VIDEOS:
        return {
          ...state,
          loading:true,
          error:false,
          videos: false,
        }
      case UPLOAD_VIDEOS_SUCCESS:
        return {
          ...state,
          loading:false,
          videos:action.payload,
          error:false,
        }
      case UPLOAD_VIDEOS_ERROR:
        return {
          ...state,
          loading:false,
          videos:false,
          error:action.payload
        }
      case FETCH_SINGLE_COURSE:
        return {
          singleCourse: action.payload,
          loading:false,
          error: false,
        }
    default:
      return state;
   
    
  }
}