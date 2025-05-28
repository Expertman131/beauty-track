
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Warehouse, Pencil, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InventoryMovement from '@/components/inventory/InventoryMovement';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

interface Warehouse {
  id: number;
  name: string;
  description: string;
  productCount: number;
}

const warehouseFormSchema = z.object({
  name: z.string().min(2, {
    message: "Название должно содержать не менее 2 символов",
  }),
  description: z.string().optional(),
});

const InventoryPage = () => {
  const [activeTab, setActiveTab] = useState("warehouses");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);
  
  const form = useForm<z.infer<typeof warehouseFormSchema>>({
    resolver: zodResolver(warehouseFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  
  const [warehouses, setWarehouses] = useState<Warehouse[]>([
    {
      id: 1,
      name: "Расходники",
      description: "Для учета расходных материалов",
      productCount: 24
    },
    {
      id: 2,
      name: "Товары",
      description: "Для учета продаж в магазине",
      productCount: 45
    }
  ]);

  const openAddWarehouseDialog = () => {
    form.reset({
      name: "",
      description: "",
    });
    setEditingWarehouse(null);
    setIsDialogOpen(true);
  };

  const openEditWarehouseDialog = (warehouse: Warehouse) => {
    form.reset({
      name: warehouse.name,
      description: warehouse.description || "",
    });
    setEditingWarehouse(warehouse);
    setIsDialogOpen(true);
  };

  const onSubmit = (data: z.infer<typeof warehouseFormSchema>) => {
    if (editingWarehouse) {
      // Edit existing warehouse
      setWarehouses(warehouses.map(warehouse => 
        warehouse.id === editingWarehouse.id 
          ? { ...warehouse, ...data } 
          : warehouse
      ));
      toast.success("Склад успешно обновлен");
    } else {
      // Add new warehouse
      const newWarehouse: Warehouse = {
        id: warehouses.length + 1,
        name: data.name,
        description: data.description || "",
        productCount: 0,
      };
      setWarehouses([...warehouses, newWarehouse]);
      toast.success("Склад успешно создан");
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-24 mb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <Warehouse className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold beauty-gradient-text">Склад</h1>
              <span className="text-sm text-muted-foreground ml-2">Учет товаров</span>
            </div>
            {activeTab === "warehouses" && (
              <Button className="flex items-center gap-2" onClick={openAddWarehouseDialog}>
                <Plus className="h-4 w-4" />
                Добавить склад
              </Button>
            )}
          </div>

          <Tabs defaultValue="warehouses" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-[400px]">
              <TabsTrigger value="warehouses">Склады</TabsTrigger>
              <TabsTrigger value="movement">Движение товаров</TabsTrigger>
            </TabsList>
            
            <TabsContent value="warehouses">
              <Card>
                <CardHeader className="bg-muted/40 px-6">
                  <div className="flex justify-between">
                    <div className="w-2/3">
                      <CardTitle className="text-lg">Название</CardTitle>
                    </div>
                    <div className="w-1/3 text-right">
                      <CardTitle className="text-lg">Кол-во товаров</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableBody>
                      {warehouses.map((warehouse) => (
                        <TableRow key={warehouse.id}>
                          <TableCell className="py-4">
                            <div className="flex items-center">
                              <Warehouse className="h-5 w-5 text-muted-foreground mr-3" />
                              <div>
                                <h3 className="font-medium">{warehouse.name}</h3>
                                <p className="text-sm text-muted-foreground">{warehouse.description}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end items-center">
                              <span className="mr-4">{warehouse.productCount} Товаров</span>
                              <Button variant="ghost" size="sm">
                                Переместить товары
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="ml-2"
                                onClick={() => openEditWarehouseDialog(warehouse)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="movement">
              <InventoryMovement />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      {/* Warehouse Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingWarehouse ? "Редактировать склад" : "Добавить новый склад"}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название склада*</FormLabel>
                    <FormControl>
                      <Input placeholder="Например: Основной склад" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Описание</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Например: Для учета товаров в салоне" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                  Отмена
                </Button>
                <Button type="submit">
                  {editingWarehouse ? "Сохранить" : "Добавить"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryPage;
