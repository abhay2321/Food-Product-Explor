import React, { useState } from 'react';

const Sort = ({ onSortChange }) => {
  const [sortOption, setSortOption] = useState('');

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    onSortChange(option);
  };

  return (
    <div className="filter-row">
      <div class="filter-container">
      <select 
        value={sortOption} 
        onChange={handleSortChange}
        className='category-select'
      >
        <option class="option" value="">Default Sorting</option>
        <option class="option" value="name-asc">Name (A-Z)</option>
        <option class="option" value="name-desc">Name (Z-A)</option>
        <option class="option" value="grade-asc">Nutrition Grade (A-E)</option>
        <option class="option" value="grade-desc">Nutrition Grade (E-A)</option>
      </select>
      </div>
    </div>
  );
};

export default Sort;