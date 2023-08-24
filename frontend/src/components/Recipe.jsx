import React , { useContext , useState} from 'react'
import UserContext from '../context/UserContext'
import Modal from 'react-modal'
import "../styles/Recipe.css"
import Input from './Input'

import EditRecipeModal from './EditRecipeModal '
const Recipe = ({recipe , handleEditClick ,handleViewRecipe , like}) => {
  console.log(recipe)
  const {state , dispatch} = useContext(UserContext)
  const [commentContent, setCommentContent] = useState('')

  const formattedComments = recipe?.comments?.map(comment => (
  <div className='comment-container'> 
    <img className='author-image'  src={`http://127.0.0.1:8000/images/${recipe.user?.pic_url}`} alt="" /><div>{ comment?.user?.name}: { comment?.content} </div>
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
  const handleComment = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/user/comment_recipe', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: recipe.id,
        content: commentContent,
      }),
    });

    const data = await response.json();
    console.log(data); 
    like ?
    dispatch({
      type: "ADD_COMMENT_TO_LIKED_POST",
      payload: {
        postId: recipe.id, 
        comment: data.comment, 
      },
    }): dispatch({
      type: "ADD_COMMENT_TO_OWN_POST",
      payload: {
        postId: recipe.id, 
        comment: data.comment, 
      }});
    setCommentContent('');
  };
  const unlike = async()=>{
    const response = await fetch('http://127.0.0.1:8000/api/user/unlike_recipe', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post_id: recipe.id,
      }),
    });
    dispatch({
      type: 'REMOVE_LIKE',
      payload: recipe.id,
    });
  }
 
  return ( 
    <>
     <div _id={recipe?.id} className='recommendation-container'>
     
     <div className='recommendation-header'>
     

       <span className='book-title'>{recipe?.name}</span>
       <div className='genre-box'>
         {recipe?.cuisine}
       </div>
     </div>
     <div >
       <img className='recommendation-image' src={`http://127.0.0.1:8000/images/${recipe?.image_url}`} />
     </div>
     <div className='number-of-likes'>
       <span>{recipe?.likes?.length} Likes</span>
       
     </div>
     <div className='author-info'>
       <img className='author-image'  src={`http://127.0.0.1:8000/images/${recipe?.user?.pic_url}`} alt="" />
       
       <div className='author-details'>
         <span>Author:</span>
         <span>{recipe?.user?.name}</span>
       </div>
     </div>
     
     <span style={{marginLeft:'16px'}}>comments</span>
     <div className='review'>
       <span className='review-text'>{formattedComments}</span>
     </div>
     
    {<div>
       <input
         style={{ marginLeft: "16px" }}
         type="text"
         value={commentContent}
         onChange={(e) => setCommentContent(e.target.value)}
         name="comment"
         placeholder="Add a comment..."
       />
       <button onClick={handleComment}>Comment</button>
     </div>}
 
     <div>
       {<button onClick={(e) => handleViewRecipe(e , recipe)} className='add-to-shelve-button'>View Recipe</button>}
       {!like && <button onClick={(e) => handleEditClick(e , recipe)} className='add-to-shelve-button'>
   Edit
 </button>}
       {!like && <button onClick={handleRemove}className='add-to-shelve-button'>Remove</button>}
       {like && <button onClick={unlike} className='add-to-shelve-button'>Remove from likes</button>}
     </div>
   </div>
   
    </>
   
  )
}

export default Recipe