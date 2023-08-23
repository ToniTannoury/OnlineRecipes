import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/CreateRecipeModal.css'; 

const CreateRecipeModal = ({ isOpen, onClose, onCreateRecipe }) => {
  const [cuisine, setCuisine] = useState('');
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState('');
  const [name, setName] = useState('');

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('cuisine', cuisine);
    formData.append('image_url', image);
    formData.append('ingredients', ingredients);
    formData.append('name', name);

    onCreateRecipe(formData);

    setCuisine('');
    setImage(null);
    setIngredients('');
    setName('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
      <h2 className="modal-title">Create Recipe</h2>
      <form className="modal-form" onSubmit={handleSubmit}>
        <label className="modal-label">Name:</label>
          <input
            className="modal-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        <label className="modal-label">Cuisine:</label>
        <input
          className="modal-input"
          type="text"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
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
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        
        <button className="modal-button" type="submit">Create Recipe</button>
      </form>
    </Modal>
  );
};

export default CreateRecipeModal;
