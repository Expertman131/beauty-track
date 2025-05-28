import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const ClientsPage = () => {
  const addNewClient = () => {
    // This is where the "Add Client" logic will be implemented
    // We'll keep the existing functionality for now
  };

  const handleSearch = (searchTerm: string) => {
    // This is where the search logic will be implemented
    // We'll keep the existing functionality for now
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-24 mb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold beauty-gradient-text mb-4 md:mb-0">Clients</h1>
            
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-beauty-400 h-4 w-4" />
                <Input 
                  placeholder="Search clients..." 
                  className="pl-10 border-beauty-200 w-full sm:w-64"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <Button className="bg-beauty-500 hover:bg-beauty-600" onClick={addNewClient}>
                Add New Client
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Elena Petrova",
                email: "elena.p@beautytrack.ru",
                phone: "+7 (900) 123-45-67",
                lastVisit: "April 5, 2025",
                nextAppointment: "May 10, 2025",
                treatments: ["Chemical Peel", "Botulinum Toxin", "Hyaluronic Acid Filler"],
                image: "https://randomuser.me/api/portraits/women/33.jpg"
              },
              {
                name: "Anna Kuznetsova",
                email: "anna.k@beautytrack.ru",
                phone: "+7 (900) 234-56-78",
                lastVisit: "March 18, 2025",
                nextAppointment: "April 25, 2025",
                treatments: ["Facial Treatment", "Microneedling"],
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Maria Sokolova",
                email: "maria.s@beautytrack.ru",
                phone: "+7 (900) 345-67-89",
                lastVisit: "April 2, 2025",
                nextAppointment: "May 2, 2025",
                treatments: ["Botulinum Toxin", "Microdermabrasion"],
                image: "https://randomuser.me/api/portraits/women/55.jpg"
              },
              {
                name: "Svetlana Ivanova",
                email: "svetlana.i@beautytrack.ru",
                phone: "+7 (900) 456-78-90",
                lastVisit: "March 25, 2025",
                nextAppointment: "April 30, 2025",
                treatments: ["Microneedling", "Chemical Peel"],
                image: "https://randomuser.me/api/portraits/women/66.jpg"
              },
              {
                name: "Olga Smirnova",
                email: "olga.s@beautytrack.ru",
                phone: "+7 (900) 567-89-01",
                lastVisit: "February 15, 2025",
                nextAppointment: "Not scheduled",
                treatments: ["Consultation", "Facial Treatment"],
                image: "https://randomuser.me/api/portraits/women/77.jpg"
              },
              {
                name: "Natalia Volkova",
                email: "natalia.v@beautytrack.ru",
                phone: "+7 (900) 678-90-12",
                lastVisit: "Never",
                nextAppointment: "April 28, 2025",
                treatments: ["First Consultation"],
                image: "https://randomuser.me/api/portraits/women/88.jpg"
              }
            ].map((client, index) => (
              <Card key={index} className="border-beauty-100 hover:border-beauty-200 transition-all hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={client.image} 
                      alt={client.name} 
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-beauty-900 text-lg">{client.name}</h3>
                      <p className="text-sm text-beauty-600">{client.email}</p>
                      <p className="text-sm text-beauty-600">{client.phone}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-beauty-700 font-medium">Last Visit:</span>
                      <span className="text-sm text-beauty-900">{client.lastVisit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-beauty-700 font-medium">Next Appointment:</span>
                      <span className="text-sm text-beauty-900">{client.nextAppointment}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-beauty-700 mb-1">Treatments:</h4>
                    <div className="flex flex-wrap gap-2">
                      {client.treatments.map((treatment, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-beauty-50 text-beauty-700 rounded-full">
                          {treatment}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" size="sm" className="text-beauty-600 border-beauty-200">
                      View Profile
                    </Button>
                    <Button size="sm" className="bg-beauty-500 hover:bg-beauty-600">
                      Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClientsPage;
