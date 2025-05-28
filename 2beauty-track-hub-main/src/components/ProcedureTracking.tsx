
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const treatments = [
  {
    name: 'Hyaluronic Acid Filler',
    date: '12 Mar 2025',
    next: '12 Sep 2025',
    progress: 30,
    status: 'Active',
    color: 'beauty'
  },
  {
    name: 'Botulinum Toxin',
    date: '23 Jan 2025',
    next: '23 Apr 2025',
    progress: 70,
    status: 'Schedule Soon',
    color: 'teal'
  },
  {
    name: 'Chemical Peel',
    date: '05 Apr 2025',
    next: '05 Jun 2025',
    progress: 20,
    status: 'Active',
    color: 'lavender'
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
                        className={`h-2 ${
                          treatment.color === 'beauty' 
                            ? 'bg-beauty-100 [&>div]:bg-beauty-500' 
                            : treatment.color === 'teal' 
                              ? 'bg-teal-100 [&>div]:bg-teal-500' 
                              : 'bg-lavender-100 [&>div]:bg-lavender-500'
                        }`}
                      />
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
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      {[
                        {
                          date: "April 5, 2025",
                          title: "Chemical Peel",
                          details: "Glycolic acid 30%, application time 5 minutes",
                          notes: "Client reported slight tingling but no discomfort. Skin appeared slightly red immediately after procedure."
                        },
                        {
                          date: "January 23, 2025",
                          title: "Botulinum Toxin",
                          details: "24 units total - forehead (10), glabella (8), crow's feet (6)",
                          notes: "Follow-up showed excellent results after 14 days. Client very satisfied with reduced appearance of fine lines."
                        },
                        {
                          date: "October 15, 2024",
                          title: "Hyaluronic Acid Filler",
                          details: "1ml Juvederm Volift, nasolabial folds",
                          notes: "Client reported minimal bruising that resolved within 5 days. Results maintained well at 3-month check."
                        }
                      ].map((item, index) => (
                        <div key={index} className="border-l-2 border-teal-300 pl-4 relative">
                          <div className="w-3 h-3 rounded-full bg-teal-500 absolute -left-[7px] top-[6px]"></div>
                          <p className="text-sm text-beauty-600">{item.date}</p>
                          <h4 className="font-medium text-beauty-900 mt-1">{item.title}</h4>
                          <p className="text-sm text-beauty-800 mt-1">{item.details}</p>
                          <p className="text-sm text-beauty-700 mt-2 italic">{item.notes}</p>
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
