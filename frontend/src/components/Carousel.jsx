import React, { useState, useRef, useEffect , useContext } from "react";
import UserContext from "../context/UserContext";
import "../styles/Carousel.css";
import Recipe from "./Recipe";
import Modal  from "react-modal";
import Input from "./Input";
import "../styles/ScheduledMealCard.css";

const Carousel = ({ recipes }) => {
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);
  const [cuisine1, setCuisine1] = useState('recipe.cuisine');
  const [image1, setImage1] = useState(null);
  const [ingredients1, setIngredients1] = useState('recipe.ingredients');
  const [name1, setName1] = useState('recipe.name');
  const [recipeCuisine, setRecipeCuisine] = useState('recipe.cuisine');
  const [recipeIngredients, setRecipeIngredients] = useState('recipe.ingredients');
  const [recipeName, setRecipeName] = useState('recipe.name');
  const [selectedId, setSelectedId] = useState(0);
  const [recipeImages, setRecipeImages] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewRecipeModalOpen, setIsViewRecipeModalOpen] = useState(false); 
  const {state , dispatch} = useContext(UserContext)
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleImageChange = (event) => {
    setImage1(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('cuisine', cuisine1);
    formData.append('image_url', image1);
    formData.append('ingredients', ingredients1);
    formData.append('name', name1);

    // onUpdateRecipe( formData);
console.log(formData)
    setCuisine1('');
    setImage1(null);
    setIngredients1('');
    setName1('');
    setIsEditModalOpen(false);
  };
  const handleDragStart = (e) => {
    
      e.preventDefault();
      setStartX(e.clientX);
      setIsDragging(true);
    
  };
  const handleDragMove = (e) => {
    if (!isDragging) return;
    const offsetX = e.clientX - startX;
    const newScrollLeft = scrollLeft - offsetX;
    carouselRef.current.scrollLeft = newScrollLeft;
  };

  const handleDragEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      setScrollLeft(carouselRef.current.scrollLeft);
    }
  };

  useEffect(() => {
    const ref = carouselRef.current;
    ref.addEventListener("contextmenu", handleDragStart);
    ref.addEventListener("mousemove", handleDragMove);
    ref.addEventListener("mouseup", handleDragEnd);

    return () => {
      ref.removeEventListener("contextmenu", handleDragStart);
      ref.removeEventListener("mousemove", handleDragMove);
      ref.removeEventListener("mouseup", handleDragEnd);
    };
  }, [carouselRef, handleDragStart, handleDragMove, handleDragEnd]);
  const handleEditClick = (e , recipe) => {
    
    setName1(recipe.name);
    setCuisine1(recipe.cuisine);
    setIngredients1(recipe.ingredients);
    setIsEditModalOpen(true);
    setSelectedId(+e.target.parentElement.parentElement.getAttribute('_id') )
  };
  const handleViewRecipe = (e , recipe) => {
    setRecipeCuisine(recipe.cuisine)
    setRecipeIngredients(recipe.ingredients)
    setRecipeName(recipe.name)
    setRecipeImages(recipe.images)
    setIsViewRecipeModalOpen(true);
    setSelectedId(+e.target.parentElement.parentElement.getAttribute('_id') )
  };
  const onUpdateRecipe = async (formData) => {
    for (let entry of formData.entries()) {
      console.log(entry[0], entry[1]);
    }
    formData.append('image_url', image1?.name);
    for (let entry of formData.entries()) {
      console.log(entry[0], entry[1]);
    }
    const response = await fetch(`http://127.0.0.1:8000/api/user/update_post/${selectedId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData
    });
    const data = await response.json();
    dispatch({
      type:"EDIT_POST",
      payload:{
        postId:+selectedId,
        editedData:formData,
      }
    })
    console.log(data);
    setIsEditModalOpen(false);
  };
  
     const handleEditSubmit = async (event) => {
      event.preventDefault();
    
      const formData = new FormData();
      formData.append('cuisine', cuisine1);
      formData.append('image_url', image1);
      formData.append('ingredients', ingredients1);
      formData.append('name', name1);
      console.log(cuisine1)
    
      await onUpdateRecipe(formData); 
    
      setCuisine1('');
      setImage1(null);
      setIngredients1('');
      setName1('');
      setIsEditModalOpen(false);
    };

  return (
    <>
           <Modal  isOpen={isEditModalOpen} onRequestClose={() => setIsEditModalOpen(false)} className="modal">
      <h2 className="modal-title">Edit Recipe</h2>
      <form className="modal-form" onSubmit={handleSubmit}>
        <label className="modal-label">Name:</label>
        <input
          className="modal-input"
          type="text"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
        />
        <label className="modal-label">Cuisine:</label>
        <input
          className="modal-input"
          type="text"
          value={cuisine1}
          onChange={(e) => setCuisine1(e.target.value)}
        />
        <label className="modal-label">Image:</label>
        <input
          className="modal-input"
          type="file"
          onChange={handleImageChange}
        />
        <label className="modal-label">Ingredients:</label>
        <textarea
          className="modal-input"
          type="text"
          value={ingredients1}
          onChange={(e) => setIngredients1(e.target.value)}
        />

        <button className="modal-button" type="submit" onClick={handleEditSubmit}>
          Update Recipe
        </button>
      </form>
    </Modal>
           <Modal  isOpen={isViewRecipeModalOpen} onRequestClose={() => setIsViewRecipeModalOpen(false)} className="recipe_modal">
           <div className="scheduled-meal-card">
           <h2 className="modal-title">Recipe</h2>
      <form className="modal-form" onSubmit={handleSubmit}>
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
        
      </form>
            </div>
      
    </Modal>

      <div
        className="carousel"
        ref={carouselRef}
        onContextMenu={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        style={{ display: "flex", overflowX: "scroll" }}
      >
        <div style={{ display: "flex", gap: "40px", marginLeft:"2%"}}>
          {recipes?.map((recipe) => (
            <div
              key={recipe.id}
             
              style={{
                flex: "0 0 auto",
              }}
            >
                <div className="student-wrapper">

                  <Recipe handleViewRecipe={handleViewRecipe} handleEditClick={handleEditClick} recipe={recipe}/>
                 
                </div>
                
            </div>
            
          ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;
