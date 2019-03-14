import axios from 'axios'
import { FETCH_USER, DEDUCT_CREDIT } from './types'

 export const fetchUser = () => async dispatch => {

    const res = await axios.get('/api/current_user')
    dispatch({type: FETCH_USER, payload: res.data})
  }

export const handleToken = (token) => async dispatch =>{

  const res = await axios.post('/api/stripe', token)
  dispatch({type:FETCH_USER, payload:res.data})
}

export const deductCredit = (amount) => async dispatch =>{
  const res = await axios.post('/api/current_user', amount)
  dispatch({type:DEDUCT_CREDIT, payload:res.data})
}
