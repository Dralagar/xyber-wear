"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface DesignPreset {
  id: string;
  name: string;
  prompt: string;
  icon: string;
  style: string;
}

interface GeneratedDesign {
  id: string;
  imageUrl: string;
  prompt: string;
  timestamp: string;
}

const CustomizePage: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState("#8b5cf6");
  const [selectedSize, setSelectedSize] = useState("M");
  const [designText, setDesignText] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState<GeneratedDesign[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);
  const [designName, setDesignName] = useState("");
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState<"idle" | "minting" | "success" | "error">("idle");
  const [mintTxHash, setMintTxHash] = useState("");
  const [aiProvider, setAiProvider] = useState<"dalle" | "claude">("dalle");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [savedDesigns, setSavedDesigns] = useState<any[]>([]);

  const colors = [
    { name: "Cyber Purple", code: "#8b5cf6" },
    { name: "Neon Pink", code: "#ec489a" },
    { name: "Electric Blue", code: "#3b82f6" },
    { name: "Matrix Green", code: "#22c55e" },
    { name: "Midnight Black", code: "#000000" },
    { name: "Arctic White", code: "#ffffff" },
    { name: "Lava Red", code: "#ef4444" },
    { name: "Cyber Yellow", code: "#eab308" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const designPresets: DesignPreset[] = [
    { id: "cyber", name: "Cyberpunk", prompt: "cyberpunk neon cityscape with holographic elements, futuristic fashion, 4k detailed", icon: "🤖", style: "futuristic" },
    { id: "nature", name: "Digital Nature", prompt: "digital flowers with glowing petals, neon colors, ethereal, 4k", icon: "🌿", style: "organic" },
    { id: "abstract", name: "Abstract Geometry", prompt: "geometric patterns with neon gradients, abstract shapes, 3d render, 4k", icon: "🔷", style: "geometric" },
    { id: "space", name: "Cosmic", prompt: "galaxy nebula with stars, cosmic dust, vibrant colors, 4k detailed", icon: "🌌", style: "cosmic" },
    { id: "glitch", name: "Glitch Art", prompt: "glitch art with digital distortion effects, cyberpunk aesthetic, 4k", icon: "📺", style: "glitch" },
    { id: "anime", name: "Anime Style", prompt: "anime character in cyberpunk style, neon lights, detailed illustration, 4k", icon: "🎨", style: "anime" },
  ];

  // Load saved designs on mount
  useEffect(() => {
    const saved = localStorage.getItem("xyberwear_designs");
    if (saved) {
      setSavedDesigns(JSON.parse(saved));
    }
  }, []);

  // Real AI Generation with API integration
  const generateWithDalle = async (prompt: string): Promise<string[]> => {
    try {
      // This would be your actual DALL-E API call
      // const response = await fetch('/api/generate/dalle', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ prompt, n: 4 })
      // });
      // const data = await response.json();
      // return data.images;

      // Mock response for demonstration
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            `https://picsum.photos/400/400?random=${Date.now()}&dalle1`,
            `https://picsum.photos/400/400?random=${Date.now()}&dalle2`,
            `https://picsum.photos/400/400?random=${Date.now()}&dalle3`,
            `https://picsum.photos/400/400?random=${Date.now()}&dalle4`,
          ]);
        }, 2000);
      });
    } catch (error) {
      console.error("DALL-E generation error:", error);
      throw error;
    }
  };

  const generateWithClaude = async (prompt: string): Promise<string[]> => {
    try {
      // This would be your actual Claude API call for image generation
      // const response = await fetch('/api/generate/claude', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ prompt, description: prompt })
      // });
      // const data = await response.json();
      // return data.images;

      // Mock response for demonstration
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            `https://picsum.photos/400/400?random=${Date.now()}&claude1`,
            `https://picsum.photos/400/400?random=${Date.now()}&claude2`,
            `https://picsum.photos/400/400?random=${Date.now()}&claude3`,
            `https://picsum.photos/400/400?random=${Date.now()}&claude4`,
          ]);
        }, 2500);
      });
    } catch (error) {
      console.error("Claude generation error:", error);
      throw error;
    }
  };

  const generateAIDesign = async (prompt: string) => {
    if (!prompt.trim()) {
      alert("Please describe your design idea!");
      return;
    }

    setIsGenerating(true);
    setShowAIPanel(true);

    try {
      let images: string[];
      if (aiProvider === "dalle") {
        images = await generateWithDalle(prompt);
      } else {
        images = await generateWithClaude(prompt);
      }

      const newDesigns: GeneratedDesign[] = images.map((url, idx) => ({
        id: `${Date.now()}-${idx}`,
        imageUrl: url,
        prompt: prompt,
        timestamp: new Date().toISOString(),
      }));

      setGeneratedImages(newDesigns);
    } catch (error) {
      console.error("Generation error:", error);
      alert("Failed to generate design. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePresetSelect = async (preset: DesignPreset) => {
    setAiPrompt(preset.prompt);
    await generateAIDesign(preset.prompt);
  };

  const handleSelectDesign = (design: GeneratedDesign) => {
    setSelectedDesign(design.imageUrl);
    setUploadedImage(design.imageUrl);
    setShowAIPanel(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setUploadedImage(imageUrl);
        setSelectedDesign(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveDesign = () => {
    if (!uploadedImage && !designText) {
      alert("Please create or upload a design first!");
      return;
    }

    const designData = {
      id: Date.now().toString(),
      name: designName || "Untitled Design",
      image: uploadedImage,
      text: designText,
      color: selectedColor,
      size: selectedSize,
      date: new Date().toISOString(),
      aiGenerated: !!selectedDesign,
    };

    const updatedDesigns = [designData, ...savedDesigns];
    setSavedDesigns(updatedDesigns);
    localStorage.setItem("xyberwear_designs", JSON.stringify(updatedDesigns));

    alert(`✨ "${designData.name}" saved successfully! You can now add to cart or mint as NFT.`);
  };

  const handleMintNFT = async () => {
    if (!uploadedImage) {
      alert("Please create or select a design first!");
      return;
    }

    setIsMinting(true);
    setMintStatus("minting");

    try {
      // This would be your actual NFT minting API call
      // const response = await fetch('/api/mint/nft', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     image: uploadedImage,
      //     name: designName || "Xyberwear Custom Design",
      //     description: `Custom design created with ${aiProvider} AI`,
      //     attributes: {
      //       color: colors.find(c => c.code === selectedColor)?.name,
      //       size: selectedSize,
      //       text: designText,
      //     }
      //   })
      // });
      // const data = await response.json();
      // setMintTxHash(data.txHash);

      // Mock minting response
      await new Promise(resolve => setTimeout(resolve, 3000));
      setMintTxHash("0x" + Math.random().toString(36).substring(2, 15));
      setMintStatus("success");
      
      // Save minted NFT info
      const mintedNFT = {
        id: Date.now().toString(),
        name: designName || "Xyberwear Design",
        image: uploadedImage,
        txHash: mintTxHash,
        date: new Date().toISOString(),
      };
      
      const existingNFTs = JSON.parse(localStorage.getItem("xyberwear_nfts") || "[]");
      existingNFTs.push(mintedNFT);
      localStorage.setItem("xyberwear_nfts", JSON.stringify(existingNFTs));
      
      alert(`🎉 NFT Minted Successfully!\nTransaction: ${mintTxHash.substring(0, 10)}...`);
    } catch (error) {
      console.error("Minting error:", error);
      setMintStatus("error");
      alert("Failed to mint NFT. Please try again.");
    } finally {
      setIsMinting(false);
      setTimeout(() => setMintStatus("idle"), 3000);
    }
  };

  const handleAddToCart = () => {
    if (!uploadedImage && !designText) {
      alert("Please create a design first!");
      return;
    }

    const cartItem = {
      id: Date.now().toString(),
      name: designName || "Custom Design",
      price: 49.98,
      quantity: 1,
      size: selectedSize,
      color: colors.find(c => c.code === selectedColor)?.name,
      designName: designName,
      nftIncluded: true,
      image: uploadedImage,
    };

    const existingCart = JSON.parse(localStorage.getItem("xyberwear_cart") || "[]");
    existingCart.push(cartItem);
    localStorage.setItem("xyberwear_cart", JSON.stringify(existingCart));
    
    // Trigger cart update event
    window.dispatchEvent(new Event('cartUpdated'));
    
    alert(`Added to cart! Your custom ${selectedSize} ${designName || "design"} has been added.`);
  };

  const handleClearDesign = () => {
    setUploadedImage(null);
    setSelectedDesign(null);
    setDesignText("");
    setDesignName("");
    setGeneratedImages([]);
    setAiPrompt("");
    setShowAIPanel(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-900 to-pink-900 py-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl md:text-5xl font-bold text-white">AI Design Studio</h1>
          <p className="mx-auto max-w-2xl text-lg text-purple-100">
            Create unique phygital masterpieces with AI. Design, customize, and mint your NFT in one seamless experience.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Preview Section */}
          <div className="space-y-6 sticky top-24">
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                  </span>
                  Live Preview
                </span>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="relative w-80 h-80 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center border-2 border-purple-500/30 overflow-hidden">
                  {uploadedImage ? (
                    <Image
                      src={uploadedImage}
                      alt="Custom design"
                      width={320}
                      height={320}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-6xl mb-2">👕</div>
                      <p className="text-sm text-gray-400">Your design will appear here</p>
                      <p className="text-xs text-gray-500 mt-2">Upload or generate with AI</p>
                    </div>
                  )}
                </div>
              </div>

              {designText && (
                <div className="text-center mb-4">
                  <div className="inline-block bg-gray-800 px-4 py-2 rounded-lg border border-purple-500/30">
                    <p className="text-purple-400 font-mono text-sm">{designText}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-400">Color</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white shadow-lg" style={{ backgroundColor: selectedColor }} />
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">Size</div>
                  <div className="text-white font-bold">{selectedSize}</div>
                </div>
                {designName && (
                  <div className="text-center">
                    <div className="text-sm text-gray-400">Name</div>
                    <div className="text-white text-sm font-medium">{designName}</div>
                  </div>
                )}
              </div>

              <button
                onClick={handleClearDesign}
                className="mt-4 w-full py-2 rounded-lg border border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-400 transition"
              >
                Clear Design
              </button>
            </div>

            {/* Price & Mint Info */}
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-4 border border-purple-500/30">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm text-gray-400">Base Price</p>
                  <p className="text-2xl font-bold text-white">$39.99</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">NFT Minting</p>
                  <p className="text-2xl font-bold text-white">+$9.99</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    $49.98
                  </p>
                </div>
              </div>
              
              {mintStatus === "success" && (
                <div className="mt-3 p-2 bg-green-500/20 rounded-lg border border-green-500 text-center">
                  <p className="text-green-400 text-sm">✓ NFT Minted Successfully!</p>
                  <p className="text-xs text-gray-400 mt-1">TX: {mintTxHash.substring(0, 20)}...</p>
                </div>
              )}
              
              {mintStatus === "error" && (
                <div className="mt-3 p-2 bg-red-500/20 rounded-lg border border-red-500 text-center">
                  <p className="text-red-400 text-sm">✗ Minting Failed. Please try again.</p>
                </div>
              )}
            </div>
          </div>

          {/* Design Tools Section */}
          <div className="space-y-8">
            {/* AI Provider Selector */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                AI Model Selection
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setAiProvider("dalle")}
                  className={`flex-1 py-3 rounded-lg font-semibold transition ${
                    aiProvider === "dalle"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-purple-500/50"
                  }`}
                >
                  🎨 DALL-E 3
                </button>
                <button
                  onClick={() => setAiProvider("claude")}
                  className={`flex-1 py-3 rounded-lg font-semibold transition ${
                    aiProvider === "claude"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-purple-500/50"
                  }`}
                >
                  🧠 Claude AI
                </button>
              </div>
            </div>

            {/* AI Text Prompt */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                AI Design Generator
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Describe your dream design and let {aiProvider === "dalle" ? "DALL-E" : "Claude"} create it for you
              </p>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g., A cyberpunk cat with neon glasses and holographic wings"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && generateAIDesign(aiPrompt)}
                />
                <button
                  onClick={() => generateAIDesign(aiPrompt)}
                  disabled={isGenerating}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50"
                >
                  {isGenerating ? "✨ Generating..." : "Generate"}
                </button>
              </div>
              
              {/* Design Presets */}
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-3">Quick Presets:</p>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {designPresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handlePresetSelect(preset)}
                      className="p-2 rounded-lg bg-gray-700 hover:bg-purple-500/50 transition text-center group"
                    >
                      <div className="text-2xl mb-1">{preset.icon}</div>
                      <p className="text-xs text-gray-300 group-hover:text-white">{preset.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Generated Results */}
            {showAIPanel && generatedImages.length > 0 && (
              <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/30 animate-fade-in-up">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  AI Generated Designs ({aiProvider === "dalle" ? "DALL-E" : "Claude"})
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {generatedImages.map((design) => (
                    <button
                      key={design.id}
                      onClick={() => handleSelectDesign(design)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                        selectedDesign === design.imageUrl ? "border-purple-500 shadow-lg shadow-purple-500/50" : "border-gray-600"
                      }`}
                    >
                      <Image
                        src={design.imageUrl}
                        alt="AI Generated Design"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition" />
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 text-center mt-3">Click any design to select it</p>
              </div>
            )}

            {/* Design Name */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🏷️</span>
                Design Name
              </h3>
              <input
                type="text"
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
                placeholder="Give your design a name..."
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* Colors */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🎨</span>
                Color Palette
              </h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.code)}
                    className={`p-1 rounded-lg transition-all hover:scale-110 ${
                      selectedColor === color.code ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-900" : ""
                    }`}
                    title={color.name}
                  >
                    <div className="w-full aspect-square rounded-lg" style={{ backgroundColor: color.code }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">📏</span>
                Size
              </h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedSize === size
                        ? "bg-purple-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-purple-500/50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Design */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">✍️</span>
                Add Text
              </h3>
              <input
                type="text"
                value={designText}
                onChange={(e) => setDesignText(e.target.value)}
                placeholder="Enter your custom text..."
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-2">Max 50 characters</p>
            </div>

            {/* Upload Image */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">📸</span>
                Upload Your Own
              </h3>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 rounded-lg border-2 border-dashed border-gray-600 text-gray-400 hover:border-purple-500 hover:text-purple-400 transition"
              >
                📤 Click to upload your design
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">PNG, JPG, SVG up to 10MB</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleSaveDesign}
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
              >
                💾 Save Design
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 rounded-lg border-2 border-purple-500 text-purple-400 font-semibold hover:bg-purple-500 hover:text-white transition"
              >
                🛒 Add to Cart
              </button>
            </div>

            {/* Mint NFT Button */}
            <button
              onClick={handleMintNFT}
              disabled={isMinting}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition disabled:opacity-50"
            >
              {isMinting ? "⛏️ Minting NFT..." : "🚀 Mint as NFT"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CustomizePage;