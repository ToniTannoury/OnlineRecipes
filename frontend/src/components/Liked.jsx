import {useContext , useState} from 'react'
import ContextInitializer from './ContextInitializer'
import UserContext from '../context/UserContext'
import Navbar from './Navbar'
import Carousel from './Carousel'
import Recipe from './Recipe'
import Modal from 'react-modal'

const Liked = () => {
  const [recipeCuisine, setRecipeCuisine] = useState('recipe.cuisine');
  const [recipeIngredients, setRecipeIngredients] = useState('recipe.ingredients');
  const [recipeName, setRecipeName] = useState('recipe.name');
  const [selectedId, setSelectedId] = useState(0);
  const {state , dispatch} = useContext(UserContext)
  const [isViewRecipeModalOpen, setIsViewRecipeModalOpen] = useState(false); 

  console.log(state)
  const handleViewRecipe = (e , recipe) => {
    console.log(11)
    setRecipeCuisine(recipe.cuisine)
    setRecipeIngredients(recipe.ingredients)
    setRecipeName(recipe.name)
    setIsViewRecipeModalOpen(true);
    setSelectedId(+e.target.parentElement.parentElement.getAttribute('_id') )
    
  };

  return (
    <div>
      <ContextInitializer/>
      <Navbar/>
      
      <h1>Liked Recipes</h1>
      {state.likes?.map(like=><Recipe handleViewRecipe={handleViewRecipe} like recipe={like.post}/>)}
      <Modal  isOpen={isViewRecipeModalOpen} onRequestClose={() => setIsViewRecipeModalOpen(false)} className="recipe_modal">
      <h2 className="modal-title">Recipe</h2>
      <form className="modal-form" >
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
          images...
        </div>
        </div>
        
      </form>
    </Modal>
    </div>
  )
}

export default Liked