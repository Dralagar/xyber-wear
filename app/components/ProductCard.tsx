"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  category?: string;
  inStock?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, quantity?: number) => void;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  variant = "default",
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = async () => {
    if (onAddToCart) {
      setIsAdding(true);
      try {
        await onAddToCart(product);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
      } catch (error) {
        console.error("Failed to add to cart:", error);
      } finally {
        setIsAdding(false);
      }
    }
  };

  const variants = {
    default: {
      container: "group flex h-full flex-col justify-between rounded-xl border border-gray-800 bg-gray-900/60 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/10",
      title: "mb-2 text-xl font-semibold tracking-tight group-hover:text-indigo-300 transition-colors",
      price: "text-lg font-semibold text-indigo-300",
      button: "rounded-full border border-indigo-400 px-4 py-1 text-xs font-medium uppercase tracking-wide text-indigo-100 transition-all duration-300 hover:bg-indigo-500 hover:text-white hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed",
    },
    compact: {
      container: "group flex items-center gap-4 rounded-lg border border-gray-800 bg-gray-900/40 p-4 transition-all hover:border-indigo-400",
      title: "text-base font-semibold group-hover:text-indigo-300",
      price: "text-sm font-semibold text-indigo-300",
      button: "rounded-full border border-indigo-400 px-3 py-0.5 text-xs font-medium transition-all hover:bg-indigo-500",
    },
    featured: {
      container: "group relative overflow-hidden rounded-2xl border-2 border-indigo-500/30 bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-xl transition-all hover:scale-[1.02] hover:border-indigo-400",
      title: "mb-3 text-2xl font-bold tracking-tight group-hover:text-indigo-300",
      price: "text-2xl font-bold text-indigo-300",
      button: "rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25",
    },
  };

  const currentVariant = variants[variant];

  return (
    <article
      className={`${currentVariant.container} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      {product.imageUrl && (
        <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {variant === "featured" && (
            <div className="absolute right-2 top-2 rounded-full bg-indigo-600 px-2 py-1 text-xs font-bold text-white">
              Featured
            </div>
          )}
          {product.inStock === false && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
              <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-1 flex-col">
        {product.category && (
          <span className="mb-2 text-xs font-medium uppercase tracking-wider text-indigo-400">
            {product.category}
          </span>
        )}

        <h3 className={currentVariant.title}>{product.name}</h3>

        <p className="mb-4 mt-2 text-sm text-gray-300 line-clamp-3">
          {product.description}
        </p>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex flex-col">
          <span className={currentVariant.price}>
            ${product.price.toFixed(2)}
          </span>
          {product.inStock !== undefined && (
            <span
              className={`text-xs ${
                product.inStock ? "text-green-400" : "text-red-400"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          )}
        </div>

        {onAddToCart && product.inStock !== false && (
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={currentVariant.button}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        )}
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
          ✓ Added to cart!
        </div>
      )}
    </article>
  );
};

export default ProductCard;