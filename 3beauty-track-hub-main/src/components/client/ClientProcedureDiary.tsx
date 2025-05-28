
import React, { useState } from 'react';
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
  Image,
  SmilePlus,
  FileImage,
  AlertTriangle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Treatment } from '@/components/staff/types/staffTypes';

// Interface for client diary entry
interface DiaryEntry {
  id: string;
  date: string;
  content: string;
  mood: "good" | "neutral" | "bad";
  images?: string[];
  clientId: string;
  treatmentId: string;
}

// Interface for the component props
interface ClientProcedureDiaryProps {
  clientId: string;
  clientName: string;
  treatments?: Treatment[];
}

export function ClientProcedureDiary({ 
  clientId, 
  clientName, 
  treatments = []
}: ClientProcedureDiaryProps) {
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string | null>(null);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([
    {
      id: "entry1",
      date: "26 мая 2025",
      content: "После процедуры химического пилинга чувствую небольшое покалывание, но в целом всё хорошо. Кожа выглядит свежее.",
      mood: "good",
      images: ["https://randomuser.me/api/portraits/women/33.jpg"],
      clientId: clientId,
      treatmentId: "t1"
    },
    {
      id: "entry2",
      date: "16 мая 2025",
      content: "После биоревитализации отек почти спал, небольшие синяки в местах уколов. Кожа выглядит увлажненной.",
      mood: "neutral",
      clientId: clientId,
      treatmentId: "t2"
    },
    {
      id: "entry3",
      date: "18 мая 2025",
      content: "Продолжаю замечать улучшения после биоревитализации. Синяки почти прошли, кожа выглядит значительно лучше. Очень довольна результатом!",
      mood: "good",
      clientId: clientId,
      treatmentId: "t2"
    }
  ]);
  
  const [newDiaryContent, setNewDiaryContent] = useState("");
  const [diaryMood, setDiaryMood] = useState<"good" | "neutral" | "bad">("good");
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // Find the currently selected treatment
  const selectedTreatment = selectedTreatmentId 
    ? treatments.find(t => t.id === selectedTreatmentId) 
    : null;

  // Get diary entries for the selected treatment
  const selectedTreatmentEntries = selectedTreatmentId 
    ? diaryEntries.filter(entry => entry.treatmentId === selectedTreatmentId)
    : [];

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

  // Function to add new diary entry
  const addDiaryEntry = () => {
    if (!selectedTreatmentId || !newDiaryContent.trim()) {
      toast({
        title: "Ошибка",
        description: "Выберите процедуру и введите текст дневника",
        variant: "destructive"
      });
      return;
    }
    
    const newEntry: DiaryEntry = {
      id: `entry-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      content: newDiaryContent,
      mood: diaryMood,
      images: uploadedImages.length > 0 ? [...uploadedImages] : undefined,
      clientId: clientId,
      treatmentId: selectedTreatmentId
    };
    
    setDiaryEntries([...diaryEntries, newEntry]);
    setNewDiaryContent("");
    setDiaryMood("good");
    setUploadedImages([]);
    setIsAddingEntry(false);
    
    toast({
      title: "Запись добавлена",
      description: "Ваша запись в дневнике сохранена"
    });
  };

  // Mock function to simulate image upload
  const handleImageUpload = () => {
    // In a real app, this would upload to server. Here we just add a mock URL
    const mockImageUrl = "https://randomuser.me/api/portraits/women/42.jpg";
    setUploadedImages([...uploadedImages, mockImageUrl]);
    
    toast({
      title: "Изображение загружено",
      description: "Фотография добавлена к записи"
    });
  };

  // If no treatments available
  if (treatments.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <AlertTriangle className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
          <CardTitle className="mb-2">Нет активных процедур</CardTitle>
          <CardDescription>
            У вас пока нет активных процедур, для которых можно вести дневник
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Дневник процедур</h3>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <div className="p-4 bg-beauty-50 rounded-lg mb-4">
            <h4 className="font-medium mb-2">Ваши процедуры</h4>
            <p className="text-sm text-beauty-700 mb-4">
              Выберите процедуру, чтобы просмотреть или добавить запись в дневник
            </p>
            <Select value={selectedTreatmentId || ""} onValueChange={(value) => setSelectedTreatmentId(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите процедуру" />
              </SelectTrigger>
              <SelectContent>
                {treatments.map((treatment) => (
                  <SelectItem key={treatment.id} value={treatment.id}>
                    {treatment.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedTreatment && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedTreatment.name}</CardTitle>
                <CardDescription>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {selectedTreatment.date}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-beauty-600">Специалист:</span>
                    <span className="font-medium ml-1">{selectedTreatment.staffName}</span>
                  </div>
                  <div>
                    <span className="text-beauty-600">Следующая процедура:</span>
                    <span className="font-medium ml-1">
                      {selectedTreatment.nextDate || "Не запланирована"}
                    </span>
                  </div>
                  <div>
                    <span className="text-beauty-600">Прогресс:</span>
                    <span className="font-medium ml-1">{selectedTreatment.progress}%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => setIsAddingEntry(true)}
                  disabled={isAddingEntry}
                >
                  <SmilePlus className="h-4 w-4 mr-2" />
                  Добавить запись в дневник
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
        
        <div className="md:col-span-2">
          {selectedTreatment ? (
            <div className="space-y-6">
              {isAddingEntry && (
                <Card>
                  <CardHeader>
                    <CardTitle>Новая запись в дневнике</CardTitle>
                    <CardDescription>
                      Опишите ваши ощущения после процедуры "{selectedTreatment.name}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-beauty-700 mb-1">
                        Как вы себя чувствуете?
                      </label>
                      <Select value={diaryMood} onValueChange={(value: "good" | "neutral" | "bad") => setDiaryMood(value)}>
                        <SelectTrigger>
                          <SelectValue />
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
                    
                    <div>
                      <label className="block text-sm font-medium text-beauty-700 mb-1">
                        Ваши ощущения и наблюдения
                      </label>
                      <Textarea
                        placeholder="Опишите ваши ощущения, изменения, побочные эффекты или результаты, которые вы заметили после процедуры..."
                        value={newDiaryContent}
                        onChange={(e) => setNewDiaryContent(e.target.value)}
                        className="min-h-[120px]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-beauty-700 mb-1">
                        Фотографии (необязательно)
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {uploadedImages.map((img, idx) => (
                          <img 
                            key={idx} 
                            src={img} 
                            alt={`Uploaded ${idx}`} 
                            className="w-16 h-16 rounded-md object-cover" 
                          />
                        ))}
                      </div>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={handleImageUpload}
                      >
                        <Image className="h-4 w-4 mr-2" />
                        Загрузить фото
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddingEntry(false)}>Отмена</Button>
                    <Button onClick={addDiaryEntry}>Сохранить запись</Button>
                  </CardFooter>
                </Card>
              )}
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">История записей</h4>
                  <Badge variant="outline" className="text-beauty-600">
                    {selectedTreatmentEntries.length} {selectedTreatmentEntries.length === 1 ? "запись" : "записей"}
                  </Badge>
                </div>
                
                {selectedTreatmentEntries.length > 0 ? (
                  <div className="space-y-4">
                    {selectedTreatmentEntries.map((entry) => (
                      <Card key={entry.id} className={
                        entry.mood === "good" ? "border-l-4 border-l-green-500" :
                        entry.mood === "neutral" ? "border-l-4 border-l-gray-400" :
                        "border-l-4 border-l-red-400"
                      }>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-beauty-600" />
                              <span className="text-sm text-beauty-600">{entry.date}</span>
                            </div>
                            <Badge variant="outline" className={
                              entry.mood === 'good' ? 'text-green-600 border-green-300' :
                              entry.mood === 'neutral' ? 'text-gray-600 border-gray-300' :
                              'text-red-600 border-red-300'
                            }>
                              {renderMoodEmoji(entry.mood)}
                              {entry.mood === 'good' ? 'Хорошо' :
                               entry.mood === 'neutral' ? 'Нормально' :
                               'Плохо'}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-4">{entry.content}</p>
                          
                          {entry.images && entry.images.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-beauty-600 mb-2">Фотографии:</p>
                              <div className="flex flex-wrap gap-2">
                                {entry.images.map((img, idx) => (
                                  <img 
                                    key={idx} 
                                    src={img} 
                                    alt={`Фото ${idx + 1}`} 
                                    className="w-20 h-20 rounded-md object-cover" 
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="text-center p-6">
                    <CardContent>
                      <FileImage className="h-12 w-12 mx-auto text-beauty-300 mb-2" />
                      <p>У вас пока нет записей для этой процедуры</p>
                      <Button 
                        className="mt-4" 
                        onClick={() => setIsAddingEntry(true)}
                      >
                        <SmilePlus className="h-4 w-4 mr-2" />
                        Создать первую запись
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-12">
                <AlertTriangle className="h-12 w-12 mx-auto text-beauty-300 mb-4" />
                <CardTitle className="mb-2">Выберите процедуру</CardTitle>
                <CardDescription>
                  Пожалуйста, выберите процедуру из списка слева, чтобы просмотреть или добавить запись в дневник
                </CardDescription>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientProcedureDiary;
