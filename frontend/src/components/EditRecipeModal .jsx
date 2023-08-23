import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/CreateRecipeModal.css';

const EditRecipeModal = ({ isOpen, onClose, onUpdateRecipe, recipe }) => {
  const [cuisine1, setCuisine1] = useState(recipe.cuisine);
  const [image1, setImage1] = useState(null);
  const [ingredients1, setIngredients1] = useState(recipe.ingredients);
  const [name1, setName1] = useState(recipe.name);

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

    onUpdateRecipe( formData);

    setCuisine1('');
    setImage1(null);
    setIngredients1('');
    setName1('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
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

        <button className="modal-button" type="submit">Update Recipe</button>
      </form>
    </Modal>
  );
};

export default EditRecipeModal;
