
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AppointmentSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-64 h-64 rounded-full bg-lavender-100"></div>
              <div className="absolute -bottom-4 -right-4 w-40 h-40 rounded-full bg-beauty-100"></div>
              <Card className="relative border-beauty-200 shadow-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-beauty-500 text-white p-4">
                    <h3 className="text-xl font-semibold">Appointment Calendar</h3>
                    <p className="text-beauty-50">April 2025</p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                        <div key={i} className="text-center text-beauty-600 font-medium">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                        <Button 
                          key={day}
                          variant={day === 15 ? "default" : day === 22 || day === 8 ? "secondary" : "ghost"}
                          className={`
                            h-12 w-full rounded-md text-sm font-medium
                            ${day === 15 ? 'bg-beauty-500 hover:bg-beauty-600 text-white' : ''}
                            ${day === 22 || day === 8 ? 'bg-teal-500 hover:bg-teal-600 text-white' : ''}
                          `}
                        >
                          {day}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center p-2 rounded-md bg-beauty-50 border border-beauty-200">
                        <div className="w-2 h-8 bg-beauty-500 rounded-full mr-3"></div>
                        <div>
                          <p className="font-medium text-beauty-900">15 Apr • 14:30</p>
                          <p className="text-sm text-beauty-700">Facial Treatment - Anna K.</p>
                        </div>
                      </div>
                      <div className="flex items-center p-2 rounded-md bg-teal-50 border border-teal-200">
                        <div className="w-2 h-8 bg-teal-500 rounded-full mr-3"></div>
                        <div>
                          <p className="font-medium text-teal-900">22 Apr • 10:00</p>
                          <p className="text-sm text-teal-700">Skin Consultation - Maria S.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 lg:pl-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="beauty-gradient-text">Simplified</span> Appointment Management
            </h2>
            <p className="text-xl text-beauty-800 mb-8">
              Let clients book appointments online while you maintain full control of your schedule. 
              Reduce no-shows with automated reminders and manage your calendar with ease.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Online booking system with customizable availability",
                "Automated appointment reminders via SMS and email",
                "Calendar sync with Google Calendar and iCloud",
                "Client self-service rescheduling options",
                "Custom appointment types and durations"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 mt-1 text-beauty-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span className="text-beauty-800">{item}</span>
                </li>
              ))}
            </ul>
            <Button className="bg-beauty-500 hover:bg-beauty-600 text-white px-8 py-6 text-lg">
              Try Appointment Scheduler
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
