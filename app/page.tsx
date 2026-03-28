"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const HomePage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const features = [
    {
      icon: "🎨",
      title: "Custom Design Studio",
      description: "Create unique designs with our AI-powered customization tool.",
      color: "from-purple-500 to-pink-500",
      stats: "10K+ Designs Created"
    },
    {
      icon: "🔗",
      title: "Phygital Experience",
      description: "Every physical product comes with a unique NFT.",
      color: "from-blue-500 to-cyan-500",
      stats: "5K+ NFTs Minted"
    },
    {
      icon: "🌐",
      title: "Metaverse Ready",
      description: "Use your digital assets across 10+ virtual worlds.",
      color: "from-indigo-500 to-purple-500",
      stats: "Supported Platforms"
    },
    {
      icon: "⚡",
      title: "Instant Minting",
      description: "Mint your NFT instantly upon purchase.",
      color: "from-green-500 to-emerald-500",
      stats: "Under 2 Minutes"
    }
  ];

  const categories = [
    { name: "Apparel", count: 45, icon: "👕", gradient: "from-purple-500/20 to-pink-500/20" },
    { name: "Digital Assets", count: 28, icon: "💎", gradient: "from-blue-500/20 to-cyan-500/20" },
    { name: "Accessories", count: 32, icon: "🎒", gradient: "from-indigo-500/20 to-purple-500/20" },
    { name: "Limited Edition", count: 12, icon: "✨", gradient: "from-amber-500/20 to-orange-500/20" }
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Digital Artist",
      avatar: "AC",
      content: "Xyberwear changed how I think about fashion. The NFT integration is seamless.",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "Metaverse Architect",
      avatar: "SJ",
      content: "Finally, a brand that understands the future. The quality is incredible.",
      rating: 5
    },
    {
      name: "Marcus Rivera",
      role: "NFT Collector",
      avatar: "MR",
      content: "The phygital concept is genius. My hoodie came with an NFT that's already increased in value!",
      rating: 5
    }
  ];

  return (
    <main className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl"
          style={{
            left: mousePosition.x - 250,
            top: mousePosition.y - 250,
            transition: 'all 0.3s ease'
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      {/* Hero Section - Optimized with proper button spacing */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        
        <div className="container relative mx-auto max-w-6xl">
          <div className="text-center">
            {/* Live Badge - Added top margin to drop it down */}
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 mb-6 backdrop-blur-sm mt-6 md:mt-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm text-purple-300">Now Live - Genesis Collection</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="mb-4 md:mb-6 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight">
              Wear the Future,
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Own the Digital
              </span>
            </h1>
            
            {/* Description */}
            <p className="mx-auto mb-8 md:mb-10 max-w-2xl text-base md:text-lg text-gray-300 px-4">
              Experience the world's first phygital fashion platform. Every physical garment comes with an exclusive NFT, bridging reality and the metaverse.
            </p>
            
            {/* Buttons - Added proper spacing and margins */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 md:mb-16 px-4">
              <Link
                href="/products"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 md:px-10 py-3 md:py-3.5 font-semibold text-white transition-all hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 text-base md:text-lg min-w-[180px]"
              >
                <span className="relative z-10">Explore Collection</span>
                <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0" />
              </Link>
              
              <Link
                href="/customize"
                className="group relative overflow-hidden rounded-full border-2 border-purple-500 px-8 md:px-10 py-3 md:py-3.5 font-semibold text-purple-400 transition-all hover:bg-purple-500 hover:text-white hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 text-base md:text-lg min-w-[180px]"
              >
                <span className="relative z-10">Create Your Own</span>
                <div className="absolute inset-0 translate-y-full bg-purple-500/20 transition-transform duration-300 group-hover:translate-y-0" />
              </Link>
            </div>
            
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto px-4">
              {[
                { value: "10K+", label: "Happy Customers", icon: "👥" },
                { value: "5K+", label: "NFTs Minted", icon: "🎨" },
                { value: "50+", label: "Countries", icon: "🌍" },
                { value: "99%", label: "Satisfaction", icon: "⭐" }
              ].map((stat, i) => (
                <div key={i} className="text-center bg-gray-800/30 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-gray-700/50 hover:border-purple-500/50 transition-all hover:scale-105">
                  <div className="text-2xl md:text-3xl mb-1 md:mb-2">{stat.icon}</div>
                  <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-purple-500 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">Why Choose Xyberwear?</h2>
            <p className="mx-auto max-w-2xl text-gray-400">Experience the future of fashion with our innovative features</p>
          </div>
          
          <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 backdrop-blur-sm border border-gray-700/50 transition-all hover:scale-105 hover:border-purple-500/50"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <div className="relative">
                  <div className="mb-4 text-4xl md:text-5xl">{feature.icon}</div>
                  <h3 className="mb-2 text-lg md:text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mb-4 text-sm text-gray-400">{feature.description}</p>
                  <div className="text-xs text-purple-400 font-semibold">{feature.stats}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative py-16 md:py-24 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">Shop by Category</h2>
            <p className="mx-auto max-w-2xl text-gray-400">Discover our curated collections</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, i) => (
              <Link
                key={i}
                href={`/products?category=${category.name}`}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br p-6 transition-all hover:scale-105"
                style={{ 
                  background: `linear-gradient(135deg, rgba(139,92,246,0.1), rgba(236,72,153,0.1))`
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className="mb-4 text-5xl md:text-6xl">{category.icon}</div>
                  <h3 className="mb-2 text-xl md:text-2xl font-bold text-white">{category.name}</h3>
                  <p className="text-gray-400 text-sm md:text-base">{category.count} Products</p>
                  <div className="mt-4 inline-block rounded-full border border-purple-500 px-3 py-1 text-xs text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition">
                    Explore →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">Featured Collections</h2>
            <p className="mx-auto max-w-2xl text-gray-400">Hand-picked items from our latest drops</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Large Featured Card */}
            <div className="lg:row-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 p-6 md:p-8 group cursor-pointer min-h-[280px]">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white mb-3">
                    Limited Edition
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Genesis Collection</h3>
                  <p className="text-purple-100 text-sm md:text-base">Only 1000 pieces worldwide</p>
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all mt-4"
                >
                  Shop Now →
                </Link>
              </div>
            </div>
            
            {/* Standard Cards */}
            <div className="relative overflow-hidden rounded-2xl bg-gray-800/50 p-6 border border-gray-700 group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl md:text-4xl">👕</span>
                <span className="text-xs text-green-400">In Stock</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Cyberpunk Hoodie</h3>
              <p className="text-gray-400 text-sm mb-4">LED accents + NFT included</p>
              <div className="flex items-center justify-between">
                <span className="text-xl md:text-2xl font-bold text-purple-400">$89.99</span>
                <button className="rounded-full bg-purple-600 px-3 md:px-4 py-1.5 text-xs md:text-sm font-semibold text-white hover:bg-purple-500 transition">
                  Buy Now
                </button>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl bg-gray-800/50 p-6 border border-gray-700 group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl md:text-4xl">💎</span>
                <span className="text-xs text-purple-400">NFT Included</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Digital Asset Pack</h3>
              <p className="text-gray-400 text-sm mb-4">5 unique 3D wearables</p>
              <div className="flex items-center justify-between">
                <span className="text-xl md:text-2xl font-bold text-purple-400">$149.99</span>
                <button className="rounded-full bg-purple-600 px-3 md:px-4 py-1.5 text-xs md:text-sm font-semibold text-white hover:bg-purple-500 transition">
                  Buy Now
                </button>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl bg-gray-800/50 p-6 border border-gray-700 group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl md:text-4xl">👟</span>
                <span className="text-xs text-orange-400">Limited</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Digital Sneakers</h3>
              <p className="text-gray-400 text-sm mb-4">AR-enabled + NFT twin</p>
              <div className="flex items-center justify-between">
                <span className="text-xl md:text-2xl font-bold text-purple-400">$249.99</span>
                <button className="rounded-full bg-purple-600 px-3 md:px-4 py-1.5 text-xs md:text-sm font-semibold text-white hover:bg-purple-500 transition">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-10 md:mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-purple-500 px-6 md:px-8 py-2.5 md:py-3 font-semibold text-purple-400 transition-all hover:bg-purple-500 hover:text-white text-sm md:text-base"
            >
              View All Products
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-16 md:py-24 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">What Our Community Says</h2>
            <p className="mx-auto max-w-2xl text-gray-400">Join thousands of satisfied creators and collectors</p>
          </div>
          
          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="relative rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 backdrop-blur-sm border border-gray-700/50 transition-all hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm md:text-base">{testimonial.name}</h4>
                    <p className="text-xs md:text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <span key={j} className="text-yellow-500 text-sm">★</span>
                  ))}
                </div>
                <p className="text-gray-300 text-sm md:text-base">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative z-10">
              <h2 className="mb-4 text-2xl md:text-4xl font-bold text-white">Ready to Join the Future?</h2>
              <p className="mx-auto mb-6 md:mb-8 max-w-2xl text-purple-100 text-sm md:text-base">
                Start your phygital journey today. Get exclusive access to drops, NFT airdrops, and community events.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="rounded-full bg-white px-6 md:px-8 py-2.5 md:py-3 font-semibold text-purple-600 transition-all hover:shadow-lg hover:scale-105 text-sm md:text-base"
                >
                  Shop Now
                </Link>
                <Link
                  href="/newsletter"
                  className="rounded-full border border-white px-6 md:px-8 py-2.5 md:py-3 font-semibold text-white transition-all hover:bg-white/10 text-sm md:text-base"
                >
                  Join Newsletter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;