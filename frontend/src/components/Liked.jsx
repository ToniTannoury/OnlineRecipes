import {useContext} from 'react'
import ContextInitializer from './ContextInitializer'
import UserContext from '../context/UserContext'
const Liked = () => {
  const {state , dispatch} = useContext(UserContext)
  console.log(state)
  return (
    <div>
      <ContextInitializer/>
      Init
    </div>
  )
}

export default Liked