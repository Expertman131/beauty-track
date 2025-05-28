
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DollarSign, Star, Users, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StaffSchedule from '@/components/staff/StaffSchedule';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StaffPage = () => {
  const [activeTab, setActiveTab] = useState<string>("specialists");
  
  const specialists = [
    {
      id: 1,
      name: "Анна Петрова",
      specialization: "Косметолог",
      rating: 4.8,
      appointments: 156,
      revenue: 425000,
      availability: "Пн-Пт: 10:00-19:00",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      services: ["Чистка лица", "Пилинг", "Массаж лица"]
    },
    {
      id: 2,
      name: "Мария Иванова",
      specialization: "Мастер маникюра",
      rating: 4.9,
      appointments: 203,
      revenue: 380000,
      availability: "Вт-Сб: 11:00-20:00",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      services: ["Маникюр", "Педикюр", "Наращивание"]
    },
    {
      id: 3,
      name: "Елена Сидорова",
      specialization: "Массажист",
      rating: 4.7,
      appointments: 128,
      revenue: 520000,
      availability: "Пн-Сб: 09:00-18:00",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      services: ["Массаж тела", "Лимфодренаж", "Антицеллюлитный массаж"]
    }
  ];

  const mockAppointments = [
    {
      id: "1",
      clientName: "Анна Сергеева",
      clientPhone: "+7 (900) 123-45-67",
      service: "Маникюр",
      time: "10:00",
      date: new Date().toISOString(),
      staffId: 2,
    },
    {
      id: "2",
      clientName: "Мария Иванова",
      clientPhone: "+7 (900) 234-56-78",
      service: "Педикюр",
      time: "14:00",
      date: new Date().toISOString(),
      staffId: 2,
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-24 mb-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h1 className="text-3xl font-bold beauty-gradient-text mb-4 md:mb-0">Управление мастерами</h1>
              <TabsList>
                <TabsTrigger value="specialists">Специалисты</TabsTrigger>
                <TabsTrigger value="schedule">Расписание</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="specialists" className="space-y-6">
              <div className="flex justify-end">
                <Button className="bg-beauty-500 hover:bg-beauty-600">
                  Добавить специалиста
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {specialists.map((specialist) => (
                  <Card key={specialist.id} className="border-beauty-100 hover:border-beauty-200 transition-all hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <img 
                          src={specialist.image} 
                          alt={specialist.name} 
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-semibold text-beauty-900 text-lg">{specialist.name}</h3>
                          <p className="text-sm text-beauty-600">{specialist.specialization}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="text-sm text-beauty-700">{specialist.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-beauty-400 mr-2" />
                          <span className="text-sm text-beauty-600">{specialist.appointments} записей</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-beauty-400 mr-2" />
                          <span className="text-sm text-beauty-600">{specialist.revenue.toLocaleString()} ₽</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-beauty-700 mb-2">График работы:</p>
                        <p className="text-sm text-beauty-600">{specialist.availability}</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-beauty-700 mb-2">Услуги:</p>
                        <div className="flex flex-wrap gap-2">
                          {specialist.services.map((service, index) => (
                            <span 
                              key={index}
                              className="text-xs px-2 py-1 bg-beauty-50 text-beauty-700 rounded-full"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between mt-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-beauty-600 border-beauty-200">
                              Расписание
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Расписание - {specialist.name}</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                              <StaffSchedule 
                                staffId={specialist.id}
                                appointments={mockAppointments}
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" className="bg-beauty-500 hover:bg-beauty-600">
                          Профиль
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="schedule">
              <Card>
                <CardContent className="pt-6">
                  <StaffSchedule />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StaffPage;
