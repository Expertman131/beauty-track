import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { AlertCircle, CalendarIcon, FileText, Plus, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface InventoryCheckProps {
  onCancel: () => void;
  onSave: () => void;
}

interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  unit: string;
  expected: number;
  actual: number;
  difference: number;
}

const InventoryCheck = ({ onCancel, onSave }: InventoryCheckProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [comment, setComment] = useState('');
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: 1,
      name: "Шампунь для волос",
      sku: "SH001",
      unit: "шт.",
      expected: 15,
      actual: 15,
      difference: 0
    },
    {
      id: 2,
      name: "Краска для волос №00040",
      sku: "KR040",
      unit: "грамм",
      expected: 1000,
      actual: 897,
      difference: -103
    },
    {
      id: 3,
      name: "Маска восстанавливающая",
      sku: "MV023",
      unit: "шт.",
      expected: 8,
      actual: 10,
      difference: 2
    }
  ]);
  
  const warehouses = [
    { id: 1, name: "Основной склад" },
    { id: 2, name: "Расходники" }
  ];

  const handleAddItem = () => {
    // In a real application, this would open a product selection modal
    const newItem = {
      id: Date.now(),
      name: "Новый товар",
      sku: "NT" + Math.floor(Math.random() * 1000),
      unit: "шт.",
      expected: 10,
      actual: 10,
      difference: 0
    };
    setItems([...items, newItem]);
  };

  const handleActualChange = (id: number, actual: number) => {
    setItems(
      items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            actual,
            difference: actual - item.expected
          };
        }
        return item;
      })
    );
  };

  const hasDiscrepancies = items.some(item => item.difference !== 0);
  const totalDiscrepancy = items.reduce((sum, item) => sum + Math.abs(item.difference), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Инвентаризация товаров</h2>
      </div>
      
      {hasDiscrepancies && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">Обнаружены расхождения</AlertTitle>
          <AlertDescription className="text-amber-700">
            Выявлены расхождения между учетными и фактическими остатками. 
            После сохранения будут созданы движения товаров для выравнивания остатков.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="date">Дата инвентаризации</Label>
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
      </div>
      
      <div className="pt-4">
        <div className="flex justify-between items-center mb-4">
          <div className="relative flex-grow max-w-sm">
            <Input
              placeholder="Поиск по названию или артикулу"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Загрузить из файла
            </Button>
            <Button onClick={handleAddItem} className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Добавить товар
            </Button>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Наименование</TableHead>
              <TableHead>Артикул</TableHead>
              <TableHead className="text-center">Ед. изм.</TableHead>
              <TableHead className="text-center">Учетное кол-во</TableHead>
              <TableHead className="text-center">Фактическое кол-во</TableHead>
              <TableHead className="text-center">Расхождение</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell className="text-center">{item.unit}</TableCell>
                <TableCell className="text-center">{item.expected}</TableCell>
                <TableCell>
                  <Input 
                    type="number"
                    value={item.actual}
                    onChange={(e) => handleActualChange(item.id, parseInt(e.target.value) || 0)}
                    min={0}
                    className="w-24 mx-auto"
                  />
                </TableCell>
                <TableCell className={cn(
                  "text-center font-medium",
                  item.difference > 0 ? "text-green-600" : 
                  item.difference < 0 ? "text-red-600" : ""
                )}>
                  {item.difference > 0 ? `+${item.difference}` : item.difference}
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  Нет товаров для инвентаризации
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        {hasDiscrepancies && (
          <div className="flex justify-end mt-4">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Общее расхождение:</div>
              <div className="text-xl font-semibold text-amber-600">{totalDiscrepancy} единиц</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="comment">Примечание</Label>
        <Textarea 
          id="comment" 
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Комментарий к инвентаризации"
          rows={3}
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-6">
        <Button variant="outline" onClick={onCancel}>Отмена</Button>
        <Button onClick={onSave} disabled={!warehouse || items.length === 0}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default InventoryCheck;
