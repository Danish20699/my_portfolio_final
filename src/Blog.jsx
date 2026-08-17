import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { blogPosts } from './blogData';

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [expandedPost, setExpandedPost] = useState(null);

    const categories = ['All', 'Tech', 'Life'];

    const filteredPosts = selectedCategory === 'All'
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <>
            <Navbar />

            <main id="main" className="blog-page">
                <div className="container">
                    {/* Blog Header */}
                    <div className="blog-header">
                        <h1 className="blog-title">Blog</h1>
                        <p className="blog-subtitle">
                            Thoughts on technology, full stack development, and what I'm learning along the way
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="blog-filters">
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Blog Posts Grid */}
                    <div className="blog-grid">
                        {filteredPosts.map((post, index) => (
                            <article key={post.id} className={`blog-card ${expandedPost === post.id ? 'expanded' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                                {post.image && (
                                    <div className="blog-card-image">
                                        <img src={post.image} alt="" loading="lazy" decoding="async" />
                                    </div>
                                )}
                                <div className="blog-card-content">
                                    <div className="blog-card-meta">
                                        <span className="blog-category">{post.category}</span>
                                        <span className="blog-date">{formatDate(post.date)}</span>
                                    </div>
                                    <h2 className="blog-card-title">{post.title}</h2>
                                    <p className="blog-card-excerpt">{post.excerpt}</p>
                                    <div className="blog-card-tags">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="blog-tag">{tag}</span>
                                        ))}
                                    </div>
                                    {expandedPost === post.id ? (
                                        <div className="blog-full-content">
                                            {post.content.split('\n').map((paragraph, idx) => (
                                                paragraph.startsWith('##') ? (
                                                    <h3 key={idx} className="blog-section-title">{paragraph.replace('##', '').trim()}</h3>
                                                ) : paragraph.startsWith('#') ? (
                                                    <h2 key={idx} className="blog-main-title">{paragraph.replace('#', '').trim()}</h2>
                                                ) : paragraph.trim() ? (
                                                    <p key={idx} className="blog-paragraph">{paragraph.trim()}</p>
                                                ) : null
                                            ))}
                                        </div>
                                    ) : null}
                                    <button
                                        className="blog-read-more"
                                        onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                                    >
                                        {expandedPost === post.id ? 'Read Less' : 'Read More'}
                                        <span className="arrow">{expandedPost === post.id ? '↑' : '→'}</span>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredPosts.length === 0 && (
                        <div className="blog-empty">
                            <p>No posts found in this category.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Blog;
