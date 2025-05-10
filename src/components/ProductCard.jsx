import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const name = product.product_name || 'No name available';
  const image = product.image_url;
  const category = product.categories || 'Unknown';
  const nutritionGrade = product.nutrition_grades || 'N/A';

  // Shorten category text if too long
  const shortCategory = category.length > 30 ? category.slice(0, 30) + '...' : category;

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '10px',
      width: '250px',
      background: '#eeeee9'
    }}>
      <h3>{name}</h3>

      {image ? (
        <img 
          src={image} 
          alt={name} 
          style={{ width: '100%', height: '200px', objectFit: 'contain' }}
        />
      ) : (
        <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          No image available
        </div>
      )}

      <p><strong>Category:</strong> {shortCategory}</p>
      <p><strong>Nutrition Grade:</strong> {nutritionGrade}</p>

      <Link to={`/product/${product.code}`}>
        <button style={{ padding: '8px 16px', marginTop: '10px', background: 'red', border: 'none', borderRadius: '5px', color: 'white' }}>
          View Details
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;
