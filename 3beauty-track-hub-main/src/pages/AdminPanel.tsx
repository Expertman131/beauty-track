
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClientsManagement from '@/components/admin/ClientsManagement';
import MarketingTools from '@/components/admin/MarketingTools';
import LoyaltyPrograms from '@/components/admin/LoyaltyPrograms';
import IntegrationsPanel from '@/components/admin/IntegrationsPanel';
import StaffManagement from '@/components/admin/StaffManagement';
import ServicesManagement from '@/components/admin/ServicesManagement';
import Statistics from '@/components/admin/Statistics';
import { ThemeSettings } from '@/components/admin/ThemeSettings';
import { TooltipSettings } from '@/components/admin/TooltipSettings';
import { TutorialTooltip } from '@/components/admin/TutorialTooltip';
import { useNavigate } from 'react-router-dom';
import { Package, Warehouse, BarChart, Truck, Box, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBranch } from "@/contexts/BranchContext";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { branches, currentBranch } = useBranch();
  
  const handleInventoryNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-24 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 beauty-gradient-text">Административная панель</h1>
          
          <Tabs defaultValue="clients" className="w-full">
            <TabsList className="mb-8 w-full justify-start overflow-x-auto">
              <TutorialTooltip
                id="admin-clients-tab"
                title="Управление клиентами"
                content="Здесь вы можете добавлять, редактировать и управлять данными ваших клиентов. Отслеживайте историю визитов и задавайте напоминания."
              >
                <TabsTrigger value="clients">Управление клиентами</TabsTrigger>
              </TutorialTooltip>
              
              <TutorialTooltip
                id="admin-staff-tab"
                title="Управление мастерами"
                content="Управляйте данными, расписанием и специализациями всех мастеров вашего салона."
              >
                <TabsTrigger value="staff">Управление мастерами</TabsTrigger>
              </TutorialTooltip>
              
              <TutorialTooltip
                id="admin-services-tab"
                title="Услуги"
                content="Добавляйте, редактируйте и удаляйте услуги, которые предоставляет ваш салон. Устанавливайте цены и длительность."
              >
                <TabsTrigger value="services">Услуги</TabsTrigger>
              </TutorialTooltip>
              
              <TabsTrigger value="branches">Филиалы</TabsTrigger>
              
              <TabsTrigger value="marketing">Маркетинг</TabsTrigger>
              <TabsTrigger value="loyalty">Программы лояльности</TabsTrigger>
              
              <TutorialTooltip
                id="admin-inventory-tab"
                title="Управление товарами"
                content="Функционал для контроля товарных запасов, учета движения товаров и работы с поставщиками."
                side="bottom"
              >
                <TabsTrigger value="inventory">Управление товарами</TabsTrigger>
              </TutorialTooltip>
              
              <TabsTrigger value="statistics">Статистика</TabsTrigger>
              <TabsTrigger value="integrations">Интеграции</TabsTrigger>
              
              <TutorialTooltip
                id="admin-theme-tab"
                title="Настройки оформления"
                content="Здесь вы можете настроить внешний вид вашего салона, включая цветовую схему и расположение элементов."
              >
                <TabsTrigger value="theme">Оформление</TabsTrigger>
              </TutorialTooltip>
            </TabsList>
            
            <TabsContent value="clients" className="space-y-4">
              <TutorialTooltip
                id="clients-management-intro"
                title="Управление клиентами"
                content="В этом разделе вы можете добавлять новых клиентов, редактировать их данные и просматривать историю визитов. Используйте поиск для быстрого нахождения клиентов."
              >
                <ClientsManagement />
              </TutorialTooltip>
            </TabsContent>
            
            <TabsContent value="staff" className="space-y-4">
              <StaffManagement />
            </TabsContent>

            <TabsContent value="services" className="space-y-4">
              <TutorialTooltip
                id="services-management-intro"
                title="Управление услугами"
                content="Здесь вы можете добавлять, редактировать и группировать услуги вашего салона. Укажите длительность, стоимость и описание для каждой услуги."
              >
                <ServicesManagement />
              </TutorialTooltip>
            </TabsContent>
            
            <TabsContent value="branches" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-beauty-800">Управление филиалами</h2>
                  <p className="text-muted-foreground">
                    {currentBranch 
                      ? `Текущий филиал: ${currentBranch.name}` 
                      : "Выберите филиал для работы"}
                  </p>
                </div>
                <Button 
                  className="bg-beauty-500 hover:bg-beauty-600"
                  onClick={() => navigate('/branches')}
                >
                  <Building className="h-4 w-4 mr-2" />
                  Управление филиалами
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {branches.slice(0, 3).map(branch => (
                  <Card key={branch.id} className={`border-l-4 border-${branch.color}-500`}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>{branch.name}</CardTitle>
                        {branch.isActive ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">Активен</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-600">Неактивен</Badge>
                        )}
                      </div>
                      <CardDescription>{branch.address}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{branch.description || "Нет описания"}</p>
                      <div className="flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate('/branches')}
                        >
                          Подробнее
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {branches.length > 3 && (
                  <Button 
                    variant="outline" 
                    className="h-full flex flex-col items-center justify-center min-h-[200px]"
                    onClick={() => navigate('/branches')}
                  >
                    <span className="text-2xl mb-2">+{branches.length - 3}</span>
                    <span>Показать все филиалы</span>
                  </Button>
                )}
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Быстрые действия</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 justify-start"
                    onClick={() => navigate('/branches')}
                  >
                    <Building className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Добавить филиал</div>
                      <div className="text-xs text-muted-foreground">Создать новую локацию</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 justify-start"
                    onClick={() => navigate('/staff')}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mr-3"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <div className="text-left">
                      <div className="font-medium">Управление мастерами</div>
                      <div className="text-xs text-muted-foreground">Назначить филиалы</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 justify-start"
                    onClick={() => navigate('/services')}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="mr-3"
                    >
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                    </svg>
                    <div className="text-left">
                      <div className="font-medium">Услуги филиалов</div>
                      <div className="text-xs text-muted-foreground">Назначить услуги</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 justify-start"
                    onClick={() => navigate('/reports')}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="mr-3"
                    >
                      <path d="M3 3v18h18"></path>
                      <path d="m19 9-5 5-4-4-3 3"></path>
                    </svg>
                    <div className="text-left">
                      <div className="font-medium">Аналитика филиалов</div>
                      <div className="text-xs text-muted-foreground">Отчеты по филиалам</div>
                    </div>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="marketing" className="space-y-4">
              <MarketingTools />
            </TabsContent>
            
            <TabsContent value="loyalty" className="space-y-4">
              <LoyaltyPrograms />
            </TabsContent>
            
            <TabsContent value="inventory" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <TutorialTooltip
                  id="admin-products"
                  title="Управление товарами"
                  content="Добавляйте и редактируйте товары в вашем каталоге. Устанавливайте закупочные и розничные цены."
                  isPermanent={true}
                >
                  <Button
                    variant="outline"
                    className="h-40 flex flex-col items-center justify-center gap-3 hover:bg-accent/30 transition-colors w-full"
                    onClick={() => handleInventoryNavigation('/products')}
                  >
                    <Package className="h-12 w-12 text-primary opacity-80" />
                    <span className="text-lg font-medium">Товары</span>
                    <span className="text-sm text-muted-foreground">Управление ассортиментом</span>
                  </Button>
                </TutorialTooltip>
                
                <TutorialTooltip
                  id="admin-inventory"
                  title="Склад"
                  content="Контролируйте запасы товаров, отслеживайте движение и проводите инвентаризацию."
                  isPermanent={true}
                >
                  <Button
                    variant="outline"
                    className="h-40 flex flex-col items-center justify-center gap-3 hover:bg-accent/30 transition-colors w-full"
                    onClick={() => handleInventoryNavigation('/inventory')}
                  >
                    <Warehouse className="h-12 w-12 text-primary opacity-80" />
                    <span className="text-lg font-medium">Склад</span>
                    <span className="text-sm text-muted-foreground">Управление запасами</span>
                  </Button>
                </TutorialTooltip>
                
                <Button
                  variant="outline"
                  className="h-40 flex flex-col items-center justify-center gap-3 hover:bg-accent/30 transition-colors"
                  onClick={() => handleInventoryNavigation('/reports')}
                >
                  <BarChart className="h-12 w-12 text-primary opacity-80" />
                  <span className="text-lg font-medium">Отчетность</span>
                  <span className="text-sm text-muted-foreground">Аналитика товаров</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-40 flex flex-col items-center justify-center gap-3 hover:bg-accent/30 transition-colors"
                  onClick={() => handleInventoryNavigation('/suppliers')}
                >
                  <Truck className="h-12 w-12 text-primary opacity-80" />
                  <span className="text-lg font-medium">Поставщики</span>
                  <span className="text-sm text-muted-foreground">Управление контрагентами</span>
                </Button>
              </div>
              
              <div className="flex items-center justify-center mt-6 px-6 py-10 border-2 border-dashed rounded-lg">
                <div className="text-center">
                  <Box className="mx-auto h-12 w-12 text-muted-foreground opacity-40" />
                  <h3 className="mt-4 text-lg font-medium">Начните работу с управлением товарами</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Добавляйте товары для продажи клиентам, управляйте складом и анализируйте продажи.
                  </p>
                  <Button
                    variant="default"
                    className="mt-6"
                    onClick={() => handleInventoryNavigation('/products')}
                  >
                    Начать работу
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="statistics" className="space-y-4">
              <Statistics />
            </TabsContent>
            
            <TabsContent value="integrations" className="space-y-4">
              <IntegrationsPanel />
            </TabsContent>
            
            <TabsContent value="theme" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <ThemeSettings />
                  <TutorialTooltip
                    id="tooltip-settings"
                    title="Настройки подсказок"
                    content="Здесь вы можете включать или отключать обучающие подсказки, а также сбросить все закрытые подсказки, чтобы они появились снова."
                    side="top"
                  >
                    <TooltipSettings />
                  </TutorialTooltip>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Предпросмотр</CardTitle>
                    <CardDescription>
                      Посмотрите, как будет выглядеть ваш сайт с выбранной темой
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-hidden">
                      <div className="bg-primary p-4 text-primary-foreground font-medium">
                        Заголовок
                      </div>
                      <div className="p-4 space-y-4">
                        <p className="text-foreground">
                          Это пример текста в выбранной цветовой теме. Так будет выглядеть основной контент.
                        </p>
                        <div className="flex space-x-2">
                          <Button>Основная кнопка</Button>
                          <Button variant="outline">Вторичная кнопка</Button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge>Бейдж</Badge>
                          <Badge variant="outline">Бейдж 2</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;
