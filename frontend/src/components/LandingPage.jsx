
import {useContext , useEffect, useState} from 'react'
import UserContext from '../context/UserContext'
import ContextInitializer from './ContextInitializer'
import Navbar from './Navbar'
import UserInfoBar from './UserInfoBar'
import Recipe from './Recipe'
import Carousel from './Carousel'
import CreateRecipeModal from './CreateRecipeModal';
import EditRecipeModal from './EditRecipeModal '
import Modal from 'react-modal'
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css';
import "../styles/LandingPageButtons.css"
import ScheduledMealCard from './ScheduledMealCard';
const LandingPage = () => {
  const {state , dispatch} = useContext(UserContext)
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isScheduledMealsModalOpen, setIsScheduledMealsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [scheduledMeals, setScheduledMeals] = useState(state.meals);
  useEffect(()=>{
    setScheduledMeals(state.meals)
  })
 const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  
  const openScheduleModal = () => {
    setIsScheduleModalOpen(true);
  };
  const openScheduledMealsModal = () => {
    setIsScheduledMealsModalOpen(true);
  };

  const closeScheduleModal = () => {
    setIsScheduleModalOpen(false);
  };
  const closeScheduledMealsModal = () => {
    setIsScheduledMealsModalOpen(false);
  };

  const handleCreateRecipe = async(formData) => {
    console.log('Creating recipe with data:', formData);
    const response = await fetch('http://127.0.0.1:8000/api/user/create-post' , {
      method:"POST",
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('token')}` 
      },
      body:formData
    })
    const data = await response.json()
    console.log(data)
    dispatch({
      type:'CREATE_POST',
      payload:data.data
    })
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  console.log()
  const combinedRecipes = state.posts && [...state.posts, ...state.likes];
  const handleScheduleMeal = async () => {
    if (selectedRecipe && selectedDate) {
      const response = await fetch('http://127.0.0.1:8000/api/user/plan-meal', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: selectedRecipe,
          serving_day: selectedDate.toISOString()
        }),
      });
  
      const data = await response.json();
      dispatch({
        type: 'CREATE_MEAL',
        payload: data.data,
      });
    
    } else {
      console.log('Please select a recipe and a date.');
    }
  };
  const handleRemoveMeal = (mealId) => {
    
    setScheduledMeals(scheduledMeals.filter((meal) => meal.id !== mealId));
  };
  return (
    <div>
      <ContextInitializer />
      <Navbar />
      <UserInfoBar user={state} />
      <div className='button-container'>
        <button className='single-button' onClick={openCreateModal}>Create Recipe</button>
        <button className='single-button' onClick={openScheduleModal}>Schedule Meal</button>
        <button className='single-button' onClick={openScheduledMealsModal}>Scheduled Meals</button>
      </div>
      

      <CreateRecipeModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onCreateRecipe={handleCreateRecipe}
      />

      <Modal
        isOpen={isScheduleModalOpen}
        onRequestClose={closeScheduleModal}
        className="modal"
      >
        <h2 className='header'>Schedule a Meal</h2>
        <div style={{marginLeft:"25px"}}>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="calendar"
          
        />
        </div>
       <div>
       <select className='option-item'
            value={selectedRecipe}
            onChange={(e) => setSelectedRecipe(e.target.value)}
            style={{width:"88%" , marginTop:"10px" , marginBottom:"10px"}}
          >
            <option className='option-item' value="">Select a recipe</option>
            {console.log(combinedRecipes)}
            {state.likes?.map((recipe) => (
              <option className='option-item' _id={recipe?.post_id} key={recipe?.post_id} value={recipe?.post_id}>
                {recipe?.post?.name}
              </option>
            ))}
            {state.posts?.map((recipe) => (
              <option className='option-item' _id={recipe.id} key={recipe.id} value={recipe.id}>
                {recipe.name !== '' && recipe.name}
              </option>
            ))}
          </select>
       </div>
       <button className="add-to-shelve-button s" onClick={handleScheduleMeal}>Schedule Meal</button>
      </Modal>
      <Modal
        isOpen={isScheduledMealsModalOpen}
        onRequestClose={closeScheduledMealsModal}
        className="modal-rec"
      >
        <div className='scheduled-meals' style={{height:"700px"  , overflowY:"scroll"}}>
        {scheduledMeals?.map((meal) => (
          <ScheduledMealCard
            key={meal.id}
            meal={meal}
           
          />
        ))}
      </div>
        
      
      </Modal>
          
      <Carousel recipes={state.posts} />
    </div>
  );
};

export default LandingPage;
