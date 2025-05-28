
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const AppointmentsPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showDetails, setShowDetails] = useState(false);

  // Dummy data for demonstration
  const appointments = [
    {
      id: 1,
      clientName: "Елена Петрова",
      specialist: "Анна Иванова",
      service: "Маникюр",
      time: "10:00",
      date: new Date().toISOString(),
    },
    {
      id: 2,
      clientName: "Мария Сидорова",
      specialist: "Ольга Смирнова",
      service: "Педикюр",
      time: "11:30",
      date: new Date().toISOString(),
    }
  ];

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(app => 
      format(new Date(app.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-24 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 beauty-gradient-text">Календарь записей</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardContent className="p-6">
                <Tabs defaultValue="week" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="day">День</TabsTrigger>
                    <TabsTrigger value="week">Неделя</TabsTrigger>
                    <TabsTrigger value="month">Месяц</TabsTrigger>
                  </TabsList>
                  
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setShowDetails(true);
                    }}
                    locale={ru}
                    className="rounded-md border shadow pointer-events-auto"
                    modifiersStyles={{
                      selected: {
                        backgroundColor: 'rgb(var(--beauty-500))',
                        color: 'white',
                      }
                    }}
                  />
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {selectedDate ? (
                    `Записи на ${format(selectedDate, 'dd MMMM yyyy', { locale: ru })}`
                  ) : (
                    'Выберите дату'
                  )}
                </h3>
                <div className="space-y-4">
                  {selectedDate && getAppointmentsForDate(selectedDate).map((appointment) => (
                    <div 
                      key={appointment.id} 
                      className="p-4 rounded-lg border border-beauty-100 hover:border-beauty-200 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-beauty-900">{appointment.time}</p>
                          <p className="text-sm text-beauty-700">{appointment.clientName}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setShowDetails(true)}
                        >
                          Подробнее
                        </Button>
                      </div>
                      <div className="text-sm">
                        <p className="text-beauty-600">Мастер: {appointment.specialist}</p>
                        <p className="text-beauty-600">Услуга: {appointment.service}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Детали записи</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedDate && getAppointmentsForDate(selectedDate).map((appointment) => (
              <div key={appointment.id} className="space-y-2">
                <p><strong>Клиент:</strong> {appointment.clientName}</p>
                <p><strong>Мастер:</strong> {appointment.specialist}</p>
                <p><strong>Услуга:</strong> {appointment.service}</p>
                <p><strong>Время:</strong> {appointment.time}</p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline">Перенести</Button>
                  <Button variant="destructive">Отменить</Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default AppointmentsPage;
