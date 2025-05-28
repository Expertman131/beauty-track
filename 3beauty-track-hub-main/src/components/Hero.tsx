
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center pt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 pr-0 lg:pr-10 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="beauty-gradient-text">BeautyTrack</span>
              <br />
              <span className="text-beauty-900">
                Your beauty procedures, organized
              </span>
            </h1>
            <p className="text-lg md:text-xl text-beauty-800 mb-8 max-w-xl">
              All-in-one platform for cosmetologists and their clients. Schedule appointments, 
              track procedures, and get personalized beauty recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-beauty-500 hover:bg-beauty-600 text-white px-8 py-6 text-lg"
                asChild
              >
                <Link to="/register">Get Started</Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-beauty-500 text-beauty-500 hover:bg-beauty-50 px-8 py-6 text-lg"
                asChild
              >
                <Link to="/demo">Book a Demo</Link>
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full rounded-3xl bg-lavender-300 animate-bounce-slow" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute -bottom-6 -right-6 w-full h-full rounded-3xl bg-beauty-300 animate-bounce-slow"></div>
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                  alt="BeautyTrack in action" 
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
