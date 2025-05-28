
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProceduresPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-24 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 beauty-gradient-text">Procedures Tracking</h1>
          
          <Tabs defaultValue="active" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="active">Active Procedures</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    client: "Elena Petrova",
                    procedure: "Hyaluronic Acid Filler",
                    date: "12 Mar 2025",
                    next: "12 Sep 2025",
                    progress: 30,
                    products: ["Juvederm Volift 1ml"],
                    notes: "Nasolabial folds treated, good immediate result with minimal bruising",
                    color: "beauty"
                  },
                  {
                    client: "Anna Kuznetsova",
                    procedure: "Botulinum Toxin",
                    date: "23 Jan 2025",
                    next: "23 Apr 2025",
                    progress: 70,
                    products: ["Botox 24 units"],
                    notes: "Forehead, glabella and crow's feet treated. Client very satisfied with previous results",
                    color: "teal"
                  },
                  {
                    client: "Maria Sokolova",
                    procedure: "Chemical Peel",
                    date: "05 Apr 2025",
                    next: "05 Jun 2025",
                    progress: 20,
                    products: ["Glycolic acid 30%", "Neutralizer solution"],
                    notes: "Second of planned series of 4 treatments. Skin tolerance good, minimal erythema post-procedure",
                    color: "lavender"
                  },
                  {
                    client: "Svetlana Ivanova",
                    procedure: "Microneedling",
                    date: "18 Mar 2025",
                    next: "18 May 2025",
                    progress: 45,
                    products: ["Hyaluronic Acid Serum", "Vitamin C Serum"],
                    notes: "Third treatment in series. Increasing needle depth to 1.5mm as tolerance has improved",
                    color: "beauty"
                  }
                ].map((procedure, index) => (
                  <Card key={index} className="border-beauty-100">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-beauty-900">{procedure.client}</h3>
                          <h4 className="text-lg font-semibold text-beauty-800">{procedure.procedure}</h4>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          procedure.color === 'beauty' ? 'bg-beauty-100 text-beauty-700' : 
                          procedure.color === 'teal' ? 'bg-teal-100 text-teal-700' : 
                          'bg-lavender-100 text-lavender-700'
                        }`}>
                          {procedure.progress > 60 ? 'Schedule Soon' : 'Active'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm text-beauty-600 mb-2">
                        <span>Last treatment: {procedure.date}</span>
                        <span>Next due: {procedure.next}</span>
                      </div>
                      
                      <Progress 
                        value={procedure.progress} 
                        className={`h-2 mb-3 ${
                          procedure.color === 'beauty' ? 'bg-beauty-100 [&>div]:bg-beauty-500' : 
                          procedure.color === 'teal' ? 'bg-teal-100 [&>div]:bg-teal-500' : 
                          'bg-lavender-100 [&>div]:bg-lavender-500'
                        }`}
                      />
                      
                      <div className="mt-2">
                        <h5 className="font-medium text-beauty-900 text-sm">Products used:</h5>
                        <ul className="list-disc list-inside text-sm text-beauty-700 mb-2">
                          {procedure.products.map((product, i) => (
                            <li key={i}>{product}</li>
                          ))}
                        </ul>
                        
                        <p className="text-sm text-beauty-600 italic">{procedure.notes}</p>
                      </div>
                      
                      <div className="flex justify-end mt-3 space-x-2">
                        <Button size="sm" variant="outline" className="text-beauty-600 border-beauty-200">Update</Button>
                        <Button size="sm" className="bg-beauty-500 hover:bg-beauty-600">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <p className="text-beauty-700 text-center mb-6">View complete history of all procedures and treatments.</p>
              <div className="text-center">
                <Button className="bg-beauty-500 hover:bg-beauty-600">View Full History</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="recommendations">
              <p className="text-beauty-700 text-center mb-6">Personalized recommendations based on client history and needs.</p>
              <div className="text-center">
                <Button className="bg-beauty-500 hover:bg-beauty-600">Create Recommendation</Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-10">
            <Button className="bg-beauty-500 hover:bg-beauty-600 text-white px-6 py-2">
              Record New Procedure
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProceduresPage;
