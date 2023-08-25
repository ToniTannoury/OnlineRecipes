import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import '../styles/Navbar.css';
import { useNavigate, Link } from 'react-router-dom';
import Modal from 'react-modal';
import ExpandableTree from './ExpandableTree';

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [isShoppingListModalOpen, setIsShoppingListModalOpen] = useState(false);
  const [newList, setNewList] = useState('');
  const [expandedTrees, setExpandedTrees] = useState({}); 
  console.log(state)
  const openShoppingListModal = () => {
    setIsShoppingListModalOpen(true);
  };

  const closeShoppingListModal = () => {
    setIsShoppingListModalOpen(false);
    setNewList('');
  };

  const handleDeleteList = async(listId) => {
    const response = await fetch(`http://127.0.0.1:8000/api/user/delete-shopping-lists/${listId}` , {
      method:"DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
    const data = await response.json()
    console.log(data)
    dispatch({
      type: 'DELETE_SHOPPING_LIST',
      payload: listId,
    });
  };

  const handleAddList =async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/user/shopping-lists` , {
      method:"POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        list: newList
      })
    })
    const data = await response.json()
    console.log(data)
    dispatch({
      type: 'ADD_SHOPPING_LIST',
      payload: {id:data.id , created_at: new Date().toISOString(), list: newList },
    });
  };

  const handleTreeClick = (treeId) => {
    setExpandedTrees((prevState) => ({
      ...prevState,
      [treeId]: !prevState[treeId],
    }));
  };
  const hanldeLogout = ()=>{
    localStorage.clear()
    navigate('/login')
  }
  return (
    <div className='nav-bar'>
      <div className='left-nav'>
        <h2 className='app-name'>OnlineRecipes</h2>
      </div>
      <div className='right-nav'>
             <h4>
               <Link className='link' to={'/LandingPage'}>Your Recipes</Link>
             </h4>
             <div>
               <h4>
                 <Link className='link' to={'/searchRecipes'}>Search for Recipes</Link>
               </h4>
             </div>
             <div>
               <h4>
                 <Link className='link' to={'/likes'}>Your likes</Link>
               </h4>
             </div>
             <div>
               <h4  className='link' onClick={openShoppingListModal}>Shopping List</h4>
          <Modal
            isOpen={isShoppingListModalOpen}
            onRequestClose={closeShoppingListModal}
            className='modal'
          >
            <h2>Shopping List</h2>
            {state.shopping_lists?.map((list) => (
              <div key={list.created_at}>
                <ExpandableTree
                  title={list.created_at}
                  id={list.id}
                  expanded={expandedTrees[list.id]}
                  onClick={() => handleTreeClick(list.id)} 
                >
                  {expandedTrees[list.id] && (
                    <div className='expandable-content'>
                      <div style={{width:"250px"}}>
                      {list.list}
                      </div>
                      
                      <button
                        className="add-to-shelve-button" 
                        onClick={() => handleDeleteList(list.id)}
                      >
                        {console.log(list)}
                        Delete List
                      </button>
                    </div>
                  )}
                </ExpandableTree>
              </div>
            ))}
             <input
               type='text'
               value={newList}
               onChange={(e) => setNewList(e.target.value)}
               placeholder='New List'
               className='new-list'
             />
            <button className="add-to-shelve-button"  onClick={handleAddList}>Add List</button>
             <button className="add-to-shelve-button"  onClick={closeShoppingListModal}>Close</button>
          </Modal>
        </div>
        <button onClick={hanldeLogout} className='logout-button'>logout</button>
      </div>
    </div>
  );
};

export default Navbar;