
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BarChart, BarChart3, AreaChart, LineChart, ChartLine, DollarSign, Box } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const ReportsPage = () => {
  const [selectedTab, setSelectedTab] = useState("analytics");

  const analyticsReports = [
    "Возвращаемость",
    "Заполненность",
    "Акции",
    "Посещаемость групповых событий",
    "По администраторам"
  ];

  const salesReports = [
    "По сотрудникам",
    "По сотрудникам в динамике",
    "По услугам",
    "По клиентам"
  ];

  const financialReports = [
    "Финансовый отчет",
    "P&L отчет",
    "Отчет по кассе за день"
  ];

  const inventoryReports = [
    "Остатки на складах",
    "Заказ товаров",
    "Анализ продаж",
    "Анализ расхода материалов",
    "Анализ списания товаров",
    "Анализ оборачиваемости"
  ];

  // Данные для диаграмм
  const topSellingProducts = [
    { name: 'Шампунь', value: 48 },
    { name: 'Краска для волос', value: 69 },
    { name: 'Бальзамы', value: 23 },
    { name: 'Маски', value: 18 },
    { name: 'Масла', value: 12 }
  ];

  const monthlySales = [
    { name: 'Янв', sales: 4000 },
    { name: 'Фев', sales: 3000 },
    { name: 'Мар', sales: 2000 },
    { name: 'Апр', sales: 2780 },
    { name: 'Май', sales: 1890 },
    { name: 'Июн', sales: 2390 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-24 mb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <BarChart3 className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-3xl font-bold beauty-gradient-text">Отчеты</h1>
            <span className="text-sm text-muted-foreground ml-2">Аналитика</span>
          </div>

          <Tabs defaultValue="analytics" className="w-full space-y-8" onValueChange={setSelectedTab}>
            <TabsList className="grid grid-cols-1 md:grid-cols-4 mb-8">
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" /> Аналитика
              </TabsTrigger>
              <TabsTrigger value="sales" className="flex items-center gap-2">
                <AreaChart className="h-4 w-4" /> Продажи
              </TabsTrigger>
              <TabsTrigger value="finance" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" /> Финансы
              </TabsTrigger>
              <TabsTrigger value="inventory" className="flex items-center gap-2">
                <Box className="h-4 w-4" /> Склад
              </TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-md font-medium">
                    Продажи по месяцам
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReBarChart data={monthlySales}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#9b87f5" />
                      </ReBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md font-medium">
                    Категории товаров
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={topSellingProducts}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name}) => name}
                        >
                          {topSellingProducts.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analyticsReports.map((report, index) => (
                  <Card key={index} className="hover:bg-accent/40 transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{report}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sales" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {salesReports.map((report, index) => (
                  <Card key={index} className="hover:bg-accent/40 transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{report}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="finance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {financialReports.map((report, index) => (
                  <Card key={index} className="hover:bg-accent/40 transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{report}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inventoryReports.map((report, index) => (
                  <Card key={index} className="hover:bg-accent/40 transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{report}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReportsPage;
