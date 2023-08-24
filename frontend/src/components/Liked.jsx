import {useContext , useState} from 'react'
import ContextInitializer from './ContextInitializer'
import UserContext from '../context/UserContext'
import Navbar from './Navbar'
import Carousel from './Carousel'
import Recipe from './Recipe'
import Modal from 'react-modal'
import '../styles/liked.css'
import "../styles/ScheduledMealCard.css";

const Liked = () => {
  const [recipeCuisine, setRecipeCuisine] = useState('recipe.cuisine');
  const [recipeIngredients, setRecipeIngredients] = useState('recipe.ingredients');
  const [recipeName, setRecipeName] = useState('recipe.name');
  const [selectedId, setSelectedId] = useState(0);
  const {state , dispatch} = useContext(UserContext)
  const [isViewRecipeModalOpen, setIsViewRecipeModalOpen] = useState(false); 
  const [recipeImages, setRecipeImages] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log(state)
  const handleViewRecipe = (e , recipe) => {
    console.log(11)
    setRecipeCuisine(recipe.cuisine)
    setRecipeIngredients(recipe.ingredients)
    setRecipeName(recipe.name)
    setIsViewRecipeModalOpen(true);
    setRecipeImages(recipe.images)
    setSelectedId(+e.target.parentElement.parentElement.getAttribute('_id') )
    
  };

  return (
    <div>
      <ContextInitializer/>
      <Navbar/>
      
      <h1>Liked Recipes</h1>
      <div className='likes-container'>
      {state.likes?.map(like=><Recipe handleViewRecipe={handleViewRecipe} like recipe={like.post}/>)}
      </div>
      
       <Modal  isOpen={isViewRecipeModalOpen} onRequestClose={() => setIsViewRecipeModalOpen(false)} className="recipe_modal">
       <div className="scheduled-meal-card">
       <h2 className="modal-title">Recipe</h2>

<div>
<span className="modal-label">Name: </span>
<span>{recipeName}</span>
</div>

<div>
<span className="modal-label">Cuisine: </span>
<span>{recipeCuisine}</span>
</div>

<div>
<span className="modal-label">Ingredients:</span>
<textarea
  className="modal-input"
  type="text"
  value={recipeIngredients}
  disabled
  style={{border:"none"}}
/>
</div>
<div>
<span className="modal-label">Images:</span>
<div>
{recipeImages && recipeImages.length > 0 && (
  <div className="image-navigation">
    <img
      className="scheduled-meal-card-image"
      src={`http://127.0.0.1:8000/images/${recipeImages[currentImageIndex].image_url}`}
      alt={`Image ${currentImageIndex + 1}`}
    />
    <div className="image-arrows">
      <button
      className="scheduled-meal-card-arrow"
        onClick={() =>
          setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? recipeImages.length - 1 : prevIndex - 1))
        }
      >
        &lt;
      </button>
      <button
      className="scheduled-meal-card-arrow"
        onClick={() =>
          setCurrentImageIndex((prevIndex) => (prevIndex === recipeImages.length - 1 ? 0 : prevIndex + 1))
        }
      >
        &gt;
      </button>
    </div>
  </div>
)}
</div>
</div>
       </div>

      
        
      
    </Modal>
    </div>
  )
}

export default Liked