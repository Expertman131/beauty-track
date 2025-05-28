
import React, { useState, useMemo } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, Phone, User, Plus, ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, addDays, startOfWeek, isSameDay, addMonths, subMonths, parse, isWithinInterval, eachDayOfInterval } from "date-fns";
import { ru } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { StaffTimeline } from "./StaffTimeline";
import { StaffAppointmentCard } from "./StaffAppointmentCard";
import { StaffWorkingHours } from "./StaffWorkingHours";
import { toast } from "@/components/ui/use-toast";

interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  service: string;
  services?: string[];
  time: string;
  endTime?: string;
  date: string;
  duration?: number; // в минутах
  staffId: number;
  profit?: number;
  status?: "confirmed" | "pending" | "cancelled" | "completed";
  notes?: string;
  isNew?: boolean;
}

interface StaffMember {
  id: number;
  name: string;
  specialization: string;
  image: string;
  workingHours?: {
    [date: string]: {
      start: string;
      end: string;
      isWorkingDay: boolean;
    }
  };
}

interface StaffScheduleProps {
  staffId?: number;
  appointments?: Appointment[];
}

// Интервал времени - 30 минут для более гибкого расписания
const TIME_INTERVALS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", 
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", 
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
];

// Список мастеров для демонстрации
const STAFF_MEMBERS: StaffMember[] = [
  {
    id: 1,
    name: "Анна Петрова",
    specialization: "Косметолог",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    workingHours: {
      // Пример индивидуального графика на текущую дату
      [new Date().toISOString().split('T')[0]]: {
        start: "10:00",
        end: "18:00", 
        isWorkingDay: true
      }
    }
  },
  {
    id: 2,
    name: "Мария Иванова",
    specialization: "Мастер маникюра",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    workingHours: {
      // Пример сокращенного рабочего дня
      [new Date().toISOString().split('T')[0]]: {
        start: "12:00",
        end: "16:00", 
        isWorkingDay: true
      }
    }
  },
  {
    id: 3,
    name: "Елена Сидорова",
    specialization: "Массажист",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    workingHours: {
      // Стандартный график
      [new Date().toISOString().split('T')[0]]: {
        start: "09:00",
        end: "20:00", 
        isWorkingDay: true
      }
    }
  }
];

// Демо-данные для расписания
const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    staffId: 1,
    clientName: "Оксана Смирнова",
    clientPhone: "+7 (900) 123-45-67",
    service: "Окрашивание волос",
    services: ["Окрашивание волос", "Укладка"],
    time: "10:00",
    endTime: "11:30",
    date: new Date().toISOString(),
    duration: 90,
    profit: 3500,
    status: "confirmed"
  },
  {
    id: "2",
    staffId: 2,
    clientName: "Мария Иванова",
    clientPhone: "+7 (900) 234-56-78",
    service: "Маникюр",
    services: ["Маникюр", "Покрытие гель-лаком"],
    time: "12:30",
    endTime: "14:00",
    date: new Date().toISOString(),
    duration: 90,
    profit: 2500,
    status: "confirmed"
  },
  {
    id: "3",
    staffId: 3,
    clientName: "Иванна Петренко",
    clientPhone: "+7 (900) 345-67-89",
    service: "Массаж лица",
    services: ["Массаж лица", "Уходовая процедура"],
    time: "11:00",
    endTime: "12:00",
    date: new Date().toISOString(),
    duration: 60,
    profit: 2000,
    status: "completed"
  },
  {
    id: "4",
    staffId: 3,
    clientName: "Елена Соколова",
    clientPhone: "+7 (900) 456-78-90",
    service: "Ламинирование",
    services: ["Ламинирование"],
    time: "14:30",
    endTime: "15:30",
    date: new Date().toISOString(),
    duration: 60,
    profit: 3000,
    status: "pending",
    isNew: true
  },
  {
    id: "5",
    staffId: 1,
    clientName: "Татьяна Морозова",
    clientPhone: "+7 (900) 567-89-01",
    service: "Чистка лица",
    services: ["Чистка лица"],
    time: "15:00",
    endTime: "16:30",
    date: addDays(new Date(), 1).toISOString(),
    duration: 90,
    profit: 4000,
    status: "confirmed"
  }
];

