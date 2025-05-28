import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CalendarCheck, 
  Clock, 
  Gift, 
  Star, 
  Calendar,
  MessageSquare,
  Scissors,
  Tag,
  Settings,
  User,
  Bell,
  HelpCircle,
  ClipboardList
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ClientReviewForm from '@/components/client/ClientReviewForm';
import ClientBonusesModal from '@/components/client/ClientBonusesModal';
import ClientProfileSettings from '@/components/client/ClientProfileSettings';
import { ClientTreatmentTracking } from '@/components/client/ClientTreatmentTracking';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showBonusesDialog, setShowBonusesDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [activeVisitForReview, setActiveVisitForReview] = useState(null);
  
  // Client data - updated to include the new required fields
  const clientData = {
    name: "Анна",
    bonusPoints: 1250,
    phone: "+7 (900) 123-45-67",
    email: "anna@example.com",
    notifications: {
      appointments: true,
      marketing: true,
      reviews: true
    },
    // Added the new required fields
    skinType: "III",
    skinCondition: "combination",
    allergies: "Нет известных аллергий",
    chronicConditions: "Нет хронических заболеваний"
  };
  
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const handleOpenReview = (visit) => {
    setActiveVisitForReview(visit);
    setShowReviewDialog(true);
  };

  const handleUseBonuses = () => {
    setShowBonusesDialog(true);
  };

  const handleOpenSettings = () => {
    setShowSettingsDialog(true);
  };

  // Navigate to procedures page
  const goToProceduresPage = () => {
    navigate('/client/procedures');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-beauty-100">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="text-2xl font-semibold beauty-gradient-text">BeautyTrack</span>
            <span className="ml-2 px-2 py-1 bg-beauty-50 text-beauty-600 text-xs rounded-md">Клиент</span>
          </div>
          
          <div className="flex gap-3 items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-beauty-600 relative"
              onClick={handleOpenSettings}
            >
              <Settings className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-beauty-600 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">2</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-beauty-600"
              onClick={() => navigate('/help')}
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
            
            <Button variant="outline" onClick={handleLogout}>Выйти</Button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Добро пожаловать, {clientData.name}!</h1>
              <p className="text-beauty-600">Ваш личный кабинет в BeautyTrack</p>
            </div>
            
            <div className="flex gap-2">
              <Button className="bg-beauty-500 hover:bg-beauty-600 flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Записаться на прием
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="dashboard" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="dashboard">Обзор</TabsTrigger>
              <TabsTrigger value="appointments">Записи</TabsTrigger>
              <TabsTrigger value="procedures">Процедуры</TabsTrigger>
              <TabsTrigger value="bonuses">Бонусы и скидки</TabsTrigger>
              <TabsTrigger value="profile">Мой профиль</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <CalendarCheck className="h-5 w-5 mr-2 text-beauty-500" />
                      Предстоящие записи
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {[
                      { date: '25 апреля, 14:00', service: 'Маникюр', master: 'Мария И.', id: 1 },
                      { date: '3 мая, 10:30', service: 'Стрижка', master: 'Анна П.', id: 2 }
                    ].map((appointment) => (
                      <div key={appointment.id} className="mb-3 pb-3 border-b border-beauty-100 last:border-0 last:pb-0 last:mb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{appointment.service}</p>
                            <p className="text-sm text-beauty-600">Мастер: {appointment.master}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-beauty-700">{appointment.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">Перенести</Button>
                          <Button variant="outline" size="sm" className="text-red-500">Отменить</Button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="text-center mt-4">
                      <Button variant="link" className="text-beauty-500" onClick={() => navigate('/client/appointments')}>Смотреть все записи</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-beauty-500" />
                      История визитов
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {[
                      { date: '15 апреля 2025', service: 'Окрашивание волос', master: 'Елена С.', id: 1, reviewed: false },
                      { date: '28 марта 2025', service: 'Стрижка + укладка', master: 'Анна П.', id: 2, reviewed: true },
                      { date: '10 марта 2025', service: 'Маникюр', master: 'Мария И.', id: 3, reviewed: false }
                    ].map((visit) => (
                      <div key={visit.id} className="mb-3 pb-3 border-b border-beauty-100 last:border-0 last:pb-0 last:mb-0">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{visit.service}</p>
                            <p className="text-sm text-beauty-600">Мастер: {visit.master}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-beauty-700">{visit.date}</p>
                            {!visit.reviewed && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="p-0 h-auto flex items-center gap-1"
                                onClick={() => handleOpenReview(visit)}
                              >
                                <Star className="h-3 w-3" /> Оставить отзыв
                              </Button>
                            )}
                            {visit.reviewed && (
                              <span className="text-xs text-green-600">Отзыв оставлен</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="text-center mt-4">
                      <Button variant="link" className="text-beauty-500">Показать полную историю</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Gift className="h-5 w-5 mr-2 text-beauty-500" />
                      Бонусы и скидки
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-beauty-50 p-4 rounded-lg mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Ваши бонусы:</span>
                        <span className="text-lg font-bold text-beauty-600">{clientData.bonusPoints}</span>
                      </div>
                      <div className="text-sm text-beauty-600 mb-3">
                        100 бонусов = 100 рублей скидки на следующее посещение
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full text-beauty-600 border-beauty-200"
                        onClick={handleUseBonuses}
                      >
                        Использовать бонусы
                      </Button>
                    </div>
                    
                    <p className="font-medium mb-2">Доступные акции:</p>
                    <div className="space-y-2">
                      {[
                        { name: 'День рождения: скидка 15%', valid: 'Действует 7 дней до и после ДР', id: 1 },
                        { name: 'Приведи друга: 500 бонусов', valid: 'Действует всегда', id: 2 }
                      ].map((promo) => (
                        <div key={promo.id} className="border border-beauty-100 rounded-md p-3">
                          <p className="font-medium">{promo.name}</p>
                          <p className="text-sm text-beauty-600">{promo.valid}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mb-8">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <ClipboardList className="h-5 w-5 mr-2 text-beauty-500" />
                    Мои процедуры
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-stretch gap-4">
                    <div className="flex-1 bg-beauty-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Активные курсы процедур</h3>
                      <p className="text-sm text-beauty-600 mb-4">У вас есть активные курсы процедур, которые требуют вашего внимания.</p>
                      <div className="flex items-center justify-between mb-2">
                        <span>Курс биоревитализации</span>
                        <span className="text-green-600 text-sm">45% завершено</span>
                      </div>
                      <div className="w-full bg-beauty-200 rounded-full h-2 mb-4">
                        <div className="bg-beauty-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={goToProceduresPage}
                      >
                        Перейти к моим процедурам
                      </Button>
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-medium mb-2">Предстоящие сеансы</h3>
                      <div className="border border-beauty-100 rounded-lg p-3 mb-2">
                        <p className="font-medium">Химический пилинг</p>
                        <p className="text-sm text-beauty-600">22 мая 2025, 15:30</p>
                      </div>
                      <div className="border border-beauty-100 rounded-lg p-3">
                        <p className="font-medium">Лазерная эпиляция</p>
                        <p className="text-sm text-beauty-600">10 июля 2025, 13:00</p>
                      </div>
                      <div className="mt-auto pt-2">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={goToProceduresPage}
                        >
                          Управление процедурами
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Scissors className="h-5 w-5 mr-2 text-beauty-500" />
                      Мои мастера
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {[
                      { name: 'Анна Петрова', specialization: 'Косметолог', rating: 4.8, image: 'https://randomuser.me/api/portraits/women/1.jpg', id: 1 },
                      { name: 'Мария Иванова', specialization: 'Мастер маникюра', rating: 4.9, image: 'https://randomuser.me/api/portraits/women/2.jpg', id: 2 }
                    ].map((specialist) => (
                      <div key={specialist.id} className="flex items-center gap-3 mb-3 pb-3 border-b border-beauty-100 last:border-0 last:pb-0 last:mb-0">
                        <img 
                          src={specialist.image} 
                          alt={specialist.name} 
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">{specialist.name}</p>
                              <p className="text-sm text-beauty-600">{specialist.specialization}</p>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              <span className="ml-1">{specialist.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm">Записаться</Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-beauty-500" />
                      Сообщения
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {[
                      { 
                        title: 'Напоминание о записи', 
                        message: 'Завтра в 14:00 у вас запись на маникюр', 
                        date: '10:30, сегодня', 
                        id: 1 
                      },
                      { 
                        title: 'Специальное предложение', 
                        message: 'Скидка 20% на окрашивание до конца недели', 
                        date: 'Вчера', 
                        id: 2 
                      }
                    ].map((message) => (
                      <div key={message.id} className="mb-3 pb-3 border-b border-beauty-100 last:border-0 last:pb-0 last:mb-0">
                        <div className="flex justify-between mb-1">
                          <p className="font-medium">{message.title}</p>
                          <p className="text-sm text-beauty-600">{message.date}</p>
                        </div>
                        <p className="text-sm text-beauty-700">{message.message}</p>
                      </div>
                    ))}
                    
                    <div className="text-center mt-4">
                      <Button variant="link" className="text-beauty-500">Все сообщения</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle>Все записи</CardTitle>
                  <CardDescription>Управление вашими записями на процедуры</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Предстоящие записи</h3>
                    {[
                      { date: '25 апреля 2025', time: '14:00', service: 'Маникюр', master: 'Мария И.', price: 2000, id: 1 },
                      { date: '3 мая 2025', time: '10:30', service: 'Стрижка', master: 'Анна П.', price: 1500, id: 2 }
                    ].map((appointment) => (
                      <div key={appointment.id} className="border border-beauty-100 rounded-md p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-beauty-800">{appointment.service}</h4>
                          <span className="text-beauty-600 font-medium">{appointment.price} ₽</span>
                        </div>
                        <div className="flex justify-between text-sm text-beauty-600 mb-3">
                          <div>
                            <p>Дата: {appointment.date}</p>
                            <p>Время: {appointment.time}</p>
                            <p>Мастер: {appointment.master}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button variant="outline" size="sm">Перенести</Button>
                            <Button variant="outline" size="sm" className="text-red-500">Отменить</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <h3 className="font-semibold text-lg mt-8">История визитов</h3>
                    {[
                      { date: '15 апреля 2025', time: '15:30', service: 'Окрашивание волос', master: 'Елена С.', price: 4500, id: 1, reviewed: false },
                      { date: '28 марта 2025', time: '11:00', service: 'Стрижка + укладка', master: 'Анна П.', price: 2500, id: 2, reviewed: true },
                      { date: '10 марта 2025', time: '10:00', service: 'Маникюр', master: 'Мария И.', price: 2000, id: 3, reviewed: false }
                    ].map((visit) => (
                      <div key={visit.id} className="border border-beauty-100 rounded-md p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-beauty-800">{visit.service}</h4>
                          <span className="text-beauty-600 font-medium">{visit.price} ₽</span>
                        </div>
                        <div className="flex justify-between text-sm text-beauty-600 mb-1">
                          <div>
                            <p>Дата: {visit.date}</p>
                            <p>Время: {visit.time}</p>
                            <p>Мастер: {visit.master}</p>
                          </div>
                          <div>
                            {!visit.reviewed && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex items-center gap-1"
                                onClick={() => handleOpenReview(visit)}
                              >
                                <Star className="h-4 w-4" /> Оставить отзыв
                              </Button>
                            )}
                            {visit.reviewed && (
                              <span className="text-xs text-green-600 block mt-2">Отзыв оставлен</span>
                            )}
                            <Button variant="outline" size="sm" className="mt-2">Повторить запись</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Add new procedures tab */}
            <TabsContent value="procedures">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Мои процедуры</CardTitle>
                  <CardDescription>
                    Управление вашими активными и запланированными процедурами
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>У вас есть активные курсы процедур и запланированные сеансы.</p>
                  <div className="mt-4">
                    <Button onClick={goToProceduresPage}>
                      Перейти к управлению процедурами
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <ClientTreatmentTracking clientId="client-1" clientName={clientData.name} />
            </TabsContent>
            
            <TabsContent value="bonuses">
              <Card>
                <CardHeader>
                  <CardTitle>Бонусы и акции</CardTitle>
                  <CardDescription>Управление бонусной системой и доступными акциями</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-beauty-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-4 text-beauty-800">Ваши бонусы</h3>
                      <div className="text-4xl font-bold text-beauty-600 mb-4">{clientData.bonusPoints}</div>
                      <p className="text-beauty-700 mb-6">
                        100 бонусов = скидка 100 рублей при оплате услуг. 
                        Срок действия бонусов: 6 месяцев с момента начисления.
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="font-medium mb-2">История начислений:</h4>
                        <div className="space-y-2 text-sm">
                          {[
                            { date: '15 апреля 2025', amount: 250, reason: 'За посещение' },
                            { date: '28 марта 2025', amount: 500, reason: 'За рекомендацию друга' },
                            { date: '10 марта 2025', amount: 200, reason: 'За посещение' }
                          ].map((transaction, index) => (
                            <div key={index} className="flex justify-between">
                              <span>{transaction.date}</span>
                              <span className="text-green-600">+{transaction.amount} ({transaction.reason})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-beauty-500 hover:bg-beauty-600"
                        onClick={handleUseBonuses}
                      >
                        Использовать бонусы
                      </Button>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-beauty-800">Доступные акции</h3>
                      <div className="space-y-4">
                        {[
                          { 
                            name: 'День рождения: скидка 15%',
                            description: 'Специальная скидка на все услуги в течение недели до и после дня рождения',
                            valid: 'Действует 7 дней до и после ДР',
                            image: 'https://placehold.co/80/FFD1DC/FFD1DC' 
                          },
                          { 
                            name: 'Приведи друга: 500 бонусов',
                            description: 'Получите 500 бонусных баллов, когда ваш друг придет по вашей рекомендации',
                            valid: 'Действует всегда',
                            image: 'https://placehold.co/80/D1F5FF/D1F5FF'
                          },
                          { 
                            name: 'Счастливые часы: скидка 10%',
                            description: 'Скидка на услуги в будние дни с 10:00 до 13:00',
                            valid: 'До 30 июня 2025',
                            image: 'https://placehold.co/80/FFF3CD/FFF3CD'
                          }
                        ].map((promo, index) => (
                          <div key={index} className="flex gap-4 border border-beauty-100 rounded-lg p-4">
                            <img src={promo.image} alt={promo.name} className="w-20 h-20 rounded-md" />
                            <div>
                              <h4 className="font-medium text-beauty-800">{promo.name}</h4>
                              <p className="text-sm text-beauty-700 mb-2">{promo.description}</p>
                              <p className="text-xs text-beauty-600">{promo.valid}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 p-4 border border-beauty-100 rounded-lg">
                        <h4 className="font-medium mb-2">Реферальная программа</h4>
                        <p className="text-sm text-beauty-700 mb-4">
                          Поделитесь своим реферальным кодом с друзьями и получайте бонусы за каждого нового клиента
                        </p>
                        <div className="bg-beauty-50 p-3 rounded flex justify-between items-center mb-3">
                          <span className="font-medium">ANNA25</span>
                          <Button variant="ghost" size="sm" onClick={() => {
                            navigator.clipboard.writeText('ANNA25');
                            toast({
                              title: "Код скопирован",
                              description: "Реферальный код скопирован в буфер обмена"
                            });
                          }}>
                            Копировать
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            Поделиться ВКонтакте
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Поделиться Telegram
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Мой профиль</CardTitle>
                  <CardDescription>Управление личными данными и настройками</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <User className="h-5 w-5 mr-2" />
                          Личные данные
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <Label>Имя</Label>
                          <div className="flex justify-between items-center">
                            <span>{clientData.name}</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-auto p-1"
                              onClick={handleOpenSettings}
                            >
                              Изменить
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label>Телефон</Label>
                          <div className="flex justify-between items-center">
                            <span>{clientData.phone}</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-auto p-1"
                              onClick={handleOpenSettings}
                            >
                              Изменить
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label>Email</Label>
                          <div className="flex justify-between items-center">
                            <span>{clientData.email}</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-auto p-1"
                              onClick={handleOpenSettings}
                            >
                              Изменить
                            </Button>
                          </div>
                        </div>
                        <div className="pt-4">
                          <Button 
                            className="w-full bg-beauty-500 hover:bg-beauty-600"
                            onClick={handleOpenSettings}
                          >
                            Редактировать профиль
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <Bell className="h-5 w-5 mr-2" />
                          Уведомления
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Напоминания о записях</p>
                            <p className="text-sm text-beauty-600">СМС и email-уведомления</p>
                          </div>
                          <input 
                            type="checkbox" 
                            className="toggle toggle-beauty" 
                            checked={clientData.notifications.appointments}
                            onChange={() => toast({
                              title: "Настройки сохранены",
                              description: "Настройки уведомлений обновлены"
                            })}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Маркетинговые рассылки</p>
                            <p className="text-sm text-beauty-600">Акции и специальные предложения</p>
                          </div>
                          <input 
                            type="checkbox" 
                            className="toggle toggle-beauty" 
                            checked={clientData.notifications.marketing}
                            onChange={() => toast({
                              title: "Настройки сохранены",
                              description: "Настройки уведомлений обновлены"
                            })}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Запросы на отзывы</p>
                            <p className="text-sm text-beauty-600">После посещения салона</p>
                          </div>
                          <input 
                            type="checkbox" 
                            className="toggle toggle-beauty" 
                            checked={clientData.notifications.reviews}
                            onChange={() => toast({
                              title: "Настройки сохранены",
                              description: "Настройки уведомлений обновлены"
                            })}
                          />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <Star className="h-5 w-5 mr-2" />
                          Избранное
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <Label>Любимые мастера</Label>
                          <div className="flex gap-2 mt-1 flex-wrap">
                            {[
                              { name: 'Анна П.', specialty: 'Парикмахер' },
                              { name: 'Мария И.', specialty: 'Маникюр' }
                            ].map((master, index) => (
                              <div key={index} className="flex items-center gap-1 bg-beauty-50 px-2 py-1 rounded-full">
                                <span className="text-sm">{master.name}</span>
                                <button className="text-beauty-300 hover:text-beauty-500">×</button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4">
                          <Label>Любимые услуги</Label>
                          <div className="flex gap-2 mt-1 flex-wrap">
                            {[
                              'Стрижка',
                              'Маникюр',
                              'Окрашивание'
                            ].map((service, index) => (
                              <div key={index} className="flex items-center gap-1 bg-beauty-50 px-2 py-1 rounded-full">
                                <span className="text-sm">{service}</span>
                                <button className="text-beauty-300 hover:text-beauty-500">×</button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Add Treatment Tracking Component */}
                    <Card className="md:col-span-3 mt-6">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <Calendar className="h-5 w-5 mr-2" />
                          Мои процедуры
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-4">
                          <p>Просмотр и управление вашими активными курсами процедур</p>
                          <Button onClick={goToProceduresPage}>
                            Перейти к процедурам
                          </Button>
                        </div>
                        
                        <ClientTreatmentTracking 
                          clientId="client-1" 
                          clientName={clientData.name}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      
      {/* Review Modal */}
      <ClientReviewForm 
        open={showReviewDialog} 
        onOpenChange={setShowReviewDialog}
        visit={activeVisitForReview}
      />
      
      {/* Bonuses Modal */}
      <ClientBonusesModal
        open={showBonusesDialog}
        onOpenChange={setShowBonusesDialog}
        clientBonuses={clientData.bonusPoints}
      />
      
      {/* Settings Modal */}
      <ClientProfileSettings
        open={showSettingsDialog}
        onOpenChange={setShowSettingsDialog}
        clientData={clientData}
      />
    </div>
  );
};

export default ClientDashboard;
