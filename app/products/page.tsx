"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  category?: string;
  inStock?: boolean;
  rating?: number;
  featured?: boolean;
}

interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  search: string;
}

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Fetching products from API...");
      const response = await axios.get<Product[]>("/api/products", {
        timeout: 15000,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      console.log("Products received:", response.data.length);
      setProducts(response.data);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      
      let errorMessage = "We couldn't load products. ";
      
      if (err.code === "ECONNABORTED") {
        errorMessage += "Request timeout. Please check your connection.";
      } else if (err.response?.status === 404) {
        errorMessage += "API endpoint not found.";
      } else if (err.response?.status === 500) {
        errorMessage += "Server error. Please try again later.";
      } else if (err.message === "Network Error") {
        errorMessage += "Network error. Please check your internet connection.";
      } else if (err.response?.data?.error) {
        errorMessage += err.response.data.error;
      } else {
        errorMessage += err.message || "Unknown error occurred.";
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, retryCount]);

  const retry = useCallback(() => {
    setRetryCount(prev => prev + 1);
  }, []);

  return {
    products,
    isLoading,
    error,
    retry,
    refetch: fetchProducts,
  };
};

const useFilteredProducts = (products: Product[], filters: Filters) => {
  return useMemo(() => {
    return products.filter((product) => {
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }
      if (filters.inStockOnly && product.inStock === false) {
        return false;
      }
      return true;
    });
  }, [products, filters]);
};

const ProductsPage = () => {
  const { products, isLoading, error, retry, refetch } = useProducts();
  
  const [filters, setFilters] = useState<Filters>({
    category: "",
    minPrice: 0,
    maxPrice: 1000,
    inStockOnly: false,
    search: "",
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name-asc" | "name-desc">("name-asc");

  const filteredProducts = useFilteredProducts(products, filters);
  
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category).filter(Boolean));
    return Array.from(cats);
  }, [products]);

  const handleAddToCart = (product: Product) => {
    console.log("Added to cart:", product);
    // You can add a toast notification here
    alert(`✨ ${product.name} added to cart!`);
  };

  const handleFilterChange = (key: keyof Filters, value: string | number | boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      minPrice: 0,
      maxPrice: 1000,
      inStockOnly: false,
      search: "",
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="loading-spinner"></div>
        <p className="mt-4 text-gray-400">Loading futuristic products...</p>
        <p className="mt-2 text-xs text-gray-500">Fetching from API...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-4">
        <div className="max-w-md rounded-xl border border-red-800 bg-red-900/20 p-8 text-center">
          <div className="mb-4 text-6xl">⚠️</div>
          <h2 className="mb-4 text-2xl font-bold text-red-400">Connection Error</h2>
          <p className="mb-4 text-gray-300 whitespace-pre-wrap">{error}</p>
          <div className="space-y-3">
            <button
              onClick={retry}
              className="w-full rounded-lg bg-indigo-600 px-6 py-2 font-semibold text-white transition hover:bg-indigo-500"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full rounded-lg border border-gray-600 px-6 py-2 font-semibold text-gray-300 transition hover:bg-gray-800"
            >
              Reload Page
            </button>
          </div>
          <div className="mt-4 rounded-lg bg-gray-800 p-3 text-left">
            <p className="text-xs text-gray-400">💡 Tip: Make sure your Next.js dev server is running correctly. The API route should be at <code className="text-indigo-400">/api/products</code></p>
          </div>
        </div>
      </div>
    );
  }

  if (sortedProducts.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-4">
        <div className="text-center">
          <div className="mb-4 text-6xl">🔍</div>
          <h3 className="mb-2 text-xl font-semibold text-white">No products found</h3>
          <p className="text-gray-400">
            {filters.search || filters.category
              ? "Try adjusting your filters or search terms"
              : "No products are available yet. Please check back soon."}
          </p>
          {(filters.search || filters.category) && (
            <button
              onClick={clearFilters}
              className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Clear Filters
            </button>
          )}
          <button
            onClick={refetch}
            className="mt-2 ml-2 rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold text-gray-300 transition hover:bg-gray-800"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-900 to-purple-900 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-white md:text-6xl animate-fade-in-up">
            Xyberwear Products
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-indigo-100 animate-fade-in-up animation-delay-200">
            Explore our latest cyber-inspired apparel and digital assets, crafted
            to bridge the gap between physical fashion and the metaverse.
          </p>
          <p className="mt-4 text-sm text-green-400 animate-fade-in-up animation-delay-300">
            ✓ {products.length} products available
          </p>
        </div>
      </section>

      {/* Controls Bar */}
      <div className="sticky top-0 z-10 border-b border-gray-800 bg-gray-900/90 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 lg:max-w-md"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>

              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white transition-all hover:border-indigo-500">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => handleFilterChange("inStockOnly", e.target.checked)}
                  className="rounded border-gray-600 bg-gray-700 text-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                />
                In Stock Only
              </label>

              <div className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-3 py-1">
                <span className="text-xs text-gray-400">$</span>
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice || ""}
                  onChange={(e) => handleFilterChange("minPrice", Number(e.target.value))}
                  className="w-16 bg-transparent text-sm text-white focus:outline-none"
                />
                <span className="text-gray-400">-</span>
                <span className="text-xs text-gray-400">$</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice || ""}
                  onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value))}
                  className="w-16 bg-transparent text-sm text-white focus:outline-none"
                />
              </div>

              <button
                onClick={clearFilters}
                className="rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-300 transition-all hover:border-indigo-500 hover:text-indigo-400"
              >
                Clear
              </button>

              <div className="flex overflow-hidden rounded-lg border border-gray-700">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 text-sm transition-all ${
                    viewMode === "grid" 
                      ? "bg-indigo-600 text-white" 
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  ⊞ Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 text-sm transition-all ${
                    viewMode === "list" 
                      ? "bg-indigo-600 text-white" 
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  ☰ List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-12">
        <div
          className={`transition-all duration-500 ${
            viewMode === "grid"
              ? "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "flex flex-col gap-4"
          }`}
        >
          {sortedProducts.map((product, index) => (
            <div
              key={product._id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                variant={viewMode === "grid" ? "default" : "compact"}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-400 animate-fade-in-up">
          Showing {sortedProducts.length} of {filteredProducts.length} products
          {filters.category && ` in ${filters.category}`}
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;