import React from 'react';

const Pagination = ({ onLoadMore, hasMore, loading }) => {
  if (!hasMore) return null;
  
  return (
    <div style={{ textAlign: 'center', margin: '20px 0'}}>
      <button 
        onClick={onLoadMore} 
        disabled={loading}
        style={{ padding: '10px 20px', fontSize: 'large', borderRadius: '4px', background: '#c4abc4'}}
      >
        {loading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
};

export default Pagination;