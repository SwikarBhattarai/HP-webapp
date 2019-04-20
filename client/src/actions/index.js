import axios from 'axios'
import { 
  FETCH_USER, 
  DEDUCT_CREDIT, 
  ADD_COURSE, 
  ADD_COURSE_SUCCESS, 
  ADD_COURSE_ERROR,
  FETCH_COURSE, 
  UNLOCK_COURSE,
  UNLOCK_COURSE_SUCCESS,
  UNLOCK_COURSE_ERROR,
  FETCH_SINGLE_COURSE,
  FETCH_SINGLE_COURSE_SUCCESS,
  FETCH_SINGLE_COURSE_ERROR,
  ADD_TEACHER,
  ADD_TEACHER_SUCCESS,
  ADD_TEACHER_ERROR,
  FETCH_TEACHERS,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
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

// export const uploadVideos = (videos) => async dispatch =>{
//   console.log('video details is', videos)
//   try{
//     dispatch({type:UPLOAD_VIDEOS})
//     const res = await axios.post('/api/upload/videos', {videos})
//     dispatch({type:UPLOAD_VIDEOS_SUCCESS, payload:res.data})
//   }catch(error){
//     dispatch({type:UPLOAD_VIDEOS_ERROR, payload:error})
//   }
// }

// export const uploadImage = (image) => async dispatch =>{
//   console.log('image details is', image)
//   try{
//     dispatch({type:UPLOAD_IMAGE})
//     const res = await axios.post('/api/upload', {image})
//     dispatch({type:UPLOAD_IMAGE_SUCCESS, payload:res.data})
//   }catch(error){
//     dispatch({type:UPLOAD_IMAGE_ERROR, payload:error})
//   }
// }

export const unlockCourse = (status, id) => async dispatch =>{
  try{
    dispatch({type:UNLOCK_COURSE})
    const res = await axios.post('api/unlockcourse', {status, id})
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

export const fetchSingleCourse = (courseId) => async dispatch =>{
  try{
    dispatch({type:FETCH_SINGLE_COURSE})
    const res = await axios.post(`/api/course/${courseId}`)
    dispatch({type:FETCH_SINGLE_COURSE_SUCCESS, payload:res.data})
    console.log('res', res.data)

  }catch(error){
    dispatch({type:FETCH_SINGLE_COURSE_ERROR, payload:error})
  }
}

export const addTeacher = (teacher) => async dispatch =>{
  try{
    dispatch({type:ADD_TEACHER})
    const res = await axios.post('/api/addTeacher', {teacher})
    dispatch({type: ADD_TEACHER_SUCCESS, payload: res.data})
    
  }catch(error){
    dispatch({type:ADD_TEACHER_ERROR, payload:error})
  }
}

export const fetchTeachers =() => async dispatch =>{
  const res = await axios.get('/api/fetchTeachers')
  dispatch({type:FETCH_TEACHERS, payload:res.data})
}

export const loginUsers = (user) => async dispatch =>{
  try{
    dispatch({type: LOGIN_USER})
    const res = await axios.post('/api/auth', {user})
    dispatch({type:LOGIN_USER_SUCCESS, payload: res.data})
  }catch(error){
    dispatch({type:LOGIN_USER_ERROR, payload:error})
  }
}

export const editCourse =(id) => async dispatch =>{
  try{
    dispatch({type:EDIT_COURSE})
    const res = await axios.get(`/api/${id}/edit`)
    dispatch ({type:EDIT_COURSE_SUCCESS, payload: res.data})
  }catch(error){
    dispatch({type:EDIT_COURSE_ERROR, payload:error})
  }
}

export const updateCourse = (course, id) => async dispatch =>{
  try{
    dispatch({type:UPDATE_COURSE})
    const res =await axios.put(`/api/${id}`, {course})
    dispatch({type: UPDATE_COURSE_SUCCESS, payload: res.data})
  }catch(error){
    dispatch({type:UPDATE_COURSE_ERROR, payload:error})
  }
}

export const deleteCourse =(id) => async dispatch =>{
  try{
    dispatch({type:DELETE_COURSE})
    const res = await axios.delete(`/api/${id}`)
    dispatch({type:DELETE_COURSE_SUCCESS, payload: res.data})
  }catch(error){
    dispatch({type:DELETE_COURSE_ERROR, payload:error})
  }
}

export const clearData=() => dispatch =>{
  dispatch({type:CLEAR_DATA})
}

export const searchCourse =(value) => async dispatch =>{
  try{
    dispatch({type:SEARCH_COURSE})
    const res = await axios.post("/api/search/courses", {value})
    dispatch({type:SEARCH_COURSE_SUCCESS, payload: res.data})
  }catch(error){
    dispatch({type:SEARCH_COURSE_ERROR, payload:error})
  }
}