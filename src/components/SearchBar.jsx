import React, { useState } from 'react';

const SearchBar = ({ onSearch, onBarcodeSearch }) => {
  const [nameInput, setNameInput] = useState('');
  const [barcodeInput, setBarcodeInput] = useState('');

  // Handle search by product name
  const searchByName = (e) => {
    e.preventDefault();

    if (!nameInput.trim()) {
      alert('Please enter a product name');
      return;
    }

    onSearch(nameInput.trim());
  };

  // Handle search by barcode
  const searchByBarcode = (e) => {
    e.preventDefault();

    if (!barcodeInput.trim()) {
      alert('Please enter a barcode');
      return;
    }

    onBarcodeSearch(barcodeInput.trim());
  };

  return (
  //  <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
     <div class="search-container">
      {/* Product Name Search */}
      <form onSubmit={searchByName} >
        <div class="search-row">
        <input
          type="text"
          class="search-input"
          placeholder="Search by product name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <button class="search-btn" type="submit">Search</button>
        </div>
      </form>

      {/* Barcode Search */}
      <form onSubmit={searchByBarcode} style={{ display: 'flex', gap: '10px' }}>
        <div class="search-row">
        <input
          type="text"
          class="search-input"
          placeholder="Search by barcode"
          value={barcodeInput}
          onChange={(e) => setBarcodeInput(e.target.value)}
        />
        <button class="search-btn" type="submit">Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
