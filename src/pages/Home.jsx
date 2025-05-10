import React, { useState, useEffect } from "react";
import {
  searchProducts,
  getProductsByCategory,
  getProductByBarcode,
} from "../services/api";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import '../App.css';

const Home = () => {
  // State variables
  const [products, setProducts] = useState([]);        // List of products to show
  const [loading, setLoading] = useState(false);       // To show loader while fetching
  const [page, setPage] = useState(1);                 // Current page number
  const [hasMore, setHasMore] = useState(true);        // To decide whether to show 'Load More'
  const [searchTerm, setSearchTerm] = useState("");    // Current search input
  const [categoryFilter, setCategoryFilter] = useState(""); // Category filter

  // Run once on component mount to load initial products
  useEffect(() => {
    fetchInitialProducts();
  }, []);

  // Fetch default products (blank search)
  const fetchInitialProducts = async () => {
    setLoading(true);
    try {
      const initial = await searchProducts(""); // Default search without filter
      setProducts(initial);
      setHasMore(initial.length > 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  //! When user searches a product by name
  const handleSearch = async (query) => {
    setLoading(true);         // Show loading spinner
    setSearchTerm(query);     // Save search query
    setPage(1);               // Reset to first page

    try {
      const results = await searchProducts(query); // Call API
      setProducts(results || []);                  // Set fetched products
      setHasMore(results.length > 0);              // Show "Load More" if needed
    } catch (error) {
      console.error("Error searching products:", error);
    }
    setLoading(false);        // Hide loading spinner
  };

  //! When user searches by barcode
  const handleBarcodeSearch = async (barcode) => {
    setLoading(true);
    try {
      const product = await getProductByBarcode(barcode);
      setProducts(product ? [product] : []);
      setHasMore(false); // Barcode returns single item
    } catch (error) {
      console.error("Error searching by barcode:", error);
    }
    setLoading(false);
  };

  //
  const handleCategoryFilter = async (categoryId) => {
  setLoading(true);
  setCategoryFilter(categoryId);
  setPage(1);
  
  try {
    const results = categoryId
      ? await getProductsByCategory(categoryId)
      : await searchProducts("");
    
    setProducts(results);
    setHasMore(results.length > 0);
    
    // Scroll to results after filtering
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    console.error("Error filtering products:", error);
  } finally {
    setLoading(false);
  }
};

  //! Sort products list
  const handleSort = (option) => {
    setProducts((prev) => {
      const sorted = [...prev];
      switch (option) {
        case "name-asc":
          return sorted.sort((a, b) =>
            (a.product_name || "").localeCompare(b.product_name || "")
          );
        case "name-desc":
          return sorted.sort((a, b) =>
            (b.product_name || "").localeCompare(a.product_name || "")
          );
        case "grade-asc":
          return sorted.sort((a, b) =>
            (a.nutrition_grades || "").localeCompare(b.nutrition_grades || "")
          );
        case "grade-desc":
          return sorted.sort((a, b) =>
            (b.nutrition_grades || "").localeCompare(a.nutrition_grades || "")
          );
        default:
          return prev;
      }
    });
  };

  //! Load more products on next page
  const loadMoreProducts = async () => {
    setLoading(true);
    const nextPage = page + 1;
    try {
      const newProducts = await searchProducts(searchTerm, nextPage);

      if (newProducts.length === 0) {
        setHasMore(false); // No more products
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more products:", error);
    }
    setLoading(false);
  };

  return (
    <div class="header-container">
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", background: '#aac0cb' }}>
      <h1 style={{ fontFamily: 'initial', textShadow: '2px 2px 2px', color: 'red' }}>
        Food Product Explorer
      </h1>

      {/* Search, Filter, Sort */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <SearchBar onSearch={handleSearch} onBarcodeSearch={handleBarcodeSearch} />
        <div style={{ display: "flex", gap: "20px" }}>
          <Filter onCategoryChange={handleCategoryFilter} />
          <Sort onSortChange={handleSort} />
        </div>
      </div>

      {/* Loader */}
      {loading && products.length === 0 ? (
        <div className="vh-100" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
          <div className="loader"></div>
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          No products found
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px"
          }}>
            {products.map((product, index) => (
              <ProductCard key={product.id || product._id || index} product={product} />
            ))}
          </div>

          {/* Load More Button */}
          <Pagination
            onLoadMore={loadMoreProducts}
            hasMore={hasMore && !loading}
            loading={loading}
          />
        </>
      )}
    </div>
    </div>
  );
};

export default Home;
