import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { StaffMember } from '@/components/staff/types/staffTypes';

// Import our new components
import ServiceCategoryList, { ServiceCategory } from '@/components/booking/ServiceCategoryList';
import ServiceList, { Service } from '@/components/booking/ServiceList';
import StaffSelector from '@/components/booking/StaffSelector';
import TimeSlotSelector from '@/components/booking/TimeSlotSelector';
import ClientForm, { ClientFormData } from '@/components/booking/ClientForm';
import BookingSummary from '@/components/booking/BookingSummary';

// Mock data
const serviceCategories: ServiceCategory[] = [
  {
    id: "haircut",
    name: "Стрижки",
    icon: "scissors",
    description: "Более 10 видов стрижек"
  },
  {
    id: "coloring",
    name: "Окрашивание",
    icon: "paintbrush",
    description: "Различные техники окрашивания"
  },
  {
    id: "manicure",
    name: "Маникюр",
    icon: "star",
    description: "Классический и аппаратный"
  },
  {
    id: "eyebrows",
    name: "Брови",
    icon: "user-check",
    description: "Коррекция и окрашивание"
  }
];

const services: Service[] = [
  {
    id: "1",
    categoryId: "eyebrows",
    name: "Художественное оформление бровей краской | ВЕДУЩИЙ МАСТЕР",
    description: "Включает подбор формы и окрашивание",
    duration: 60,
    price: 1500,
    includes: ["Подбор формы", "Коррекция пинцетом", "Окрашивание"]
  },
  {
    id: "2",
    categoryId: "eyebrows",
    name: "Художественное оформление бровей хной | ВЕДУЩИЙ МАСТЕР",
    description: "Коррекция и окрашивание хной",
    duration: 60,
    price: 1500,
    includes: ["Подбор формы", "Коррекция пинцетом", "Окрашивание хной"]
  },
  {
    id: "3",
    categoryId: "eyebrows",
    name: "Художественное оформление краской + счастье для бровей",
    description: "С восстановлением и укреплением",
    duration: 75,
    price: 1800,
    includes: ["Подбор формы", "Коррекция", "Окрашивание", "Уход «счастье для бровей»"]
  },
  {
    id: "4",
    categoryId: "manicure",
    name: "Классический маникюр",
    description: "Обработка кутикулы и ногтевой пластины",
    duration: 60,
    price: 1200
  },
  {
    id: "5",
    categoryId: "manicure",
    name: "Аппаратный маникюр",
    description: "Бережная обработка аппаратом",
    duration: 60,
    price: 1400
  },
  {
    id: "6",
    categoryId: "haircut",
    name: "Женская стрижка",
    description: "Включает мытье головы и укладку",
    duration: 60,
    price: 2000
  },
  {
    id: "7",
    categoryId: "coloring",
    name: "Окрашивание корней",
    description: "Окрашивание отросших корней",
    duration: 90,
    price: 3000
  },
  {
    id: "8",
    categoryId: "coloring",
    name: "Окрашивание Омбре",
    description: "Градиентное окрашивание",
    duration: 180,
    price: 6000
  }
];

const staffMembers: StaffMember[] = [
  {
    id: 1,
    name: "Анна Петрова",
    specialization: "Косметолог",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    position: "senior",
    workingHours: {
      "2025-05-04": {
        start: "10:00",
        end: "19:00",
        isWorkingDay: true
      },
      "2025-05-05": {
        start: "10:00",
        end: "19:00",
        isWorkingDay: true
      }
    }
  },
  {
    id: 2,
    name: "Мария Иванова",
    specialization: "Мастер маникюра",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    position: "middle",
    workingHours: {
      "2025-05-04": {
        start: "10:00",
        end: "19:00",
        isWorkingDay: true
      },
      "2025-05-05": {
        start: "11:00",
        end: "20:00",
        isWorkingDay: true
      }
    }
  },
  {
    id: 3,
    name: "Елена Сидорова",
    specialization: "Мастер бровист",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    position: "junior",
    workingHours: {
      "2025-05-04": {
        start: "10:00",
        end: "19:00",
        isWorkingDay: false
      },
      "2025-05-05": {
        start: "09:00",
        end: "18:00",
        isWorkingDay: true
      }
    }
  }
];

