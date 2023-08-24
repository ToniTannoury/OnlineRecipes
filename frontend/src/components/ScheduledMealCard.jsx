import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import Modal from "react-modal";
import "../styles/ScheduledMealCard.css";

const ScheduledMealCard = ({ meal }) => {
  console.log(meal);
  const { dispatch } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleRemoveMeal = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/user/delete-meal/${meal.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.ok) {
        dispatch({
          type: "REMOVE_MEAL",
          payload: meal.id,
        });

        console.log("Meal removed successfully");
      } else {
        console.error("Failed to remove meal");
      }
    } catch (error) {
      console.error("An error occurred:", error);
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
      style={{ textAlign: "center", marginBottom: "15px" }}
      className="meal-card"
    >
      {console.log(meal)}
      <img
        style={{ width: "300px", height: "200px" }}
        src={`http://127.0.0.1:8000/images/${meal?.post?.image_url}`}
        alt={meal.post?.name}
      />
      <p>{meal.post?.name}</p>
      <p>Serving Date: {new Date(meal.serving_day).toLocaleDateString()}</p>
      <button className="add-to-shelve-button" onClick={handleRemoveMeal}>
        Remove
      </button>
      <button className="add-to-shelve-button" onClick={openModal}>
        View Recipe
      </button>

      <div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="recipe_modal"
        >
          <div className="scheduled-meal-card">
            <h2 className="modal-title">Recipe</h2>

            <div>
              <span className="modal-label">Name: </span>
              <span>{meal.post?.name}</span>
            </div>

            <div>
              <span className="modal-label">Cuisine: </span>
              <span>{meal.post?.cuisine}</span>
            </div>

            <div>
              <span className="modal-label">Ingredients:</span>
              <textarea
                className="modal-input"
                type="text"
                value={meal.post?.ingredients}
                disabled
                style={{ border: "none" }}
              />
            </div>
            <div>
              <span className="modal-label">Images:</span>
              <div>
                {meal.post?.images && meal.post?.images.length > 0 && (
                  <div className="image-navigation">
                    <img
                      className="scheduled-meal-card-image"
                      src={`http://127.0.0.1:8000/images/${meal.post?.images[currentImageIndex].image_url}`}
                      alt={`Image ${currentImageIndex + 1}`}
                    />
                    <div className="image-arrows">
                      <button
                      className="scheduled-meal-card-arrow"
                        onClick={() =>
                          setCurrentImageIndex((prevIndex) =>
                            prevIndex === 0
                              ? meal.post?.images.length - 1
                              : prevIndex - 1,
                          )
                        }
                      >
                        &lt;
                      </button>
                      <button
                       className="scheduled-meal-card-arrow"
                        onClick={() =>
                          setCurrentImageIndex((prevIndex) =>
                            prevIndex === meal.post?.images.length - 1
                              ? 0
                              : prevIndex + 1,
                          )
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
    </div>
  );
};

export default ScheduledMealCard;
