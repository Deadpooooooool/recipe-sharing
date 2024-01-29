import React, { useState, useEffect } from 'react';
import { FormGroup, Label } from 'reactstrap';
import useRecipeStore from '../store/userStore';
import useUserStore from '../store/recipeStore';

const Filters = ({ onFilterChange, filters }) => {
  const tag = useRecipeStore((state) => state.tags);

  const [selectedDifficulties, setSelectedDifficulties] = useState(filters?.selectedDifficulties || []);

  const FiltersTag = useUserStore((state) => state.getRecipesByTags);

  const handleDifficultyChange = (tagId) => {
    setSelectedDifficulties((prevSelected) => {
      if (prevSelected.includes(tagId)) {
        return prevSelected.filter((selectedId) => selectedId !== tagId);
      } else {
        return [...prevSelected, tagId];
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await FiltersTag(selectedDifficulties);
    };

    fetchData();
  }, [selectedDifficulties, FiltersTag]);

  return (
    <div>
      <FormGroup>
        <Label className='m-2' for="difficultySelect">Filters</Label>
        <br />
        {tag.map((tagOption) => (
          <button
            style={{ margin: '10px', borderRadius: '20px', backgroundColor: selectedDifficulties.includes(tagOption.id) ? '#6bc36a' : 'initial' }}
            key={tagOption.id}
            className="tag"
            onClick={() => handleDifficultyChange(tagOption.id)}
          >
            {tagOption.name}
          </button>
        ))}
      </FormGroup>
    </div>
  );
};

export default Filters;
