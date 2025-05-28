
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar, 
  Clock, 
  MoreHorizontal, 
  Check, 
  Star, 
  AlertTriangle,
  ChevronRight,
  MessageCircle,
  Edit,
  Plus,
  Image,
  SmilePlus
} from "lucide-react";
import { Treatment } from '@/components/staff/types/staffTypes';

// Interface for client notes
interface ClientNote {
  id: string;
  date: string;
  content: string;
  mood: "good" | "neutral" | "bad";
  images?: string[];
  clientId: string;
}

// Interface for the component props
interface ClientTreatmentTrackingProps {
  clientId: string;
  clientName: string;
  initialTreatments?: (Treatment & { clientNotes?: ClientNote[] })[];
}

export function ClientTreatmentTracking({ 
  clientId, 
  clientName, 
  initialTreatments = []
}: ClientTreatmentTrackingProps) {
  const [treatments, setTreatments] = useState<(Treatment & { clientNotes?: ClientNote[] })[]>(initialTreatments);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState("");
  const [noteMood, setNoteMood] = useState<"good" | "neutral" | "bad">("good");
  const [isAddingNote, setIsAddingNote] = useState(false);

  useEffect(() => {
    // Update treatments if initialTreatments changes
    if (initialTreatments.length > 0) {
      setTreatments(initialTreatments);
    }
  }, [initialTreatments]);

  // Find the currently selected treatment
  const selectedTreatment = selectedTreatmentId 
    ? treatments.find(t => t.id === selectedTreatmentId) 
    : null;

  // Function to render mood emoji based on the mood
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

  // Function to add a new note to a treatment
  const addNoteToTreatment = (treatmentId: string) => {
    if (!newNote.trim()) return;
    
    const treatmentIndex = treatments.findIndex(t => t.id === treatmentId);
    if (treatmentIndex === -1) return;
    
    const treatment = treatments[treatmentIndex];
    
    // Create a new array of treatments with the updated treatment that has the new note
    const updatedTreatments = [...treatments];
    updatedTreatments[treatmentIndex] = {
      ...treatment,
      clientNotes: [
        ...(treatment.clientNotes || []),
        {
          id: `note-${Date.now()}`,
          date: new Date().toLocaleDateString(),
          content: newNote,
          mood: noteMood,
          clientId: clientId // Adding clientId from the component props
        }
      ]
    };
    
    setTreatments(updatedTreatments);
    setNewNote("");
    setNoteMood("good");
    setIsAddingNote(false);
  };

  // Function to get color class based on status
  const getStatusColorClass = (status: Treatment['status']) => {
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
            У клиента {clientName} пока нет запланированных процедур
          </CardDescription>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Добавить новую процедуру
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Процедуры клиента {clientName}</h3>
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
                    <p className="text-sm text-beauty-600">
                      <Clock className="h-3 w-3 inline mr-1" /> 
                      {treatment.date}
                    </p>
                  </div>
                  <Badge className={getStatusColorClass(treatment.status)}>
                    {treatment.status === "active" && "Активна"}
                    {treatment.status === "completed" && "Завершена"}
                    {treatment.status === "schedule-soon" && "Записаться"}
                    {treatment.status === "need-attention" && "Требует внимания"}
                  </Badge>
                </div>
                
                <div className="mt-2 text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center">
                      <Check className="h-3 w-3 mr-1 text-beauty-500" /> 
                      Прогресс: {treatment.progress}%
                    </span>
                    <span>
                      {treatment.clientNotes?.length || 0} заметок
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
                  <CardTitle className="text-lg">{selectedTreatment.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" /> Редактировать
                    </Button>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Специалист: {selectedTreatment.staffName}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="details">Детали</TabsTrigger>
                    <TabsTrigger value="notes">Заметки клиента</TabsTrigger>
                    <TabsTrigger value="history">История</TabsTrigger>
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
                        <p className="text-sm text-beauty-600 mb-1">Прогресс:</p>
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
                        <p className="text-sm text-beauty-600 mb-1">Заметки специалиста:</p>
                        <p className="p-3 bg-gray-50 rounded-md text-beauty-700">
                          {selectedTreatment.notes || "Нет заметок"}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notes">
                    <div className="space-y-4">
                      {isAddingNote ? (
                        <div className="border border-beauty-200 rounded-md p-4">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium">Новая заметка</h4>
                            <div className="flex gap-2">
                              <Select value={noteMood} onValueChange={(value: "good" | "neutral" | "bad") => setNoteMood(value)}>
                                <SelectTrigger className="w-[120px]">
                                  <SelectValue placeholder="Настроение" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="good">
                                    <div className="flex items-center">
                                      {renderMoodEmoji("good")} Хорошо
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="neutral">
                                    <div className="flex items-center">
                                      {renderMoodEmoji("neutral")} Нормально
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="bad">
                                    <div className="flex items-center">
                                      {renderMoodEmoji("bad")} Плохо
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <Textarea 
                            placeholder="Опишите ваши ощущения после процедуры..." 
                            className="min-h-[100px] mb-3"
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                          />
                          
                          <div className="flex justify-between">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Image className="h-4 w-4" /> Добавить фото
                            </Button>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setIsAddingNote(false)}
                              >
                                Отмена
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => addNoteToTreatment(selectedTreatment.id)}
                              >
                                Сохранить
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          className="w-full py-6 border-dashed"
                          onClick={() => setIsAddingNote(true)}
                        >
                          <SmilePlus className="h-5 w-5 mr-2" /> Добавить новую заметку
                        </Button>
                      )}
                      
                      {selectedTreatment.clientNotes?.length ? (
                        selectedTreatment.clientNotes.map((note) => (
                          <div 
                            key={note.id} 
                            className={`p-4 rounded-md ${
                              note.mood === 'good' ? 'bg-green-50 border-l-2 border-green-500' :
                              note.mood === 'neutral' ? 'bg-gray-50 border-l-2 border-gray-400' :
                              'bg-red-50 border-l-2 border-red-400'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-beauty-600">{note.date}</span>
                              <div className="flex items-center">
                                {renderMoodEmoji(note.mood)}
                                <Badge variant="outline" className={
                                  note.mood === 'good' ? 'text-green-600 border-green-300' :
                                  note.mood === 'neutral' ? 'text-gray-600 border-gray-300' :
                                  'text-red-600 border-red-300'
                                }>
                                  {note.mood === 'good' ? 'Хорошо' :
                                   note.mood === 'neutral' ? 'Нормально' :
                                   'Плохо'}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="text-beauty-800 mb-2">{note.content}</div>
                            
                            {note.images && note.images.length > 0 && (
                              <div className="flex gap-2 mt-2">
                                {note.images.map((img, idx) => (
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
                          <MessageCircle className="h-8 w-8 mx-auto text-beauty-300 mb-2" />
                          <p>У клиента пока нет заметок для этой процедуры</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history">
                    <div className="space-y-4">
                      {selectedTreatment.history?.length ? (
                        selectedTreatment.history.map((historyItem, index) => (
                          <div key={index} className="border-b last:border-0 border-beauty-100 pb-4 last:pb-0">
                            <div className="flex flex-col md:flex-row md:justify-between mb-2">
                              <h4 className="font-medium">{historyItem.procedure}</h4>
                              <span className="text-sm text-beauty-600">{historyItem.date}</span>
                            </div>
                            <div className="text-sm space-y-1">
                              <p><span className="text-beauty-600">Специалист:</span> {historyItem.staffName}</p>
                              <p><span className="text-beauty-600">Использованные продукты:</span> {historyItem.productsUsed?.join(", ")}</p>
                              <p className="mt-2 text-beauty-700">{historyItem.notes}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-beauty-600">
                          <Clock className="h-8 w-8 mx-auto text-beauty-300 mb-2" />
                          <p>История процедур пока отсутствует</p>
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

// Default export to fix import errors
export default ClientTreatmentTracking;
