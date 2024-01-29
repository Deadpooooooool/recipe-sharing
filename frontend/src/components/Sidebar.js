// src/components/Sidebar.js
import React from 'react';
import Filters from './Filters';
import SearchBar from './SearchBar'; // Import the SearchBar component
import useRecipeStore from '../store/recipeStore';

const Sidebar = () => {
  const { searchRecipes } = useRecipeStore(); // Get the searchRecipes function from the store

  const handleSearch = async (query) => {
    if (query.trim()) {
      await searchRecipes(query);
    }
  };

  return (
    <div className="sidebar">
      <SearchBar onSearch={handleSearch} />
      <Filters />
      {/* Add more sidebar content here */}
    </div>
  );
};

export default Sidebar;
