
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, FileImage, Activity, BarChart3, Calendar as CalendarIcon } from "lucide-react";

const treatments = [
  {
    name: 'Hyaluronic Acid Filler',
    date: '12 Mar 2025',
    next: '12 Sep 2025',
    progress: 30,
    status: 'Active',
    color: 'beauty',
    composition: 'Juvederm Ultra XC 1ml',
    parameters: 'Lateral cheek injection, deep dermal placement',
    photos: true
  },
  {
    name: 'Botulinum Toxin',
    date: '23 Jan 2025',
    next: '23 Apr 2025',
    progress: 70,
    status: 'Schedule Soon',
    color: 'teal',
    composition: 'Botox 24 units',
    parameters: 'Glabellar: 10u, Frontalis: 8u, Crow\'s feet: 6u',
    photos: true
  },
  {
    name: 'Chemical Peel',
    date: '05 Apr 2025',
    next: '05 Jun 2025',
    progress: 20,
    status: 'Active',
    color: 'lavender',
    composition: 'Glycolic Acid 30% pH 3.2',
    parameters: 'Application time: 5 minutes, single layer',
    photos: false
  }
];

const ProcedureTracking = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row-reverse items-center">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:pl-16">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Complete <span className="beauty-gradient-text">Treatment Tracking</span>
              </h2>
              <p className="text-xl text-beauty-800 mb-8">
                Keep detailed records of all cosmetic procedures, products used, and results achieved. 
                Plan follow-ups based on procedure type and client needs.
              </p>
              
              <div className="space-y-4">
                {treatments.map((treatment, index) => (
                  <Card key={index} className="border-beauty-100 overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-beauty-900">{treatment.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${treatment.color === 'beauty' ? 'bg-beauty-100 text-beauty-700' : treatment.color === 'teal' ? 'bg-teal-100 text-teal-700' : 'bg-lavender-100 text-lavender-700'}`}>
                          {treatment.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-beauty-600 mb-2">
                        <span>Last treatment: {treatment.date}</span>
                        <span>Next due: {treatment.next}</span>
                      </div>
                      <Progress 
                        value={treatment.progress} 
                        className={`h-2 mb-3 ${
                          treatment.color === 'beauty' 
                            ? 'bg-beauty-100 [&>div]:bg-beauty-500' 
                            : treatment.color === 'teal' 
                              ? 'bg-teal-100 [&>div]:bg-teal-500' 
                              : 'bg-lavender-100 [&>div]:bg-lavender-500'
                        }`}
                      />
                      
                      {/* New procedure details section */}
                      <div className="mt-3 text-xs text-beauty-700">
                        <div className="flex items-center mb-1">
                          <Activity className="h-3 w-3 mr-1" />
                          <span className="font-medium">Composition:</span>
                          <span className="ml-1">{treatment.composition}</span>
                        </div>
                        <div className="flex items-center mb-1">
                          <BarChart3 className="h-3 w-3 mr-1" />
                          <span className="font-medium">Parameters:</span>
                          <span className="ml-1">{treatment.parameters}</span>
                        </div>
                        {treatment.photos && (
                          <div className="flex items-center">
                            <FileImage className="h-3 w-3 mr-1" />
                            <span className="font-medium">Photos available</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-between mt-3">
                        <Button variant="outline" size="sm" className="text-xs flex items-center">
                          <CalendarIcon className="h-3 w-3 mr-1" /> Add to calendar
                        </Button>
                        <Button 
                          size="sm" 
                          className="text-xs bg-beauty-500 hover:bg-beauty-600"
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button className="bg-beauty-500 hover:bg-beauty-600 text-white mt-4">
                View All Treatments
              </Button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 lg:pr-16">
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-64 h-64 rounded-full bg-beauty-100"></div>
              <div className="absolute -bottom-4 -left-4 w-40 h-40 rounded-full bg-lavender-100"></div>
              <Card className="relative border-beauty-200 shadow-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-teal-500 text-white p-4">
                    <h3 className="text-xl font-semibold">Client Treatment History</h3>
                    <p className="text-teal-50">Elena Petrova</p>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-teal-100">Skin Type:</span>
                        <span className="ml-1 text-white font-medium">III (Fitzpatrick)</span>
                      </div>
                      <div>
                        <span className="text-teal-100">Skin Condition:</span>
                        <span className="ml-1 text-white font-medium">Combination</span>
                      </div>
                      <div>
                        <span className="text-teal-100">Allergies:</span>
                        <span className="ml-1 text-white font-medium">Lidocaine</span>
                      </div>
                      <div>
                        <span className="text-teal-100">Medical Notes:</span>
                        <span className="ml-1 text-white font-medium">Hypertension</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      {[
                        {
                          date: "April 5, 2025",
                          title: "Chemical Peel",
                          details: "Glycolic acid 30%, application time 5 minutes",
                          composition: "Glycolic Acid 30% pH 3.2",
                          parameters: "Application time: 5 minutes, single layer",
                          skinReaction: "Slight tingling, mild erythema",
                          recommendations: "Avoid sun exposure, use SPF 50, gentle cleanser only",
                          photos: true,
                          notes: "Client reported slight tingling but no discomfort. Skin appeared slightly red immediately after procedure."
                        },
                        {
                          date: "January 23, 2025",
                          title: "Botulinum Toxin",
                          details: "24 units total - forehead (10), glabella (8), crow's feet (6)",
                          composition: "Botox 24 units",
                          parameters: "Glabellar: 10u, Frontalis: 8u, Crow's feet: 6u",
                          skinReaction: "Minimal erythema at injection sites",
                          recommendations: "No facial massage for 24h, no exercise for 4h",
                          photos: true,
                          notes: "Follow-up showed excellent results after 14 days. Client very satisfied with reduced appearance of fine lines."
                        },
                        {
                          date: "October 15, 2024",
                          title: "Hyaluronic Acid Filler",
                          details: "1ml Juvederm Volift, nasolabial folds",
                          composition: "Juvederm Ultra XC 1ml",
                          parameters: "Lateral cheek injection, deep dermal placement",
                          skinReaction: "Minimal bruising, swelling expected 24-48h",
                          recommendations: "Cold compress for swelling, avoid makeup 12h",
                          photos: true,
                          notes: "Client reported minimal bruising that resolved within 5 days. Results maintained well at 3-month check."
                        }
                      ].map((item, index) => (
                        <div key={index} className="border-l-2 border-teal-300 pl-4 relative">
                          <div className="w-3 h-3 rounded-full bg-teal-500 absolute -left-[7px] top-[6px]"></div>
                          <p className="text-sm text-beauty-600">{item.date}</p>
                          <h4 className="font-medium text-beauty-900 mt-1">{item.title}</h4>
                          <div className="text-xs text-beauty-800 mt-1">
                            <div className="mb-1"><span className="font-medium">Composition:</span> {item.composition}</div>
                            <div className="mb-1"><span className="font-medium">Parameters:</span> {item.parameters}</div>
                            <div className="mb-1"><span className="font-medium">Skin Reaction:</span> {item.skinReaction}</div>
                            <div className="mb-1"><span className="font-medium">Recommendations:</span> {item.recommendations}</div>
                            {item.photos && (
                              <div className="flex items-center text-beauty-600 mt-1">
                                <FileImage className="h-3 w-3 mr-1" />
                                <span>Before/After photos available</span>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-beauty-700 mt-2 italic">{item.notes}</p>
                          <div className="flex justify-end mt-2">
                            <Button size="sm" variant="outline" className="text-xs">View Details</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcedureTracking;
