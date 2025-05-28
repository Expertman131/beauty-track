
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ArrowRightLeft, Plus } from "lucide-react";

interface ProductTransferProps {
  onCancel: () => void;
  onSave: () => void;
}

const ProductTransfer = ({ onCancel, onSave }: ProductTransferProps) => {
  const [sourceWarehouse, setSourceWarehouse] = useState('');
  const [targetWarehouse, setTargetWarehouse] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<
    Array<{ id: number; name: string; quantity: number; available: number; unit: string }>
  >([]);

  const warehouses = [
    { id: 1, name: "Основной склад" },
    { id: 2, name: "Расходники" }
  ];

  const handleAddProduct = () => {
    // Обычно здесь был бы диалог выбора товаров, но для примера добавим товар напрямую
    const newProduct = {
      id: Date.now(),
      name: "Шампунь для волос",
      quantity: 1,
      available: 10,
      unit: "шт."
    };
    setSelectedProducts([...selectedProducts, newProduct]);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setSelectedProducts(
      selectedProducts.map(product => 
        product.id === id ? { ...product, quantity } : product
      )
    );
  };

  const handleRemoveProduct = (id: number) => {
    setSelectedProducts(selectedProducts.filter(product => product.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Перемещение товаров</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="space-y-2">
          <Label>Откуда</Label>
          <Select value={sourceWarehouse} onValueChange={setSourceWarehouse}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите склад" />
            </SelectTrigger>
            <SelectContent>
              {warehouses.map(warehouse => (
                <SelectItem key={warehouse.id} value={warehouse.name}>{warehouse.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-center">
          <ArrowRightLeft className="h-10 w-10 text-muted-foreground" />
        </div>
        
        <div className="space-y-2">
          <Label>Куда</Label>
          <Select value={targetWarehouse} onValueChange={setTargetWarehouse}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите склад" />
            </SelectTrigger>
            <SelectContent>
              {warehouses.map(warehouse => (
                <SelectItem key={warehouse.id} value={warehouse.name}>{warehouse.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Товары для перемещения</h3>
          <Button onClick={handleAddProduct} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Добавить товар
          </Button>
        </div>
        
        {selectedProducts.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Наименование</TableHead>
                <TableHead>Доступно</TableHead>
                <TableHead>Количество</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.available} {product.unit}</TableCell>
                  <TableCell>
                    <Input 
                      type="number"
                      value={product.quantity}
                      onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                      min={1}
                      max={product.available}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10 border rounded-md">
            <p className="text-muted-foreground">Добавьте товары для перемещения</p>
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-3 pt-6">
        <Button variant="outline" onClick={onCancel}>Отмена</Button>
        <Button onClick={onSave} disabled={!sourceWarehouse || !targetWarehouse || selectedProducts.length === 0}>
          Переместить товары
        </Button>
      </div>
    </div>
  );
};

export default ProductTransfer;
