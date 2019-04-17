import {
  ADD_COURSE,
  ADD_COURSE_ERROR,
  ADD_COURSE_SUCCESS,
  FETCH_COURSE,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_ERROR,
  UPLOAD_VIDEOS,
  UPLOAD_VIDEOS_SUCCESS,
  UPLOAD_VIDEOS_ERROR,
  FETCH_SINGLE_COURSE,
  FETCH_SINGLE_COURSE_SUCCESS,
  FETCH_SINGLE_COURSE_ERROR
} from "../actions/types";

export default function(
  state = {
    loading: false,
    course: false,
    image: false,
    error: false
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
        course: false,
        loading: true,
        error: false
      };
    case FETCH_SINGLE_COURSE_SUCCESS:
      return {
        ...state,
        course: action.payload,
        loading: false,
        error: false
      };
    case FETCH_SINGLE_COURSE_ERROR:
      return {
        ...state,
        course: false,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
