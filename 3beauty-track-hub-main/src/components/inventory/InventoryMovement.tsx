
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Plus, Filter } from "lucide-react";
import InventoryOperations from './InventoryOperations';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const InventoryMovement = () => {
  const [period, setPeriod] = useState('month');
  const [filterBy, setFilterBy] = useState('none');
  const [isOperationsOpen, setIsOperationsOpen] = useState(false);
  const [selectedOperationType, setSelectedOperationType] = useState<'arrival' | 'sale' | 'transfer' | 'writeoff' | 'inventory'>('arrival');

  // Данные для топ продаваемых товаров (количество)
  const topProductsByQuantity = [
    { name: 'Préférence Платина', value: 42 },
    { name: 'Préférence Серебро', value: 20 },
    { name: 'Шампунь Золотой', value: 15 },
    { name: 'Бальзам Объём', value: 11 },
    { name: 'Маска восст.', value: 7 }
  ];

  // Данные для топ продаваемых товаров (выручка)
  const topProductsByRevenue = [
    { name: 'Préférence Платина', value: 1240 },
    { name: 'Préférence Серебро', value: 520 },
    { name: 'Шампунь Золотой', value: 430 },
    { name: 'Бальзам Объём', value: 380 },
    { name: 'Маска восст.', value: 290 }
  ];

  // Данные для категорий товаров
  const productCategories = [
    { name: 'Краски для волос', value: 69 },
    { name: 'Шампуни', value: 48 },
    { name: 'Бальзамы', value: 23 },
    { name: 'Маски', value: 18 }
  ];

  // Данные для таблицы операций
  const operations = [
    {
      id: 1,
      type: 'Поступление',
      product: 'Préférence Платина: краска для волос',
      quantity: '6 шт',
      cost: '900.00 ₽',
      counterparty: 'Сервис Бьюти',
      date: '25 Сентября в 12:45'
    },
    {
      id: 2,
      type: 'Продажа',
      product: 'Шампунь Золотой',
      quantity: '900 мл',
      cost: '900.00 ₽',
      counterparty: 'Ирина Михайлова',
      date: '25 Сентября в 12:45'
    },
    {
      id: 3,
      type: 'Списание',
      product: 'Préférence Платина: краска для волос',
      quantity: '12 шт',
      cost: '900.00 ₽',
      counterparty: 'Егор',
      date: '25 Сентября в 12:45'
    }
  ];
  
  const handleAddOperation = (type: 'arrival' | 'sale' | 'transfer' | 'writeoff' | 'inventory') => {
    setSelectedOperationType(type);
    setIsOperationsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Движение товаров</h2>
        <div className="flex gap-2">
          <Select 
            value={selectedOperationType}
            onValueChange={(val: any) => setSelectedOperationType(val)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Тип операции" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="arrival">Поступление</SelectItem>
              <SelectItem value="sale">Продажа</SelectItem>
              <SelectItem value="transfer">Перемещение</SelectItem>
              <SelectItem value="writeoff">Списание</SelectItem>
              <SelectItem value="inventory">Инвентаризация</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex items-center gap-2" onClick={() => setIsOperationsOpen(true)}>
            <Plus className="h-4 w-4" />
            Добавить операцию
          </Button>
        </div>
      </div>
      <p className="text-muted-foreground">
        Контролируйте операции с товарами, анализируйте их популярность и выручку от продажи
      </p>

      <div className="flex items-center space-x-2 mb-4 overflow-x-auto pb-2">
        <Button variant={period === 'today' ? "default" : "outline"} onClick={() => setPeriod('today')}>
          Сегодня
        </Button>
        <Button variant={period === 'tomorrow' ? "default" : "outline"} onClick={() => setPeriod('tomorrow')}>
          Завтра
        </Button>
        <Button variant={period === 'week' ? "default" : "outline"} onClick={() => setPeriod('week')}>
          Неделя
        </Button>
        <Button variant={period === 'month' ? "default" : "outline"} onClick={() => setPeriod('month')}>
          Месяц
        </Button>
        <div className="border rounded-md px-3 py-2 text-sm">
          01 сен — 30 сен
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-md">
              Топ 5 продаваемых товаров (количество)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topProductsByQuantity}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value}`}
                  >
                    {topProductsByQuantity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-md">
              Топ 5 продаваемых товаров (выручка)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topProductsByRevenue}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value}₽`}
                  >
                    {topProductsByRevenue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-md">
              Категории товаров
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value}`}
                  >
                    {productCategories.map((entry, index) => (
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

      <div className="flex items-center justify-between mb-4">
        <div>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Без группировки" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Без группировки</SelectItem>
              <SelectItem value="product">По товарам</SelectItem>
              <SelectItem value="category">По категориям</SelectItem>
              <SelectItem value="warehouse">По складам</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Операция</TableHead>
              <TableHead>Товар</TableHead>
              <TableHead>Кол-во</TableHead>
              <TableHead>Стоимость</TableHead>
              <TableHead>Получатель / поставщик</TableHead>
              <TableHead>Дата</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {operations.map((operation) => (
              <TableRow key={operation.id}>
                <TableCell>
                  <div className={
                    operation.type === 'Поступление' ? 'text-blue-600' : 
                    operation.type === 'Продажа' ? 'text-green-600' : 
                    'text-red-600'
                  }>
                    {operation.type}
                  </div>
                </TableCell>
                <TableCell>{operation.product}</TableCell>
                <TableCell>{operation.quantity}</TableCell>
                <TableCell>{operation.cost}</TableCell>
                <TableCell>{operation.counterparty}</TableCell>
                <TableCell>{operation.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      
      <InventoryOperations
        open={isOperationsOpen}
        onOpenChange={setIsOperationsOpen}
        operationType={selectedOperationType}
      />
    </div>
  );
};

export default InventoryMovement;
