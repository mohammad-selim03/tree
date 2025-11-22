"use client"

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Star, Minus, Plus, ShoppingCart, Heart, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import ProductTabs from './ProductTabs';
import { useCartStore } from '@/lib/stores/cartStore';
import './tree-details.css';

//Type definition for tree data
interface TreeData {
    id: string;
    name: string;
    scientificName: string;
    category: string;
    price: number;
    originalPrice?: number;
    seller: {
        name: string;
        rating: number;
        totalSales: number;
        verified: boolean;
    };
    rating: number;
    reviews: number;
    stock: number;
    image: string;
    images: string[];
    description: string;
    features: string[];
    specifications: Record<string, string>;
    careInstructions: string[];
}

// Mock data - in a real app, this would come from an API
const treeDatabase: Record<string, TreeData> = {
    '1': {
        id: '1',
        name: 'Japanese Maple',
        scientificName: 'Acer palmatum',
        category: 'Ornamental',
        price: 149.99,
        originalPrice: 199.99,
        seller: {
            name: 'Green Gardens',
            rating: 4.9,
            totalSales: 1234,
            verified: true,
        },
        rating: 4.8,
        reviews: 156,
        stock: 23,
        image: '🍁',
        images: ['🍁', '🍂', '🌿', '🌱'],
        description: 'The Japanese Maple is a stunning ornamental tree known for its delicate, hand-shaped leaves and vibrant fall colors. This cultivar features brilliant red foliage that transforms your garden into a seasonal masterpiece.',
        features: [
            'Mature height: 15-25 feet',
            'Sun exposure: Partial shade to full sun',
            'Soil type: Well-drained, slightly acidic',
            'Hardiness zones: 5-8',
            'Growth rate: Slow to medium',
            'Drought tolerant once established',
        ],
        specifications: {
            'Current Height': '4-5 feet',
            'Container Size': '5 gallon',
            'Age': '3-4 years',
            'Origin': 'Oregon, USA',
            'Leaf Color': 'Deep crimson red',
            'Bloom Time': 'Spring',
        },
        careInstructions: [
            'Water regularly during the first growing season',
            'Mulch around the base to retain moisture',
            'Prune in late winter when dormant',
            'Protect from harsh afternoon sun in hot climates',
            'Fertilize in early spring with balanced fertilizer',
        ],
    },
    '2': {
        id: '2',
        name: 'Blue Spruce',
        scientificName: 'Picea pungens',
        category: 'Evergreen',
        price: 89.99,
        seller: {
            name: 'Mountain Nursery',
            rating: 4.9,
            totalSales: 2156,
            verified: true,
        },
        rating: 4.9,
        reviews: 234,
        stock: 45,
        image: '🌲',
        images: ['🌲', '🌲', '🌲', '🌲'],
        description: 'The Blue Spruce is a majestic evergreen tree with striking blue-gray needles. Perfect for landscapes, windbreaks, and as a stunning focal point in your garden.',
        features: [
            'Mature height: 50-75 feet',
            'Sun exposure: Full sun',
            'Soil type: Well-drained',
            'Hardiness zones: 2-7',
            'Growth rate: Slow',
            'Deer resistant',
        ],
        specifications: {
            'Current Height': '3-4 feet',
            'Container Size': '3 gallon',
            'Age': '2-3 years',
            'Origin': 'Colorado, USA',
            'Needle Color': 'Silvery blue',
            'Maintenance': 'Low',
        },
        careInstructions: [
            'Plant in full sun for best color',
            'Water deeply but infrequently',
            'Minimal pruning required',
            'Protect young trees from strong winds',
            'Apply mulch to conserve moisture',
        ],
    },
    '3': {
        id: '3',
        name: 'Apple Tree',
        scientificName: 'Malus domestica',
        category: 'Fruit',
        price: 129.99,
        originalPrice: 159.99,
        seller: {
            name: 'Orchard Experts',
            rating: 4.8,
            totalSales: 987,
            verified: true,
        },
        rating: 4.7,
        reviews: 189,
        stock: 34,
        image: '🍎',
        images: ['🍎', '🍏', '🌸', '🌳'],
        description: 'A classic fruit-bearing tree that produces delicious, crisp apples. This variety is perfect for home orchards and provides beautiful spring blossoms followed by abundant fruit in fall.',
        features: [
            'Mature height: 12-15 feet',
            'Sun exposure: Full sun',
            'Soil type: Well-drained, fertile',
            'Hardiness zones: 3-8',
            'Growth rate: Medium',
            'Self-pollinating variety',
        ],
        specifications: {
            'Current Height': '5-6 feet',
            'Container Size': '7 gallon',
            'Age': '2 years',
            'Origin': 'Washington, USA',
            'Variety': 'Honeycrisp',
            'First Harvest': '2-3 years',
        },
        careInstructions: [
            'Plant in full sun with good air circulation',
            'Water regularly, especially during fruit development',
            'Prune annually in late winter for shape and production',
            'Apply balanced fertilizer in early spring',
            'Thin fruit when small for larger, better quality apples',
        ],
    },
    '4': {
        id: '4',
        name: 'Red Oak',
        scientificName: 'Quercus rubra',
        category: 'Shade',
        price: 199.99,
        seller: {
            name: 'Oak Valley',
            rating: 4.9,
            totalSales: 3421,
            verified: true,
        },
        rating: 4.9,
        reviews: 312,
        stock: 18,
        image: '🌳',
        images: ['🌳', '🍂', '🍁', '🌿'],
        description: 'A magnificent shade tree known for its strong branching structure and brilliant fall color. The Red Oak is fast-growing, long-lived, and provides excellent shade for large landscapes.',
        features: [
            'Mature height: 60-75 feet',
            'Sun exposure: Full sun to partial shade',
            'Soil type: Adaptable, well-drained',
            'Hardiness zones: 3-8',
            'Growth rate: Fast',
            'Drought tolerant once established',
        ],
        specifications: {
            'Current Height': '8-10 feet',
            'Container Size': '15 gallon',
            'Age': '4-5 years',
            'Origin': 'Pennsylvania, USA',
            'Canopy Spread': '40-60 feet at maturity',
            'Fall Color': 'Brilliant red',
        },
        careInstructions: [
            'Plant in full sun for best growth and fall color',
            'Water deeply during establishment (2-3 years)',
            'Mulch around base to retain moisture',
            'Minimal pruning needed, remove dead branches only',
            'Watch for oak wilt in susceptible areas',
        ],
    },
    '5': {
        id: '5',
        name: 'Cherry Blossom',
        scientificName: 'Prunus serrulata',
        category: 'Ornamental',
        price: 179.99,
        originalPrice: 229.99,
        seller: {
            name: 'Blossom Dreams',
            rating: 5.0,
            totalSales: 756,
            verified: true,
        },
        rating: 5.0,
        reviews: 201,
        stock: 12,
        image: '🌸',
        images: ['🌸', '🌸', '🌸', '🌸'],
        description: 'Experience the breathtaking beauty of spring with this stunning Cherry Blossom tree. Features cascading pink blooms that create a magical display, making it a centerpiece in any garden.',
        features: [
            'Mature height: 20-25 feet',
            'Sun exposure: Full sun',
            'Soil type: Well-drained, slightly acidic',
            'Hardiness zones: 5-8',
            'Growth rate: Medium',
            'Spectacular spring blooms',
        ],
        specifications: {
            'Current Height': '6-7 feet',
            'Container Size': '10 gallon',
            'Age': '3 years',
            'Origin': 'Japan',
            'Bloom Color': 'Pink',
            'Bloom Time': 'Early to mid spring',
        },
        careInstructions: [
            'Plant in full sun for maximum flowering',
            'Water regularly during dry periods',
            'Prune after flowering to maintain shape',
            'Apply organic mulch to conserve moisture',
            'Protect from late spring frosts when blooming',
        ],
    },
    '6': {
        id: '6',
        name: 'Pine Tree',
        scientificName: 'Pinus strobus',
        category: 'Evergreen',
        price: 69.99,
        seller: {
            name: 'Forest Fresh',
            rating: 4.7,
            totalSales: 2845,
            verified: true,
        },
        rating: 4.6,
        reviews: 167,
        stock: 67,
        image: '🌲',
        images: ['🌲', '🌲', '🌲', '🌲'],
        description: 'The White Pine is a classic evergreen with soft, blue-green needles. Fast-growing and adaptable, it\'s perfect for privacy screens, windbreaks, or as a beautiful specimen tree.',
        features: [
            'Mature height: 50-80 feet',
            'Sun exposure: Full sun to partial shade',
            'Soil type: Well-drained, acidic',
            'Hardiness zones: 3-8',
            'Growth rate: Fast',
            'Soft, flexible needles',
        ],
        specifications: {
            'Current Height': '3-4 feet',
            'Container Size': '5 gallon',
            'Age': '2-3 years',
            'Origin': 'Maine, USA',
            'Needle Length': '3-5 inches',
            'Maintenance': 'Low',
        },
        careInstructions: [
            'Plant in full sun for best growth',
            'Water regularly until established',
            'Mulch to keep roots cool and moist',
            'Prune lightly to shape if desired',
            'Tolerates a wide range of soil conditions',
        ],
    },
};

