'use client';

import { useState } from 'react';

interface TabsProps {
    specifications: Record<string, string>;
    careInstructions: string[];
    reviews: any[];
    treeName: string;
    reviewCount: number;
    rating: number;
}

export default function ProductTabs({
    specifications,
    careInstructions,
    reviews,
    treeName,
    reviewCount,
    rating,
}: TabsProps) {
    const [activeTab, setActiveTab] = useState('specifications');

    return (
        <div className="details-tabs">
            <div className="tabs-header">
                <button
                    className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('specifications')}
                >
                    Specifications
                </button>
                <button
                    className={`tab-btn ${activeTab === 'care' ? 'active' : ''}`}
                    onClick={() => setActiveTab('care')}
                >
                    Care Instructions
                </button>
                <button
                    className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    Reviews ({reviewCount})
                </button>
            </div>

            {/* Specifications */}
            {activeTab === 'specifications' && (
                <div className="tab-content">
                    <div className="specifications-grid">
                        {Object.entries(specifications).map(([key, value]) => (
                            <div key={key} className="spec-item">
                                <span className="spec-label">{key}</span>
                                <span className="spec-value">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Care Instructions */}
            {activeTab === 'care' && (
                <div className="tab-content">
                    <div className="care-instructions">
                        <h3>How to Care for Your {treeName}</h3>
                        <ul className="care-list">
                            {careInstructions.map((instruction, idx) => (
                                <li key={idx}>
                                    <span className="step-number">{idx + 1}</span>
                                    {instruction}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Reviews */}
            {activeTab === 'reviews' && (
                <div className="tab-content">
                    <div className="reviews-section">
                        <div className="reviews-summary">
                            <div className="summary-score">
                                <span className="score-number">{rating}</span>
                                <div className="score-stars">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="star filled">
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <span className="review-count">Based on {reviewCount} reviews</span>
                            </div>
                        </div>

                        <div className="reviews-list">
                            {reviews.map((review) => (
                                <div key={review.id} className="review-card">
                                    <div className="review-header">
                                        <div className="reviewer-info">
                                            <span className="reviewer-avatar">👤</span>
                                            <div>
                                                <strong>{review.author}</strong>
                                                {review.verified && (
                                                    <span className="verified-purchase">✓ Verified Purchase</span>
                                                )}
                                            </div>
                                        </div>
                                        <span className="review-date">{review.date}</span>
                                    </div>
                                    <div className="review-rating">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={i < review.rating ? 'star filled' : 'star'}>
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                </div>
                            ))}
                        </div>

                        <button className="btn-load-more-reviews">Load More Reviews</button>
                    </div>
                </div>
            )}
        </div>
    );
}
