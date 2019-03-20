import axios from 'axios'
import { FETCH_USER, DEDUCT_CREDIT, ADD_COURSE } from './types'

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
  console.log('course details', course)
  const res = await axios.post(`/api/add_course/add`, {course})
  dispatch({type:ADD_COURSE, payload:res.data})
}