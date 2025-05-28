
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Plus, Search, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cn } from "@/lib/utils";

interface ProductArrivalProps {
  onCancel: () => void;
  onSave: () => void;
}

interface ProductItem {
  id: number;
  name: string;
  sku: string;
  barcode: string;
  unit: string;
  quantity: number;
  price: number;
  total: number;
}

const ProductArrival = ({ onCancel, onSave }: ProductArrivalProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [supplier, setSupplier] = useState('');
  const [comment, setComment] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<ProductItem[]>([
    {
      id: 1,
      name: "Шампунь для волос",
      sku: "SH001",
      barcode: "4607137301251",
      unit: "шт.",
      quantity: 10,
      price: 350,
      total: 3500
    }
  ]);
  
  const warehouses = [
    { id: 1, name: "Основной склад" },
    { id: 2, name: "Расходники" }
  ];
  
  const suppliers = [
    { id: 1, name: "ООО Бьюти-Стайл" },
    { id: 2, name: "ИП Петров С.А." },
    { id: 3, name: "ООО ПрофКосметик" }
  ];

  const handleAddProduct = () => {
    // In a real application, this would open a product selection modal
    const newProduct = {
      id: Date.now(),
      name: "Новый товар",
      sku: "NT" + Math.floor(Math.random() * 1000),
      barcode: "4607137" + Math.floor(Math.random() * 100000),
      unit: "шт.",
      quantity: 1,
      price: 500,
      total: 500
    };
    setSelectedProducts([...selectedProducts, newProduct]);
  };

  const handleRemoveProduct = (id: number) => {
    setSelectedProducts(selectedProducts.filter(product => product.id !== id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setSelectedProducts(
      selectedProducts.map(product => {
        if (product.id === id) {
          return {
            ...product,
            quantity,
            total: quantity * product.price
          };
        }
        return product;
      })
    );
  };

  const handlePriceChange = (id: number, price: number) => {
    setSelectedProducts(
      selectedProducts.map(product => {
        if (product.id === id) {
          return {
            ...product,
            price,
            total: product.quantity * price
          };
        }
        return product;
      })
    );
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((sum, product) => sum + product.total, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Поступление товаров</h2>
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
          <Label htmlFor="warehouse">Склад</Label>
          <Select value={warehouse} onValueChange={setWarehouse}>
            <SelectTrigger id="warehouse">
              <SelectValue placeholder="Выберите склад" />
            </SelectTrigger>
            <SelectContent>
              {warehouses.map(wh => (
                <SelectItem key={wh.id} value={wh.name}>{wh.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="supplier">Поставщик</Label>
          <Select value={supplier} onValueChange={setSupplier}>
            <SelectTrigger id="supplier">
              <SelectValue placeholder="Выберите поставщика" />
            </SelectTrigger>
            <SelectContent>
              {suppliers.map(sup => (
                <SelectItem key={sup.id} value={sup.name}>{sup.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="pt-4">
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
              <TableHead className="w-[30%]">Наименование</TableHead>
              <TableHead>Артикул</TableHead>
              <TableHead>Ед.изм.</TableHead>
              <TableHead className="text-center">Кол-во</TableHead>
              <TableHead className="text-center">Цена (₽)</TableHead>
              <TableHead className="text-right">Сумма (₽)</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>
                  <Input 
                    type="number"
                    value={product.quantity}
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 0)}
                    min={1}
                    className="w-20 mx-auto"
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    type="number"
                    value={product.price}
                    onChange={(e) => handlePriceChange(product.id, parseInt(e.target.value) || 0)}
                    min={0}
                    className="w-24 mx-auto"
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
            {selectedProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  Нет добавленных товаров
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        <div className="flex justify-end mt-4">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Итого:</div>
            <div className="text-xl font-semibold">{calculateTotal().toFixed(2)} ₽</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="comment">Комментарий</Label>
        <Textarea 
          id="comment" 
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Дополнительная информация о поступлении"
          rows={3}
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-6">
        <Button variant="outline" onClick={onCancel}>Отмена</Button>
        <Button onClick={onSave} disabled={!warehouse || !supplier || selectedProducts.length === 0}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default ProductArrival;
