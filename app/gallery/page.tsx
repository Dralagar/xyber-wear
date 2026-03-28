"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface NFT {
  id: string;
  name: string;
  creator: string;
  price: number;
  image: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  likes: number;
  views: number;
}

const NFTGalleryPage: React.FC = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const nfts: NFT[] = [
    {
      id: "1",
      name: "Cyberpunk Avatar",
      creator: "Alex Chen",
      price: 0.5,
      image: "/images/nft1.jpg",
      rarity: "Legendary",
      likes: 1234,
      views: 5678,
    },
    {
      id: "2",
      name: "Neon Dragon",
      creator: "Sarah Johnson",
      price: 0.3,
      image: "/images/nft2.jpg",
      rarity: "Epic",
      likes: 892,
      views: 3456,
    },
    {
      id: "3",
      name: "Digital Phoenix",
      creator: "Marcus Rivera",
      price: 0.8,
      image: "/images/nft3.jpg",
      rarity: "Legendary",
      likes: 2345,
      views: 8901,
    },
    {
      id: "4",
      name: "Cyber Samurai",
      creator: "Elena Zhang",
      price: 0.2,
      image: "/images/nft4.jpg",
      rarity: "Rare",
      likes: 567,
      views: 2345,
    },
    {
      id: "5",
      name: "Neon Cityscape",
      creator: "Tom Wilson",
      price: 0.4,
      image: "/images/nft5.jpg",
      rarity: "Epic",
      likes: 1456,
      views: 6789,
    },
    {
      id: "6",
      name: "Digital Ghost",
      creator: "Emma Thompson",
      price: 0.15,
      image: "/images/nft6.jpg",
      rarity: "Common",
      likes: 345,
      views: 1234,
    },
  ];

  const filteredNFTs = nfts.filter(nft => {
    if (filter !== "all" && nft.rarity.toLowerCase() !== filter) return false;
    if (searchTerm && !nft.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary": return "text-orange-400 bg-orange-400/10";
      case "Epic": return "text-purple-400 bg-purple-400/10";
      case "Rare": return "text-blue-400 bg-blue-400/10";
      default: return "text-gray-400 bg-gray-400/10";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-900 to-pink-900 py-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl md:text-5xl font-bold text-white">NFT Gallery</h1>
          <p className="mx-auto max-w-2xl text-lg text-purple-100">
            Explore exclusive digital assets from the Xyberwear collection. Own unique pieces that bridge physical and digital fashion.
          </p>
        </div>
      </section>

      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-y border-purple-500/30 py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">2,345+</div>
              <div className="text-sm text-gray-400">NFTs Minted</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">892</div>
              <div className="text-sm text-gray-400">Active Collectors</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">$124K+</div>
              <div className="text-sm text-gray-400">Total Volume</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">45</div>
              <div className="text-sm text-gray-400">Creators</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <div className="flex gap-2">
            {["all", "common", "rare", "epic", "legendary"].map((rarity) => (
              <button
                key={rarity}
                onClick={() => setFilter(rarity)}
                className={`px-4 py-2 rounded-lg capitalize transition-all ${
                  filter === rarity
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-purple-500/50"
                }`}
              >
                {rarity}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search NFTs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
            <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNFTs.map((nft) => (
            <div
              key={nft.id}
              className="group relative overflow-hidden rounded-2xl bg-gray-800/50 border border-gray-700 transition-all hover:scale-105 hover:border-purple-500"
            >
              <div className="relative h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <div className="text-6xl">{nft.name === "Cyberpunk Avatar" ? "🤖" : nft.name === "Neon Dragon" ? "🐉" : nft.name === "Digital Phoenix" ? "🦅" : "🎨"}</div>
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRarityColor(nft.rarity)}`}>
                    {nft.rarity}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{nft.name}</h3>
                <p className="text-sm text-gray-400 mb-3">by {nft.creator}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-xs text-gray-500">Price</span>
                    <div className="text-xl font-bold text-purple-400">{nft.price} ETH</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-center">
                      <div className="text-sm text-gray-400">❤️ {nft.likes}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-400">👁️ {nft.views}</div>
                    </div>
                  </div>
                </div>
                
                <button className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition">
                  Mint NFT
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredNFTs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white">No NFTs found</h3>
            <p className="text-gray-400">Try adjusting your filters</p>
          </div>
        )}
      </div>    
    </main>
  );
};

export default NFTGalleryPage;