enum ViewMode {
  DAY = "day",
  WEEK = "week"
}

const StaffSchedule = ({ staffId, appointments: propAppointments }: StaffScheduleProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.DAY);
  const [selectedStaff, setSelectedStaff] = useState<number | "all">(staffId || "all");
  const [showAppointmentDetails, setShowAppointmentDetails] = useState<string | null>(null);
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [newAppointmentTime, setNewAppointmentTime] = useState<string | null>(null);
  const [showWorkingHoursDialog, setShowWorkingHoursDialog] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState<number | null>(null);
  
  const isDesktop = useIsMobile();
  
  // Используем переданные appointment или демо-данные
  const allAppointments = propAppointments || DEMO_APPOINTMENTS;
  
  // Получить список дней для текущей недели
  const weekDays = useMemo(() => {
    const firstDay = viewMode === ViewMode.WEEK 
      ? startOfWeek(selectedDate, { weekStartsOn: 1 }) // Неделя начинается с понедельника
      : selectedDate;
    
    const days = viewMode === ViewMode.WEEK
      ? eachDayOfInterval({ 
          start: firstDay, 
          end: addDays(firstDay, 6) // 7 дней в неделе
        })
      : [selectedDate];
      
    return days;
  }, [selectedDate, viewMode]);
  
  // Фильтруем записи по дате и мастеру
  const filteredAppointments = useMemo(() => {
    return allAppointments.filter(app => {
      const appDate = new Date(app.date);
      const isDateMatch = weekDays.some(day => isSameDay(day, appDate));
      const isStaffMatch = selectedStaff === "all" || app.staffId === selectedStaff;
      
      return isDateMatch && isStaffMatch;
    });
  }, [allAppointments, weekDays, selectedStaff]);
  
  // Получить список операторов по дате
  const staffForDay = useMemo(() => {
    // Если выбран конкретный мастер, то просто его и возвращаем
    if (selectedStaff !== "all") {
      const staff = STAFF_MEMBERS.find(s => s.id === selectedStaff);
      return staff ? [staff] : [];
    }
    
    // Иначе фильтруем мастеров, у которых есть записи на указанные дни
    const staffIds = new Set<number>();
    
    // Всегда показываем всех мастеров для демонстрации таймлайна
    STAFF_MEMBERS.forEach(staff => staffIds.add(staff.id));
    
    return STAFF_MEMBERS.filter(staff => staffIds.has(staff.id));
  }, [selectedStaff, weekDays]);
  
  const handlePrevDay = () => {
    if (viewMode === ViewMode.DAY) {
      setSelectedDate(prev => addDays(prev, -1));
    } else {
      // Для недельного вида перемещаемся на неделю назад
      setSelectedDate(prev => addDays(prev, -7));
    }
  };
  
  const handleNextDay = () => {
    if (viewMode === ViewMode.DAY) {
      setSelectedDate(prev => addDays(prev, 1));
    } else {
      // Для недельного вида перемещаемся на неделю вперед
      setSelectedDate(prev => addDays(prev, 7));
    }
  };
  
  const handlePrevMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };
  
  const handleNewAppointment = (time: string, staffId: number) => {
    setNewAppointmentTime(time);
    setSelectedStaff(staffId);
    setShowNewAppointment(true);
  };
  
  const handleSaveNewAppointment = () => {
    toast({
      title: "Запись создана",
      description: `Новая запись успешно создана на ${format(selectedDate, 'dd.MM.yyyy')} в ${newAppointmentTime}`,
    });
    setShowNewAppointment(false);
  };
  
  const openWorkingHoursDialog = (staffId: number) => {
    setEditingStaffId(staffId);
    setShowWorkingHoursDialog(true);
  };
  
  const saveWorkingHours = (staffId: number, workingHours: any) => {
    // В реальном приложении здесь был бы API-запрос на сохранение
    toast({
      title: "Расписание обновлено",
      description: "Индивидуальный график работы мастера успешно сохранен"
    });
    setShowWorkingHoursDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Верхняя панель с выбором режима просмотра и навигацией по датам */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handlePrevDay}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex flex-col items-center">
            <span className="text-sm text-beauty-500 font-medium">
              {viewMode === ViewMode.WEEK 
                ? `${format(weekDays[0], 'dd.MM', { locale: ru })} - ${format(weekDays[weekDays.length - 1], 'dd.MM', { locale: ru })}, ${format(selectedDate, 'yyyy', { locale: ru })}`
                : format(selectedDate, 'MMMM yyyy', { locale: ru })
              }
            </span>
            <span className="text-xl font-bold">
              {viewMode === ViewMode.WEEK 
                ? `Неделя ${format(selectedDate, 'w', { locale: ru })}`
                : format(selectedDate, 'd MMMM, EEEE', { locale: ru })
              }
            </span>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleNextDay}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Tabs value={viewMode} onValueChange={(val) => setViewMode(val as ViewMode)}>
            <TabsList>
              <TabsTrigger value={ViewMode.DAY}>День</TabsTrigger>
              <TabsTrigger value={ViewMode.WEEK}>Неделя</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Выбрать дату
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Выберите дату</DialogTitle>
              </DialogHeader>
              <div className="flex justify-between items-center mb-2">
                <Button variant="ghost" size="sm" onClick={handlePrevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-medium">
                  {format(currentMonth, 'LLLL yyyy', { locale: ru })}
                </span>
                <Button variant="ghost" size="sm" onClick={handleNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                locale={ru}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className="rounded-md border shadow"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Фильтр по мастерам */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Select
          value={selectedStaff.toString()}
          onValueChange={(value) => setSelectedStaff(value === "all" ? "all" : parseInt(value))}
        >
          <SelectTrigger className="w-full sm:w-[250px]">
            <SelectValue placeholder="Выберите мастера" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все мастера</SelectItem>
            {STAFF_MEMBERS.map((staff) => (
              <SelectItem key={staff.id} value={staff.id.toString()}>
                {staff.name} - {staff.specialization}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => {
              if (selectedStaff !== "all") {
                openWorkingHoursDialog(selectedStaff as number);
              } else {
                toast({
                  title: "Выберите мастера",
                  description: "Для настройки индивидуального расписания нужно выбрать конкретного мастера",
                });
              }
            }}
          >
            <Settings className="mr-2 h-4 w-4" />
            Настроить график
          </Button>
          <Button className="bg-beauty-500 hover:bg-beauty-600">
            <Plus className="mr-2 h-4 w-4" />
            Добавить запись
          </Button>
        </div>
      </div>
      
      {/* Таймлайн с расписанием */}
      <div className="border rounded-lg overflow-x-auto">
        <div className="min-w-[768px]">
          {viewMode === ViewMode.WEEK ? (
            // Недельный вид
            <div className="grid" style={{ 
              gridTemplateColumns: `minmax(200px, 1fr) repeat(${weekDays.length}, minmax(170px, 1fr))` 
            }}>
              {/* Заголовок с днями недели */}
              <div className="border-b p-3 bg-beauty-50 font-medium">Мастер</div>
              {weekDays.map((day, index) => (
                <div 
                  key={index} 
                  className={`border-b border-l p-3 text-center bg-beauty-50 font-medium ${
                    isSameDay(day, new Date()) ? 'bg-beauty-100' : ''
                  }`}
                >
                  <div>{format(day, 'EEEEEE', { locale: ru })}</div>
                  <div>{format(day, 'dd.MM', { locale: ru })}</div>
                </div>
              ))}
              
              {/* Для каждого мастера выводим строку с ячейками по дням недели */}
              {staffForDay.map((staff) => (
                <React.Fragment key={staff.id}>
                  {/* Ячейка с информацией о мастере */}
                  <div className="border-b p-3 flex items-center space-x-3">
                    <img 
                      src={staff.image} 
                      alt={staff.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="overflow-hidden">
                      <p className="font-medium truncate">{staff.name}</p>
                      <p className="text-xs text-beauty-600 truncate">{staff.specialization}</p>
                    </div>
                  </div>
                  
                  {/* Ячейки для каждого дня недели */}
                  {weekDays.map((day, dayIndex) => {
                    const dayAppointments = filteredAppointments.filter(
                      app => app.staffId === staff.id && isSameDay(new Date(app.date), day)
                    );
                    
                    // Проверяем, установлен ли для этого дня индивидуальный график
                    const dateString = format(day, 'yyyy-MM-dd');
                    const workingHours = staff.workingHours?.[dateString];
                    const isWorkingDay = workingHours?.isWorkingDay !== false;
                    
                    return (
                      <div 
                        key={dayIndex}
                        className={`border-b border-l p-2 ${
                          isWorkingDay ? 'bg-white' : 'bg-gray-100'
                        } h-32 overflow-y-auto relative`}
                      >
                        {isWorkingDay ? (
                          <>
                            {workingHours && (
                              <div className="text-xs text-beauty-600 mb-1">
                                {workingHours.start} - {workingHours.end}
                              </div>
                            )}
                            
                            {dayAppointments.length > 0 ? (
                              dayAppointments.sort((a, b) => {
                                // Сортировка по времени
                                const timeA = parse(a.time, 'HH:mm', new Date());
                                const timeB = parse(b.time, 'HH:mm', new Date());
                                return timeA.getTime() - timeB.getTime();
                              }).map(app => (
                                <div
                                  key={app.id}
                                  className={`mb-1 p-1 rounded text-xs ${
                                    app.status === 'confirmed' ? 'bg-beauty-100 border-l-2 border-beauty-500' :
                                    app.status === 'pending' ? 'bg-amber-100 border-l-2 border-amber-500' :
                                    app.status === 'completed' ? 'bg-green-100 border-l-2 border-green-500' :
                                    'bg-gray-100 border-l-2 border-gray-500'
                                  } ${app.isNew ? 'ring-1 ring-beauty-300' : ''}`}
                                  onClick={() => setShowAppointmentDetails(app.id)}
                                >
                                  <div className="font-medium">{app.time} - {app.clientName}</div>
                                  <div className="truncate">{app.service}</div>
                                </div>
                              ))
                            ) : (
                              <div 
                                className="h-full w-full flex items-center justify-center text-beauty-400 cursor-pointer"
                                onClick={() => handleNewAppointment("10:00", staff.id)}
                              >
                                <Plus className="h-5 w-5" />
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-400">
                            Выходной
                          </div>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          ) : (
            // Дневной вид с детальным расписанием по времени
            <div>
              {/* Заголовок с интервалами времени */}
              <div className="grid" style={{ gridTemplateColumns: `minmax(200px, 1fr) repeat(${TIME_INTERVALS.length}, minmax(80px, 1fr))` }}>
                <div className="border-b p-3 bg-beauty-50 font-medium">Мастер</div>
                {TIME_INTERVALS.map((slot) => (
                  <div key={slot} className="border-b border-l p-3 text-center bg-beauty-50 font-medium">
                    {slot}
                  </div>
                ))}
              </div>
              
              {/* Мастера и их расписания */}
              {staffForDay.map((staff) => (
                <StaffTimeline 
                  key={staff.id} 
                  staff={staff} 
                  appointments={filteredAppointments.filter(app => app.staffId === staff.id)} 
                  selectedDate={selectedDate}
                  timeSlots={TIME_INTERVALS}
                  onCellClick={(time) => handleNewAppointment(time, staff.id)}
                  workingHours={staff.workingHours}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Список записей на текущий день */}
      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle>
            {viewMode === ViewMode.DAY ? (
              `Записи на ${format(selectedDate, 'dd MMMM yyyy', { locale: ru })}`
            ) : (
              `Записи на неделю ${format(weekDays[0], 'dd.MM', { locale: ru })} - ${format(weekDays[weekDays.length - 1], 'dd.MM', { locale: ru })}`
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.filter(app => 
              viewMode === ViewMode.DAY 
                ? isSameDay(new Date(app.date), selectedDate) 
                : true
            ).length === 0 ? (
              <p className="text-muted-foreground">Нет записей на этот {viewMode === ViewMode.DAY ? 'день' : 'период'}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAppointments
                  .filter(app => 
                    viewMode === ViewMode.DAY 
                      ? isSameDay(new Date(app.date), selectedDate) 
                      : true
                  )
                  .sort((a, b) => {
                    // Сначала сортировка по дате
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    if (dateA.getTime() !== dateB.getTime()) {
                      return dateA.getTime() - dateB.getTime();
                    }
                    
                    // Затем по времени
                    const timeA = parse(a.time, 'HH:mm', new Date());
                    const timeB = parse(b.time, 'HH:mm', new Date());
                    return timeA.getTime() - timeB.getTime();
                  })
                  .map((appointment) => (
                    <StaffAppointmentCard 
                      key={appointment.id} 
                      appointment={appointment}
                      staff={STAFF_MEMBERS.find(s => s.id === appointment.staffId)}
                      onViewDetails={() => setShowAppointmentDetails(appointment.id)}
                      showDate={viewMode === ViewMode.WEEK}
                    />
                  ))
                }
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Модальное окно с формой создания новой записи */}
      <Dialog open={showNewAppointment} onOpenChange={setShowNewAppointment}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Новая запись</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-2 text-sm font-medium">Дата и время</p>
                <p className="font-medium text-beauty-600">
                  {format(selectedDate, 'dd.MM.yyyy', { locale: ru })} в {newAppointmentTime}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Мастер</p>
                <p className="font-medium text-beauty-600">
                  {STAFF_MEMBERS.find(s => s.id === selectedStaff)?.name || 'Не выбран'}
                </p>
              </div>
            </div>
            
            {/* Здесь должна быть форма создания записи */}
            <div className="grid gap-4 py-4">
              <p className="text-sm text-muted-foreground">
                Здесь будет детальная форма для создания записи с возможностью выбора
                клиента, услуг, продолжительности и т.д.
              </p>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewAppointment(false)}>
                Отмена
              </Button>
              <Button onClick={handleSaveNewAppointment}>
                Создать запись
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Модальное окно с деталями записи */}
      {showAppointmentDetails && (
        <Dialog open={!!showAppointmentDetails} onOpenChange={() => setShowAppointmentDetails(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Детали записи</DialogTitle>
            </DialogHeader>
            
            {/* Отображаем детали выбранной записи */}
            {(() => {
              const appointment = filteredAppointments.find(a => a.id === showAppointmentDetails);
              const staff = appointment ? STAFF_MEMBERS.find(s => s.id === appointment.staffId) : null;
              
              if (!appointment || !staff) return <p>Запись не найдена</p>;
              
              return (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={staff.image} 
                      alt={staff.name} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-beauty-900 text-lg">{staff.name}</h3>
                      <p className="text-sm text-beauty-600">{staff.specialization}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Дата и время</p>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 text-beauty-500 mr-2" />
                        <span>{format(new Date(appointment.date), 'dd.MM.yyyy', { locale: ru })}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 text-beauty-500 mr-2" />
                        <span>{appointment.time} - {appointment.endTime}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Клиент</p>
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-beauty-500 mr-2" />
                        <span>{appointment.clientName}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Phone className="h-4 w-4 text-beauty-500 mr-2" />
                        <span>{appointment.clientPhone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">Услуги</p>
                    <div className="flex flex-wrap gap-2">
                      {appointment.services?.map((service, i) => (
                        <span 
                          key={i} 
                          className="text-xs px-2 py-1 bg-beauty-50 text-beauty-700 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-sm font-medium">Стоимость</p>
                      <p className="font-medium text-beauty-900">{appointment.profit?.toLocaleString()} ₽</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline">Редактировать</Button>
                      <Button 
                        className="bg-beauty-500 hover:bg-beauty-600"
                        onClick={() => setShowAppointmentDetails(null)}
                      >
                        Закрыть
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </DialogContent>
        </Dialog>
      )}
      
      {/* Модальное окно для настройки индивидуального графика работы */}
      <Dialog open={showWorkingHoursDialog} onOpenChange={setShowWorkingHoursDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              Настройка графика работы
              {editingStaffId && (
                <span className="ml-2 font-normal text-beauty-500">
                  {STAFF_MEMBERS.find(s => s.id === editingStaffId)?.name}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {editingStaffId && (
            <StaffWorkingHours 
              staffId={editingStaffId}
              selectedDate={selectedDate}
              onSave={saveWorkingHours}
              onCancel={() => setShowWorkingHoursDialog(false)}
              workingHours={STAFF_MEMBERS.find(s => s.id === editingStaffId)?.workingHours}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffSchedule;
