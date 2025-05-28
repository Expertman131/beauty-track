
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ClientActiveProceduresPage } from '@/components/client/ClientActiveProceduresPage';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClientProcedurePage = () => {
  const navigate = useNavigate();
  
  // Using hardcoded data for now. In a real app, these would come from authentication or context
  const clientId = "client-1";
  const clientName = "Анна";

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-beauty-100">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="text-2xl font-semibold beauty-gradient-text">BeautyTrack</span>
            <span className="ml-2 px-2 py-1 bg-beauty-50 text-beauty-600 text-xs rounded-md">Клиент</span>
          </div>
          
          <Button variant="outline" onClick={() => navigate('/client/dashboard')}>
            Вернуться в кабинет
          </Button>
        </div>
      </header>
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-4 flex items-center gap-2"
            onClick={() => navigate('/client/dashboard')}
          >
            <ArrowLeft className="h-4 w-4" />
            Назад к кабинету
          </Button>
          
          <ClientActiveProceduresPage clientId={clientId} clientName={clientName} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClientProcedurePage;
