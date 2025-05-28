
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Edit,
  Plus,
  MessageSquare,
  FileText,
  Image,
  CircleCheck,
  UserCheck,
  FileImage,
  BarChart
} from "lucide-react";
import { Treatment } from '@/components/staff/types/staffTypes';
import { toast } from "@/hooks/use-toast";

// Define TreatmentStatus to match the updated Treatment interface
type TreatmentStatus = "active" | "completed" | "schedule-soon" | "need-attention";

// Interface for client diary entries
interface ClientDiaryEntry {
  id: string;
  date: string;
  content: string;
  mood: "good" | "neutral" | "bad";
  images?: string[];
  clientId: string;
  treatmentId: string;
}

// Interface for specialist notes
interface SpecialistNote {
  id: string;
  date: string;
  content: string;
  specialistId: string;
  treatmentId: string;
  isPrivate: boolean;
  category?: "observation" | "recommendation" | "warning";
}

// Interface for extended treatment with client diaries and specialist notes
interface ExtendedTreatment extends Treatment {
  clientDiaries?: ClientDiaryEntry[];
  specialistNotes?: SpecialistNote[];
  clientName: string;
}

interface SpecialistActiveTreatmentsProps {
  specialistId: string;
  specialistName: string;
}

export function SpecialistActiveTreatments({ specialistId, specialistName }: SpecialistActiveTreatmentsProps) {
  const [treatments, setTreatments] = useState<ExtendedTreatment[]>([]);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState("");
  const [isPrivateNote, setIsPrivateNote] = useState(false);
  const [noteCategory, setNoteCategory] = useState<"observation" | "recommendation" | "warning">("observation");
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Load mock data
  useEffect(() => {
    // This would be a real API call in production
    const mockTreatments: ExtendedTreatment[] = [
      {
        id: "t1",
        name: "Химический пилинг",
        date: "26 мая 2025",
        nextDate: "26 августа 2025",
        status: "active" as TreatmentStatus,
        staffName: specialistName,
        staffId: 1,
        clientId: "c1",
        clientName: "Екатерина Иванова",
        progress: 30,
        color: "beauty",
        notes: "Легкий пилинг с использованием 15% гликолевой кислоты. Клиент хорошо перенес процедуру.",
        productsUsed: ["Гликолевая кислота 15%", "Нейтрализатор", "Увлажняющий крем SPF50"],
        clientDiaries: [
          {
            id: "cd1",
            date: "26 мая 2025",
            content: "После процедуры ощущаю небольшое покалывание и легкое покраснение. Кожа выглядит свежее.",
            mood: "good",
            images: ["https://randomuser.me/api/portraits/women/33.jpg"],
            clientId: "c1",
            treatmentId: "t1"
          }
        ],
        specialistNotes: [
          {
            id: "sn1",
            date: "26 мая 2025",
            content: "Клиент хорошо перенес процедуру. Небольшое покраснение в норме. Рекомендован ежедневный SPF.",
            specialistId: specialistId,
            treatmentId: "t1",
            isPrivate: false,
            category: "observation"
          },
          {
            id: "sn2",
            date: "26 мая 2025",
            content: "У клиента чувствительная кожа в области носогубных складок. При следующей процедуре уделить внимание.",
            specialistId: specialistId,
            treatmentId: "t1",
            isPrivate: true,
            category: "warning"
          }
        ]
      },
      {
        id: "t2",
        name: "Биоревитализация",
        date: "16 мая 2025",
        nextDate: "16 июля 2025",
        status: "active" as TreatmentStatus,
        staffName: specialistName,
        staffId: 1,
        clientId: "c2",
        clientName: "Анна Сергеева",
        progress: 50,
        color: "teal",
        notes: "Введено 2 мл препарата. Клиент испытывал небольшой дискомфорт в области скул.",
        productsUsed: ["Гиалуроновая кислота 1.8%", "Анестетик поверхностный"],
        clientDiaries: [
          {
            id: "cd2",
            date: "16 мая 2025",
            content: "После биоревитализации есть небольшой отек и синячки в местах уколов. Но я знаю, это нормально.",
            mood: "neutral",
            clientId: "c2",
            treatmentId: "t2"
          },
          {
            id: "cd3",
            date: "18 мая 2025",
            content: "Синяки почти прошли. Кожа стала более увлажненной. Ощущения приятные.",
            mood: "good",
            images: ["https://randomuser.me/api/portraits/women/45.jpg"],
            clientId: "c2",
            treatmentId: "t2"
          }
        ],
        specialistNotes: [
          {
            id: "sn3",
            date: "16 мая 2025",
            content: "Клиент проинформирован о возможных побочных эффектах. Повторный осмотр через 3 дня.",
            specialistId: specialistId,
            treatmentId: "t2",
            isPrivate: false,
            category: "recommendation"
          }
        ]
      },
      {
        id: "t3",
        name: "Лазерная эпиляция",
        date: "10 мая 2025",
        nextDate: "10 июня 2025",
        status: "need-attention" as TreatmentStatus,
        staffName: specialistName,
        staffId: 1,
        clientId: "c3",
        clientName: "Марина Петрова",
        progress: 20,
        color: "lavender",
        notes: "Проведена процедура на зоне голени. Клиент отметил покраснение после процедуры.",
        productsUsed: ["Охлаждающий гель", "Успокаивающий крем"],
        clientDiaries: [],
        specialistNotes: []
      }
    ];
    
    setTreatments(mockTreatments);
    if(mockTreatments.length > 0) {
      setSelectedTreatmentId(mockTreatments[0].id);
    }
  }, [specialistId, specialistName]);

  // Find the currently selected treatment
  const selectedTreatment = selectedTreatmentId 
    ? treatments.find(t => t.id === selectedTreatmentId) 
    : null;

  // Function to add a new specialist note
  const addSpecialistNote = () => {
    if(!selectedTreatmentId || !newNote.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите процедуру и введите текст заметки",
        variant: "destructive"
      });
      return;
    }
    
    const treatmentIndex = treatments.findIndex(t => t.id === selectedTreatmentId);
    if(treatmentIndex === -1) return;
    
    const treatment = treatments[treatmentIndex];
    
    const newSpecialistNote: SpecialistNote = {
      id: `sn-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      content: newNote,
      specialistId: specialistId,
      treatmentId: selectedTreatmentId,
      isPrivate: isPrivateNote,
      category: noteCategory
    };
    
    const updatedTreatments = [...treatments];
    updatedTreatments[treatmentIndex] = {
      ...treatment,
      specialistNotes: [
        ...(treatment.specialistNotes || []),
        newSpecialistNote
      ]
    };
    
    setTreatments(updatedTreatments);
    setNewNote("");
    setIsPrivateNote(false);
    setNoteCategory("observation");
    setIsAddingNote(false);
    
    toast({
      title: "Заметка сохранена",
      description: "Ваша заметка была успешно добавлена"
    });
  };

  // Function to get color class based on status
  const getStatusColorClass = (status: TreatmentStatus) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "schedule-soon":
        return "bg-yellow-100 text-yellow-800";
      case "need-attention":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to get card border color based on color property
  const getCardBorderColor = (color?: string) => {
    switch (color) {
      case "beauty":
        return "border-l-beauty-500";
      case "teal":
        return "border-l-teal-500";
      case "lavender":
        return "border-l-lavender-500";
      default:
        return "border-l-gray-500";
    }
  };

  // Function to render note category icon
  const renderCategoryIcon = (category: "observation" | "recommendation" | "warning") => {
    switch (category) {
      case "observation":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "recommendation":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  // Function to render mood emoji
  const renderMoodEmoji = (mood: "good" | "neutral" | "bad") => {
    switch (mood) {
      case "good":
        return <span className="text-green-500 text-lg mr-2">😊</span>;
      case "neutral":
        return <span className="text-gray-500 text-lg mr-2">😐</span>;
      case "bad":
        return <span className="text-red-500 text-lg mr-2">😔</span>;
      default:
        return null;
    }
  };

  // If there are no treatments, show a message
  if (treatments.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="text-center py-12">
          <div className="mb-4">
            <Calendar className="h-12 w-12 mx-auto text-beauty-300" />
          </div>
          <CardTitle className="mb-2">Нет активных процедур</CardTitle>
          <CardDescription className="mb-6">
            У вас пока нет активных процедур для наблюдения
          </CardDescription>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Создать новую процедуру
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Процедуры клиентов</h3>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Добавить процедуру
        </Button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          {treatments.map((treatment) => (
            <Card 
              key={treatment.id} 
              className={`border-l-4 cursor-pointer hover:shadow-md transition-shadow ${
                selectedTreatmentId === treatment.id ? 'bg-beauty-50 border-beauty-500' : getCardBorderColor(treatment.color)
              }`}
              onClick={() => setSelectedTreatmentId(treatment.id)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{treatment.name}</h4>
                    <p className="text-sm text-beauty-600">{treatment.clientName}</p>
                  </div>
                  <Badge className={getStatusColorClass(treatment.status)}>
                    {treatment.status === "active" && "Активна"}
                    {treatment.status === "completed" && "Завершена"}
                    {treatment.status === "schedule-soon" && "Записаться"}
                    {treatment.status === "need-attention" && "Внимание!"}
                  </Badge>
                </div>
                
                <div className="mt-2 text-sm">
                  <div className="flex items-center mb-1">
                    <Clock className="h-3 w-3 inline mr-1 text-beauty-500" /> 
                    {treatment.date}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="flex items-center">
                      <BarChart className="h-3 w-3 mr-1 text-beauty-500" /> 
                      {treatment.progress}%
                    </span>
                    <span>
                      {treatment.clientDiaries?.length || 0} записей
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="md:col-span-2">
          {selectedTreatment ? (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">{selectedTreatment.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <UserCheck className="h-4 w-4 mr-1" />
                      Клиент: {selectedTreatment.clientName}
                    </CardDescription>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" /> Редактировать
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="details">Детали</TabsTrigger>
                    <TabsTrigger value="client-diary">Дневник клиента</TabsTrigger>
                    <TabsTrigger value="specialist-notes">Мои заметки</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details">
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                        <div className="flex-1">
                          <p className="text-sm text-beauty-600 mb-1">Дата процедуры:</p>
                          <p>{selectedTreatment.date}</p>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-beauty-600 mb-1">Следующая процедура:</p>
                          <p>{selectedTreatment.nextDate || "Не запланирована"}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-beauty-600 mb-1">Прогресс курса:</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-beauty-500 h-2.5 rounded-full" 
                            style={{ width: `${selectedTreatment.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-beauty-600 mt-1">
                          <span>0%</span>
                          <span>100%</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-beauty-600 mb-1">Использованные продукты:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedTreatment.productsUsed?.map((product, index) => (
                            <Badge key={index} variant="secondary">
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-beauty-600 mb-1">Заметки:</p>
                        <p className="p-3 bg-gray-50 rounded-md text-beauty-700">
                          {selectedTreatment.notes || "Нет заметок"}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="client-diary">
                    <div className="space-y-4">
                      {selectedTreatment.clientDiaries && selectedTreatment.clientDiaries.length > 0 ? (
                        selectedTreatment.clientDiaries.map((entry) => (
                          <div 
                            key={entry.id} 
                            className={`p-4 rounded-md ${
                              entry.mood === 'good' ? 'bg-green-50 border-l-2 border-green-500' :
                              entry.mood === 'neutral' ? 'bg-gray-50 border-l-2 border-gray-400' :
                              'bg-red-50 border-l-2 border-red-400'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-beauty-600">{entry.date}</span>
                              <div className="flex items-center">
                                {renderMoodEmoji(entry.mood)}
                                <Badge variant="outline" className={
                                  entry.mood === 'good' ? 'text-green-600 border-green-300' :
                                  entry.mood === 'neutral' ? 'text-gray-600 border-gray-300' :
                                  'text-red-600 border-red-300'
                                }>
                                  {entry.mood === 'good' ? 'Хорошо' :
                                   entry.mood === 'neutral' ? 'Нормально' :
                                   'Плохо'}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="text-beauty-800 mb-2">{entry.content}</div>
                            
                            {entry.images && entry.images.length > 0 && (
                              <div className="flex gap-2 mt-2">
                                {entry.images.map((img, idx) => (
                                  <img 
                                    key={idx} 
                                    src={img} 
                                    alt={`Фото ${idx + 1}`} 
                                    className="w-16 h-16 rounded-md object-cover" 
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-beauty-600">
                          <FileImage className="h-8 w-8 mx-auto text-beauty-300 mb-2" />
                          <p>Клиент еще не сделал записей в дневнике</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="specialist-notes">
                    <div className="space-y-4">
                      {isAddingNote ? (
                        <div className="border border-beauty-200 rounded-md p-4">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium">Новая заметка</h4>
                            <div className="flex items-center gap-2">
                              <Button 
                                size="sm"
                                variant={isPrivateNote ? "default" : "outline"}
                                className={isPrivateNote ? "bg-beauty-500" : ""}
                                onClick={() => setIsPrivateNote(!isPrivateNote)}
                              >
                                {isPrivateNote ? "Личная" : "Публичная"}
                              </Button>
                              
                              <select 
                                className="border rounded-md p-1 text-sm"
                                value={noteCategory}
                                onChange={(e) => setNoteCategory(e.target.value as any)}
                              >
                                <option value="observation">Наблюдение</option>
                                <option value="recommendation">Рекомендация</option>
                                <option value="warning">Предупреждение</option>
                              </select>
                            </div>
                          </div>
                          
                          <Textarea 
                            placeholder="Введите вашу заметку о процедуре или клиенте..." 
                            className="min-h-[100px] mb-3"
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                          />
                          
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setIsAddingNote(false)}
                            >
                              Отмена
                            </Button>
                            <Button 
                              size="sm"
                              onClick={addSpecialistNote}
                            >
                              Сохранить
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          className="w-full py-6 border-dashed"
                          onClick={() => setIsAddingNote(true)}
                        >
                          <MessageSquare className="h-5 w-5 mr-2" /> Добавить новую заметку
                        </Button>
                      )}
                      
                      {selectedTreatment.specialistNotes && selectedTreatment.specialistNotes.length ? (
                        <>
                          <div className="flex justify-between items-center mt-4">
                            <h4 className="font-medium">Ваши заметки</h4>
                            <Badge variant="outline">
                              {selectedTreatment.specialistNotes.length} заметок
                            </Badge>
                          </div>
                          
                          <div className="space-y-3">
                            {selectedTreatment.specialistNotes.map((note) => (
                              <div 
                                key={note.id} 
                                className={`p-3 rounded-md ${
                                  note.isPrivate ? 'bg-amber-50 border-l-2 border-amber-500' :
                                  note.category === 'recommendation' ? 'bg-green-50 border-l-2 border-green-500' :
                                  note.category === 'warning' ? 'bg-red-50 border-l-2 border-red-500' :
                                  'bg-blue-50 border-l-2 border-blue-500'
                                }`}
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm text-beauty-600">{note.date}</span>
                                  <div className="flex items-center gap-2">
                                    {note.isPrivate && (
                                      <Badge variant="outline" className="text-amber-600 border-amber-300">
                                        Личная
                                      </Badge>
                                    )}
                                    <div className="flex items-center">
                                      {renderCategoryIcon(note.category || "observation")}
                                      <span className="text-xs ml-1">
                                        {note.category === 'observation' ? 'Наблюдение' :
                                         note.category === 'recommendation' ? 'Рекомендация' :
                                         'Предупреждение'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-beauty-800">{note.content}</div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-4 text-beauty-600">
                          <p>У вас пока нет заметок для этой процедуры</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-12">
                <AlertTriangle className="h-12 w-12 mx-auto text-beauty-300 mb-4" />
                <CardTitle className="mb-2">Выберите процедуру</CardTitle>
                <CardDescription>
                  Выберите процедуру из списка слева для просмотра деталей
                </CardDescription>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpecialistActiveTreatments;
