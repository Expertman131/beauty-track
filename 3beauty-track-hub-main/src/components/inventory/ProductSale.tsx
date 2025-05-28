
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Plus, Search, Trash2, User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductSaleProps {
  onCancel: () => void;
  onSave: () => void;
}

interface ProductItem {
  id: number;
  name: string;
  warehouse: string;
  unit: string;
  available: number;
  quantity: number;
  price: number;
  discount: number;
  total: number;
}

interface ServiceItem {
  id: number;
  name: string;
  staff: string;
  duration: string;
  materials: number;
  price: number;
  discount: number;
  total: number;
}

const ProductSale = ({ onCancel, onSave }: ProductSaleProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [clientName, setClientName] = useState('');
  const [discount, setDiscount] = useState(0);
  const [comment, setComment] = useState('');
  const [activeTab, setActiveTab] = useState("services");
  
  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: 1,
      name: "Шампунь для волос",
      warehouse: "Основной склад",
      unit: "шт.",
      available: 15,
      quantity: 1,
      price: 550,
      discount: 0,
      total: 550
    }
  ]);
  
  const [services, setServices] = useState<ServiceItem[]>([
    {
      id: 1,
      name: "Окрашивание волос",
      staff: "Кристина",
      duration: "2 ч",
      materials: 116.75,
      price: 1500,
      discount: 0,
      total: 1500
    },
    {
      id: 2,
      name: "Стрижка женская",
      staff: "Кристина",
      duration: "1 ч",
      materials: 0,
      price: 450,
      discount: 0,
      total: 450
    }
  ]);
  
  const clients = [
    { id: 1, name: "Анна Иванова" },
    { id: 2, name: "Мария Петрова" },
    { id: 3, name: "Елена Сидорова" }
  ];
  
  const staffMembers = [
    { id: 1, name: "Кристина" },
    { id: 2, name: "Ольга" },
    { id: 3, name: "Наталья" }
  ];

  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: "Новый товар",
      warehouse: "Основной склад",
      unit: "шт.",
      available: 10,
      quantity: 1,
      price: 500,
      discount: 0,
      total: 500
    };
    setProducts([...products, newProduct]);
  };

  const handleAddService = () => {
    const newService = {
      id: Date.now(),
      name: "Новая услуга",
      staff: "Кристина",
      duration: "1 ч",
      materials: 0,
      price: 1000,
      discount: 0,
      total: 1000
    };
    setServices([...services, newService]);
  };

  const handleRemoveProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleRemoveService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
  };

  const handleProductQuantityChange = (id: number, quantity: number) => {
    setProducts(
      products.map(product => {
        if (product.id === id) {
          const newQuantity = Math.min(quantity, product.available);
          const discountAmount = (product.price * product.discount) / 100;
          return {
            ...product,
            quantity: newQuantity,
            total: newQuantity * (product.price - discountAmount)
          };
        }
        return product;
      })
    );
  };

  const handleProductDiscountChange = (id: number, discount: number) => {
    setProducts(
      products.map(product => {
        if (product.id === id) {
          const discountAmount = (product.price * discount) / 100;
          return {
            ...product,
            discount,
            total: product.quantity * (product.price - discountAmount)
          };
        }
        return product;
      })
    );
  };

  const handleServiceDiscountChange = (id: number, discount: number) => {
    setServices(
      services.map(service => {
        if (service.id === id) {
          const discountAmount = (service.price * discount) / 100;
          return {
            ...service,
            discount,
            total: service.price - discountAmount
          };
        }
        return service;
      })
    );
  };

  const calculatedServicesMaterials = services.reduce((sum, service) => sum + service.materials, 0);
  const calculatedServicesTotal = services.reduce((sum, service) => sum + service.total, 0);
  const calculatedProductsTotal = products.reduce((sum, product) => sum + product.total, 0);
  const calculatedGrandTotal = calculatedServicesTotal + calculatedProductsTotal;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Продажа товаров и услуг</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="date">Дата</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'dd.MM.yyyy', { locale: ru }) : 'Выберите дату'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="client">Клиент</Label>
          <Select value={clientName} onValueChange={setClientName}>
            <SelectTrigger id="client" className="flex items-center">
              <SelectValue placeholder="Выберите клиента" />
            </SelectTrigger>
            <SelectContent>
              {clients.map(client => (
                <SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="discount">Скидка (%)</Label>
          <Input 
            type="number" 
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
            min={0}
            max={100}
          />
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-[200px] grid-cols-2">
          <TabsTrigger value="services">Услуги {services.length > 0 && services.length}</TabsTrigger>
          <TabsTrigger value="products">Товары {products.length > 0 && products.length}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="services" className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Услуги</h3>
            <Button onClick={handleAddService} className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Добавить услугу
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[25%]">Услуга</TableHead>
                <TableHead>Специалист</TableHead>
                <TableHead>Длит.</TableHead>
                <TableHead className="text-center">Материалы (₽)</TableHead>
                <TableHead className="text-center">Цена (₽)</TableHead>
                <TableHead className="text-center">Скидка (%)</TableHead>
                <TableHead className="text-right">Итого (₽)</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>
                    <Select defaultValue={service.staff}>
                      <SelectTrigger className="h-8 w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {staffMembers.map(staff => (
                          <SelectItem key={staff.id} value={staff.name}>{staff.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{service.duration}</TableCell>
                  <TableCell className="text-center">{service.materials.toFixed(2)}</TableCell>
                  <TableCell className="text-center">{service.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Input 
                      type="number"
                      value={service.discount}
                      onChange={(e) => handleServiceDiscountChange(service.id, parseInt(e.target.value) || 0)}
                      min={0}
                      max={100}
                      className="w-16 mx-auto"
                    />
                  </TableCell>
                  <TableCell className="text-right">{service.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleRemoveService(service.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="products" className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Товары</h3>
            <Button onClick={handleAddProduct} className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Добавить товар
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[25%]">Товар</TableHead>
                <TableHead>Склад</TableHead>
                <TableHead>Ед.изм.</TableHead>
                <TableHead className="text-center">Доступно</TableHead>
                <TableHead className="text-center">Кол-во</TableHead>
                <TableHead className="text-center">Цена (₽)</TableHead>
                <TableHead className="text-center">Скидка (%)</TableHead>
                <TableHead className="text-right">Итого (₽)</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.warehouse}</TableCell>
                  <TableCell>{product.unit}</TableCell>
                  <TableCell className="text-center">{product.available}</TableCell>
                  <TableCell>
                    <Input 
                      type="number"
                      value={product.quantity}
                      onChange={(e) => handleProductQuantityChange(product.id, parseInt(e.target.value) || 0)}
                      min={1}
                      max={product.available}
                      className="w-16 mx-auto"
                    />
                  </TableCell>
                  <TableCell className="text-center">{product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Input 
                      type="number"
                      value={product.discount}
                      onChange={(e) => handleProductDiscountChange(product.id, parseInt(e.target.value) || 0)}
                      min={0}
                      max={100}
                      className="w-16 mx-auto"
                    />
                  </TableCell>
                  <TableCell className="text-right">{product.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
      
      <div className="space-y-2">
        <Label htmlFor="comment">Комментарий</Label>
        <Textarea 
          id="comment" 
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Дополнительная информация о продаже"
          rows={2}
        />
      </div>
      
      <div className="flex justify-end">
        <div className="text-right space-y-1">
          <div className="text-sm flex justify-end gap-8">
            <span>Стоимость материалов:</span>
            <span>{calculatedServicesMaterials.toFixed(2)} ₽</span>
          </div>
          <div className="text-sm flex justify-end gap-8">
            <span>Стоимость услуг:</span>
            <span>{calculatedServicesTotal.toFixed(2)} ₽</span>
          </div>
          <div className="text-sm flex justify-end gap-8">
            <span>Стоимость товаров:</span>
            <span>{calculatedProductsTotal.toFixed(2)} ₽</span>
          </div>
          <div className="text-lg font-semibold flex justify-end gap-8">
            <span>Итого к оплате:</span>
            <span>{calculatedGrandTotal.toFixed(2)} ₽</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-6">
        <Button variant="outline" onClick={onCancel}>Отмена</Button>
        <Button 
          onClick={onSave} 
          disabled={!clientName || (!services.length && !products.length)}
        >
          Перейти к оплате
        </Button>
      </div>
    </div>
  );
};

export default ProductSale;
