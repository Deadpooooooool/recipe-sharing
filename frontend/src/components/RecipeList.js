import React, { useState } from 'react';
import Filters from './Filters';
import RecipeCard from './RecipeCard';

const RecipeList = () => {
  const [filters, setFilters] = useState({
    selectedOption: '',
    // Add other filter properties as needed
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div>
      <Filters onFilterChange={handleFilterChange} filters={filters} />
      {/* Render RecipeCards based on the filters */}
      <RecipeCard filters={filters} />
    </div>
  );
};

export default RecipeList;