const BookAppointmentPage = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = useState<number>(0);
  
  // Service selection state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  
  // Staff and time selection state
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);
  
  // Client form state
  const [clientForm, setClientForm] = useState<ClientFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    comments: '',
    reminderTime: '2hours',
    agreeToTerms: false
  });

  // Reset dependent fields when selections change
  useEffect(() => {
    if (activeStep === 1) {
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectedStaffId(null);
    }
  }, [selectedServices, activeStep]);

  // Handle service selection/deselection
  const handleSelectService = (serviceId: string, selected: boolean) => {
    if (selected) {
      setSelectedServices([...selectedServices, serviceId]);
    } else {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    }
  };

  // Handle client form changes
  const handleClientFormChange = (field: keyof ClientFormData, value: string | boolean) => {
    setClientForm({
      ...clientForm,
      [field]: value
    });
  };

  // Calculate total price and duration
  const selectedServiceObjects = services.filter(service => selectedServices.includes(service.id));
  const totalPrice = selectedServiceObjects.reduce((sum, service) => sum + service.price, 0);
  const totalDuration = selectedServiceObjects.reduce((sum, service) => sum + service.duration, 0);
  const selectedStaff = staffMembers.find(staff => staff.id === selectedStaffId) || null;

  // Handle booking submission
  const handleBooking = () => {
    if (
      selectedServices.length === 0 ||
      !selectedDate ||
      !selectedTime ||
      !selectedStaffId ||
      !clientForm.firstName ||
      !clientForm.lastName ||
      !clientForm.phone ||
      !clientForm.agreeToTerms
    ) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send the booking data to a backend
    console.log({
      services: selectedServiceObjects,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
      staffId: selectedStaffId,
      client: clientForm
    });
    
    toast({
      title: "Запись успешно создана!",
      description: `Вы записаны на ${format(selectedDate, 'd MMMM', { locale: ru })} в ${selectedTime}`
    });
    
    // Reset the form
    setSelectedCategory(null);
    setSelectedServices([]);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedStaffId(null);
    setClientForm({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      comments: '',
      reminderTime: '2hours',
      agreeToTerms: false
    });
    setActiveStep(0);
  };

  // Define the steps for the booking process
  const steps = [
    { id: 0, title: "Услуги", description: "Выберите услуги" },
    { id: 1, title: "Дата и время", description: "Выберите дату, время и мастера" },
    { id: 2, title: "Контактные данные", description: "Заполните контактную информацию" }
  ];

  // Go to the next step if all required fields are filled
  const handleNextStep = () => {
    if (activeStep === 0 && selectedServices.length === 0) {
      toast({
        title: "Выберите услуги",
        description: "Пожалуйста, выберите хотя бы одну услугу",
        variant: "destructive"
      });
      return;
    }
    
    if (activeStep === 1 && (!selectedDate || !selectedTime || !selectedStaffId)) {
      toast({
        title: "Выберите дату, время и мастера",
        description: "Пожалуйста, заполните все поля для продолжения",
        variant: "destructive"
      });
      return;
    }
    
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      handleBooking();
    }
  };

  // Go back to the previous step
  const handlePreviousStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-24 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 beauty-gradient-text">Онлайн запись</h1>
          
          {/* Progress steps */}
          <div className="mb-8 hidden sm:block">
            <div className="flex items-center justify-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  {index > 0 && (
                    <div className={`w-24 h-1 ${
                      index <= activeStep ? 'bg-beauty-500' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index === activeStep 
                        ? 'bg-beauty-500 text-white' 
                        : index < activeStep 
                          ? 'bg-beauty-500 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}>
                      {index < activeStep ? '✓' : index + 1}
                    </div>
                    <div className="mt-2 text-center">
                      <p className={`text-sm font-medium ${
                        index === activeStep ? 'text-beauty-800 dark:text-beauty-200' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="border-beauty-100 shadow-lg">
                <CardHeader className="bg-beauty-50 dark:bg-beauty-900/10 border-b border-beauty-100 dark:border-beauty-900/20">
                  <CardTitle className="text-beauty-800 dark:text-beauty-200">
                    {steps[activeStep].title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-5 md:p-6">
                  {/* Step 1: Service Selection */}
                  {activeStep === 0 && (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-1">
                          <h3 className="text-sm font-medium mb-3 text-beauty-800 dark:text-beauty-200">
                            Категории
                          </h3>
                          <ServiceCategoryList
                            categories={serviceCategories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                          />
                        </div>
                        
                        <div className="md:col-span-3">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-medium text-beauty-800 dark:text-beauty-200">
                              Услуги
                            </h3>
                            {selectedServices.length > 0 && (
                              <span className="text-sm">
                                Выбрано: {selectedServices.length}
                              </span>
                            )}
                          </div>
                          <ServiceList
                            services={services}
                            selectedServices={selectedServices}
                            onSelectService={handleSelectService}
                            categoryId={selectedCategory}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Date, Time and Staff Selection */}
                  {activeStep === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium mb-3 text-beauty-800 dark:text-beauty-200">
                          Выберите дату
                        </h3>
                        <div className="bg-white dark:bg-gray-800 border border-beauty-200 dark:border-gray-700 rounded-md p-2">
                          <CalendarComponent
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => {
                              // Disable dates in the past and more than 2 months in the future
                              const now = new Date();
                              now.setHours(0, 0, 0, 0);
                              const twoMonthsLater = new Date();
                              twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);
                              return date < now || date > twoMonthsLater;
                            }}
                            locale={ru}
                            className="rounded-md pointer-events-auto"
                          />
                        </div>
                      </div>
                      
                      <div>
                        {selectedDate && (
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-sm font-medium mb-3 text-beauty-800 dark:text-beauty-200">
                                Выберите мастера
                              </h3>
                              <StaffSelector
                                staffMembers={staffMembers}
                                selectedStaffId={selectedStaffId}
                                onSelectStaff={setSelectedStaffId}
                                date={selectedDate}
                              />
                            </div>
                            
                            {selectedStaffId && (
                              <div>
                                <h3 className="text-sm font-medium mb-3 text-beauty-800 dark:text-beauty-200">
                                  Выберите время
                                </h3>
                                <TimeSlotSelector
                                  date={selectedDate}
                                  selectedTime={selectedTime}
                                  onSelectTime={setSelectedTime}
                                  selectedStaff={selectedStaff}
                                  serviceDuration={totalDuration}
                                />
                              </div>
                            )}
                          </div>
                        )}
                        
                        {!selectedDate && (
                          <div className="h-full flex items-center justify-center">
                            <div className="text-center text-gray-500 dark:text-gray-400 p-8">
                              <CalendarDays className="mx-auto h-12 w-12 opacity-30 mb-2" />
                              <p>Пожалуйста, выберите дату для записи</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: Client Information */}
                  {activeStep === 2 && (
                    <ClientForm formData={clientForm} onChange={handleClientFormChange} />
                  )}
                  
                  {/* Navigation buttons */}
                  <div className="flex justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={handlePreviousStep}
                      disabled={activeStep === 0}
                      className="border-beauty-200 dark:border-gray-700"
                    >
                      Назад
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      className="bg-beauty-500 hover:bg-beauty-600 text-white"
                    >
                      {activeStep === steps.length - 1 ? 'Записаться' : 'Продолжить'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <BookingSummary
                selectedServices={selectedServiceObjects}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                selectedStaff={selectedStaff}
              />
              
              {/* Support information */}
              <Card className="border-beauty-100 shadow-lg mt-6">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-beauty-800 dark:text-beauty-200 mb-4">
                    Информация
                  </h3>
                  <ul className="space-y-2 text-sm text-beauty-700 dark:text-beauty-300">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-beauty-500">✓</div>
                      <span>Вы можете отменить запись за 12 часов до начала</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-beauty-500">✓</div>
                      <span>Вы получите напоминание по SMS и email</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-beauty-500">✓</div>
                      <span>При опоздании более чем на 15 минут, запись может быть отменена</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookAppointmentPage;
