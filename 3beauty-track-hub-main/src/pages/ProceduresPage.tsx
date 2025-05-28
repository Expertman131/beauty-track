
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Treatment, TreatmentHistoryItem } from '@/components/staff/types/staffTypes';
import { 
  Calendar, 
  Search, 
  Filter, 
  Plus, 
  ChevronRight, 
  CircleAlert,
  Calendar as CalendarIcon,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  FileText,
  CheckCheck,
  ArrowRight
} from "lucide-react";
import { Input } from '@/components/ui/input';
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
import { format, addMonths, parseISO, differenceInDays, isAfter, isBefore, subMonths } from 'date-fns';
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import ProcedureHistory from '@/components/procedures/ProcedureHistory';
import ProcedureRecommendations from '@/components/procedures/ProcedureRecommendations';

// Mock data
const proceduresMock: Treatment[] = [
  {
    id: "treatment-1",
    name: "Hyaluronic Acid Filler",
    clientId: "client-1",
    date: "12 Mar 2025",
    nextDate: "12 Sep 2025",
    staffId: 1,
    staffName: "Anna Sokolova",
    productsUsed: ["Juvederm Volift 1ml"],
    notes: "Nasolabial folds treated, good immediate result with minimal bruising",
    progress: 30,
    status: "active",
    color: "beauty",
    history: [
      {
        date: "12 Mar 2025",
        procedure: "Hyaluronic Acid Filler",
        notes: "Nasolabial folds treated, good immediate result with minimal bruising",
        productsUsed: ["Juvederm Volift 1ml"],
        staffId: 1,
        staffName: "Anna Sokolova",
      }
    ]
  },
  {
    id: "treatment-2",
    name: "Botulinum Toxin",
    clientId: "client-1",
    date: "23 Jan 2025",
    nextDate: "23 Apr 2025",
    staffId: 2,
    staffName: "Olga Petrova",
    productsUsed: ["Botox 24 units"],
    notes: "Forehead (10), glabella (8), crow's feet (6)",
    progress: 70,
    status: "schedule-soon",
    color: "teal",
    history: [
      {
        date: "23 Jan 2025",
        procedure: "Botulinum Toxin",
        notes: "Follow-up showed excellent results after 14 days. Client very satisfied with reduced appearance of fine lines.",
        productsUsed: ["Botox 24 units"],
        staffId: 2,
        staffName: "Olga Petrova",
      }
    ]
  },
  {
    id: "treatment-3",
    name: "Chemical Peel",
    clientId: "client-2",
    date: "05 Apr 2025",
    nextDate: "05 Jun 2025",
    staffId: 3,
    staffName: "Irina Ivanova",
    productsUsed: ["Glycolic acid 30%", "Neutralizer solution"],
    notes: "Second of planned series of 4 treatments. Skin tolerance good, minimal erythema post-procedure",
    progress: 20,
    status: "active",
    color: "lavender",
    history: [
      {
        date: "05 Apr 2025",
        procedure: "Chemical Peel",
        notes: "Client reported slight tingling but no discomfort. Skin appeared slightly red immediately after procedure.",
        productsUsed: ["Glycolic acid 30%", "Neutralizer solution"],
        staffId: 3,
        staffName: "Irina Ivanova",
      }
    ]
  },
  {
    id: "treatment-4",
    name: "Microneedling",
    clientId: "client-3",
    date: "18 Mar 2025",
    nextDate: "18 May 2025",
    staffId: 1,
    staffName: "Anna Sokolova",
    productsUsed: ["Hyaluronic Acid Serum", "Vitamin C Serum"],
    notes: "Third treatment in series. Increasing needle depth to 1.5mm as tolerance has improved",
    progress: 45,
    status: "active",
    color: "beauty",
    history: [
      {
        date: "18 Mar 2025",
        procedure: "Microneedling",
        notes: "Third treatment in series. Increasing needle depth to 1.5mm as tolerance has improved",
        productsUsed: ["Hyaluronic Acid Serum", "Vitamin C Serum"],
        staffId: 1,
        staffName: "Anna Sokolova",
      }
    ]
  }
];

