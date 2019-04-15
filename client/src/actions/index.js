import axios from 'axios'
import { 
  FETCH_USER, 
  DEDUCT_CREDIT, 
  ADD_COURSE, 
  ADD_COURSE_SUCCESS, 
  ADD_COURSE_ERROR,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_ERROR,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_VIDEOS,
  UPLOAD_VIDEOS_ERROR,
  UPLOAD_VIDEOS_SUCCESS,
  FETCH_COURSE, 
  UNLOCK_COURSE,
  UNLOCK_COURSE_SUCCESS,
  UNLOCK_COURSE_ERROR,
  FETCH_SINGLE_COURSE
} from './types'

 export const fetchUser = () => async dispatch => {

    const res = await axios.get('/api/current_user')
    dispatch({type: FETCH_USER, payload: res.data})
  }

export const handleToken = (token) => async dispatch =>{

  const res = await axios.post('/api/stripe', token)
  dispatch({type:FETCH_USER, payload:res.data})
}

export const deductCredit = (amount) => async dispatch =>{
  const res = await axios.post(`/api/current_user/update`, {amount})
  dispatch({type:DEDUCT_CREDIT, payload:res.data})
}

export const addCourse = (course) => async dispatch =>{
  console.log('course details is', course)
  try{
    dispatch({type:ADD_COURSE})
    const res = await axios.post("/api/add_course/add", {course})
    dispatch({type:ADD_COURSE_SUCCESS, payload:res.data})
  }catch(error){
    dispatch({type:ADD_COURSE_ERROR, payload:error})
  }
 
}

export const uploadVideos = (videos) => async dispatch =>{
  console.log('video details is', videos)
  try{
    dispatch({type:UPLOAD_VIDEOS})
    const res = await axios.post('/api/upload/videos', {videos})
    dispatch({type:UPLOAD_VIDEOS_SUCCESS, payload:res.data})
  }catch(error){
    dispatch({type:UPLOAD_VIDEOS_ERROR, payload:error})
  }
}

export const uploadImage = (image) => async dispatch =>{
  console.log('image details is', image)
  try{
    dispatch({type:UPLOAD_IMAGE})
    const res = await axios.post('/api/upload', {image})
    dispatch({type:UPLOAD_IMAGE_SUCCESS, payload:res.data})
  }catch(error){
    dispatch({type:UPLOAD_IMAGE_ERROR, payload:error})
  }
}

export const unlockCourse = (status) => async dispatch =>{
  try{
    dispatch({type:UNLOCK_COURSE})
    const res = await axios.post('api/unlock', {status})
    dispatch({
      type: UNLOCK_COURSE_SUCCESS, payload: res.data
    })
  }catch(error){
    dispatch({type: UNLOCK_COURSE_ERROR, payload:error})
  }
}


export const fetchCourse =() => async dispatch =>{
  const res = await axios.get('/api/fetch_course')
  dispatch({type:FETCH_COURSE, payload:res.data})
}

export const fetchSingleCourse =(courseId) => async dispatch =>{
  console.log('courseId', courseId)
  const res = await axios.post(`/api/course/${courseId}`)
  dispatch({type:FETCH_SINGLE_COURSE, payload:res.data})
}