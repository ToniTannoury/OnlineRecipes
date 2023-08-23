import React , { useContext , useState} from 'react'
import UserContext from '../context/UserContext'
import Modal from 'react-modal'
import "../styles/Recipe.css"
import EditRecipeModal from './EditRecipeModal '
const Recipe = ({recipe , handleEditClick ,handleViewRecipe}) => {
  const {state , dispatch} = useContext(UserContext)
  const formattedComments = recipe.comments?.map(comment => (
  <div className='comment-container'> 
    <img className='author-image'  src={`http://127.0.0.1:8000/images/${recipe.user?.pic_url}`} alt="" /><div>{ comment?.user.name}: { comment?.content} </div>
  </div>
   
  ));











  const handleRemove = async(e)=>{
    console.log(e.target.parentElement.parentElement)
    const response = await fetch(`http://127.0.0.1:8000/api/user/delete_post/${+e.target.parentElement.parentElement.getAttribute("_id")}` , {
      method:"DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    })
    const data = await response.json()
    dispatch({
      type:"DELETE_POST",
      payload:+e.target.parentElement.parentElement.getAttribute("_id")
    })
    console.log(data)
  }



  return (
   
    
    <div _id={recipe?.id} className='recommendation-container'>
     
      <div className='recommendation-header'>
        <span className='book-title'>{recipe.name}</span>
        <div className='genre-box'>
          {recipe.cuisine}
        </div>
      </div>
      <div >
        <img className='recommendation-image' src={`http://127.0.0.1:8000/images/${recipe.image_url}`} />
      </div>
      <div className='number-of-likes'>
        <span>{recipe.likes?.length} Likes</span>
      </div>
      <div className='author-info'>
        <img className='author-image'  src={`http://127.0.0.1:8000/images/${recipe.user?.pic_url}`} alt="" />
        <div className='author-details'>
          <span>Author:</span>
          <span>{recipe.user?.name}</span>
        </div>
      </div>
      <div className='review'>
        <span className='review-text'>{formattedComments}</span>
      </div>
      <div>
        <button onClick={(e) => handleViewRecipe(e , recipe)} className='add-to-shelve-button'>View Recipe</button>
        <button onClick={(e) => handleEditClick(e , recipe)} className='add-to-shelve-button'>
    Edit
  </button>

        <button onClick={handleRemove}className='add-to-shelve-button'>Remove</button>
      </div>
    </div>
    
  )
}

export default Recipe