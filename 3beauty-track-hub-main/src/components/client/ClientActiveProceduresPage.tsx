
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  CheckCircle, 
  FileSymlink, 
  FilePlus2,
  BookOpen,
  Clock,
  ClipboardList
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { 
  Treatment, 
  ClientDiaryEntry, 
  SpecialistNote, 
  TreatmentFeedback 
} from '../staff/types/staffTypes';
import { ClientActiveProcedure } from './ClientActiveProcedure';

interface ClientActiveProceduresPageProps {
  clientId: string;
  clientName: string;
}

export function ClientActiveProceduresPage({ 
  clientId,
  clientName
}: ClientActiveProceduresPageProps) {
  // State for procedures and diary entries
  const [activeTreatments, setActiveTreatments] = useState<(Treatment & { 
    clientDiaries?: ClientDiaryEntry[]; 
    specialistNotes?: SpecialistNote[];
    clientName?: string;
  })[]>([
    {
      id: "t1",
      name: "Курс биоревитализации",
      date: "15 мая 2025",
      nextDate: "15 июня 2025",
      status: "active",
      staffName: "Анна Петрова",
      staffId: 1,
      clientId: clientId,
      clientName: clientName,
      progress: 45,
      color: "beauty",
      notes: "Рекомендуется избегать прямых солнечных лучей и использовать SPF 50+ после процедуры. Обеспечьте достаточное увлажнение кожи.",
      productsUsed: ["Гиалуроновая кислота 1.8%", "Коктейль с витаминами"],
      history: [
        {
          date: "15 мая 2025",
          procedure: "Биоревитализация (сеанс 1)",
          staffName: "Анна Петрова",
          staffId: 1,
          productsUsed: ["Гиалуроновая кислота 1.8%"],
          notes: "Пациент перенес процедуру хорошо. Наблюдается небольшое покраснение."
        },
        {
          date: "15 июня 2025",
          procedure: "Биоревитализация (сеанс 2)",
          staffName: "Анна Петрова",
          staffId: 1,
          productsUsed: ["Гиалуроновая кислота 1.8%", "Коктейль с витаминами"],
          notes: "Запланировано"
        }
      ],
      clientDiaries: [
        {
          id: "note1",
          date: "15 мая 2025",
          content: "После процедуры чувствую небольшое покалывание. Появились маленькие папулы в местах инъекций, как и предупреждал врач. Буду следить за их исчезновением.",
          mood: "good",
          clientId: clientId,
          treatmentId: "t1"
        },
        {
          id: "note2",
          date: "16 мая 2025",
          content: "Папулы почти исчезли, кожа начинает выглядеть более увлажненной. Следую всем рекомендациям по уходу.",
          mood: "good",
          images: ["https://randomuser.me/api/portraits/women/42.jpg"],
          clientId: clientId,
          treatmentId: "t1"
        }
      ],
      specialistNotes: [
        {
          id: "spec1",
          date: "15 мая 2025",
          content: "Пациент перенес процедуру хорошо. Рекомендован домашний уход с использованием увлажняющих средств.",
          authorId: 1,
          authorName: "Анна Петрова",
          treatmentId: "t1"
        }
      ]
    },
    {
      id: "t2",
      name: "Химический пилинг",
      date: "22 мая 2025",
      nextDate: "22 июня 2025",
      status: "schedule-soon",
      staffName: "Мария Соколова",
      staffId: 2,
      clientId: clientId,
      clientName: clientName,
      progress: 20,
      color: "teal",
      notes: "Избегайте использования скрабов и других отшелушивающих средств минимум 5 дней после процедуры.",
      productsUsed: ["Гликолевая кислота 30%", "Нейтрализующий раствор"],
      history: [
        {
          date: "22 апреля 2025",
          procedure: "Химический пилинг (сеанс 1)",
          staffName: "Мария Соколова",
          staffId: 2,
          productsUsed: ["Гликолевая кислота 20%"],
          notes: "Первый легкий пилинг. Реакция кожи нормальная."
        },
        {
          date: "22 мая 2025",
          procedure: "Химический пилинг (сеанс 2)",
          staffName: "Мария Соколова",
          staffId: 2,
          productsUsed: ["Гликолевая кислота 30%"],
          notes: "Запланировано увеличение концентрации кислоты."
        }
      ],
      clientDiaries: [
        {
          id: "note3",
          date: "22 апреля 2025",
          content: "Во время процедуры было легкое покалывание. После процедуры кожа немного покраснела, но к вечеру покраснение ушло.",
          mood: "neutral",
          clientId: clientId,
          treatmentId: "t2"
        }
      ]
    },
    {
      id: "t3",
      name: "Лазерная эпиляция",
      date: "10 мая 2025",
      nextDate: "10 июля 2025",
      status: "active",
      staffName: "Елена Иванова",
      staffId: 3,
      clientId: clientId,
      clientName: clientName,
      progress: 60,
      color: "lavender",
      notes: "Избегайте посещения бассейна, сауны и интенсивных физических нагрузок в течение 2 дней после процедуры.",
      productsUsed: ["Александритовый лазер Candela"],
      history: [
        {
          date: "10 марта 2025",
          procedure: "Лазерная эпиляция (сеанс 1)",
          staffName: "Елена Иванова",
          staffId: 3,
          productsUsed: ["Александритовый лазер Candela"],
          notes: "Первый сеанс прошел успешно."
        },
        {
          date: "10 мая 2025",
          procedure: "Лазерная эпиляция (сеанс 2)",
          staffName: "Елена Иванова",
          staffId: 3,
          productsUsed: ["Александритовый лазер Candela"],
          notes: "Наблюдается уменьшение количества волос на 40%."
        },
        {
          date: "10 июля 2025",
          procedure: "Лазерная эпиляция (сеанс 3)",
          staffName: "Елена Иванова",
          staffId: 3,
          productsUsed: ["Александритовый лазер Candela"],
          notes: "Запланировано"
        }
      ]
    }
  ]);
  
  const [selectedTab, setSelectedTab] = useState("active");
  
  // Handler for adding a diary entry
  const handleAddDiaryEntry = (treatmentId: string, entry: Omit<ClientDiaryEntry, 'id'>) => {
    const newEntry: ClientDiaryEntry = {
      ...entry,
      id: `entry-${Date.now()}`
    };
    
    setActiveTreatments(prevTreatments => 
      prevTreatments.map(treatment => 
        treatment.id === treatmentId ? {
          ...treatment,
          clientDiaries: [
            ...(treatment.clientDiaries || []),
            newEntry
          ]
        } : treatment
      )
    );
  };
  
  // Handler for adding feedback
  const handleAddFeedback = (feedback: Omit<TreatmentFeedback, 'id'>) => {
    // In a real app, this would send the feedback to an API
    toast({
      title: "Отзыв сохранен",
      description: "Спасибо за ваш отзыв о процедуре"
    });
  };

  // Filter treatments based on selected tab
  const filteredTreatments = activeTreatments.filter(treatment => {
    if (selectedTab === "active") {
      return treatment.status === "active";
    } else if (selectedTab === "scheduled") {
      return treatment.status === "schedule-soon";
    } else if (selectedTab === "completed") {
      return treatment.status === "completed";
    }
    return true; // "all" tab
  });

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-beauty-900">Мои процедуры</h1>
          <p className="text-beauty-600">Управление вашими активными и запланированными процедурами</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Календарь
          </Button>
          <Button className="flex items-center">
            <FileSymlink className="h-4 w-4 mr-2" />
            Записаться
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <CardTitle>Обзор ваших процедур</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">Активные: {activeTreatments.filter(t => t.status === "active").length}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm">Запланированные: {activeTreatments.filter(t => t.status === "schedule-soon").length}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm">Завершенные: {activeTreatments.filter(t => t.status === "completed").length}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="flex flex-wrap gap-4">
            <Card className="flex-1 min-w-[200px] bg-beauty-50 border-beauty-200">
              <CardContent className="p-4 flex items-center">
                <div className="bg-beauty-100 p-3 rounded-full mr-3">
                  <Clock className="h-6 w-6 text-beauty-600" />
                </div>
                <div>
                  <p className="text-sm text-beauty-600">Ближайшая процедура</p>
                  <p className="font-medium">22 мая 2025</p>
                  <p className="text-sm">Химический пилинг</p>
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1 min-w-[200px] bg-teal-50 border-teal-200">
              <CardContent className="p-4 flex items-center">
                <div className="bg-teal-100 p-3 rounded-full mr-3">
                  <CheckCircle className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-teal-600">Завершено сеансов</p>
                  <p className="font-medium">4 из 8</p>
                  <p className="text-sm">50% курса</p>
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1 min-w-[200px] bg-lavender-50 border-lavender-200">
              <CardContent className="p-4 flex items-center">
                <div className="bg-lavender-100 p-3 rounded-full mr-3">
                  <BookOpen className="h-6 w-6 text-lavender-600" />
                </div>
                <div>
                  <p className="text-sm text-lavender-600">Ваших записей</p>
                  <p className="font-medium">5 заметок</p>
                  <p className="text-sm">2 фотографии</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="active" value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="active">Активные</TabsTrigger>
            <TabsTrigger value="scheduled">Запланированные</TabsTrigger>
            <TabsTrigger value="completed">Завершенные</TabsTrigger>
            <TabsTrigger value="all">Все</TabsTrigger>
          </TabsList>
          <Button variant="ghost" size="sm" className="text-sm flex items-center">
            <FilePlus2 className="h-4 w-4 mr-2" /> Новая заметка
          </Button>
        </div>
        
        <TabsContent value="active" className="m-0">
          <div className="space-y-6">
            {filteredTreatments.length > 0 ? (
              filteredTreatments.map((treatment) => (
                <ClientActiveProcedure 
                  key={treatment.id} 
                  treatment={treatment} 
                  onAddDiaryEntry={handleAddDiaryEntry}
                  onAddFeedback={handleAddFeedback}
                />
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <ClipboardList className="h-12 w-12 text-beauty-300 mb-4" />
                  <CardTitle className="mb-2">Нет активных процедур</CardTitle>
                  <CardDescription className="text-center mb-4">
                    У вас пока нет активных процедур в этой категории.
                  </CardDescription>
                  <Button>Записаться на процедуру</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled" className="m-0">
          <div className="space-y-6">
            {filteredTreatments.length > 0 ? (
              filteredTreatments.map((treatment) => (
                <ClientActiveProcedure 
                  key={treatment.id} 
                  treatment={treatment}
                  onAddDiaryEntry={handleAddDiaryEntry}
                  onAddFeedback={handleAddFeedback}
                />
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Calendar className="h-12 w-12 text-beauty-300 mb-4" />
                  <CardTitle className="mb-2">Нет запланированных процедур</CardTitle>
                  <CardDescription className="text-center mb-4">
                    У вас пока нет запланированных процедур.
                  </CardDescription>
                  <Button>Записаться на процедуру</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="m-0">
          <div className="space-y-6">
            {filteredTreatments.length > 0 ? (
              filteredTreatments.map((treatment) => (
                <ClientActiveProcedure 
                  key={treatment.id} 
                  treatment={treatment}
                  onAddDiaryEntry={handleAddDiaryEntry}
                  onAddFeedback={handleAddFeedback}
                />
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle className="h-12 w-12 text-beauty-300 mb-4" />
                  <CardTitle className="mb-2">Нет завершенных процедур</CardTitle>
                  <CardDescription className="text-center mb-4">
                    У вас пока нет завершенных процедур.
                  </CardDescription>
                  <Button>Записаться на процедуру</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="all" className="m-0">
          <div className="space-y-6">
            {filteredTreatments.length > 0 ? (
              filteredTreatments.map((treatment) => (
                <ClientActiveProcedure 
                  key={treatment.id} 
                  treatment={treatment}
                  onAddDiaryEntry={handleAddDiaryEntry}
                  onAddFeedback={handleAddFeedback}
                />
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <ClipboardList className="h-12 w-12 text-beauty-300 mb-4" />
                  <CardTitle className="mb-2">Нет процедур</CardTitle>
                  <CardDescription className="text-center mb-4">
                    У вас пока нет процедур в истории.
                  </CardDescription>
                  <Button>Записаться на процедуру</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ClientActiveProceduresPage;
