
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Search, Calendar as CalendarIcon, Plus, Tag, X, CreditCard, Coins } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Интерфейсы для типизации
interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  nextAppointment: string | null;
  treatments: string[];
  tags: string[];
  image: string;
  bonusPoints: number;
}

interface Specialist {
  id: string;
  name: string;
  specialization: string;
  image: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // в минутах
}

const ClientsManagement = () => {
  // Состояние для управления клиентами
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: "Елена Петрова",
      email: "elena.p@example.com",
      phone: "+7 (900) 123-45-67",
      lastVisit: "05.04.2025",
      nextAppointment: "10.05.2025",
      treatments: ["Пилинг", "Ботокс", "Филлеры"],
      tags: ["VIP", "Постоянный клиент"],
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      bonusPoints: 250
    },
    {
      id: '2',
      name: "Анна Кузнецова",
      email: "anna.k@example.com",
      phone: "+7 (900) 234-56-78",
      lastVisit: "18.03.2025",
      nextAppointment: "25.04.2025",
      treatments: ["Уход за лицом", "Микронидлинг"],
      tags: ["Новый клиент"],
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bonusPoints: 100
    },
    {
      id: '3',
      name: "Мария Соколова",
      email: "maria.s@example.com",
      phone: "+7 (900) 345-67-89",
      lastVisit: "02.04.2025",
      nextAppointment: "02.05.2025",
      treatments: ["Ботокс", "Микродермабразия"],
      tags: ["Чувствительная кожа"],
      image: "https://randomuser.me/api/portraits/women/55.jpg",
      bonusPoints: 320
    }
  ]);
  
  // Состояние для управления мастерами
  const [specialists, setSpecialists] = useState<Specialist[]>([
    { id: '1', name: "Анна Смирнова", specialization: "Косметолог", image: "https://randomuser.me/api/portraits/women/1.jpg" },
    { id: '2', name: "Екатерина Иванова", specialization: "Мастер маникюра", image: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: '3', name: "Ольга Петрова", specialization: "Мастер по наращиванию ресниц", image: "https://randomuser.me/api/portraits/women/3.jpg" },
  ]);

  // Состояние для управления услугами
  const [services, setServices] = useState<Service[]>([
    { id: '1', name: "Маникюр", description: "Классический маникюр с покрытием гель-лаком", price: 2000, duration: 60 },
    { id: '2', name: "Педикюр", description: "Педикюр с обработкой стопы", price: 2500, duration: 90 },
    { id: '3', name: "Наращивание ресниц", description: "Классическое наращивание ресниц", price: 3000, duration: 120 },
    { id: '4', name: "Ботокс", description: "Инъекции ботулотоксина", price: 15000, duration: 45 },
    { id: '5', name: "Филлеры", description: "Инъекции гиалуроновой кислоты", price: 20000, duration: 60 },
  ]);
  
  // Состояние для диалогов
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [openRescheduleDialog, setOpenRescheduleDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openAddTagDialog, setOpenAddTagDialog] = useState(false);
  const [openAddBonusDialog, setOpenAddBonusDialog] = useState(false);
  const [openSpendBonusDialog, setOpenSpendBonusDialog] = useState(false);
  
  // Состояние для записи
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Состояние для тегов
  const [newTag, setNewTag] = useState<string>('');
  const [tagsInput, setTagsInput] = useState<string>('');

  // Состояние для бонусов
  const [bonusAmount, setBonusAmount] = useState<number>(100);

  // Новые состояния для траты бонусов
  const [spendBonusAmount, setSpendBonusAmount] = useState<number>(0);
  const [spendBonusReason, setSpendBonusReason] = useState<string>('');
  const [spendBonusService, setSpendBonusService] = useState<string>('');
  const [maxBonusDiscount, setMaxBonusDiscount] = useState<number>(0);
  const [servicePrice, setServicePrice] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  
  // Обработчик записи клиента
  const handleBookAppointment = () => {
    if (!selectedClient || !selectedSpecialist || !selectedService || !selectedDate || !selectedTime) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля для записи",
        variant: "destructive"
      });
      return;
    }
    
    const updatedClients = clients.map(client => {
      if (client.id === selectedClient.id) {
        return {
          ...client,
          nextAppointment: format(selectedDate, 'dd.MM.yyyy') + ' ' + selectedTime
        };
      }
      return client;
    });
    
    setClients(updatedClients);
    
    const specialist = specialists.find(s => s.id === selectedSpecialist);
    const service = services.find(s => s.id === selectedService);
    
    toast({
      title: "Запись создана",
      description: `${selectedClient.name} записан(а) на ${service?.name} к мастеру ${specialist?.name} на ${format(selectedDate, 'dd.MM.yyyy')} в ${selectedTime}`
    });
    
    resetBookingForm();
    setOpenBookingDialog(false);
  };
  
  // Обработчик переноса записи
  const handleReschedule = () => {
    if (!selectedClient || !selectedDate || !selectedTime) {
      toast({
        title: "Ошибка",
        description: "Выберите новую дату и время",
        variant: "destructive"
      });
      return;
    }
    
    const updatedClients = clients.map(client => {
      if (client.id === selectedClient.id) {
        return {
          ...client,
          nextAppointment: format(selectedDate, 'dd.MM.yyyy') + ' ' + selectedTime
        };
      }
      return client;
    });
    
    setClients(updatedClients);
    
    toast({
      title: "Запись перенесена",
      description: `Запись клиента ${selectedClient.name} перенесена на ${format(selectedDate, 'dd.MM.yyyy')} в ${selectedTime}`
    });
    
    resetBookingForm();
    setOpenRescheduleDialog(false);
  };
  
  // Обработчик отмены записи
  const handleCancelAppointment = () => {
    if (!selectedClient) return;
    
    const updatedClients = clients.map(client => {
      if (client.id === selectedClient.id) {
        return {
          ...client,
          nextAppointment: null
        };
      }
      return client;
    });
    
    setClients(updatedClients);
    
    toast({
      title: "Запись отменена",
      description: `Запись клиента ${selectedClient.name} успешно отменена`
    });
    
    resetBookingForm();
    setOpenCancelDialog(false);
  };
  
  // Обработчик добавления тега
  const handleAddTag = () => {
    if (!selectedClient) return;
    
    // Разбиваем введенный текст на отдельные теги
    const newTags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    if (newTags.length === 0) {
      toast({
        title: "Ошибка",
        description: "Введите хотя бы один тег",
        variant: "destructive"
      });
      return;
    }
    
    const updatedClients = clients.map(client => {
      if (client.id === selectedClient.id) {
        // Объединяем существующие теги с новыми и удаляем дубликаты
        const combinedTags = [...client.tags, ...newTags];
        const uniqueTags = Array.from(new Set(combinedTags));
        
        return {
          ...client,
          tags: uniqueTags
        };
      }
      return client;
    });
    
    setClients(updatedClients);
    
    toast({
      title: "Теги добавлены",
      description: `Теги успешно добавлены для клиента ${selectedClient.name}`
    });
    
    setTagsInput('');
    setOpenAddTagDialog(false);
  };
  
  // Обработчик удаления тега
  const handleRemoveTag = (clientId: string, tagToRemove: string) => {
    const updatedClients = clients.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          tags: client.tags.filter(tag => tag !== tagToRemove)
        };
      }
      return client;
    });
    
    setClients(updatedClients);
    
    toast({
      title: "Тег удален",
      description: `Тег "${tagToRemove}" удален`
    });
  };
  
  // Обработчик добавления бонусов
  const handleAddBonus = () => {
    if (!selectedClient) return;
    
    const updatedClients = clients.map(client => {
      if (client.id === selectedClient.id) {
        return {
          ...client,
          bonusPoints: client.bonusPoints + bonusAmount
        };
      }
      return client;
    });
    
    setClients(updatedClients);
    
    toast({
      title: "Бонусы добавлены",
      description: `${bonusAmount} бонусов добавлены для клиента ${selectedClient.name}`
    });
    
    setBonusAmount(100);
    setOpenAddBonusDialog(false);
  };

  // Новый обработчик для открытия диалога списания бонусов
  const openSpendBonusDialogHandler = (client: Client) => {
    setSelectedClient(client);
    setSpendBonusAmount(0);
    setSpendBonusService('');
    setSpendBonusReason('');
    setServicePrice(0);
    setMaxBonusDiscount(0);
    setFinalPrice(0);
    setOpenSpendBonusDialog(true);
  };

  // Обработчик изменения выбранной услуги при списании бонусов
  const handleSpendBonusServiceChange = (serviceId: string) => {
    setSpendBonusService(serviceId);
    
    // Находим выбранную услугу
    const service = services.find(s => s.id === serviceId);
    
    if (service && selectedClient) {
      // Устанавливаем цену услуги
      setServicePrice(service.price);
      
      // Максимальная скидка - 50% от стоимости услуги или все бонусы клиента, что меньше
      const maxDiscount = Math.min(Math.floor(service.price * 0.5), selectedClient.bonusPoints);
      setMaxBonusDiscount(maxDiscount);
      
      // Устанавливаем начальное значение списания бонусов
      setSpendBonusAmount(0);
      
      // Обновляем итоговую цену
      setFinalPrice(service.price);
    }
  };

  // Обработчик изменения количества списываемых бонусов
  const handleSpendBonusAmountChange = (amount: number) => {
    if (amount > maxBonusDiscount) {
      amount = maxBonusDiscount;
    }
    
    if (amount < 0) {
      amount = 0;
    }
    
    setSpendBonusAmount(amount);
    
    // Обновляем итоговую цену
    setFinalPrice(servicePrice - amount);
  };

  // Обработчик списания бонусов
  const handleSpendBonus = () => {
    if (!selectedClient || !spendBonusService) {
      toast({
        title: "Ошибка",
        description: "Выберите услугу и укажите количество бонусов",
        variant: "destructive"
      });
      return;
    }
    
    const service = services.find(s => s.id === spendBonusService);
    
    if (service) {
      // Обновляем бонусы клиента
      const updatedClients = clients.map(client => {
        if (client.id === selectedClient.id) {
          return {
            ...client,
            bonusPoints: client.bonusPoints - spendBonusAmount
          };
        }
        return client;
      });
      
      setClients(updatedClients);
      
      toast({
        title: "Бонусы списаны",
        description: `${spendBonusAmount} бонусов списано у клиента ${selectedClient.name} за услугу "${service.name}". Итоговая сумма: ${finalPrice} ₽`
      });
      
      // Сброс формы
      setSpendBonusAmount(0);
      setSpendBonusService('');
      setSpendBonusReason('');
      setServicePrice(0);
      setMaxBonusDiscount(0);
      setFinalPrice(0);
      setOpenSpendBonusDialog(false);
    }
  };
  
  // Сброс формы записи
  const resetBookingForm = () => {
    setSelectedClient(null);
    setSelectedSpecialist('');
    setSelectedService('');
    setSelectedDate(new Date());
    setSelectedTime('');
    setTagsInput('');
    setBonusAmount(100);
  };
  
  // Генерация доступных временных слотов
  const getAvailableTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        slots.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return slots;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-beauty-400 h-4 w-4" />
          <Input placeholder="Поиск клиентов..." className="pl-10" />
        </div>
        
        <Button className="bg-beauty-500 hover:bg-beauty-600" onClick={() => setOpenBookingDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Записать клиента
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <Card key={client.id} className="border-beauty-100 hover:border-beauty-200 transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <img 
                  src={client.image} 
                  alt={client.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-beauty-900 text-lg">{client.name}</h3>
                  <p className="text-sm text-beauty-600">{client.email}</p>
                  <p className="text-sm text-beauty-600">{client.phone}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-beauty-700 font-medium">Последнее посещение:</span>
                  <span className="text-sm text-beauty-900">{client.lastVisit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-beauty-700 font-medium">Следующая запись:</span>
                  <span className="text-sm text-beauty-900">{client.nextAppointment || 'Не запланировано'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-beauty-700 font-medium">Бонусы:</span>
                  <span className="text-sm text-beauty-900">{client.bonusPoints}</span>
                </div>
              </div>
              
              {client.tags.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-beauty-700 mb-1">Теги:</h4>
                  <div className="flex flex-wrap gap-2">
                    {client.tags.map((tag, i) => (
                      <Badge key={i} className="bg-beauty-100 text-beauty-700 hover:bg-beauty-200 cursor-default flex items-center">
                        {tag}
                        <X 
                          className="ml-1 h-3 w-3 hover:text-red-500 cursor-pointer" 
                          onClick={() => handleRemoveTag(client.id, tag)}
                        />
                      </Badge>
                    ))}
                    <Badge 
                      className="bg-beauty-50 text-beauty-700 hover:bg-beauty-100 cursor-pointer" 
                      onClick={() => {
                        setSelectedClient(client);
                        setOpenAddTagDialog(true);
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Добавить
                    </Badge>
                  </div>
                </div>
              )}
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-beauty-700 mb-1">Процедуры:</h4>
                <div className="flex flex-wrap gap-2">
                  {client.treatments.map((treatment, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-beauty-50 text-beauty-700 rounded-full">
                      {treatment}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-beauty-600 border-beauty-200 flex items-center"
                  onClick={() => {
                    setSelectedClient(client);
                    setOpenAddBonusDialog(true);
                  }}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Начислить бонусы
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-amber-600 border-amber-200 flex items-center"
                  onClick={() => openSpendBonusDialogHandler(client)}
                >
                  <Coins className="h-3 w-3 mr-1" />
                  Списать бонусы
                </Button>
                <Button 
                  size="sm" 
                  className="bg-beauty-500 hover:bg-beauty-600 col-span-2"
                  onClick={() => {
                    setSelectedClient(client);
                    setOpenBookingDialog(true);
                  }}
                >
                  Записать
                </Button>
                {client.nextAppointment && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-amber-600 border-amber-200 hover:bg-amber-50"
                      onClick={() => {
                        setSelectedClient(client);
                        setOpenRescheduleDialog(true);
                      }}
                    >
                      Перенести
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => {
                        setSelectedClient(client);
                        setOpenCancelDialog(true);
                      }}
                    >
                      Отменить
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Диалог записи клиента */}
      <Dialog open={openBookingDialog} onOpenChange={(open) => {
        setOpenBookingDialog(open);
        if (!open) resetBookingForm();
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Запись клиента</DialogTitle>
            <DialogDescription>
              Заполните информацию для записи клиента
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!selectedClient && (
              <div>
                <label className="block text-sm font-medium mb-1">Выберите клиента</label>
                <select 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  onChange={(e) => {
                    const clientId = e.target.value;
                    const client = clients.find(c => c.id === clientId) || null;
                    setSelectedClient(client);
                  }}
                  value={selectedClient?.id || ""}
                >
                  <option value="">Выберите клиента</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-1">Выберите мастера</label>
              <select 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                onChange={(e) => setSelectedSpecialist(e.target.value)}
                value={selectedSpecialist}
              >
                <option value="">Выберите мастера</option>
                {specialists.map((specialist) => (
                  <option key={specialist.id} value={specialist.id}>
                    {specialist.name} ({specialist.specialization})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Выберите услугу</label>
              <select 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                onChange={(e) => setSelectedService(e.target.value)}
                value={selectedService}
              >
                <option value="">Выберите услугу</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - {service.price} ₽ ({service.duration} мин)
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Выберите дату</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'dd.MM.yyyy') : <span>Выберите дату</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Выберите время</label>
              <select 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                onChange={(e) => setSelectedTime(e.target.value)}
                value={selectedTime}
              >
                <option value="">Выберите время</option>
                {getAvailableTimeSlots().map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            {selectedClient && selectedService && (
              <div className="p-4 border rounded-md bg-muted">
                <h4 className="font-medium mb-2">Информация о записи</h4>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Клиент:</span> {selectedClient.name}</p>
                  <p><span className="font-medium">Услуга:</span> {services.find(s => s.id === selectedService)?.name}</p>
                  <p><span className="font-medium">Стоимость:</span> {services.find(s => s.id === selectedService)?.price} ₽</p>
                  {selectedSpecialist && (
                    <p><span className="font-medium">Мастер:</span> {specialists.find(s => s.id === selectedSpecialist)?.name}</p>
                  )}
                  {selectedDate && selectedTime && (
                    <p><span className="font-medium">Дата и время:</span> {format(selectedDate, 'dd.MM.yyyy')} в {selectedTime}</p>
                  )}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenBookingDialog(false)}>
              Отмена
            </Button>
            <Button onClick={handleBookAppointment}>
              Записать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог переноса записи */}
      <Dialog open={openRescheduleDialog} onOpenChange={(open) => {
        setOpenRescheduleDialog(open);
        if (!open) resetBookingForm();
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Перенос записи</DialogTitle>
            <DialogDescription>
              Выберите новую дату и время для записи
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedClient && (
              <div>
                <p className="text-sm font-medium">Клиент: {selectedClient.name}</p>
                <p className="text-sm text-beauty-600">Текущая запись: {selectedClient.nextAppointment}</p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-1">Новая дата</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'dd.MM.yyyy') : <span>Выберите дату</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Новое время</label>
              <select 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                onChange={(e) => setSelectedTime(e.target.value)}
                value={selectedTime}
              >
                <option value="">Выберите время</option>
                {getAvailableTimeSlots().map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenRescheduleDialog(false)}>
              Отмена
            </Button>
            <Button onClick={handleReschedule}>
              Перенести запись
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог отмены записи */}
      <AlertDialog open={openCancelDialog} onOpenChange={setOpenCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Отмена записи</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedClient && (
                <>
                  Вы уверены, что хотите отменить запись клиента {selectedClient.name} 
                  на {selectedClient.nextAppointment}?
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setOpenCancelDialog(false);
              resetBookingForm();
            }}>
              Нет
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelAppointment} className="bg-red-600 hover:bg-red-700">
              Да, отменить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Диалог добавления тегов */}
      <Dialog open={openAddTagDialog} onOpenChange={(open) => {
        setOpenAddTagDialog(open);
        if (!open) setTagsInput('');
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавление тегов</DialogTitle>
            <DialogDescription>
              {selectedClient && (
                <>
                  Добавьте теги для клиента {selectedClient.name}. 
                  Разделяйте теги запятыми.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-1">Теги</label>
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-beauty-500" />
                <Input
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Например: VIP, Постоянный клиент, Чувствительная кожа"
                />
              </div>
              <p className="text-xs text-beauty-500 mt-1">
                Введите несколько тегов, разделяя их запятыми
              </p>
            </div>
            
            {selectedClient && selectedClient.tags.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-1">Существующие теги:</label>
                <div className="flex flex-wrap gap-2">
                  {selectedClient.tags.map((tag, i) => (
                    <Badge key={i} className="bg-beauty-100 text-beauty-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddTagDialog(false)}>
              Отмена
            </Button>
            <Button onClick={handleAddTag}>
              Добавить теги
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог добавления бонусов */}
      <Dialog open={openAddBonusDialog} onOpenChange={(open) => {
        setOpenAddBonusDialog(open);
        if (!open) setBonusAmount(100);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Начисление бонусов</DialogTitle>
            <DialogDescription>
              {selectedClient && (
                <>
                  Добавьте бонусные баллы для клиента {selectedClient.name}. 
                  Текущий баланс: {selectedClient.bonusPoints} баллов.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-1">Количество бонусов</label>
              <Input
                type="number"
                min="1"
                max="10000"
                value={bonusAmount}
                onChange={(e) => setBonusAmount(parseInt(e.target.value) || 0)}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" onClick={() => setBonusAmount(100)}>
                +100
              </Button>
              <Button variant="outline" onClick={() => setBonusAmount(300)}>
                +300
              </Button>
              <Button variant="outline" onClick={() => setBonusAmount(500)}>
                +500
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddBonusDialog(false)}>
              Отмена
            </Button>
            <Button onClick={handleAddBonus}>
              Добавить бонусы
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Новый диалог списания бонусов */}
      <Dialog open={openSpendBonusDialog} onOpenChange={(open) => {
        setOpenSpendBonusDialog(open);
        if (!open) {
          setSpendBonusAmount(0);
          setSpendBonusService('');
          setSpendBonusReason('');
        }
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Списание бонусов</DialogTitle>
            <DialogDescription>
              {selectedClient && (
                <>
                  Списание бонусов в счет оплаты услуг для клиента {selectedClient.name}. 
                  Доступно: {selectedClient.bonusPoints} баллов.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium mb-1">Выберите услугу</label>
              <select 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                onChange={(e) => handleSpendBonusServiceChange(e.target.value)}
                value={spendBonusService}
              >
                <option value="">Выберите услугу</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - {service.price} ₽
                  </option>
                ))}
              </select>
            </div>
            
            {spendBonusService && (
              <>
                <div className="bg-beauty-50 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Стоимость услуги:</span>
                    <span>{servicePrice} ₽</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Доступно бонусов:</span>
                    <span>{selectedClient?.bonusPoints} бонусов</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Макс. скидка (50%):</span>
                    <span>{maxBonusDiscount} бонусов</span>
                  </div>
                  <div className="h-px bg-beauty-200 my-2"></div>
                  <div className="flex justify-between font-bold">
                    <span>Итоговая стоимость:</span>
                    <span>{finalPrice} ₽</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium mb-1">Количество списываемых бонусов</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      max={maxBonusDiscount}
                      value={spendBonusAmount}
                      onChange={(e) => handleSpendBonusAmountChange(parseInt(e.target.value) || 0)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={() => handleSpendBonusAmountChange(maxBonusDiscount)}
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap"
                    >
                      Макс. ({maxBonusDiscount})
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSpendBonusAmountChange(Math.floor(maxBonusDiscount * 0.25))}
                  >
                    25%
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSpendBonusAmountChange(Math.floor(maxBonusDiscount * 0.5))}
                  >
                    50%
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSpendBonusAmountChange(Math.floor(maxBonusDiscount * 0.75))}
                  >
                    75%
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSpendBonusAmountChange(maxBonusDiscount)}
                  >
                    100%
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium mb-1">Комментарий</label>
                  <Input
                    value={spendBonusReason}
                    onChange={(e) => setSpendBonusReason(e.target.value)}
                    placeholder="Необязательный комментарий"
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenSpendBonusDialog(false)}>
              Отмена
            </Button>
            <Button 
              onClick={handleSpendBonus}
              disabled={!spendBonusService || spendBonusAmount <= 0}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Списать бонусы
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientsManagement;
