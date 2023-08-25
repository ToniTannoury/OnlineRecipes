import React , { useContext , useState} from 'react'
import UserContext from '../context/UserContext'
import Modal from 'react-modal'
import "../styles/Recipe.css"
import Input from './Input'
import "../styles/ScheduledMealCard.css";

import EditRecipeModal from './EditRecipeModal '
const Recipe = ({recipe , handleEditClick ,handleViewRecipe , like}) => {
  console.log(recipe)
  const {state , dispatch} = useContext(UserContext)
  console.log(state)
  const [commentContent, setCommentContent] = useState('')
  const [isAddImageModalOpen, setAddImageModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleAddImage = () => {
    setAddImageModalOpen(true);
  };

  const handleImageInputChange = (event) => {
    setSelectedImages([...event.target.files]);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    selectedImages.forEach(image => {
      formData.append('images[]', image);
    });
    formData.append('post_id' , recipe.id)
    const response = await fetch('http://127.0.0.1:8000/api/user/images', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    const uploadedImageNames = data.images; 

    dispatch({
      type: 'UPLOAD_IMAGES_SUCCESS',
      payload: {
        postId: recipe.id,
        imageNames: uploadedImageNames,
      },
    });
    setAddImageModalOpen(false);
    setSelectedImages([]);
  };

  const formattedComments = recipe?.comments?.map(comment => (
  <div className='comment-container'> 
    <img className='author-image'  src={`http://127.0.0.1:8000/images/${recipe.user?.pic_url}`} alt="" /><div>{ comment?.user?.name}: { comment?.content} </div>
  </div>
   
  ));

  const handleRemove = async(e)=>{
    console.log(e.target.parentElement.parentElement)
    const response_del_meal = await fetch(
      `http://127.0.0.1:8000/api/user/delete-meals/${+e.target.parentElement.parentElement.getAttribute("_id")}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    const data = await response_del_meal.json()

    if (response_del_meal.ok) {
      dispatch({
        type: "REMOVE_MEAL",
        payload: data.deleted_meal_ids[0]
        ,
      });

      console.log("Meal removed successfully");
    }
    const response_unlike = await fetch('http://127.0.0.1:8000/api/user/unlike_recipe', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post_id: recipe?.id,
      }),
    });
    dispatch({
      type: 'REMOVE_LIKE',
      payload: recipe?.id,
    });
    const response = await fetch(`http://127.0.0.1:8000/api/user/delete_post/${+e.target.parentElement.parentElement.getAttribute("_id")}` , {
      method:"DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    })
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
        post_id: recipe?.id,
      }),
    });
    dispatch({
      type: 'REMOVE_LIKE',
      payload: recipe?.id,
    });
  }

  return ( 
    <>
     <Modal
        isOpen={isAddImageModalOpen}
        onRequestClose={() => setAddImageModalOpen(false)}
        contentLabel="Add Image Modal"
        className='modal'
      >
          
        <h2>Add Images</h2>
        <input type="file" multiple onChange={handleImageInputChange} />
        <button  className='add-to-shelve-button' onClick={handleImageUpload}>Upload</button>
        <button  className='add-to-shelve-button'onClick={() => setAddImageModalOpen(false)}>Cancel</button>
      </Modal>
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
         className='comment-input'
       />
       <button className='comment-button' onClick={handleComment}>Comment</button>
     </div>}
 
     <div>
       {<button onClick={(e) => handleViewRecipe(e , recipe)} className='add-to-shelve-button'>View Recipe</button>}
       {!like && <button onClick={(e) => handleEditClick(e , recipe)} className='add-to-shelve-button'>
   Edit
 </button>}
       {!like && <button onClick={handleRemove}className='add-to-shelve-button'>Remove</button>}
       {!like && <button onClick={handleAddImage}className='add-to-shelve-button'>Add Image</button>}
       {like && <button onClick={unlike} className='add-to-shelve-button'>Remove from likes</button>}
     </div>
   </div>
   
    </>
   
  )
}

export default Recipe