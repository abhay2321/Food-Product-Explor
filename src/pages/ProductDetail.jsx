import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getProductByBarcode } from '../services/api';
import '../App.css'

const ProductDetail = () => {
  const { barcode } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductByBarcode(barcode);
      setProduct(productData);
      setLoading(false);
    };
    fetchProduct();
  }, [barcode]);

  if (loading) {
    return(
      <div
      className="vh-100"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}
    >
      <div className="loader"></div>
    </div>
    )
  }

  if (!product) {
    return <div style={{ textAlign: 'center', padding: '40px'}}>Product not found</div>;
  }

  return (
    <section className="product-details-card container">
      <div className="container-card bg-white-box">
    <div className='title'>
      <h1>{product.product_name || 'No name available'}</h1>
      </div>
      <div style={{ display: 'flex', gap: '40px', marginBottom: '30px' }}>
        <div style={{ flex: '0 0 300px' }}>
          {product.image_url ? (
            <img 
              src={product.image_url} 
              alt={product.product_name} 
              style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
            />
          ) : (
            <div style={{ 
              height: '300px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '1px solid #ddd'
            }}>
              No image available
            </div>
          )}
        </div>
        
        <div class="deatil">
          <h3 class="det-heading">Product Information</h3>
          <p class="det"><strong>Barcode:</strong> {product.code || 'N/A'}</p>
          <p class="det"><strong>Brand:</strong> {product.brands || 'N/A'}</p>
          <p class="det"><strong>Categories:</strong> {product.categories || 'N/A'}</p>
          <p class="det"><strong>Nutrition Grade:</strong> {product.nutrition_grades || 'N/A'}</p>
          
          <h3 style={{ marginTop: '20px' }}>Nutrition Facts (per 100g)</h3>
          {product.nutriments ? (
            <ul>
              <li>Energy: {product.nutriments.energy || 'N/A'} kcal</li>
              <li>Fat: {product.nutriments.fat || 'N/A'}g</li>
              <li>Carbohydrates: {product.nutriments.carbohydrates || 'N/A'}g</li>
              <li>Proteins: {product.nutriments.proteins || 'N/A'}g</li>
              <li>Sugars: {product.nutriments.sugars || 'N/A'}g</li>
            </ul>
          ) : (
            <p>No nutrition information available</p>
          )}
        </div>
      </div>
      
      {/* <div style={{ marginTop: '30px' }}>
        <h3>Ingredients</h3>
        <p>{product.ingredients_text || 'No ingredients information available'}</p>
      </div> */}
      <div className="product-card-backBtn">
     <NavLink to="/" className="backBtn">
        <button className="goback-btn">Go back</button>
     </NavLink>
  </div>
    </div>
   
    </section>
    
  );
};

export default ProductDetail;