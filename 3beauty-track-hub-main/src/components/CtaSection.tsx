
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 beauty-gradient opacity-10"></div>
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-beauty-100 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-lavender-100 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="bg-white border border-beauty-100 rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform your <span className="beauty-gradient-text">beauty business?</span>
          </h2>
          
          <p className="text-xl text-beauty-800 mb-8 max-w-2xl mx-auto">
            Start tracking procedures, managing appointments, and growing your 
            client relationships with BeautyTrack today.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-beauty-500 hover:bg-beauty-600 text-white px-8 py-6 text-lg" asChild>
              <Link to="/register">Start Free Trial</Link>
            </Button>
            <Button variant="outline" className="border-beauty-500 text-beauty-500 hover:bg-beauty-50 px-8 py-6 text-lg" asChild>
              <Link to="/demo">Schedule a Demo</Link>
            </Button>
          </div>
          
          <p className="text-beauty-700 mt-6">
            No credit card required. 14-day free trial.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
