
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash, Pencil } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}

const ServicesManagement = () => {
  const [services, setServices] = useState<Service[]>([
    { id: '1', name: 'Маникюр', description: 'Классический маникюр с покрытием гель-лаком', price: 2000 },
    { id: '2', name: 'Педикюр', description: 'Педикюр с обработкой стопы', price: 2500 },
    { id: '3', name: 'Наращивание ресниц', description: 'Классическое наращивание ресниц', price: 3000 },
  ]);
  
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    name: '',
    description: '',
    price: 0
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [serviceToDeleteId, setServiceToDeleteId] = useState<string | null>(null);

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewService(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleAddService = () => {
    if (!newService.name || newService.price <= 0) {
      toast({
        title: "Ошибка",
        description: "Заполните название и стоимость услуги",
        variant: "destructive"
      });
      return;
    }

    if (isEditing && editingId) {
      // Update existing service
      const updatedServices = services.map(service => 
        service.id === editingId ? { ...service, ...newService } : service
      );
      setServices(updatedServices);
      toast({
        title: "Успешно",
        description: "Услуга успешно обновлена"
      });
    } else {
      // Add new service
      const newServiceWithId = {
        ...newService,
        id: Date.now().toString()
      };
      setServices([...services, newServiceWithId]);
      toast({
        title: "Успешно",
        description: "Новая услуга добавлена"
      });
    }

    // Reset form
    setNewService({ name: '', description: '', price: 0 });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEditService = (service: Service) => {
    setNewService({
      name: service.name,
      description: service.description,
      price: service.price
    });
    setIsEditing(true);
    setEditingId(service.id);
  };

  const handleDeleteClick = (id: string) => {
    setServiceToDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (serviceToDeleteId) {
      setServices(services.filter(service => service.id !== serviceToDeleteId));
      setOpenDeleteDialog(false);
      setServiceToDeleteId(null);
      toast({
        title: "Успешно",
        description: "Услуга удалена"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">
            {isEditing ? 'Редактирование услуги' : 'Добавление новой услуги'}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Название услуги</label>
              <Input
                name="name"
                value={newService.name}
                onChange={handleServiceChange}
                placeholder="Введите название услуги"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Стоимость (₽)</label>
              <Input
                name="price"
                type="number"
                value={newService.price || ''}
                onChange={handleServiceChange}
                placeholder="0"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Описание</label>
            <Textarea
              name="description"
              value={newService.description}
              onChange={handleServiceChange}
              placeholder="Описание услуги"
              rows={3}
            />
          </div>
          <div className="mt-4 flex justify-end">
            {isEditing && (
              <Button 
                variant="outline" 
                className="mr-2"
                onClick={() => {
                  setIsEditing(false);
                  setEditingId(null);
                  setNewService({ name: '', description: '', price: 0 });
                }}
              >
                Отмена
              </Button>
            )}
            <Button onClick={handleAddService}>
              {isEditing ? 'Сохранить изменения' : 'Добавить услугу'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Table>
        <TableCaption>Список всех услуг</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead className="text-right">Стоимость</TableHead>
            <TableHead className="w-[100px]">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell className="font-medium">{service.name}</TableCell>
              <TableCell>{service.description}</TableCell>
              <TableCell className="text-right">{service.price} ₽</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditService(service)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick(service.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удаление услуги</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить эту услугу? Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ServicesManagement;
