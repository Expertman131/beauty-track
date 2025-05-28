
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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar, 
  Clock, 
  MoreHorizontal, 
  Star, 
  MessageCircle,
  Image,
  SmilePlus,
  ArrowLeft,
  ArrowRight,
  FileImage,
  CheckCircle2,
  ClipboardEdit
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { 
  Treatment, 
  TreatmentHistoryItem, 
  ClientDiaryEntry, 
  SpecialistNote,
  TreatmentFeedback
} from '../staff/types/staffTypes';

interface ClientActiveProcedureProps {
  treatment: Treatment & {
    clientDiaries?: ClientDiaryEntry[];
    specialistNotes?: SpecialistNote[];
  };
  onAddDiaryEntry?: (treatmentId: string, entry: Omit<ClientDiaryEntry, 'id'>) => void;
  onAddFeedback?: (feedback: Omit<TreatmentFeedback, 'id'>) => void;
}

export function ClientActiveProcedure({ 
  treatment,
  onAddDiaryEntry,
  onAddFeedback 
}: ClientActiveProcedureProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [noteMood, setNoteMood] = useState<"good" | "neutral" | "bad">("good");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [isAddingFeedback, setIsAddingFeedback] = useState(false);

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

  // Function to handle diary entry submission
  const handleAddDiaryEntry = () => {
    if (!newNote.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите текст для заметки",
        variant: "destructive"
      });
      return;
    }

    const newEntry = {
      date: new Date().toLocaleDateString(),
      content: newNote,
      mood: noteMood,
      images: uploadedImages.length > 0 ? [...uploadedImages] : undefined,
      clientId: treatment.clientId,
      treatmentId: treatment.id
    };

    if (onAddDiaryEntry) {
      onAddDiaryEntry(treatment.id, newEntry);
    }

    // Reset form
    setNewNote("");
    setNoteMood("good");
    setUploadedImages([]);
    setIsAddingNote(false);

    toast({
      title: "Заметка добавлена",
      description: "Ваша заметка успешно сохранена"
    });
  };

  // Function to handle feedback submission
  const handleSubmitFeedback = () => {
    if (!feedbackComment.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, добавьте комментарий к вашей оценке",
        variant: "destructive"
      });
      return;
    }

    const newFeedback = {
      treatmentId: treatment.id,
      clientId: treatment.clientId,
      staffId: treatment.staffId,
      date: new Date().toLocaleDateString(),
      rating: feedbackRating,
      comment: feedbackComment,
      isPublic: true
    };

    if (onAddFeedback) {
      onAddFeedback(newFeedback);
    }

    // Reset form
    setFeedbackRating(5);
    setFeedbackComment("");
    setIsAddingFeedback(false);

    toast({
      title: "Отзыв отправлен",
      description: "Спасибо за ваш отзыв о процедуре"
    });
  };

  // Mock function to simulate image upload
  const handleImageUpload = () => {
    // In a real app, this would upload to a server
    const mockImageUrl = "https://randomuser.me/api/portraits/women/42.jpg";
    setUploadedImages([...uploadedImages, mockImageUrl]);
    
    toast({
      title: "Изображение загружено",
      description: "Фотография добавлена к записи"
    });
  };

  // Function to get status color class
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

  // Function to render rating stars
  const renderRatingStars = (count: number, selected: number, onSelect: (rating: number) => void) => {
    return Array.from({ length: count }, (_, i) => i + 1).map((star) => (
      <Button
        key={star}
        type="button"
        variant="ghost"
        size="sm"
        className={`p-0 ${star <= selected ? 'text-yellow-400' : 'text-gray-300'}`}
        onClick={() => onSelect(star)}
      >
        <Star className="h-6 w-6" fill={star <= selected ? 'currentColor' : 'none'} />
      </Button>
    ));
  };

  return (
    <Card className="w-full shadow-md overflow-hidden">
      <CardHeader className={`border-b ${treatment.color === 'beauty' ? 'bg-beauty-50' : treatment.color === 'teal' ? 'bg-teal-50' : 'bg-lavender-50'}`}>
        <div className="flex justify-between items-start">
          <div>
            <Badge className={getStatusColorClass(treatment.status)}>
              {treatment.status === "active" && "Активна"}
              {treatment.status === "completed" && "Завершена"}
              {treatment.status === "schedule-soon" && "Записаться"}
              {treatment.status === "need-attention" && "Требует внимания"}
            </Badge>
            <CardTitle className="mt-2 text-xl">{treatment.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              Дата: {treatment.date}
              {treatment.nextDate && (
                <>
                  <ArrowRight className="h-4 w-4 mx-1" />
                  Следующая: {treatment.nextDate}
                </>
              )}
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <ClipboardEdit className="h-4 w-4 mr-1" />
                Оставить отзыв
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Отзыв о процедуре</DialogTitle>
                <DialogDescription>
                  Поделитесь своим мнением о процедуре "{treatment.name}"
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ваша оценка</label>
                  <div className="flex justify-center">
                    {renderRatingStars(5, feedbackRating, setFeedbackRating)}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Ваш комментарий</label>
                  <Textarea
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    placeholder="Опишите свои впечатления, результаты и общее впечатление от процедуры..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setFeedbackComment("")}>Отмена</Button>
                <Button onClick={handleSubmitFeedback}>Отправить отзыв</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="mt-2">
          <p className="text-sm text-beauty-700">Прогресс курса:</p>
          <div className="flex items-center">
            <Progress
              value={treatment.progress}
              className={`h-2 flex-1 ${
                treatment.color === 'beauty' 
                  ? 'bg-beauty-100 [&>div]:bg-beauty-500' 
                  : treatment.color === 'teal' 
                    ? 'bg-teal-100 [&>div]:bg-teal-500' 
                    : 'bg-lavender-100 [&>div]:bg-lavender-500'
              }`}
            />
            <span className="ml-2 text-sm font-medium">{treatment.progress}%</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full rounded-none">
            <TabsTrigger value="details">Детали</TabsTrigger>
            <TabsTrigger value="diary">Дневник</TabsTrigger>
            <TabsTrigger value="history">История</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="p-4 space-y-4">
            <div>
              <h4 className="font-medium text-beauty-800 mb-2">Информация о процедуре</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-beauty-600">Специалист:</span>
                  <span className="font-medium">{treatment.staffName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-beauty-600">Продукты:</span>
                  <span className="font-medium text-right">
                    {treatment.productsUsed?.join(", ") || "Нет информации"}
                  </span>
                </div>
                {treatment.notes && (
                  <div className="py-1">
                    <span className="text-beauty-600 block mb-1">Рекомендации специалиста:</span>
                    <p className="bg-gray-50 p-3 rounded-md">{treatment.notes}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-beauty-800 mb-2">План процедур</h4>
              {treatment.history && treatment.history.length > 0 ? (
                <div className="space-y-2">
                  {treatment.history.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="mt-0.5">
                        {index < treatment.history!.length - 1 ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className={`h-5 w-5 rounded-full border-2 ${
                            treatment.status === 'completed' ? 'border-green-500 bg-green-500' : 'border-beauty-300'
                          }`}></div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{item.procedure}</p>
                        <p className="text-sm text-beauty-600">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-beauty-600 text-sm">Нет запланированных процедур</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="diary" className="space-y-4 p-4">
            {isAddingNote ? (
              <div className="border border-beauty-200 rounded-md p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Новая заметка</h4>
                  <Select value={noteMood} onValueChange={(value: "good" | "neutral" | "bad") => setNoteMood(value)}>
                    <SelectTrigger className="w-[130px]">
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
                
                <Textarea 
                  placeholder="Опишите ваши ощущения после процедуры..." 
                  className="min-h-[100px] mb-3"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {uploadedImages.map((img, idx) => (
                    <img 
                      key={idx} 
                      src={img} 
                      alt={`Uploaded ${idx}`} 
                      className="w-16 h-16 rounded-md object-cover" 
                    />
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleImageUpload}>
                    <Image className="h-4 w-4" /> Добавить фото
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setIsAddingNote(false);
                        setNewNote("");
                        setUploadedImages([]);
                      }}
                    >
                      Отмена
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleAddDiaryEntry}
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
            
            {treatment.clientDiaries && treatment.clientDiaries.length > 0 ? (
              <div className="space-y-4">
                {treatment.clientDiaries.map((entry) => (
                  <div 
                    key={entry.id} 
                    className={`p-4 rounded-md border-l-2 ${
                      entry.mood === 'good' ? 'bg-green-50 border-green-500' :
                      entry.mood === 'neutral' ? 'bg-gray-50 border-gray-400' :
                      'bg-red-50 border-red-400'
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
                      <div className="flex flex-wrap gap-2 mt-2">
                        {entry.images.map((img, idx) => (
                          <img 
                            key={idx} 
                            src={img} 
                            alt={`Фото ${idx + 1}`} 
                            className="w-16 h-16 rounded-md object-cover cursor-pointer hover:opacity-90" 
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-beauty-600">
                <MessageCircle className="h-8 w-8 mx-auto text-beauty-300 mb-2" />
                <p>У вас пока нет заметок для этой процедуры</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="p-4">
            {treatment.history && treatment.history.length > 0 ? (
              <div className="space-y-6">
                {treatment.history.map((item, index) => (
                  <div key={index} className="border-l-2 border-beauty-300 pl-4 relative">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-beauty-500"></div>
                    <div className="mb-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-beauty-800">{item.procedure}</h4>
                        <span className="text-sm text-beauty-600">{item.date}</span>
                      </div>
                      <p className="text-sm text-beauty-700 mt-1">Специалист: {item.staffName}</p>
                      {item.productsUsed && item.productsUsed.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-beauty-600">Использованные продукты:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.productsUsed.map((product, pIdx) => (
                              <Badge key={pIdx} variant="outline" className="text-xs">{product}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {item.notes && (
                        <p className="mt-2 text-sm text-beauty-800 bg-gray-50 p-2 rounded-md">{item.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-beauty-600">
                <FileImage className="h-8 w-8 mx-auto text-beauty-300 mb-2" />
                <p>История процедур пока отсутствует</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="bg-gray-50 p-4 flex justify-between">
        <div className="flex items-center text-sm text-beauty-700">
          <Clock className="h-4 w-4 mr-1" /> 
          Обновлено: {new Date().toLocaleDateString()}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Записаться на следующую
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Запись на следующую процедуру</DialogTitle>
              <DialogDescription>
                Запишитесь на следующую процедуру в курсе "{treatment.name}"
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-center text-beauty-700 mb-4">
                Выберите удобную дату и время для следующей процедуры
              </p>
              <div className="flex justify-center">
                <Calendar className="h-10 w-10 text-beauty-500" />
              </div>
              <p className="text-center mt-2 text-sm">
                Для записи на прием перейдите в раздел "Запись"
              </p>
            </div>
            <DialogFooter>
              <Button>Перейти к записи</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

export default ClientActiveProcedure;
