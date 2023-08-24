import React, { useState, useEffect } from 'react';
import useDebounce from '../customHooks/useDebounce';
import Navbar from './Navbar';
import SearchCard from './SearchCard';
import ContextInitializer from './ContextInitializer';
import ExpandableTree from './ExpandableTree';
import ShoppingList from './ShoppingList';
import "../styles/SearchRecipes.css"
const SearchRecipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [searched, setSearched] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300); 

  useEffect(() => {
    if (!debouncedSearchTerm) return;

    const fetchRecipes = async () => {
      try {
        let response;
        if (searchType === 'name') {
          response = await fetch(`http://127.0.0.1:8000/api/user/recipes/searchByName/${debouncedSearchTerm}` , {
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
          });
        } else if (searchType === 'cuisine') {
          response = await fetch(`http://127.0.0.1:8000/api/user/recipes/searchByCuisine/${debouncedSearchTerm}`, {
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
          });
        } else if (searchType === 'ingredients') {
          response = await fetch(`http://127.0.0.1:8000/api/user/recipes/searchByIngredients/${debouncedSearchTerm}`, {
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
          });
        }
        const data = await response.json();
        console.log(data)
        setSearched(data.recipes.data)
        if (response.ok) {
          
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchRecipes();
  }, [debouncedSearchTerm, searchType]);

  return (
    <div>
      <ContextInitializer />
      <Navbar/>
      <input
      className='search-recipe-input'
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search recipes...'

      />
      <div className='radio-container'>
        <label>
          <input
           className='search-recipe-radio'
            type="radio"
            name="searchType"
            value="name"
            checked={searchType === 'name'}
            onChange={() => setSearchType('name')}
          />
          Name
        </label>
        <label>
          <input
            type="radio"
            name="searchType"
            value="cuisine"
            checked={searchType === 'cuisine'}
            onChange={() => setSearchType('cuisine')}
          />
          Cuisine
        </label>
        <label>
          <input
            type="radio"
            name="searchType"
            value="ingredients"
            checked={searchType === 'ingredients'}
            onChange={() => setSearchType('ingredients')}
          />
          Ingredients
        </label>
      </div>
      <div>
      {searchTerm && (
        <div>
          {searched?.map((recipe) => (
            <SearchCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
      </div>
      
    </div>
  );
};

export default SearchRecipes;
