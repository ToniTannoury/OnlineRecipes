import {useContext , useEffect} from 'react'
import UserContext from '../context/UserContext'
const ContextInitializer = () => {
  const {state , dispatch} = useContext(UserContext)
  console.log(state)
  useEffect(()=>{
    const fetchUserInfo = async()=>{
      const response = await fetch('http://127.0.0.1:8000/api/user/get-details' , {
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await response.json()
      console.log(data)
      dispatch({
        type:"INIT_CONTEXT",
        payload:data.data.user
      })
    }
    fetchUserInfo()
  },[])
  
  return (
    <></>
  )
}

export default ContextInitializer