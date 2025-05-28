
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const IntegrationsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-24 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 beauty-gradient-text">Integrations</h1>
          
          <p className="text-xl text-beauty-800 max-w-3xl mb-12">
            Connect BeautyTrack with your favorite apps and services to streamline your workflow 
            and keep all your business data synchronized.
          </p>
          
          <h2 className="text-2xl font-semibold text-beauty-900 mb-6">CRM Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="border-beauty-100 hover:border-beauty-300 transition-all hover:shadow-md">
              <CardContent className="p-6 flex flex-col md:flex-row items-center">
                <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center mb-6 md:mb-0 md:mr-6">
                  <img src="https://crm-hunter.com/upload/resize_cache/webp/upload/medialibrary/35e/35e62864ef2893928d1f3fadf5912550.webp" 
                    alt="AmoCRM" className="w-16 h-16 object-contain" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-3 text-beauty-900">AmoCRM</h3>
                  <p className="text-beauty-700 mb-6">
                    Synchronize client data, appointments, and sales between BeautyTrack and AmoCRM for streamlined lead management.
                  </p>
                  <div className="flex justify-center md:justify-start">
                    <Button className="bg-beauty-500 hover:bg-beauty-600">
                      Connect AmoCRM
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-beauty-100 hover:border-beauty-300 transition-all hover:shadow-md">
              <CardContent className="p-6 flex flex-col md:flex-row items-center">
                <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center mb-6 md:mb-0 md:mr-6">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Bitrix24_logo.svg/1200px-Bitrix24_logo.svg.png" 
                    alt="Bitrix24" className="w-16 h-16 object-contain" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-3 text-beauty-900">Bitrix24</h3>
                  <p className="text-beauty-700 mb-6">
                    Connect your Bitrix24 account to manage client relationships, tasks, and documents directly from BeautyTrack.
                  </p>
                  <div className="flex justify-center md:justify-start">
                    <Button className="bg-beauty-500 hover:bg-beauty-600">
                      Connect Bitrix24
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-2xl font-semibold text-beauty-900 mb-6">Calendar & Scheduling</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="border-beauty-100 hover:border-beauty-300 transition-all hover:shadow-md">
              <CardContent className="p-6 flex flex-col md:flex-row items-center">
                <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center mb-6 md:mb-0 md:mr-6">
                  <img src="https://seeklogo.com/images/G/google-calendar-logo-84E650FB4D-seeklogo.com.png" 
                    alt="Google Calendar" className="w-16 h-16 object-contain" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-3 text-beauty-900">Google Calendar</h3>
                  <p className="text-beauty-700 mb-6">
                    Two-way sync with Google Calendar to manage all your appointments in one place, avoiding double bookings.
                  </p>
                  <div className="flex justify-center md:justify-start">
                    <Button className="bg-beauty-500 hover:bg-beauty-600">
                      Connect Google Calendar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-beauty-100 hover:border-beauty-300 transition-all hover:shadow-md">
              <CardContent className="p-6 flex flex-col md:flex-row items-center">
                <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center mb-6 md:mb-0 md:mr-6">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Microsoft_Office_Outlook_%282019%E2%80%93present%29.svg/1024px-Microsoft_Office_Outlook_%282019%E2%80%93present%29.svg.png" 
                    alt="Outlook Calendar" className="w-16 h-16 object-contain" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-3 text-beauty-900">Outlook Calendar</h3>
                  <p className="text-beauty-700 mb-6">
                    Sync your appointments with Outlook Calendar for seamless scheduling and time management.
                  </p>
                  <div className="flex justify-center md:justify-start">
                    <Button className="bg-beauty-500 hover:bg-beauty-600">
                      Connect Outlook
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-2xl font-semibold text-beauty-900 mb-6">Communications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-beauty-100 hover:border-beauty-300 transition-all hover:shadow-md">
              <CardContent className="p-6 flex flex-col md:flex-row items-center">
                <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center mb-6 md:mb-0 md:mr-6">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png" 
                    alt="Gmail" className="w-16 h-16 object-contain" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-3 text-beauty-900">Gmail</h3>
                  <p className="text-beauty-700 mb-6">
                    Send appointment confirmations, reminders, and follow-ups directly through your Gmail account.
                  </p>
                  <div className="flex justify-center md:justify-start">
                    <Button className="bg-beauty-500 hover:bg-beauty-600">
                      Connect Gmail
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-beauty-100 hover:border-beauty-300 transition-all hover:shadow-md">
              <CardContent className="p-6 flex flex-col md:flex-row items-center">
                <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center mb-6 md:mb-0 md:mr-6">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/767px-WhatsApp.svg.png" 
                    alt="WhatsApp" className="w-16 h-16 object-contain" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-3 text-beauty-900">WhatsApp</h3>
                  <p className="text-beauty-700 mb-6">
                    Send automated reminders and communicate with clients through WhatsApp Business API integration.
                  </p>
                  <div className="flex justify-center md:justify-start">
                    <Button className="bg-beauty-500 hover:bg-beauty-600">
                      Connect WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IntegrationsPage;
