import axios from 'axios';

const API_BASE_URL = 'https://world.openfoodfacts.org';

export const searchProducts = async (query, page = 1) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cgi/search.pl`, {
      params: {
        search_terms: query,
        json: true,
        page_size: 24,
        page
      }
    });
    return response.data.products || [];
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

export const getProductByBarcode = async (barcode) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v0/product/${barcode}.json`);
    return response.data.product || null;
  } catch (error) {
    console.error('Error fetching product by barcode:', error);
    return null;
  }
};

// UPDATED: Uses proper path (categories not category) and .json
// export const getProductsByCategory = async (category) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/category/${category}.json`);
//     return response.data.products || [];
//   } catch (error) {
//     console.error('Error fetching products by category:', error);
//     return [];
//   }
// };

// Get all available categories
export const getCategories = async () => {
  try {
    const response = await axios.get('https://world.openfoodfacts.org/facets/categories.json');
    // Filter to only include categories with significant product counts
    return response.data.tags
      .filter(category => category.products > 10000) // Only categories with >10k products
      .sort((a, b) => b.products - a.products) // Sort by product count descending
      .slice(0, 20); // Take top 20 categories
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Get products by category ID
export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get('https://world.openfoodfacts.org/cgi/search.pl', {
      params: {
        json: true,
        page_size: 24,
        action: 'process',
        tagtype_0: 'categories',
        tag_contains_0: 'contains',
        tag_0: categoryId,
        sort_by: 'unique_scans_n'
      }
    });
    return response.data.products || [];
  } catch (error) {
    console.error('Error fetching category products:', error);
    return [];
  }
};

