
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const IntegrationSection = () => {
  return (
    <section className="py-20 bg-beauty-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="beauty-gradient-text">Seamless Integrations</span> With Your Tools
          </h2>
          <p className="text-xl text-beauty-800 max-w-3xl mx-auto">
            BeautyTrack connects with the CRM systems and tools you already use, 
            creating a unified workflow for your beauty business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="border-beauty-100 hover:border-beauty-300 transition-all hover:shadow-md">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center mb-6">
                <img src="https://crm-hunter.com/upload/resize_cache/webp/upload/medialibrary/35e/35e62864ef2893928d1f3fadf5912550.webp" 
                  alt="AmoCRM" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-beauty-900">AmoCRM</h3>
              <p className="text-beauty-700 mb-6">
                Synchronize client data, appointments, and sales between BeautyTrack and AmoCRM for streamlined lead management.
              </p>
              <Button variant="outline" className="border-beauty-500 text-beauty-500 hover:bg-beauty-50 mt-auto">
                Connect AmoCRM
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-beauty-100 hover:border-beauty-300 transition-all hover:shadow-md">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center mb-6">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Bitrix24_logo.svg/1200px-Bitrix24_logo.svg.png" 
                  alt="Bitrix24" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-beauty-900">Bitrix24</h3>
              <p className="text-beauty-700 mb-6">
                Connect your Bitrix24 account to manage client relationships, tasks, and documents directly from BeautyTrack.
              </p>
              <Button variant="outline" className="border-beauty-500 text-beauty-500 hover:bg-beauty-50 mt-auto">
                Connect Bitrix24
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-beauty-100 hover:border-beauty-300 transition-all hover:shadow-md">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center mb-6">
                <img src="https://seeklogo.com/images/G/google-calendar-logo-84E650FB4D-seeklogo.com.png" 
                  alt="Google Calendar" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-beauty-900">Google Calendar</h3>
              <p className="text-beauty-700 mb-6">
                Two-way sync with Google Calendar to manage all your appointments in one place, avoiding double bookings.
              </p>
              <Button variant="outline" className="border-beauty-500 text-beauty-500 hover:bg-beauty-50 mt-auto">
                Connect Google Calendar
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <Button className="bg-beauty-500 hover:bg-beauty-600 text-white px-8 py-6 text-lg">
            Explore All Integrations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;
