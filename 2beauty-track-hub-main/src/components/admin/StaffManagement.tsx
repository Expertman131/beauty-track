import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { 
  Plus, 
  Edit, 
  UserX, 
  Star, 
  Calendar, 
  CalendarClock,
  Tag,
  Check,
  X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

type Staff = {
  id: number;
  name: string;
  specialization: string;
  rating: number;
  appointments: number;
  revenue: number;
  availability: string;
  image: string;
  services: string[];
  workDays: string[];
  workHours: {
    start: string;
    end: string;
  };
  username?: string;
  password?: string;
};

const allServices = [
  "Чистка лица", 
  "Пилинг", 
  "Массаж лица", 
  "Маникюр", 
  "Педикюр", 
  "Наращивание", 
  "Массаж тела", 
  "Лимфодренаж", 
  "Антицеллюлитный массаж",
  "Стрижка",
  "Окрашивание",
  "Укладка",
  "Мезотерапия",
  "Эпиляция"
];

const StaffManagement = () => {
  const { toast } = useToast();
  const [specialists, setSpecialists] = useState<Staff[]>([
    {
      id: 1,
      name: "Анна Петрова",
      specialization: "Косметолог",
      rating: 4.8,
      appointments: 156,
      revenue: 425000,
      availability: "Пн-Пт: 10:00-19:00",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      services: ["Чистка лица", "Пилинг", "Массаж лица"],
      workDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      workHours: {
        start: "10:00",
        end: "19:00"
      }
    },
    {
      id: 2,
      name: "Мария Иванова",
      specialization: "Мастер маникюра",
      rating: 4.9,
      appointments: 203,
      revenue: 380000,
      availability: "Вт-Сб: 11:00-20:00",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      services: ["Маникюр", "Педикюр", "Наращивание"],
      workDays: ["tuesday", "wednesday", "thursday", "friday", "saturday"],
      workHours: {
        start: "11:00",
        end: "20:00"
      }
    },
    {
      id: 3,
      name: "Елена Сидорова",
      specialization: "Массажист",
      rating: 4.7,
      appointments: 128,
      revenue: 520000,
      availability: "Пн-Сб: 09:00-18:00",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      services: ["Массаж тела", "Лимфодренаж", "Антицеллюлитный массаж"],
      workDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
      workHours: {
        start: "09:00",
        end: "18:00"
      }
    }
  ]);
  
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<number | null>(null);
  const [showServicesDialog, setShowServicesDialog] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    image: "",
    workDays: [] as string[],
    workHoursStart: "09:00",
    workHoursEnd: "18:00",
    services: [] as string[]
  });

  const resetForm = (staff?: Staff) => {
    if (staff) {
      setFormData({
        name: staff.name,
        specialization: staff.specialization,
        image: staff.image,
        workDays: [...staff.workDays],
        workHoursStart: staff.workHours.start,
        workHoursEnd: staff.workHours.end,
        services: [...staff.services]
      });
      setIsEditing(true);
      setEditingStaff(staff);
    } else {
      setFormData({
        name: "",
        specialization: "",
        image: "",
        workDays: [],
        workHoursStart: "09:00",
        workHoursEnd: "18:00",
        services: []
      });
      setIsEditing(false);
      setEditingStaff(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleWorkDayChange = (day: string) => {
    setFormData(prev => {
      if (prev.workDays.includes(day)) {
        return { ...prev, workDays: prev.workDays.filter(d => d !== day) };
      } else {
        return { ...prev, workDays: [...prev.workDays, day] };
      }
    });
  };
  
  const handleServiceChange = (service: string) => {
    setFormData(prev => {
      if (prev.services.includes(service)) {
        return { ...prev, services: prev.services.filter(s => s !== service) };
      } else {
        return { ...prev, services: [...prev.services, service] };
      }
    });
  };
  
  const generateCredentials = () => {
    const username = formData.name.toLowerCase().replace(/\s+/g, '.');
    const password = Math.random().toString(36).slice(-8);
    return { username, password };
  };

  const handleSaveStaff = () => {
    const dayMap: { [key: string]: string } = {
      monday: "Пн",
      tuesday: "Вт",
      wednesday: "Ср",
      thursday: "Чт",
      friday: "Пт",
      saturday: "Сб",
      sunday: "Вс"
    };
    
    const sortOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const sortedDays = [...formData.workDays].sort((a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b));
    
    let availability = "";
    if (sortedDays.length > 0) {
      const dayRanges: string[] = [];
      let startDay = sortedDays[0];
      let endDay = startDay;
      
      for (let i = 1; i < sortedDays.length; i++) {
        const currentDay = sortedDays[i];
        const prevDayIndex = sortOrder.indexOf(endDay);
        const currentDayIndex = sortOrder.indexOf(currentDay);
        
        if (currentDayIndex - prevDayIndex === 1) {
          endDay = currentDay;
        } else {
          dayRanges.push(
            startDay === endDay ? dayMap[startDay] : `${dayMap[startDay]}-${dayMap[endDay]}`
          );
          startDay = currentDay;
          endDay = currentDay;
        }
      }
      
      dayRanges.push(
        startDay === endDay ? dayMap[startDay] : `${dayMap[startDay]}-${dayMap[endDay]}`
      );
      
      availability = `${dayRanges.join(", ")}: ${formData.workHoursStart}-${formData.workHoursEnd}`;
    } else {
      availability = "График не задан";
    }
    
    const credentials = generateCredentials();
    
    const newStaffData: Staff = {
      id: isEditing ? editingStaff!.id : Date.now(),
      name: formData.name,
      specialization: formData.specialization,
      rating: isEditing ? editingStaff!.rating : 0,
      appointments: isEditing ? editingStaff!.appointments : 0,
      revenue: isEditing ? editingStaff!.revenue : 0,
      availability,
      image: formData.image || "https://randomuser.me/api/portraits/lego/1.jpg",
      services: formData.services,
      workDays: formData.workDays,
      workHours: {
        start: formData.workHoursStart,
        end: formData.workHoursEnd
      },
      username: credentials.username,
      password: credentials.password
    };
    
    if (isEditing) {
      setSpecialists(prev => prev.map(staff => 
        staff.id === editingStaff!.id ? newStaffData : staff
      ));
      toast({
        title: "Мастер обновлен",
        description: `Данные для ${newStaffData.name} успешно обновлены.`
      });
    } else {
      setSpecialists(prev => [...prev, newStaffData]);
      toast({
        title: "Мастер добавлен",
        description: `${newStaffData.name} успешно добавлен(а) в систему.\nЛогин: ${credentials.username}\nПароль: ${credentials.password}`
      });
    }
    
    resetForm();
  };
  
  const handleDeleteStaff = (id: number) => {
    setStaffToDelete(id);
    setShowDeleteConfirm(true);
  };
  
  const confirmDeleteStaff = () => {
    if (staffToDelete !== null) {
      const staffName = specialists.find(s => s.id === staffToDelete)?.name;
      setSpecialists(prev => prev.filter(staff => staff.id !== staffToDelete));
      setShowDeleteConfirm(false);
      setStaffToDelete(null);
      
      toast({
        title: "Мастер удален",
        description: `${staffName} был удален из системы.`
      });
    }
  };

  const getDaysName = (days: string[]) => {
    const dayMap: { [key: string]: string } = {
      monday: "Понедельник",
      tuesday: "Вторник",
      wednesday: "Среда",
      thursday: "Четверг",
      friday: "Пятница",
      saturday: "Суббота",
      sunday: "Воскресенье"
    };
    
    return days.map(day => dayMap[day] || day);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Управление специалистами</h2>
        <Sheet onOpenChange={() => resetForm()}>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Добавить специалиста
            </Button>
          </SheetTrigger>
          <SheetContent className="min-w-[400px]">
            <SheetHeader>
              <SheetTitle>{isEditing ? "Редактировать специалиста" : "Добавить специалиста"}</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">ФИО</Label>
                <Input 
                  id="name" 
                  placeholder="Введите ФИО специалиста" 
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialization">Специализация</Label>
                <Input 
                  id="specialization" 
                  placeholder="Например: Косметолог" 
                  value={formData.specialization}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label>График работы</Label>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { value: "monday", label: "Пн" },
                      { value: "tuesday", label: "Вт" },
                      { value: "wednesday", label: "Ср" },
                      { value: "thursday", label: "Чт" },
                      { value: "friday", label: "Пт" },
                      { value: "saturday", label: "Сб" },
                      { value: "sunday", label: "Вс" },
                    ].map((day) => (
                      <div key={day.value} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`day-${day.value}`}
                          checked={formData.workDays.includes(day.value)}
                          onCheckedChange={() => handleWorkDayChange(day.value)}
                        />
                        <Label 
                          htmlFor={`day-${day.value}`}
                          className="text-sm font-normal"
                        >
                          {day.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="workHoursStart" className="text-xs">С</Label>
                      <Input 
                        id="workHoursStart"
                        type="time"
                        value={formData.workHoursStart}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="workHoursEnd" className="text-xs">До</Label>
                      <Input 
                        id="workHoursEnd"
                        type="time"
                        value={formData.workHoursEnd}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Услуги</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-auto p-0 text-beauty-500"
                    onClick={() => setShowServicesDialog(true)}
                  >
                    Выбрать услуги
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {formData.services.length === 0 && (
                    <p className="text-sm text-beauty-600">Нет выбранных услуг</p>
                  )}
                  {formData.services.map((service) => (
                    <span 
                      key={service}
                      className="text-xs px-2 py-1 bg-beauty-50 text-beauty-700 rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Фото</Label>
                <Input 
                  id="image" 
                  placeholder="URL изображения" 
                  value={formData.image}
                  onChange={handleChange}
                />
                <p className="text-xs text-beauty-600">Вставьте URL фотографии или загрузите позже</p>
              </div>
              
              <Button className="w-full mt-6" onClick={handleSaveStaff}>
                {isEditing ? "Обновить" : "Сохранить"}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Специалист</TableHead>
            <TableHead>Специализация</TableHead>
            <TableHead>Услуги</TableHead>
            <TableHead>Рейтинг</TableHead>
            <TableHead>График работы</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {specialists.map((staff) => (
            <TableRow key={staff.id}>
              <TableCell className="flex items-center gap-3">
                <img 
                  src={staff.image} 
                  alt={staff.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span>{staff.name}</span>
              </TableCell>
              <TableCell>{staff.specialization}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {staff.services.map((service, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-2 py-1 bg-beauty-50 text-beauty-700 rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{staff.rating}</span>
                </div>
              </TableCell>
              <TableCell>{staff.availability}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Sheet onOpenChange={(open) => {
                    if (open) {
                      resetForm(staff);
                    }
                  }}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="min-w-[400px]">
                      <SheetHeader>
                        <SheetTitle>Редактировать специалиста</SheetTitle>
                      </SheetHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">ФИО</Label>
                          <Input 
                            id="name" 
                            placeholder="Введите ФИО специалиста" 
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="specialization">Специализация</Label>
                          <Input 
                            id="specialization" 
                            placeholder="Например: Косметолог" 
                            value={formData.specialization}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>График работы</Label>
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {[
                                { value: "monday", label: "Пн" },
                                { value: "tuesday", label: "Вт" },
                                { value: "wednesday", label: "Ср" },
                                { value: "thursday", label: "Чт" },
                                { value: "friday", label: "Пт" },
                                { value: "saturday", label: "Сб" },
                                { value: "sunday", label: "Вс" },
                              ].map((day) => (
                                <div key={day.value} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`edit-day-${day.value}`}
                                    checked={formData.workDays.includes(day.value)}
                                    onCheckedChange={() => handleWorkDayChange(day.value)}
                                  />
                                  <Label 
                                    htmlFor={`edit-day-${day.value}`}
                                    className="text-sm font-normal"
                                  >
                                    {day.label}
                                  </Label>
                                </div>
                              ))}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <Label htmlFor="workHoursStart" className="text-xs">С</Label>
                                <Input 
                                  id="workHoursStart"
                                  type="time"
                                  value={formData.workHoursStart}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label htmlFor="workHoursEnd" className="text-xs">До</Label>
                                <Input 
                                  id="workHoursEnd"
                                  type="time"
                                  value={formData.workHoursEnd}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Услуги</Label>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-auto p-0 text-beauty-500"
                              onClick={() => setShowServicesDialog(true)}
                            >
                              Выбрать услуги
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {formData.services.length === 0 && (
                              <p className="text-sm text-beauty-600">Нет выбранных услуг</p>
                            )}
                            {formData.services.map((service) => (
                              <span 
                                key={service}
                                className="text-xs px-2 py-1 bg-beauty-50 text-beauty-700 rounded-full"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="image">Фото</Label>
                          <Input 
                            id="image" 
                            placeholder="URL изображения" 
                            value={formData.image}
                            onChange={handleChange}
                          />
                          <p className="text-xs text-beauty-600">Вставьте URL фотографии или загрузите позже</p>
                        </div>
                        
                        <Button className="w-full mt-6" onClick={handleSaveStaff}>
                          Обновить
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteStaff(staff.id)}
                  >
                    <UserX className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={showServicesDialog} onOpenChange={setShowServicesDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Выберите услуги</DialogTitle>
            <DialogDescription>
              Отметьте услуги, которые может выполнять специалист
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 max-h-[400px] overflow-y-auto">
            {allServices.map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox 
                  id={`service-${service}`}
                  checked={formData.services.includes(service)}
                  onCheckedChange={() => handleServiceChange(service)}
                />
                <Label 
                  htmlFor={`service-${service}`}
                  className="text-sm font-normal"
                >
                  {service}
                </Label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowServicesDialog(false)}>Готово</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтверждение удаления</DialogTitle>
            <DialogDescription>
              Вы действительно хотите удалить этого сотрудника? Это действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Отмена
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteStaff}
            >
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffManagement;