// Mock reviews
const getReviews = () => [
    {
        id: 1,
        author: 'Sarah M.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Absolutely gorgeous! Arrived healthy and well-packaged. Already showing new growth.',
        verified: true,
    },
    {
        id: 2,
        author: 'Michael P.',
        rating: 5,
        date: '1 month ago',
        comment: 'Excellent quality tree. The seller provided great care instructions and quick delivery.',
        verified: true,
    },
    {
        id: 3,
        author: 'Jennifer L.',
        rating: 4,
        date: '2 months ago',
        comment: 'Beautiful tree, slightly smaller than expected but healthy and thriving.',
        verified: true,
    },
];

export default function TreeDetailsPage({ params }: { params: { id: string } }) {
    const tree = treeDatabase[params.id as keyof typeof treeDatabase];
    const [quantity, setQuantity] = useState(1);

    // Cart integration
    const addItem = useCartStore((state) => state.addItem);
    const [isAdding, setIsAdding] = useState(false);

    if (!tree) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <div className="text-center space-y-4">
                    <div className="text-6xl">🌳</div>
                    <h1 className="text-2xl font-bold">Tree Not Found</h1>
                    <p className="text-muted-foreground">The tree you're looking for doesn't exist or has been removed.</p>
                    <Link href="/trees" className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Browse All Trees
                    </Link>
                </div>
            </div>
        );
    }

    const reviews = getReviews();
    const discount = tree.originalPrice
        ? Math.round(((tree.originalPrice - tree.price) / tree.originalPrice) * 100)
        : 0;

    const handleAddToCart = () => {
        setIsAdding(true);

        addItem({
            id: tree.id,
            listingId: tree.id,
            title: tree.name,
            price: tree.price,
            quantity: quantity,
            imageUrl: tree.image, // Using the emoji as placeholder, in real app would be URL
            sellerId: 'seller-1', // Mock seller ID
            sellerName: tree.seller.name,
        });

        // Simulate network delay for better UX
        setTimeout(() => {
            setIsAdding(false);
            toast.success(`Added ${quantity} ${tree.name} to cart!`);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white dark:from-zinc-950 dark:to-zinc-900">
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4">
                <nav className="flex items-center text-sm text-muted-foreground">
                    <Link href="/trees" className="hover:text-green-600 transition-colors">Trees</Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-foreground font-medium">{tree.name}</span>
                </nav>
            </div>

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Left Column - Images */}
                    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-700">
                        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-green-100 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10 shadow-2xl border border-white/20">
                            <div className="absolute inset-0 flex items-center justify-center text-[12rem] select-none animate-float main-image">
                                {tree.image}
                            </div>

                            {discount > 0 && (
                                <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-pulse-slow z-10">
                                    -{discount}% OFF
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="aspect-square rounded-xl bg-muted/50 cursor-pointer hover:ring-2 ring-green-500 transition-all hover:scale-105 thumbnail"
                                >
                                    <div className="w-full h-full flex items-center justify-center text-4xl opacity-50 hover:opacity-100 transition-opacity">
                                        {tree.image}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Product Info */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700 delay-100">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium">
                                    {tree.category}
                                </span>
                                <div className="flex items-center text-yellow-500 text-sm">
                                    <Star className="h-4 w-4 fill-current" />
                                    <span className="ml-1 font-medium">{tree.rating}</span>
                                    <span className="text-muted-foreground ml-1">(128 reviews)</span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">
                                {tree.name}
                            </h1>

                            <div className="flex items-baseline gap-4 mb-6">
                                <span className="text-3xl font-bold text-green-700 dark:text-green-400">
                                    ${tree.price}
                                </span>
                                {tree.originalPrice && (
                                    <span className="text-xl text-muted-foreground line-through decoration-red-500/50">
                                        ${tree.originalPrice}
                                    </span>
                                )}
                            </div>

                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Experience the beauty of nature with our premium {tree.name}.
                                Perfect for {tree.category.toLowerCase()} use, this tree brings life and tranquility to any space.
                                Sourced directly from sustainable nurseries.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl border border-zinc-100 dark:border-zinc-800 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Quantity</span>
                                <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-md transition-colors"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-8 text-center font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-md transition-colors"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAdding}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-600/20 hover:shadow-green-600/40 transition-all active:scale-95 flex items-center justify-center gap-2 btn-add-to-cart disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isAdding ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Adding...
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="h-5 w-5" />
                                            Add to Cart
                                        </>
                                    )}
                                </button>
                                <button className="p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-500 transition-colors group">
                                    <Heart className="h-6 w-6 group-hover:fill-current transition-colors" />
                                </button>
                            </div>
                        </div>

                        {/* Seller Info */}
                        <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-2xl">
                                        🏪
                                    </div>
                                    <div>
                                        <h4 className="font-bold flex items-center gap-2">
                                            {tree.seller.name}
                                            {tree.seller.verified && (
                                                <span className="bg-blue-100 text-blue-600 text-[10px] px-1.5 py-0.5 rounded-full">✓</span>
                                            )}
                                        </h4>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                {tree.seller.rating}
                                            </span>
                                            <span>•</span>
                                            <span>{tree.seller.totalSales.toLocaleString()} sales</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-sm font-medium text-green-600 hover:text-green-700 hover:underline">
                                    Contact Seller
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <ProductTabs
                    specifications={tree.specifications}
                    careInstructions={tree.careInstructions}
                    reviews={reviews}
                    treeName={tree.name}
                    reviewCount={tree.reviews}
                    rating={tree.rating}
                />

                {/* Related Products */}
                <div className="mt-24">
                    <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { id: '3', name: 'Apple Tree', price: 129.99, image: '🍎', rating: 4.7 },
                            { id: '4', name: 'Red Oak', price: 199.99, image: '🌳', rating: 4.9 },
                            { id: '5', name: 'Cherry Blossom', price: 179.99, image: '🌸', rating: 5.0 },
                            { id: '6', name: 'Pine Tree', price: 69.99, image: '🌲', rating: 4.6 },
                        ].filter(item => item.id !== tree.id).slice(0, 4).map((item) => (
                            <Link href={`/trees/${item.id}`} key={item.id} className="group block bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="aspect-square bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                                    {item.image}
                                </div>
                                <div className="p-4">
                                    <h4 className="font-bold mb-2 group-hover:text-green-600 transition-colors">{item.name}</h4>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-green-700 dark:text-green-400">${item.price}</span>
                                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                            {item.rating}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
