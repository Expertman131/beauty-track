
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, Bell, MessageCircle } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Effortlessly manage appointments with clients. Automatic reminders, online booking, and calendar sync."
  },
  {
    icon: User,
    title: "Client Profiles",
    description: "Comprehensive client histories, including all procedures, products used, before/after photos, and notes."
  },
  {
    icon: Bell,
    title: "Follow-up Reminders",
    description: "Set automatic reminders for post-procedure care and future appointments based on procedure type."
  },
  {
    icon: MessageCircle,
    title: "Client Communication",
    description: "Direct messaging with clients for consultation, aftercare instructions, and product recommendations."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-20 bg-beauty-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 beauty-gradient-text">Features Designed for Beauty Professionals</h2>
          <p className="text-xl text-beauty-800 max-w-3xl mx-auto">
            BeautyTrack streamlines your beauty business with specialized tools for cosmetologists and their clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-beauty-100 hover:border-beauty-300 transition-colors overflow-hidden group">
              <CardContent className="p-6 pt-8 flex flex-col items-center text-center">
                <div className="mb-6 w-16 h-16 rounded-full flex items-center justify-center beauty-gradient text-white">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-beauty-900 group-hover:beauty-gradient-text transition-colors">
                  {feature.title}
                </h3>
                <p className="text-beauty-700">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
