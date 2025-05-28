
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import AppointmentSection from '@/components/AppointmentSection';
import ProcedureTracking from '@/components/ProcedureTracking';
import IntegrationSection from '@/components/IntegrationSection';
import TestimonialSection from '@/components/TestimonialSection';
import CtaSection from '@/components/CtaSection';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Users, 
  Scissors, 
  Gift, 
  Bell, 
  Tag, 
  MessageSquare,
  Star,
  Smile,
  ShieldCheck,
  User
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-beauty-100">
        <div className="container mx-auto flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-semibold beauty-gradient-text">BeautyTrack</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="#features" className="text-beauty-900 hover:text-beauty-600 transition-colors">
              Возможности
            </Link>
            <Link to="#testimonials" className="text-beauty-900 hover:text-beauty-600 transition-colors">
              Отзывы
            </Link>
            <Link to="#pricing" className="text-beauty-900 hover:text-beauty-600 transition-colors">
              Цены
            </Link>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleLogin}>
              Войти
            </Button>
            <Button className="bg-beauty-500 hover:bg-beauty-600" onClick={handleLogin}>
              Регистрация
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow mt-16">
        <Hero />
        
        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="beauty-gradient-text">Все возможности</span> платформы BeautyTrack
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-beauty-50 p-6 rounded-xl">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Calendar className="text-beauty-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Онлайн запись</h3>
                <p className="text-beauty-700">
                  Удобная система онлайн-записи для клиентов с автоматическими уведомлениями и напоминаниями.
                </p>
              </div>
              
              <div className="bg-beauty-50 p-6 rounded-xl">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Users className="text-beauty-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">CRM для клиентов</h3>
                <p className="text-beauty-700">
                  Полная база данных клиентов с историей визитов, предпочтениями и возможностью коммуникации.
                </p>
              </div>
              
              <div className="bg-beauty-50 p-6 rounded-xl">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Scissors className="text-beauty-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Управление мастерами</h3>
                <p className="text-beauty-700">
                  Гибкий график работы, личный кабинет, учет доходов и рейтинги для специалистов салона.
                </p>
              </div>
              
              <div className="bg-beauty-50 p-6 rounded-xl">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Gift className="text-beauty-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Программы лояльности</h3>
                <p className="text-beauty-700">
                  Гибкие программы лояльности с бонусами, скидками, подарками и специальными акциями для клиентов.
                </p>
              </div>
              
              <div className="bg-beauty-50 p-6 rounded-xl">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Bell className="text-beauty-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Уведомления</h3>
                <p className="text-beauty-700">
                  Автоматические уведомления о записях, днях рождения и акциях через Email, SMS и мессенджеры.
                </p>
              </div>
              
              <div className="bg-beauty-50 p-6 rounded-xl">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Tag className="text-beauty-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Управление услугами</h3>
                <p className="text-beauty-700">
                  Полная настройка каталога услуг с ценами, длительностью и привязкой к конкретным специалистам.
                </p>
              </div>
              
              <div className="bg-beauty-50 p-6 rounded-xl">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <MessageSquare className="text-beauty-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Коммуникация</h3>
                <p className="text-beauty-700">
                  Встроенный чат с клиентами и интеграция с популярными мессенджерами (Telegram, WhatsApp).
                </p>
              </div>
              
              <div className="bg-beauty-50 p-6 rounded-xl">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Star className="text-beauty-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Отзывы клиентов</h3>
                <p className="text-beauty-700">
                  Автоматический запрос отзывов после посещения и система оценки работы специалистов.
                </p>
              </div>
              
              <div className="bg-beauty-50 p-6 rounded-xl">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Smile className="text-beauty-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Абонементы</h3>
                <p className="text-beauty-700">
                  Создание и продажа абонементов на услуги с гибкими условиями использования и сроком действия.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-beauty-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="beauty-gradient-text">Три роли</span> в системе
            </h2>
            <p className="text-xl text-beauty-800 mb-12 max-w-3xl mx-auto">
              BeautyTrack предоставляет специализированный интерфейс для каждого участника процесса
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-beauty-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <ShieldCheck className="text-beauty-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Администратор</h3>
                <p className="text-beauty-700 mb-4">
                  Полное управление салоном, персоналом, клиентами, услугами и маркетингом.
                </p>
                <ul className="text-left text-beauty-700 space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-beauty-500 mr-2">✓</span>
                    Управление мастерами
                  </li>
                  <li className="flex items-start">
                    <span className="text-beauty-500 mr-2">✓</span>
                    CRM система для клиентов
                  </li>
                  <li className="flex items-start">
                    <span className="text-beauty-500 mr-2">✓</span>
                    Маркетинг и лояльность
                  </li>
                  <li className="flex items-start">
                    <span className="text-beauty-500 mr-2">✓</span>
                    Интеграции с другими сервисами
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-beauty-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Scissors className="text-beauty-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Мастер</h3>
                <p className="text-beauty-700 mb-4">
                  Персональный кабинет специалиста с доступом к расписанию, клиентам и статистике.
                </p>
                <ul className="text-left text-beauty-700 space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-beauty-500 mr-2">✓</span>
                    Личное расписание
                  </li>
                  <li className="flex items-start">
                    <span className="text-beauty-500 mr-2">✓</span>
                    Карточки клиентов
                  </li>
                  <li className="flex items-start">
                    <span className="text-beauty-500 mr-2">✓</span>
                    Статистика дохода
                  </li>
                  <li className="flex items-start">
                    <span className="text-beauty-500 mr-2">✓</span>
                    Отзывы и рейтинг
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-beauty-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <User className="text-beauty-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Клиент</h3>
                <p className="text-beauty-700 mb-4">
                  Личный кабинет клиента с историей визитов, бонусами и онлайн-записью.
                </p>
                <ul className="text-left text-beauty-700 space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-beauty-500 mr-2">✓</span>
                    Онлайн-запись на услуги
                  </li>
                  <li className="flex items-start">
                    <span className="text-beauty-500 mr-2">✓</span>
                    История посещений
                  </li>
                  <li className="flex items-start">
                    <span className="text-beauty-500 mr-2">✓</span>
                    Бонусы и скидки
                  </li>
                  <li className="flex items-start">
                    <span className="text-beauty-500 mr-2">✓</span>
                    Чат с мастером
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <IntegrationSection />
        <TestimonialSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
