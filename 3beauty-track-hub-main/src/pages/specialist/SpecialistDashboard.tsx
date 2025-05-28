import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpecialistActiveTreatments } from '@/components/specialist/SpecialistActiveTreatments';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Star,
  Clock, 
  CalendarCheck,
  MessageSquare
} from "lucide-react";

const SpecialistDashboard = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-beauty-100">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="text-2xl font-semibold beauty-gradient-text">BeautyTrack</span>
            <span className="ml-2 px-2 py-1 bg-beauty-50 text-beauty-600 text-xs rounded-md">Мастер</span>
          </div>
          
          <Button variant="outline" onClick={handleLogout}>Выйти</Button>
        </div>
      </header>
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src="https://randomuser.me/api/portraits/women/1.jpg" 
                alt="Anаа Petrova" 
                className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-beauty-200"
              />
              <div>
                <h1 className="text-3xl font-bold">Анна Петрова</h1>
                <p className="text-beauty-600">Косметолог • <span className="text-green-600">В сети</span></p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button className="bg-beauty-500 hover:bg-beauty-600 flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Моё расписание
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="treatments">Процедуры клиентов</TabsTrigger>
              <TabsTrigger value="schedule">Расписание</TabsTrigger>
              <TabsTrigger value="statistics">Статистика</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-beauty-500" />
                      Сегодняшние записи
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {[
                      { time: '10:00', clientName: 'Елена П.', service: 'Чистка лица', duration: 60, id: 1 },
                      { time: '12:00', clientName: 'Мария С.', service: 'Пилинг', duration: 45, id: 2 },
                      { time: '14:30', clientName: 'Светлана И.', service: 'Массаж лица', duration: 30, id: 3 },
                      { time: '16:00', clientName: 'Ольга С.', service: 'Чистка лица', duration: 60, id: 4 }
                    ].map((appointment) => (
                      <div key={appointment.id} className="flex items-center mb-3 pb-3 border-b border-beauty-100 last:border-0 last:pb-0 last:mb-0">
                        <div className="bg-beauty-50 text-beauty-600 px-2 py-1 rounded text-sm font-medium w-16 text-center">
                          {appointment.time}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="font-medium">{appointment.clientName}</div>
                          <div className="text-sm text-beauty-600">{appointment.service} ({appointment.duration} мин)</div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Clock className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-beauty-500" />
                      Последние клиенты
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {[
                      { 
                        name: 'Елена Петрова', 
                        visits: 12, 
                        lastVisit: '15 апреля', 
                        nextAppointment: '28 апреля', 
                        image: 'https://randomuser.me/api/portraits/women/33.jpg',
                        id: 1
                      },
                      { 
                        name: 'Мария Соколова', 
                        visits: 8, 
                        lastVisit: '10 апреля', 
                        nextAppointment: '30 апреля', 
                        image: 'https://randomuser.me/api/portraits/women/44.jpg',
                        id: 2
                      },
                      { 
                        name: 'Светлана Иванова', 
                        visits: 15, 
                        lastVisit: '5 апреля', 
                        nextAppointment: '3 мая', 
                        image: 'https://randomuser.me/api/portraits/women/55.jpg',
                        id: 3
                      },
                      { 
                        name: 'Ольга Смирнова', 
                        visits: 3, 
                        lastVisit: '2 апреля', 
                        nextAppointment: 'Не запланировано', 
                        image: 'https://randomuser.me/api/portraits/women/66.jpg',
                        id: 4
                      },
                    ].map((client) => (
                      <div key={client.id} className="flex items-center border border-beauty-100 rounded-lg p-3">
                        <img 
                          src={client.image} 
                          alt={client.name} 
                          className="w-12 h-12 rounded-full object-cover mr-3"
                        />
                        <div className="flex-1">
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-beauty-600">Визитов: {client.visits}</div>
                          <div className="flex justify-between text-xs text-beauty-600 mt-1">
                            <span>Посл.: {client.lastVisit}</span>
                            <span>След.: {client.nextAppointment}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="text-center mt-4">
                      <Button variant="link" className="text-beauty-500">Показать всех клиентов</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-beauty-500" />
                      Отзывы
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {[
                      { 
                        name: 'Елена П.', 
                        date: '15 апреля', 
                        comment: 'Отличный специалист! Очень довольна результатом процедуры.',
                        rating: 5,
                        id: 1
                      },
                      { 
                        name: 'Мария С.', 
                        date: '10 апреля', 
                        comment: 'Профессионально и качественно. Буду обращаться еще.',
                        rating: 5,
                        id: 2
                      },
                      { 
                        name: 'Светлана И.', 
                        date: '5 апреля', 
                        comment: 'Хороший специалист, но хотелось бы более детальную консультацию.',
                        rating: 4,
                        id: 3
                      }
                    ].map((review) => (
                      <div key={review.id} className="mb-4 pb-4 border-b border-beauty-100 last:border-0 last:pb-0">
                        <div className="flex justify-between mb-1">
                          <p className="font-medium">{review.name}</p>
                          <p className="text-sm text-beauty-600">{review.date}</p>
                        </div>
                        <div className="flex items-center mb-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                            />
                          ))}
                        </div>
                        <p className="text-sm text-beauty-700">{review.comment}</p>
                      </div>
                    ))}
                    
                    <div className="text-center mt-4">
                      <Button variant="link" className="text-beauty-500">Показать все отзывы</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-beauty-500" />
                      Доходы
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-beauty-50 p-3 rounded-lg">
                        <p className="text-beauty-600 text-sm mb-1">Сегодня</p>
                        <p className="text-xl font-bold">12,500₽</p>
                      </div>
                      <div className="bg-beauty-50 p-3 rounded-lg">
                        <p className="text-beauty-600 text-sm mb-1">Эта неделя</p>
                        <p className="text-xl font-bold">78,300₽</p>
                      </div>
                      <div className="bg-beauty-50 p-3 rounded-lg">
                        <p className="text-beauty-600 text-sm mb-1">Этот месяц</p>
                        <p className="text-xl font-bold">256,800₽</p>
                      </div>
                    </div>
                    
                    <p className="font-medium mb-2">Популярные услуги:</p>
                    <div className="space-y-2">
                      {[
                        { service: 'Чистка лица', count: 56, revenue: '224,000₽', id: 1 },
                        { service: 'Пилинг', count: 32, revenue: '96,000₽', id: 2 },
                        { service: 'Массаж лица', count: 48, revenue: '72,000₽', id: 3 }
                      ].map((item) => (
                        <div key={item.id} className="flex justify-between border-b border-beauty-100 pb-2">
                          <div>
                            <p className="font-medium">{item.service}</p>
                            <p className="text-sm text-beauty-600">Выполнено: {item.count}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{item.revenue}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center mt-4">
                      <Button variant="link" className="text-beauty-500">Подробная статистика</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="treatments">
              <SpecialistActiveTreatments 
                specialistId="s1" 
                specialistName="Анна Петрова" 
              />
            </TabsContent>
            
            <TabsContent value="schedule">
              <div className="p-6 bg-beauty-50 rounded-lg text-center">
                <Calendar className="h-12 w-12 mx-auto text-beauty-500 mb-2" />
                <h3 className="text-lg font-medium mb-2">Расписание</h3>
                <p className="text-beauty-600">Здесь будет отображаться ваше расписание процедур</p>
              </div>
            </TabsContent>
            
            <TabsContent value="statistics">
              <div className="p-6 bg-beauty-50 rounded-lg text-center">
                <DollarSign className="h-12 w-12 mx-auto text-beauty-500 mb-2" />
                <h3 className="text-lg font-medium mb-2">Статистика</h3>
                <p className="text-beauty-600">Здесь будет отображаться подробная статистика по вашим процедурам</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SpecialistDashboard;
