
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Plus } from "lucide-react";

const ProductsInventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showOutOfStock, setShowOutOfStock] = useState(false);

  const productCategories = [
    { id: 1, name: "Все категории", count: 79 },
    { id: 2, name: "Красота и здоровье", count: 43 },
    { id: 3, name: "Техника для красоты", count: 21 },
    { id: 4, name: "Инструмент и оборудование", count: 9 },
    { id: 5, name: "Аксессуары", count: 6 }
  ];

  const products = [
    {
      id: 1,
      name: "Alterna Bamboo",
      category: "Шампуни",
      priceRetail: 1200.00,
      priceWriteoff: 1200.00,
      priceOnline: 1200.00,
      lastPurchaseDate: "13.09.2023",
      lastPurchasePrice: 0.55,
      stock: 0,
      stockUnit: "мл"
    },
    {
      id: 2,
      name: "Indola Innova Color Shampoo",
      category: "Шампуни",
      priceRetail: 800.00,
      priceWriteoff: 1200.00,
      priceOnline: 800.00,
      lastPurchaseDate: "14.09.2023",
      lastPurchasePrice: 1200.00,
      stock: 12,
      stockUnit: "шт"
    },
    {
      id: 3,
      name: "Natura Siberica",
      category: "Крем для лица",
      priceRetail: 120.00,
      priceWriteoff: 100.00,
      priceOnline: 150.00,
      lastPurchaseDate: "14.09.2023",
      lastPurchasePrice: 1200.00,
      stock: 12,
      stockUnit: "шт"
    },
    {
      id: 4,
      name: "Yves Rocher",
      category: "Крем для лица",
      priceRetail: 1700.00,
      priceWriteoff: 1700.00,
      priceOnline: 1700.00,
      lastPurchaseDate: "13.09.2023",
      lastPurchasePrice: 0.55,
      stock: 0,
      stockUnit: "мл"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStock = showOutOfStock ? product.stock === 0 : true;
    return matchesSearch && matchesStock;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Учет наличия товаров</h2>
        <p className="text-muted-foreground mt-2">
          Просматривайте список ваших товаров, контролируйте остатки на складах, корректируйте цены
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 space-y-6">
          <Card className="p-4">
            <div className="space-y-1.5">
              {productCategories.map((category) => (
                <div 
                  key={category.id}
                  className="flex items-center justify-between py-1 cursor-pointer hover:bg-accent/40 px-2 rounded-sm"
                >
                  <span className="text-sm">{category.name}</span>
                  <span className="text-xs text-muted-foreground">{category.count}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="col-span-3 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по категориям и товарам"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="outOfStock" 
                checked={showOutOfStock}
                onCheckedChange={(checked) => setShowOutOfStock(!!checked)} 
              />
              <label htmlFor="outOfStock" className="text-sm cursor-pointer">
                Товары без остатков
              </label>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Добавить категорию</Button>
              <Button>Добавить товар</Button>
            </div>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Наименование (Артикул)</TableHead>
                  <TableHead colSpan={3} className="text-center">Цена</TableHead>
                  <TableHead colSpan={2} className="text-center">Последняя закупка</TableHead>
                  <TableHead>Остаток</TableHead>
                </TableRow>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead className="text-center">Продажи</TableHead>
                  <TableHead className="text-center">Списание</TableHead>
                  <TableHead className="text-center">Онлайн</TableHead>
                  <TableHead className="text-center">Дата</TableHead>
                  <TableHead className="text-center">Цена</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <div className="text-blue-600 hover:underline cursor-pointer">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.category}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {product.priceRetail ? `${product.priceRetail.toFixed(2)}` : "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {product.priceWriteoff ? `${product.priceWriteoff.toFixed(2)}` : "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {product.priceOnline ? `${product.priceOnline.toFixed(2)}` : "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {product.lastPurchaseDate ? product.lastPurchaseDate : "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {product.lastPurchasePrice ? `${product.lastPurchasePrice.toFixed(2)}` : "-"}
                    </TableCell>
                    <TableCell>
                      <div className={`${product.stock === 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {product.stock > 0 ? `${product.stock} ${product.stockUnit}` : `0 ${product.stockUnit}`}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductsInventory;
