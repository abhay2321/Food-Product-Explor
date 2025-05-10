import React, { useState } from 'react';

const Filter = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const reliableCategories = [
    { id: 'en:snacks', name: 'Snacks' },
    { id: 'en:beverages', name: 'Beverages' },
    { id: 'en:dairy', name: 'Dairy' },
    { id: 'en:fruits', name: 'Fruits' },
    { id: 'en:vegetables', name: 'Vegetables' }
  ];

  const handleChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <div className="filter-row">
      <div class="filter-container">
      <select
        value={selectedCategory}
        onChange={handleChange}
        className="category-select"
        aria-label="Select food category"
      >
        <option value="">All Categories</option>
        {reliableCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      </div>
    </div>
  );
};

export default Filter;

//! fetchilg all categories
// import React, { useState, useEffect } from 'react';
// import { getCategories } from '../services/api';

// const Filter = ({ onCategoryChange }) => {
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadCategories = async () => {
//       const categories = await getCategories();
//       setCategories(categories);
//       setLoading(false);
//     };
//     loadCategories();
//   }, []);

//   const handleChange = (e) => {
//     const categoryId = e.target.value;
//     setSelectedCategory(categoryId);
//     onCategoryChange(categoryId);
//   };

//   if (loading) {
//     return <div style={{ padding: '8px' }}>Loading categories...</div>;
//   }

//   return (
//     <div style={{ margin: '10px 0' }}>
//       <select
//         value={selectedCategory}
//         onChange={handleChange}
//       >
//         <option value="">All Categories</option>
//         {categories.map((category) => (
//           <option key={category.id} value={category.id}>
//             {category.name} ({category.products.toLocaleString()})
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default Filter;



