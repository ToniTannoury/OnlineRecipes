import React from 'react'
import "../styles/InfoBar.css"

const UserInfoBar = ({user}) => {
  console.log(user)
  
  return (
    <div _id={user.id} className='info-bar-container'>
      <div>
        <img className='user-image'  src={`http://127.0.0.1:8000/images/${user.pic_url}`} alt="" />
        
        <div className='username'>{user.name}</div>
      </div>
      <div className='info-right'>
        <div  className='info-box'>
          <span>{user.posts?.length}</span>
          <span>Recipes</span>
        </div>
        <div  className='info-box'>
          <span>{user.meals?.length}</span>
          <span>Meals</span>
        </div>
        <div  className='info-box'>
          <span>{user.likes?.length}</span>
          <span>Liked Recipes</span>
        </div>
      </div> 
    </div>
  )
}

export default UserInfoBar