import { NextResponse } from 'next/server';

// Mock product data for Xyberwear
const mockProducts = [
  {
    _id: "1",
    name: "Cyberpunk Light Hoodie",
    price: 89.99,
    description: "Glow-in-the-dark cyberpunk hoodie with LED accents and NFC chip for NFT verification. Made from premium cotton blend with integrated LED strips that sync with your heartbeat.",
    imageUrl: "/images/cyber-hoodie.jpg",
    category: "Apparel",
    inStock: true,
    rating: 4.8,
    featured: true
  },
  {
    _id: "2",
    name: "Neon Genesis Tee",
    price: 39.99,
    description: "Limited edition t-shirt with AR-activated design. Scan with your phone to reveal exclusive digital art and animations. Features moisture-wicking fabric and UV-reactive ink.",
    imageUrl: "/images/neon-tee.jpg",
    category: "Apparel",
    inStock: true,
    rating: 4.9
  },
  {
    _id: "3",
    name: "Digital Asset Pack - Genesis",
    price: 149.99,
    description: "Exclusive NFT collection with 5 unique 3D wearables for your metaverse avatar. Includes full commercial rights and high-resolution 3D models compatible with major platforms.",
    imageUrl: "/images/nft-pack.jpg",
    category: "Digital",
    inStock: true,
    rating: 5.0,
    featured: true
  },
  {
    _id: "4",
    name: "Xyber Tech Jacket",
    price: 199.99,
    description: "Smart jacket with built-in haptic feedback, temperature control, and NFC connectivity. Syncs with your digital wallet and displays NFT art on integrated e-ink display.",
    imageUrl: "/images/tech-jacket.jpg",
    category: "Apparel",
    inStock: true,
    rating: 4.7
  },
  {
    _id: "5",
    name: "Holographic Snapback",
    price: 49.99,
    description: "Holographic finish cap with embedded QR code that links to your unique NFT collection. Limited edition with only 500 pieces worldwide.",
    imageUrl: "/images/snapback.jpg",
    category: "Accessories",
    inStock: true,
    rating: 4.6
  },
  {
    _id: "6",
    name: "Metaverse Glasses",
    price: 299.99,
    description: "AR-enabled glasses that display your NFT art in real-world environments. Features 8K resolution per eye and 120° field of view. Limited edition.",
    imageUrl: "/images/glasses.jpg",
    category: "Accessories",
    inStock: false,
    rating: 4.9
  },
  {
    _id: "7",
    name: "Cyber Socks - Limited Series",
    price: 19.99,
    description: "Each pair comes with a unique digital twin NFT. Collect all 10 designs for a special reward. Made with moisture-wicking fabric and reinforced toes.",
    imageUrl: "/images/socks.jpg",
    category: "Accessories",
    inStock: true,
    rating: 4.5
  },
  {
    _id: "8",
    name: "Digital Art Frame",
    price: 399.99,
    description: "Digital frame that displays your NFT collection. Supports multiple blockchain networks including Ethereum, Solana, and Polygon. 4K display with auto-rotation.",
    imageUrl: "/images/frame.jpg",
    category: "Digital",
    inStock: true,
    rating: 4.8
  },
  {
    _id: "9",
    name: "Cybergoth Pants",
    price: 119.99,
    description: "Techwear pants with integrated LED strips, multiple pockets, and adjustable straps. Comes with matching NFT for your metaverse avatar.",
    imageUrl: "/images/pants.jpg",
    category: "Apparel",
    inStock: true,
    rating: 4.7
  },
  {
    _id: "10",
    name: "Neon Backpack",
    price: 79.99,
    description: "Smart backpack with built-in power bank, LED display, and RFID protection. Syncs with your phone to display notifications and NFT art.",
    imageUrl: "/images/backpack.jpg",
    category: "Accessories",
    inStock: true,
    rating: 4.8
  },
  {
    _id: "11",
    name: "Digital Sneakers - NFT Edition",
    price: 249.99,
    description: "Limited edition sneakers with embedded NFC chip. Each pair comes with a unique NFT that can be used in the metaverse. Only 1000 pairs minted.",
    imageUrl: "/images/sneakers.jpg",
    category: "Apparel",
    inStock: true,
    rating: 4.9,
    featured: true
  },
  {
    _id: "12",
    name: "Genesis Collection - Complete Set",
    price: 999.99,
    description: "Complete Genesis collection including 5 physical items and 10 exclusive NFTs. Includes hoodie, jacket, pants, sneakers, and backpack with matching digital assets.",
    imageUrl: "/images/genesis-set.jpg",
    category: "Digital",
    inStock: true,
    rating: 5.0,
    featured: true
  }
];

export async function GET(request: Request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const inStock = searchParams.get('inStock');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    
    let filteredProducts = [...mockProducts];
    
    // Apply filters
    if (category && category !== 'All' && category !== '') {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    if (inStock === 'true') {
      filteredProducts = filteredProducts.filter(p => p.inStock === true);
    }
    
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(p => p.featured === true);
    }
    
    if (search && search.trim() !== '') {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.category?.toLowerCase().includes(searchLower)
      );
    }
    
    // Simulate network delay (remove in production)
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return NextResponse.json(filteredProducts, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    });
  } catch (error) {
    console.error('Error in products API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch products',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: Add POST endpoint
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.price || !body.description) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, description' },
        { status: 400 }
      );
    }
    
    const newProduct = {
      _id: String(mockProducts.length + 1),
      ...body,
      inStock: body.inStock !== undefined ? body.inStock : true,
      rating: body.rating || 0,
      featured: body.featured || false
    };
    
    // In a real app, you'd save to database
    mockProducts.push(newProduct);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}