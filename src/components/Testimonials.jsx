import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Sarah Chen',
            role: 'Tech Lead at StartupCo',
            text: 'Danish delivered a production-ready MVP in just 3 weeks. His attention to system architecture and performance optimization saved us countless hours of refactoring later.',
            image: 'https://randomuser.me/api/portraits/women/32.jpg'
        },
        {
            name: 'Marcus Rodriguez',
            role: 'CTO at ScaleTech',
            text: 'Working with Danish was a game-changer. He doesn\'t just code - he engineers solutions. Our system uptime improved from 95% to 99.9% after his optimizations.',
            image: 'https://randomuser.me/api/portraits/men/44.jpg'
        },
        {
            name: 'Priya Patel',
            role: 'Product Manager',
            text: 'Danish bridges the gap between technical complexity and business needs perfectly. He built our entire backend infrastructure and the frontend was pixel-perfect.',
            image: 'https://randomuser.me/api/portraits/women/85.jpg'
        }
    ];

    return (
        <section id="testimonials" className="section testimonials">
            <div className="container">
                <div className="section-header animate-hidden">
                    <span className="section-label">SOCIAL PROOF</span>
                    <h2 className="section-title">What Clients Say</h2>
                    <p className="testimonials-subtitle">
                        Real feedback from professionals I've worked with on production systems and scalable applications.
                    </p>
                </div>
                <div className="testimonials-grid animate-hidden">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <div className="testimonial-profile">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="testimonial-image"
                                />
                                <div className="testimonial-info">
                                    <h4 className="testimonial-name">{testimonial.name}</h4>
                                    <span className="testimonial-role">{testimonial.role}</span>
                                </div>
                            </div>
                            <p className="testimonial-text">{testimonial.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