// Mock client data
const clientsMock = [
  { id: "client-1", name: "Elena Petrova", phone: "+7 (903) 123-45-67" },
  { id: "client-2", name: "Maria Sokolova", phone: "+7 (925) 987-65-43" },
  { id: "client-3", name: "Svetlana Ivanova", phone: "+7 (916) 555-44-33" },
];

const staffMembersMock = [
  { id: 1, name: "Anna Sokolova" },
  { id: 2, name: "Olga Petrova" },
  { id: 3, name: "Irina Ivanova" },
];

const procedureTypesMock = [
  "Hyaluronic Acid Filler",
  "Botulinum Toxin",
  "Chemical Peel",
  "Microneedling",
  "Laser Hair Removal",
  "Mesotherapy",
  "Bio Revitalization",
  "RF Lifting"
];

// Form schema for adding new procedure
const procedureSchema = z.object({
  name: z.string().min(3, { message: "Treatment name must be at least 3 characters long" }),
  clientId: z.string().min(1, { message: "Client selection is required" }),
  staffId: z.string().min(1, { message: "Staff selection is required" }),
  productsUsed: z.string().min(1, { message: "At least one product must be specified" }),
  notes: z.string().optional(),
  date: z.string().min(1, { message: "Date is required" }),
  nextDate: z.string().optional(),
  followupMonths: z.string().optional(),
});

// Schema for treatment updates
const updateSchema = z.object({
  notes: z.string().min(1, { message: "Notes are required for updates" }),
  productsUsed: z.string().optional(),
  result: z.string().optional(),
  progress: z.coerce.number().min(0).max(100),
  followupDate: z.string().optional(),
});

