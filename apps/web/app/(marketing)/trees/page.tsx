import Link from 'next/link';
import './trees.css';

export const metadata = {
  title: 'Browse Trees - TreeVerse',
  description: 'Explore our collection of premium trees and plants.',
};

// This would come from the API in a real app
const featuredTrees = [
  {
    id: '1',
    name: 'Japanese Maple',
    category: 'Ornamental',
    price: 149.99,
    seller: 'Green Gardens',
    rating: 4.8,
    image: '🍁',
  },
  {
    id: '2',
    name: 'Blue Spruce',
    category: 'Evergreen',
    price: 89.99,
    seller: 'Mountain Nursery',
    rating: 4.9,
    image: '🌲',
  },
  {
    id: '3',
    name: 'Apple Tree',
    category: 'Fruit',
    price: 129.99,
    seller: 'Orchard Experts',
    rating: 4.7,
    image: '🍎',
  },
  {
    id: '4',
    name: 'Red Oak',
    category: 'Shade',
    price: 199.99,
    seller: 'Oak Valley',
    rating: 4.9,
    image: '🌳',
  },
  {
    id: '5',
    name: 'Cherry Blossom',
    category: 'Ornamental',
    price: 179.99,
    seller: 'Blossom Dreams',
    rating: 5.0,
    image: '🌸',
  },
  {
    id: '6',
    name: 'Pine Tree',
    category: 'Evergreen',
    price: 69.99,
    seller: 'Forest Fresh',
    rating: 4.6,
    image: '🌲',
  },
];

export default function TreesPage() {
  return (
    <div className="trees-container">
      {/* Page Header */}
      <section className="trees-header">
        <h1>Browse Our Collection</h1>
        <p>Discover premium trees and plants from verified sellers</p>
      </section>

      {/* Filters */}
      <section className="filters-section">
        <div className="filters-container">
          <div className="filter-group">
            <label>Category</label>
            <select className="filter-select">
              <option value="">All Categories</option>
              <option value="fruit">Fruit Trees</option>
              <option value="ornamental">Ornamental</option>
              <option value="evergreen">Evergreen</option>
              <option value="shade">Shade Trees</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range</label>
            <select className="filter-select">
              <option value="">Any Price</option>
              <option value="0-100">$0 - $100</option>
              <option value="100-200">$100 - $200</option>
              <option value="200+">$200+</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select className="filter-select">
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div className="filter-group">
            <input 
              type="search" 
              placeholder="Search trees..." 
              className="search-input"
            />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="products-grid">
          {featuredTrees.map((tree) => (
            <Link 
              href={`/trees/${tree.id}`} 
              key={tree.id}
              className="product-card"
            >
              <div className="product-image">
                <span className="product-icon">{tree.image}</span>
                <span className="product-category">{tree.category}</span>
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{tree.name}</h3>
                
                <div className="product-meta">
                  <span className="product-seller">
                    <span className="seller-icon">🏪</span>
                    {tree.seller}
                  </span>
                  <span className="product-rating">
                    <span className="star">⭐</span>
                    {tree.rating}
                  </span>
                </div>

                <div className="product-footer">
                  <span className="product-price">${tree.price}</span>
                  <button className="btn-add-to-cart">View Details</button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="load-more">
          <button className="btn-load-more">Load More Trees</button>
        </div>
      </section>

      {/* Empty State (hidden when there are results) */}
      <section className="empty-state" style={{ display: 'none' }}>
        <div className="empty-icon">🌳</div>
        <h2>No trees found</h2>
        <p>Try adjusting your filters or search terms</p>
        <button className="btn-clear-filters">Clear All Filters</button>
      </section>
    </div>
  );
}
