
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CalendarClock, Users, TrendingUp } from "lucide-react";

// Sample data for demonstration
const revenueData = [
  { month: 'Янв', revenue: 150000 },
  { month: 'Фев', revenue: 180000 },
  { month: 'Мар', revenue: 210000 },
  { month: 'Апр', revenue: 240000 },
  { month: 'Май', revenue: 270000 },
  { month: 'Июн', revenue: 300000 },
];

const specialistData = [
  { name: 'Анна', appointments: 45, revenue: 120000 },
  { name: 'Елена', appointments: 38, revenue: 98000 },
  { name: 'Ольга', appointments: 51, revenue: 142000 },
  { name: 'Мария', appointments: 42, revenue: 118000 },
  { name: 'София', appointments: 33, revenue: 86000 },
];

const servicesData = [
  { name: 'Маникюр', value: 35 },
  { name: 'Педикюр', value: 20 },
  { name: 'Окрашивание', value: 25 },
  { name: 'Стрижка', value: 15 },
  { name: 'Наращивание ресниц', value: 5 },
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

const Statistics = () => {
  return (
    <Tabs defaultValue="summary" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="summary">Общая статистика</TabsTrigger>
        <TabsTrigger value="specialists">По мастерам</TabsTrigger>
        <TabsTrigger value="services">По услугам</TabsTrigger>
        <TabsTrigger value="clients">По клиентам</TabsTrigger>
      </TabsList>

      <TabsContent value="summary" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Выручка за месяц</CardTitle>
              <TrendingUp className="h-4 w-4 text-beauty-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₽ 270,000</div>
              <p className="text-xs text-muted-foreground">+15% по сравнению с прошлым месяцем</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Записей за месяц</CardTitle>
              <CalendarClock className="h-4 w-4 text-beauty-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">209</div>
              <p className="text-xs text-muted-foreground">+12% по сравнению с прошлым месяцем</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Новых клиентов за месяц</CardTitle>
              <Users className="h-4 w-4 text-beauty-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">+23% по сравнению с прошлым месяцем</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Динамика выручки</CardTitle>
            <CardDescription>Общая выручка за последние 6 месяцев</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} ₽`, 'Выручка']} />
                  <Legend />
                  <Bar dataKey="revenue" name="Выручка" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="specialists" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Статистика по мастерам</CardTitle>
            <CardDescription>Производительность мастеров за текущий месяц</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={specialistData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="appointments" name="Записи" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="revenue" name="Выручка" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specialistData.map((specialist, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle>{specialist.name}</CardTitle>
                <CardDescription>Мастер</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Записей</p>
                    <p className="text-xl font-bold">{specialist.appointments}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Выручка</p>
                    <p className="text-xl font-bold">{specialist.revenue.toLocaleString()} ₽</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="services" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Популярность услуг</CardTitle>
            <CardDescription>Распределение записей по видам услуг</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={servicesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {servicesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Процент записей']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="clients" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Активные клиенты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">354</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Новых за месяц</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Средний чек</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,850 ₽</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Активность клиентов</CardTitle>
            <CardDescription>Количество записей по месяцам</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { month: 'Янв', visits: 120 },
                    { month: 'Фев', visits: 140 },
                    { month: 'Мар', visits: 160 },
                    { month: 'Апр', visits: 180 },
                    { month: 'Май', visits: 200 },
                    { month: 'Июн', visits: 220 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="visits" name="Посещения" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default Statistics;
