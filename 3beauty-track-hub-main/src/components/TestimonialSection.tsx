
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "BeautyTrack transformed how I manage my beauty salon. Client tracking and appointment scheduling have never been easier!",
    author: "Marina Ivanova",
    role: "Beauty Salon Owner",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    quote: "As a cosmetic dermatologist, I need precise records of procedures and products. BeautyTrack makes this simple while looking professional.",
    author: "Dr. Elena Petrova",
    role: "Cosmetic Dermatologist",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    quote: "The integration with AmoCRM was seamless. Now I have my client data synced across all my business tools. Highly recommend!",
    author: "Olga Smirnova",
    role: "Cosmetologist",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg"
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Loved by <span className="beauty-gradient-text">Beauty Professionals</span>
          </h2>
          <p className="text-xl text-beauty-800 max-w-3xl mx-auto">
            See what cosmetologists, salon owners, and beauty specialists are saying about BeautyTrack.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-beauty-100 hover:border-beauty-200 transition-all">
              <CardContent className="p-6 flex flex-col">
                <div className="mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FF3388" className="inline-block mr-1">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  ))}
                </div>
                
                <p className="text-beauty-800 italic mb-6">"{testimonial.quote}"</p>
                
                <div className="flex items-center mt-auto">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium text-beauty-900">{testimonial.author}</h4>
                    <p className="text-sm text-beauty-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
