import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import Modal from 'react-modal';

const ScheduledMealCard = ({ meal }) => {
  console.log(meal)
  const { dispatch } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemoveMeal = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/user/delete-meal/${meal.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.ok) {
        dispatch({
          type: 'REMOVE_MEAL',
          payload: meal.id,
        });

        console.log('Meal removed successfully');
      } else {
        console.error('Failed to remove meal');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
   
    <div
      _id={meal?.id}
      post_id={meal.post_id}
      style={{ textAlign: 'center', marginBottom: '15px' }}
      className="meal-card"
    >
       {console.log(meal)}
      <img
        style={{ width: '300px', height: '200px' }}
        src={`http://127.0.0.1:8000/images/${meal?.post?.image_url}`}
        alt={meal.post?.name}
      />
      <p>Meal Name: {meal.post?.name}</p>
      <p>Serving Date: {new Date(meal.serving_day).toLocaleDateString()}</p>
      <button onClick={handleRemoveMeal}>Remove</button>
      <button onClick={openModal}>View Recipe</button>

      <div >
        <Modal  isOpen={isModalOpen} onRequestClose={closeModal} className="modal">
          <div style={{height:"500px"}}>
          <h2>Meal</h2>
          <p>Meal Name: {meal.post?.name}</p>
          </div>
         
        </Modal>
      </div>
    
    </div>
  );
};

export default ScheduledMealCard;
