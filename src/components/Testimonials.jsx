import React from 'react';
import { testimonials } from '../testimonialsData';

const initialsOf = (name) =>
    name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();

const Testimonials = () => {
    // Nothing to show until there are real, attributable quotes.
    if (testimonials.length === 0) return null;

    return (
        <section id="testimonials" className="section testimonials">
            <div className="container">
                <div className="section-header animate-hidden">
                    <span className="section-label">04. SOCIAL PROOF</span>
                    <h2 className="section-title">What Clients Say</h2>
                    <p className="testimonials-subtitle">
                        Feedback from people I've shipped production systems with.
                    </p>
                </div>
                <div className="testimonials-grid animate-hidden">
                    {testimonials.map((testimonial) => (
                        <figure key={testimonial.name} className="testimonial-card">
                            <div className="testimonial-profile">
                                {testimonial.image ? (
                                    <img
                                        src={testimonial.image}
                                        alt=""
                                        className="testimonial-image"
                                        loading="lazy"
                                        width="56"
                                        height="56"
                                    />
                                ) : (
                                    <span className="testimonial-image testimonial-initials" aria-hidden="true">
                                        {initialsOf(testimonial.name)}
                                    </span>
                                )}
                                <figcaption className="testimonial-info">
                                    <h3 className="testimonial-name">
                                        {testimonial.source ? (
                                            <a
                                                href={testimonial.source}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {testimonial.name}
                                            </a>
                                        ) : (
                                            testimonial.name
                                        )}
                                    </h3>
                                    <span className="testimonial-role">{testimonial.role}</span>
                                </figcaption>
                            </div>
                            <blockquote className="testimonial-text">{testimonial.text}</blockquote>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
