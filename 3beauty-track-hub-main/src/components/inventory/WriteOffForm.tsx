
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

interface WriteOffFormProps {
  onCancel: () => void;
  onSave: () => void;
  serviceId?: number;
}

interface WriteOffItem {
  id: number;
  name: string;
  warehouse: string;
  price: number;
  unit: string;
  quantity: number;
}

const WriteOffForm = ({ onCancel, onSave, serviceId }: WriteOffFormProps) => {
  const [items, setItems] = useState<WriteOffItem[]>([
    {
      id: 1,
      name: "PRÉFÉRENCE GLAM LIGHTS МЕЛИРОВАНИЕ",
      warehouse: "Основной склад",
      price: 2080,
      unit: "шт.",
      quantity: 2
    },
    {
      id: 2,
      name: "ЭЛЬСЕВ ЦВЕТ И БЛЕСК",
      warehouse: "Основной склад",
      price: 500,
      unit: "шт.",
      quantity: 1
    }
  ]);

  const [reason, setReason] = useState('');
  const serviceName = "Окрашивание волос";

  const handleAddItem = () => {
    // Обычно здесь был бы диалог выбора товаров, но для примера добавим товар напрямую
    const newItem = {
      id: Date.now(),
      name: "Новый материал",
      warehouse: "Основной склад",
      price: 1000,
      unit: "шт.",
      quantity: 1
    };
    setItems([...items, newItem]);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setItems(
      items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h2 className="text-2xl font-semibold">Материалы для услуги {serviceName}</h2>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Материалы</TableHead>
            <TableHead>Склад</TableHead>
            <TableHead className="text-right">Цена за 1 ед.</TableHead>
            <TableHead className="text-center">Ед.изм.</TableHead>
            <TableHead className="text-center">Кол-во</TableHead>
            <TableHead className="text-right">Стоимость</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.warehouse}</TableCell>
              <TableCell className="text-right">{item.price}</TableCell>
              <TableCell className="text-center">{item.unit}</TableCell>
              <TableCell>
                <Input 
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  min={1}
                  className="w-20 mx-auto"
                />
              </TableCell>
              <TableCell className="text-right">{item.price * item.quantity}</TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="flex justify-between items-center">
        <Button onClick={handleAddItem} className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Добавить материал
        </Button>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Итого стоимость материалов:</p>
          <p className="text-lg font-medium">{calculateTotal()} ₽</p>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-6">
        <Button variant="outline" onClick={onCancel}>Отменить</Button>
        <Button onClick={onSave}>Сохранить</Button>
      </div>
    </div>
  );
};

export default WriteOffForm;
