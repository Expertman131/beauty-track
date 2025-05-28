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
import { useNavigate } from 'react-router-dom';
import { Package, Warehouse, BarChart, Truck, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AdminPanel = () => {
  const navigate = useNavigate();
  
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
              <TabsTrigger value="clients">Управление клиентами</TabsTrigger>
              <TabsTrigger value="staff">Управление мастерами</TabsTrigger>
              <TabsTrigger value="services">Услуги</TabsTrigger>
              <TabsTrigger value="marketing">Маркетинг</TabsTrigger>
              <TabsTrigger value="loyalty">Программы лояльности</TabsTrigger>
              <TabsTrigger value="inventory">Управление товарами</TabsTrigger>
              <TabsTrigger value="statistics">Статистика</TabsTrigger>
              <TabsTrigger value="integrations">Интеграции</TabsTrigger>
              <TabsTrigger value="theme">Оформление</TabsTrigger>
            </TabsList>
            
            <TabsContent value="clients" className="space-y-4">
              <ClientsManagement />
            </TabsContent>
            
            <TabsContent value="staff" className="space-y-4">
              <StaffManagement />
            </TabsContent>

            <TabsContent value="services" className="space-y-4">
              <ServicesManagement />
            </TabsContent>
            
            <TabsContent value="marketing" className="space-y-4">
              <MarketingTools />
            </TabsContent>
            
            <TabsContent value="loyalty" className="space-y-4">
              <LoyaltyPrograms />
            </TabsContent>
            
            <TabsContent value="inventory" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button
                  variant="outline"
                  className="h-40 flex flex-col items-center justify-center gap-3 hover:bg-accent/30 transition-colors"
                  onClick={() => handleInventoryNavigation('/products')}
                >
                  <Package className="h-12 w-12 text-primary opacity-80" />
                  <span className="text-lg font-medium">Товары</span>
                  <span className="text-sm text-muted-foreground">Управление ассортиментом</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-40 flex flex-col items-center justify-center gap-3 hover:bg-accent/30 transition-colors"
                  onClick={() => handleInventoryNavigation('/inventory')}
                >
                  <Warehouse className="h-12 w-12 text-primary opacity-80" />
                  <span className="text-lg font-medium">Склад</span>
                  <span className="text-sm text-muted-foreground">Управление запасами</span>
                </Button>
                
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
                <ThemeSettings />
                
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
