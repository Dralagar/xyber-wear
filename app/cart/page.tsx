"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  color?: string;
  designName?: string;
  nftIncluded: boolean;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Cyberpunk Hoodie",
      price: 89.99,
      quantity: 1,
      image: "/images/cyber-hoodie.jpg",
      size: "L",
      color: "Cyber Purple",
      nftIncluded: true,
    },
    {
      id: "2",
      name: "Digital Asset Pack",
      price: 149.99,
      quantity: 1,
      image: "/images/nft-pack.jpg",
      nftIncluded: true,
    },
    {
      id: "3",
      name: "Custom Design - Dragon",
      price: 49.98,
      quantity: 1,
      size: "M",
      color: "Neon Pink",
      designName: "Dragon Design",
      nftIncluded: true,
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Promo codes
  const promoCodes: { [key: string]: { discount: number; type: "percentage" | "fixed" } } = {
    "WELCOME10": { discount: 10, type: "percentage" },
    "XYBER20": { discount: 20, type: "percentage" },
    "FREESHIP": { discount: 10, type: "fixed" },
  };

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("xyberwear_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem("xyberwear_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    const code = promoCode.toUpperCase();
    if (promoCodes[code]) {
      setPromoApplied(true);
      setPromoError("");
      alert(`Promo code ${code} applied successfully!`);
    } else {
      setPromoError("Invalid promo code");
      setPromoApplied(false);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateDiscount = () => {
    if (!promoApplied) return 0;
    const subtotal = calculateSubtotal();
    const code = promoCode.toUpperCase();
    const promo = promoCodes[code];
    
    if (!promo) return 0;
    
    if (promo.type === "percentage") {
      return subtotal * (promo.discount / 100);
    } else {
      return Math.min(promo.discount, subtotal);
    }
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    if (subtotal > 100) return 0;
    return 9.99;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateShipping();
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate checkout process
    setTimeout(() => {
      setIsProcessing(false);
      alert("Order placed successfully! Thank you for shopping with Xyberwear.");
      setCartItems([]);
      localStorage.removeItem("xyberwear_cart");
    }, 2000);
  };

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 pt-20">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center max-w-md mx-auto">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
            <p className="text-gray-400 mb-8">
              Looks like you haven't added any items to your cart yet.
              Explore our collections and find something amazing!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
              >
                Browse Products
              </Link>
              <Link
                href="/customize"
                className="px-6 py-3 rounded-lg border-2 border-purple-500 text-purple-400 font-semibold hover:bg-purple-500 hover:text-white transition"
              >
                Create Custom Design
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-900 to-pink-900 py-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-2 text-3xl md:text-4xl font-bold text-white">Shopping Cart</h1>
          <p className="text-purple-100">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-purple-500/50 transition-all"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                    {item.image ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    ) : (
                      <span className="text-3xl">👕</span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-white">{item.name}</h3>
                        {item.designName && (
                          <p className="text-sm text-purple-400">Design: {item.designName}</p>
                        )}
                        <div className="flex gap-3 mt-1 text-xs text-gray-400">
                          {item.size && <span>Size: {item.size}</span>}
                          {item.color && <span>Color: {item.color}</span>}
                          {item.nftIncluded && (
                            <span className="text-green-400">✓ NFT Included</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-500 hover:text-red-400 transition"
                        aria-label="Remove item"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg bg-gray-700 text-white hover:bg-purple-600 transition"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-12 text-center text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-gray-700 text-white hover:bg-purple-600 transition"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-400">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500">
                          ${item.price.toFixed(2)} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <div className="text-center pt-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-500 transition"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-xs text-red-400 mt-1">{promoError}</p>
                )}
                {promoApplied && (
                  <p className="text-xs text-green-400 mt-1">✓ Promo code applied!</p>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-gray-700 pt-4">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                {calculateDiscount() > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount</span>
                    <span>-${calculateDiscount().toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>
                    {calculateShipping() === 0 ? "Free" : `$${calculateShipping().toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                  {calculateSubtotal() > 100 && (
                    <p className="text-xs text-green-400 mt-2">✓ Free shipping applied!</p>
                  )}
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Proceed to Checkout"}
              </button>

              {/* Payment Methods */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 mb-3">Secure payments via</p>
                <div className="flex justify-center gap-2 text-xl">
                  <span>💳</span>
                  <span>💰</span>
                  <span>₿</span>
                  <span>✦</span>
                  <span>🪙</span>
                </div>
              </div>

              {/* Guarantee */}
              <div className="mt-6 p-4 bg-gray-700/30 rounded-lg text-center">
                <div className="text-sm text-gray-400">
                  🔒 Secure Checkout<br/>
                  ✓ 30-Day Returns<br/>
                  ✓ NFT Guarantee
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Neon Genesis Tee", price: 39.99, emoji: "👕" },
              { name: "Holographic Snapback", price: 49.99, emoji: "🧢" },
              { name: "Cyber Socks", price: 19.99, emoji: "🧦" },
              { name: "Digital Art Frame", price: 399.99, emoji: "🖼️" },
            ].map((product, idx) => (
              <div key={idx} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-purple-500 transition group cursor-pointer">
                <div className="h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-4xl">{product.emoji}</span>
                </div>
                <h3 className="font-semibold text-white mb-1">{product.name}</h3>
                <p className="text-purple-400 font-bold mb-2">${product.price}</p>
                <button className="w-full py-1 rounded-lg border border-purple-500 text-purple-400 text-sm hover:bg-purple-500 hover:text-white transition">
                  Quick Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;