import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import ContextInitializer from './ContextInitializer';

const SearchCard = ({ recipe }) => {
  const { state, dispatch } = useContext(UserContext);
  console.log(recipe.id)
console.log(state)
  const isLiked = state.likes.some((likedPost) => likedPost.post ? likedPost.post.id === recipe.id :likedPost.id === recipe.id);
console.log(isLiked)
  const handleLike = async () => {
   
    if (isLiked) {
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
    } else {
      const response = await fetch('http://127.0.0.1:8000/api/user/like_recipe', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: recipe.id,
        }),
      });
      dispatch({
        type: 'ADD_LIKE',
        payload: recipe,
      });
    }
  };

  return (
    <div className='search-card' style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <div>
        <img
          src={`http://127.0.0.1:8000/images/${recipe.image_url}`}
          alt={recipe.name}
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
        <h3 className='rec-name'>{recipe.name}</h3>
      </div>
      
      <div className='search-card-content'>
        <p>Cuisine: {recipe.cuisine}</p>
        <p>Ingredients: {recipe.ingredients}</p>
      </div>
      <button className="add-to-shelve-button" onClick={handleLike}>{isLiked ? 'Liked' : 'Like'}</button>  
    </div>
  );
};

export default SearchCard;