const ProceduresPage = () => {
  const [procedures, setProcedures] = useState<Treatment[]>(proceduresMock);
  const [filter, setFilter] = useState("");
  const [clientFilter, setClientFilter] = useState("all");
  const [isAddingProcedure, setIsAddingProcedure] = useState(false);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [selectedProcedure, setSelectedProcedure] = useState<Treatment | null>(null);
  const [isUpdatingProcedure, setIsUpdatingProcedure] = useState(false);
  const [isViewingHistory, setIsViewingHistory] = useState(false);
  const [selectedTab, setSelectedTab] = useState("active");
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({ from: subMonths(new Date(), 6), to: new Date() });
  const { toast } = useToast();

  // Form for adding new procedure
  const addForm = useForm<z.infer<typeof procedureSchema>>({
    resolver: zodResolver(procedureSchema),
    defaultValues: {
      name: "",
      clientId: "",
      staffId: "",
      productsUsed: "",
      notes: "",
      date: format(new Date(), "yyyy-MM-dd"),
      followupMonths: "3",
    },
  });

  // Form for updating procedure
  const updateForm = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      notes: "",
      productsUsed: "",
      result: "",
      progress: 0,
      followupDate: "",
    },
  });

  const filteredProcedures = procedures.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(filter.toLowerCase()) || 
      clientsMock.find(c => c.id === p.clientId)?.name.toLowerCase().includes(filter.toLowerCase()) ||
      p.staffName.toLowerCase().includes(filter.toLowerCase());
    
    const matchesClientFilter = clientFilter === "all" || p.clientId === clientFilter;
    
    return matchesSearch && matchesClientFilter;
  });

  const getClientName = (clientId: string) => {
    return clientsMock.find(c => c.id === clientId)?.name || "Unknown Client";
  };

  const getTreatmentColorClasses = (color: string) => {
    switch (color) {
      case 'beauty':
        return 'bg-beauty-100 text-beauty-700';
      case 'teal':
        return 'bg-teal-100 text-teal-700';
      case 'lavender':
        return 'bg-lavender-100 text-lavender-700';
      default:
        return 'bg-beauty-100 text-beauty-700';
    }
  };

  const getProgressBarClasses = (color: string) => {
    switch (color) {
      case 'beauty':
        return 'bg-beauty-100 [&>div]:bg-beauty-500';
      case 'teal':
        return 'bg-teal-100 [&>div]:bg-teal-500';
      case 'lavender':
        return 'bg-lavender-100 [&>div]:bg-lavender-500';
      default:
        return 'bg-beauty-100 [&>div]:bg-beauty-500';
    }
  };

  const handleAddProcedure = (data: z.infer<typeof procedureSchema>) => {
    const staffMember = staffMembersMock.find(staff => staff.id === parseInt(data.staffId));
    
    // Calculate next date based on followupMonths or use provided nextDate
    const nextDate = data.nextDate || format(addMonths(new Date(data.date), parseInt(data.followupMonths || "3")), "yyyy-MM-dd");
    
    const colors = ['beauty', 'teal', 'lavender'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)] as "beauty" | "teal" | "lavender";
    
    const newTreatment: Treatment = {
      id: `treatment-${Date.now()}`,
      name: data.name,
      clientId: data.clientId,
      date: format(new Date(data.date), "dd MMM yyyy"),
      nextDate: format(new Date(nextDate), "dd MMM yyyy"),
      staffId: parseInt(data.staffId),
      staffName: staffMember?.name || "Unknown Staff",
      notes: data.notes,
      productsUsed: data.productsUsed.split(",").map(p => p.trim()),
      progress: 10, // Default starting progress
      status: "active",
      color: randomColor,
      history: [{
        date: format(new Date(data.date), "dd MMM yyyy"),
        procedure: data.name,
        notes: data.notes || "",
        productsUsed: data.productsUsed.split(",").map(p => p.trim()),
        staffId: parseInt(data.staffId),
        staffName: staffMember?.name || "Unknown Staff",
      }]
    };
    
    setProcedures([...procedures, newTreatment]);
    setIsAddingProcedure(false);
    addForm.reset();
    
    toast({
      title: "Процедура добавлена",
      description: `${newTreatment.name} для клиента ${getClientName(newTreatment.clientId)}`,
    });
  };

  const handleUpdateProcedure = (data: z.infer<typeof updateSchema>) => {
    if (!selectedProcedure) return;

    const updatedProcedures = procedures.map(proc => {
      if (proc.id !== selectedProcedure.id) return proc;
      
      const updatedHistory: TreatmentHistoryItem[] = [
        {
          date: format(new Date(), "dd MMM yyyy"),
          procedure: proc.name,
          notes: data.notes,
          productsUsed: data.productsUsed ? data.productsUsed.split(",").map(p => p.trim()) : [],
          staffId: proc.staffId,
          staffName: proc.staffName,
        },
        ...(proc.history || [])
      ];

      // Determine the status based on progress - ensure it's one of the allowed values
      let newStatus: "completed" | "active" | "schedule-soon" = "active";
      if (data.progress > 70) {
        newStatus = "schedule-soon";
      } else if (data.progress >= 100) {
        newStatus = "completed";
      }

      return {
        ...proc,
        notes: data.notes,
        progress: data.progress,
        result: data.result || proc.result,
        productsUsed: data.productsUsed ? data.productsUsed.split(",").map(p => p.trim()) : proc.productsUsed,
        nextDate: data.followupDate ? format(new Date(data.followupDate), "dd MMM yyyy") : proc.nextDate,
        status: newStatus,
        history: updatedHistory,
      };
    });

    setProcedures(updatedProcedures);
    setIsUpdatingProcedure(false);
    updateForm.reset();
    setSelectedProcedure(null);
    
    toast({
      title: "Процедура обновлена",
      description: "Информация о процедуре успешно обновлена",
    });
  };

  const handleSelectProcedure = (procedure: Treatment) => {
    setSelectedProcedure(procedure);
    
    // Pre-fill update form with current values
    updateForm.setValue("notes", procedure.notes || "");
    updateForm.setValue("productsUsed", procedure.productsUsed ? procedure.productsUsed.join(", ") : "");
    updateForm.setValue("result", procedure.result || "");
    updateForm.setValue("progress", procedure.progress || 0);
  };

  const getDaysUntilNextProcedure = (nextDate: string) => {
    try {
      // Try to parse the date as "dd MMM yyyy"
      const nextDateObj = parseISO(nextDate);
      const today = new Date();
      return differenceInDays(nextDateObj, today);
    } catch (e) {
      return null;
    }
  };

  const getStatusText = (procedure: Treatment) => {
    if (procedure.status === 'schedule-soon') {
      return "Запланировать скоро";
    } else if (procedure.progress >= 90) {
      return "Завершен";
    } else {
      return "Активен";
    }
  };

  const renderTreatmentTimeline = (history: TreatmentHistoryItem[] | undefined) => {
    if (!history || history.length === 0) return null;
    
    return (
      <div className="space-y-4 mt-4">
        <h4 className="text-sm font-medium text-beauty-900">История процедуры</h4>
        <div className="space-y-6">
          {history.map((item, index) => (
            <div key={index} className="border-l-2 border-beauty-300 pl-4 relative">
              <div className="w-3 h-3 rounded-full bg-beauty-500 absolute -left-[7px] top-[6px]"></div>
              <p className="text-sm font-medium text-beauty-800">{item.date}</p>
              <p className="text-sm text-beauty-700 mt-1">{item.procedure}</p>
              {item.productsUsed && item.productsUsed.length > 0 && (
                <p className="text-xs text-beauty-600 mt-1">
                  <span className="font-medium">Использованные продукты:</span> {item.productsUsed.join(', ')}
                </p>
              )}
              {item.notes && (
                <p className="text-xs text-beauty-600 mt-1 italic">"{item.notes}"</p>
              )}
              <p className="text-xs text-beauty-600 mt-1">
                <span className="font-medium">Специалист:</span> {item.staffName}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProcedureCard = (procedure: Treatment) => {
    const daysUntil = procedure.nextDate ? getDaysUntilNextProcedure(procedure.nextDate) : null;
    const isUpcoming = daysUntil !== null && daysUntil <= 14 && daysUntil > 0;
    const isPast = daysUntil !== null && daysUntil < 0;
    
    return (
      <Card key={procedure.id} className={`border-beauty-100 ${isUpcoming ? 'ring-2 ring-beauty-300' : ''}`}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium text-beauty-900">{getClientName(procedure.clientId)}</h3>
              <h4 className="text-lg font-semibold text-beauty-800">{procedure.name}</h4>
            </div>
            <Badge className={getTreatmentColorClasses(procedure.color || 'beauty')}>
              {getStatusText(procedure)}
            </Badge>
          </div>
          
          <div className="flex justify-between text-sm text-beauty-600 mb-2">
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              <span>Последняя: {procedure.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              <span className={isUpcoming ? 'text-beauty-700 font-medium' : (isPast ? 'text-red-600' : '')}>
                {isPast ? 'Просрочено' : 'След.: '}{procedure.nextDate}
              </span>
            </div>
          </div>
          
          <div className="flex items-center mb-1 mt-3">
            <span className="text-xs text-beauty-600 w-16">
              {procedure.progress}% готово
            </span>
            <Progress 
              value={procedure.progress} 
              className={`h-2 flex-1 ${getProgressBarClasses(procedure.color || 'beauty')}`}
            />
          </div>
          
          {procedure.productsUsed && procedure.productsUsed.length > 0 && (
            <div className="mt-3">
              <h5 className="text-xs font-medium text-beauty-700 mb-1">Использованные продукты:</h5>
              <div className="flex flex-wrap gap-1">
                {procedure.productsUsed.map((product, i) => (
                  <Badge key={i} variant="outline" className="text-xs bg-gray-50">
                    {product}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {procedure.notes && (
            <div className="mt-3 bg-gray-50 p-2 rounded text-sm italic text-beauty-600 border-l-2 border-beauty-300">
              "{procedure.notes}"
            </div>
          )}
          
          <div className="flex justify-between mt-3 space-x-2">
            <div className="text-xs text-beauty-600 flex items-center">
              <User className="h-3 w-3 mr-1" />
              {procedure.staffName}
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="text-beauty-600 border-beauty-200"
                onClick={() => {
                  handleSelectProcedure(procedure);
                  setIsUpdatingProcedure(true);
                }}
              >
                <FileText className="h-3.5 w-3.5 mr-1" />
                Обновить
              </Button>
              <Button 
                size="sm" 
                className="bg-beauty-500 hover:bg-beauty-600"
                onClick={() => {
                  handleSelectProcedure(procedure);
                  setIsViewingHistory(true);
                }}
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-24 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 beauty-gradient-text">Процедуры клиентов</h1>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
            <div className="w-full md:w-auto flex flex-wrap gap-2 md:gap-4">
              <div className="relative flex-grow md:flex-grow-0 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beauty-400 h-4 w-4" />
                <Input 
                  type="text" 
                  placeholder="Поиск процедур..."
                  className="pl-9"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
              
              <Select value={clientFilter} onValueChange={setClientFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Фильтр по клиенту" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все клиенты</SelectItem>
                  {clientsMock.map(client => (
                    <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "cards" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("cards")}
                  className={viewMode === "cards" ? "bg-beauty-500 hover:bg-beauty-600" : ""}
                >
                  Карточки
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className={viewMode === "table" ? "bg-beauty-500 hover:bg-beauty-600" : ""}
                >
                  Таблица
                </Button>
              </div>
            </div>
            
            <Dialog open={isAddingProcedure} onOpenChange={setIsAddingProcedure}>
              <DialogTrigger asChild>
                <Button className="bg-beauty-500 hover:bg-beauty-600">
                  <Plus className="h-4 w-4 mr-2" /> Добавить процедуру
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Добавить новую процедуру</DialogTitle>
                  <DialogDescription>
                    Запись новой процедуры или лечения для клиента
                  </DialogDescription>
                </DialogHeader>
                <Form {...addForm}>
                  <form onSubmit={addForm.handleSubmit(handleAddProcedure)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={addForm.control}
                        name="clientId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Клиент</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || "default-client"}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Выберите клиента" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {clientsMock.map(client => (
                                  <SelectItem key={client.id} value={client.id}>
                                    {client.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={addForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Тип процедуры</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || "default-procedure"}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Выберите процедуру" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {procedureTypesMock.map(type => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={addForm.control}
                        name="staffId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Специалист</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || "default-staff"}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Выберите специалиста" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {staffMembersMock.map(staff => (
                                  <SelectItem key={staff.id.toString()} value={staff.id.toString()}>
                                    {staff.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={addForm.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Дата</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beauty-500 h-4 w-4" />
                                <Input type="date" className="pl-9" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={addForm.control}
                        name="productsUsed"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Использованные продукты</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Введите продукты через запятую" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={addForm.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Заметки</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="Добавьте заметки о процедуре..." />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={addForm.control}
                        name="followupMonths"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Интервал следующей процедуры</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || "3"}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Выберите интервал" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">1 месяц</SelectItem>
                                <SelectItem value="2">2 месяца</SelectItem>
                                <SelectItem value="3">3 месяца</SelectItem>
                                <SelectItem value="6">6 месяцев</SelectItem>
                                <SelectItem value="12">12 месяцев</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={addForm.control}
                        name="nextDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Точная дата следующей процедуры</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beauty-500 h-4 w-4" />
                                <Input type="date" className="pl-9" {...field} />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Опционально. Если не указано, будет рассчитано исходя из интервала
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" type="button" onClick={() => setIsAddingProcedure(false)}>
                        Отмена
                      </Button>
                      <Button type="submit" className="bg-beauty-500 hover:bg-beauty-600">
                        Сохранить
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          
          <Tabs defaultValue="active" value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="active">Активные процедуры</TabsTrigger>
              <TabsTrigger value="history">История</TabsTrigger>
              <TabsTrigger value="recommendations">Рекомендации</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              {filteredProcedures.length > 0 ? (
                viewMode === "cards" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProcedures.map(renderProcedureCard)}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Клиент</TableHead>
                            <TableHead>Процедура</TableHead>
                            <TableHead>Последняя дата</TableHead>
                            <TableHead>Следующая дата</TableHead>
                            <TableHead>Специалист</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead>Прогресс</TableHead>
                            <TableHead className="text-right">Действия</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredProcedures.map((procedure) => {
                            const daysUntil = getDaysUntilNextProcedure(procedure.nextDate);
                            const isUpcoming = daysUntil !== null && daysUntil <= 14 && daysUntil > 0;
                            const isPast = daysUntil !== null && daysUntil < 0;
                            
                            return (
                              <TableRow key={procedure.id} className={isUpcoming ? 'bg-beauty-50' : ''}>
                                <TableCell className="font-medium">
                                  <div className="flex items-center">
                                    <User className="h-4 w-4 mr-2 text-beauty-500" />
                                    {getClientName(procedure.clientId)}
                                  </div>
                                </TableCell>
                                <TableCell>{procedure.name}</TableCell>
                                <TableCell>{procedure.date}</TableCell>
                                <TableCell className={isPast ? 'text-red-600' : (isUpcoming ? 'text-beauty-700 font-medium' : '')}>
                                  {isPast ? (
                                    <div className="flex items-center">
                                      <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
                                      {procedure.nextDate}
                                    </div>
                                  ) : isUpcoming ? (
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-1 text-beauty-500" />
                                      {procedure.nextDate}
                                    </div>
                                  ) : procedure.nextDate}
                                </TableCell>
                                <TableCell>{procedure.staffName}</TableCell>
                                <TableCell>
                                  <Badge className={getTreatmentColorClasses(procedure.color || 'beauty')}>
                                    {getStatusText(procedure)}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Progress 
                                    value={procedure.progress} 
                                    className={`h-2 w-24 ${getProgressBarClasses(procedure.color || 'beauty')}`}
                                  />
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-1">
                                    <Button 
                                      size="sm" 
                                      variant="ghost"
                                      className="h-8 w-8 p-0"
                                      onClick={() => {
                                        handleSelectProcedure(procedure);
                                        setIsUpdatingProcedure(true);
                                      }}
                                    >
                                      <FileText className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      size="sm"
                                      variant="ghost"
                                      className="h-8 w-8 p-0"
                                      onClick={() => {
                                        handleSelectProcedure(procedure);
                                        setIsViewingHistory(true);
                                      }}
                                    >
                                      <ChevronRight className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
                  <CircleAlert className="h-12 w-12 mx-auto text-beauty-300 mb-3" />
                  <h3 className="text-lg font-medium text-beauty-900 mb-1">Процедуры не найдены</h3>
                  <p className="text-beauty-600 mb-4">
                    Нет процедур, соответствующих текущим фильтрам
                  </p>
                  <Button 
                    onClick={() => { setFilter(""); setClientFilter("all"); }}
                    variant="outline"
                  >
                    Сбросить фильтры
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="history">
              <ProcedureHistory 
                procedures={procedures} 
                clientsMock={clientsMock}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                onViewProcedure={(procedure) => {
                  handleSelectProcedure(procedure);
                  setIsViewingHistory(true);
                }}
              />
            </TabsContent>
            
            <TabsContent value="recommendations">
              <ProcedureRecommendations
                procedures={procedures}
                setProcedures={setProcedures} 
                clientsMock={clientsMock}
                staffMembersMock={staffMembersMock}
              />
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-10">
            <Button 
              className="bg-beauty-500 hover:bg-beauty-600 text-white px-6 py-2"
              onClick={() => setIsAddingProcedure(true)}
            >
              Записать новую процедуру
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Procedure Update Dialog */}
      <Dialog open={isUpdatingProcedure} onOpenChange={setIsUpdatingProcedure}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Обновить результаты процедуры</DialogTitle>
            <DialogDescription>
              Добавьте информацию о результатах и планируйте последующие процедуры
            </DialogDescription>
          </DialogHeader>
          {selectedProcedure && (
            <Form {...updateForm}>
              <form onSubmit={updateForm.handleSubmit(handleUpdateProcedure)} className="space-y-4">
                <div className="space-y-4">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{selectedProcedure.name}</h3>
                      <p className="text-sm text-beauty-600">Клиент: {getClientName(selectedProcedure.clientId)}</p>
                    </div>
                    <Badge className={getTreatmentColorClasses(selectedProcedure.color || 'beauty')}>
                      {getStatusText(selectedProcedure)}
                    </Badge>
                  </div>

                  <FormField
                    control={updateForm.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Заметки о результате</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Опишите результаты процедуры, реакцию клиента..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={updateForm.control}
                    name="productsUsed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Использованные продукты</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Продукты, используемые во время процедуры..." />
                        </FormControl>
                        <FormDescription>Введите через запятую</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={updateForm.control}
                    name="result"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Общий результат</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Общая оценка результата процедуры..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={updateForm.control}
                    name="progress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Прогресс курса процедур ({field.value}%)</FormLabel>
                        <FormControl>
                          <Input
                            type="range"
                            min={0}
                            max={100}
                            step={5}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          Установите 100%, если курс завершен полностью
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={updateForm.control}
                    name="followupDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Дата следующей процедуры</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beauty-500 h-4 w-4" />
                            <Input type="date" className="pl-9" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Оставьте пустым, если дата следующей процедуры не изменилась
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => {
                    setIsUpdatingProcedure(false);
                    setSelectedProcedure(null);
                  }}>
                    Отмена
                  </Button>
                  <Button type="submit" className="bg-beauty-500 hover:bg-beauty-600">
                    Обновить
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>

      {/* Procedure History/Details Dialog */}
      <Dialog open={isViewingHistory} onOpenChange={setIsViewingHistory}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedProcedure && (
            <>
              <DialogHeader>
                <DialogTitle>История процедуры</DialogTitle>
                <DialogDescription>
                  Подробная история процедуры {selectedProcedure.name} для клиента {getClientName(selectedProcedure.clientId)}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto">
                {/* Client and procedure info */}
                <Card className="border-beauty-100">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-beauty-900">{selectedProcedure.name}</h3>
                      <Badge className={getTreatmentColorClasses(selectedProcedure.color || 'beauty')}>
                        {getStatusText(selectedProcedure)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-beauty-700">Клиент</h4>
                        <p className="flex items-center">
                          <User className="h-4 w-4 mr-1.5 text-beauty-500" />
                          {getClientName(selectedProcedure.clientId)}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-beauty-700">Специалист</h4>
                        <p>{selectedProcedure.staffName}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-beauty-700">Первая процедура</h4>
                        <p className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1.5 text-beauty-500" />
                          {selectedProcedure.history && selectedProcedure.history.length > 0 
                            ? selectedProcedure.history[selectedProcedure.history.length - 1].date
                            : selectedProcedure.date}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-beauty-700">Последняя процедура</h4>
                        <p className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1.5 text-beauty-500" />
                          {selectedProcedure.date}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-beauty-700">Следующая процедура</h4>
                        <p className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1.5 text-beauty-500" />
                          {selectedProcedure.nextDate}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-beauty-700">Прогресс</h4>
                        <div className="flex items-center">
                          <Progress 
                            value={selectedProcedure.progress} 
                            className={`h-2 w-24 mr-2 ${getProgressBarClasses(selectedProcedure.color || 'beauty')}`}
                          />
                          <span className="text-sm">{selectedProcedure.progress}%</span>
                        </div>
                      </div>
                    </div>
                    
                    {selectedProcedure.result && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-beauty-700">Результат</h4>
                        <p className="text-beauty-600 bg-beauty-50 p-2 rounded mt-1">
                          {selectedProcedure.result}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Timeline history */}
                <div className="bg-white p-4 shadow-sm rounded-md border border-beauty-100">
                  <h3 className="text-lg font-medium text-beauty-900 mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-beauty-500" />
                    Детальная история
                  </h3>
                  
                  {selectedProcedure.history && selectedProcedure.history.length > 0 ? (
                    <div className="space-y-6">
                      {selectedProcedure.history.map((item, index) => (
                        <div key={index} className="border-l-2 border-beauty-300 pl-4 relative pb-4">
                          <div className="w-3 h-3 rounded-full bg-beauty-500 absolute -left-[7px] top-[6px]"></div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-beauty-800">{item.date}</p>
                            <p className="text-xs text-beauty-600">Специалист: {item.staffName}</p>
                          </div>
                          <p className="text-sm text-beauty-700 mt-1 font-medium">{item.procedure}</p>
                          
                          {item.productsUsed && item.productsUsed.length > 0 && (
                            <div className="mt-1">
                              <p className="text-xs text-beauty-600 font-medium">Использованные продукты:</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {item.productsUsed.map((product, i) => (
                                  <Badge key={i} variant="outline" className="text-xs bg-gray-50">
                                    {product}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {item.notes && (
                            <div className="mt-2 bg-beauty-50 p-2 rounded text-sm italic text-beauty-600">
                              "{item.notes}"
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-beauty-600 text-center py-4">
                      История процедур отсутствует
                    </p>
                  )}
                </div>
              </div>
              
              <DialogFooter className="space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsViewingHistory(false);
                    handleSelectProcedure(selectedProcedure);
                    setIsUpdatingProcedure(true);
                  }}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Обновить прогресс
                </Button>
                <Button 
                  className="bg-beauty-500 hover:bg-beauty-600"
                  onClick={() => setIsViewingHistory(false)}
                >
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Закрыть
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProceduresPage;
