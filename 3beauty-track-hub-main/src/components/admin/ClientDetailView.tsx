import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MessageCircle, 
  History, 
  Gift, 
  Tag, 
  Edit, 
  Mail, 
  Phone, 
  AlertCircle,
  Plus,
  BookText
} from "lucide-react";
import { ClientTreatmentTracking } from '../client/ClientTreatmentTracking';
import { Treatment } from '../staff/types/staffTypes';

type VisitHistoryItem = {
  date: string;
  procedure: string;
  specialist: string;
  price: string;
};

type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  nextAppointment: string;
  treatments: string[];
  tags: string[];
  allergies: string[];
  birthday: string;
  totalSpent: string;
  image: string;
  visitHistory: VisitHistoryItem[];
};

interface ClientDetailViewProps {
  client: Client;
}

// Интерфейс для заметок клиента
interface ClientNote {
  id: string;
  date: string;
  content: string;
  mood: "good" | "neutral" | "bad";
  images?: string[];
  clientId: string; // Добавлен обязательный параметр clientId
}

// Mock data for treatments with client notes
const mockTreatments: (Treatment & { clientNotes?: ClientNote[] })[] = [
  {
    id: "treatment-1",
    name: "Hyaluronic Acid Filler",
    clientId: "1",
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
      },
      {
        date: "15 Oct 2024",
        procedure: "Hyaluronic Acid Filler",
        notes: "Client reported minimal bruising that resolved within 5 days. Results maintained well at 3-month check.",
        productsUsed: ["Juvederm Volift 1ml"],
        staffId: 2,
        staffName: "Olga Petrova",
      }
    ],
    // Добавим демонстрационные заметки клиента
    clientNotes: [
      {
        id: "note-1",
        date: "14 Mar 2025",
        content: "На второй день после процедуры небольшая припухлость исчезла. Результат очень нравится, носогубные складки стали менее заметны.",
        mood: "good",
        clientId: "1" // Добавлен обязательный параметр clientId
      },
      {
        id: "note-2",
        date: "20 Mar 2025",
        content: "Заметила, что с одной стороны филлер распределился чуть неравномерно. Может ли это сгладиться со временем?",
        mood: "neutral",
        clientId: "1" // Добавлен обязательный параметр clientId
      }
    ]
  },
  {
    id: "treatment-2",
    name: "Botulinum Toxin",
    clientId: "1",
    date: "23 Jan 2025",
    nextDate: "23 Apr 2025",
    staffId: 2,
    staffName: "Olga Petrova",
    productsUsed: ["Botox 24 units"],
    notes: "Forehead (10), glabella (8), crow's feet (6). Follow-up showed excellent results after 14 days.",
    progress: 70,
    status: "schedule-soon",
    color: "teal",
    history: [
      {
        date: "23 Jan 2025",
        procedure: "Botulinum Toxin",
        notes: "Forehead (10), glabella (8), crow's feet (6). Follow-up showed excellent results after 14 days.",
        productsUsed: ["Botox 24 units"],
        staffId: 2,
        staffName: "Olga Petrova",
      }
    ],
    clientNotes: [
      {
        id: "note-3",
        date: "25 Jan 2025",
        content: "Эффект от ботокса начал проявляться. Меньше морщин на лбу при мимике.",
        mood: "good",
        clientId: "1" // Добавлен обязательный параметр clientId
      },
      {
        id: "note-4",
        date: "5 Feb 2025",
        content: "Полный эффект наступил, очень довольна результатом! Лоб выглядит значительно моложе.",
        mood: "good",
        clientId: "1" // Добавлен обязательный параметр clientId
      }
    ]
  },
  {
    id: "treatment-3",
    name: "Chemical Peel",
    clientId: "1",
    date: "5 Apr 2025",
    nextDate: "5 Jun 2025",
    staffId: 3,
    staffName: "Irina Ivanova",
    productsUsed: ["Glycolic acid 30%", "Neutralizer solution"],
    notes: "Client reported slight tingling but no discomfort. Skin appeared slightly red immediately after procedure.",
    progress: 20,
    status: "active",
    color: "lavender",
    history: [
      {
        date: "5 Apr 2025",
        procedure: "Chemical Peel",
        notes: "Client reported slight tingling but no discomfort. Skin appeared slightly red immediately after procedure.",
        productsUsed: ["Glycolic acid 30%", "Neutralizer solution"],
        staffId: 3,
        staffName: "Irina Ivanova",
      }
    ],
    clientNotes: [
      {
        id: "note-5",
        date: "5 Apr 2025",
        content: "Вечером после процедуры кожа краснее обычного и немного стянутая, но дискомфорта нет.",
        mood: "neutral",
        clientId: "1" // Добавлен обязательный параметр clientId
      },
      {
        id: "note-6",
        date: "7 Apr 2025",
        content: "Началось шелушение, особенно в зоне подбородка. Использую рекомендованный увлажняющий крем.",
        mood: "neutral",
        clientId: "1" // Добавлен обязательный параметр clientId
      },
      {
        id: "note-7",
        date: "10 Apr 2025",
        content: "Шелушение прошло, кожа выглядит заметно свежее и ровнее. Очень довольна результатом!",
        mood: "good",
        clientId: "1" // Добавлен обязательный параметр clientId
      }
    ]
  }
];

const ClientDetailView: React.FC<ClientDetailViewProps> = ({ client }) => {
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string | null>(null);
  
  // Функция для рендеринга эмодзи в зависимости от настроения
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

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <img 
              src={client.image} 
              alt={client.name} 
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h2 className="text-2xl font-bold text-beauty-900">{client.name}</h2>
                <Button variant="outline" size="sm" className="flex items-center gap-1 mt-2 md:mt-0">
                  <Edit className="h-4 w-4" /> Редактировать
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-beauty-700">
                  <Mail className="h-4 w-4" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-beauty-700">
                  <Phone className="h-4 w-4" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-beauty-700">
                  <Calendar className="h-4 w-4" />
                  <span>День рождения: {client.birthday}</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <span>Общие расходы:</span>
                  <span className="text-beauty-900">{client.totalSpent}</span>
                </div>
              </div>
              
              {client.allergies.length > 0 && (
                <div className="mt-4 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-1" />
                  <div>
                    <span className="text-red-500 font-medium">Аллергии: </span>
                    <span>{client.allergies.join(', ')}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-beauty-700 mb-2">Теги:</h3>
            <div className="flex flex-wrap gap-2">
              {client.tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="bg-beauty-50 text-beauty-700 hover:bg-beauty-100">
                  {tag}
                </Badge>
              ))}
              <Button variant="outline" size="sm" className="h-6">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="treatments" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="treatments" className="flex items-center gap-2">
            <History className="h-4 w-4" /> Процедур��
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" /> История посещений
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Записи
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Tag className="h-4 w-4" /> Предпочтения
          </TabsTrigger>
          <TabsTrigger value="diary" className="flex items-center gap-2">
            <BookText className="h-4 w-4" /> Дневник клиента
          </TabsTrigger>
          <TabsTrigger value="communications" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" /> Сообщения
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="treatments">
          <ClientTreatmentTracking 
            clientId={client.id.toString()} 
            clientName={client.name} 
            initialTreatments={mockTreatments}
          />
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">История посещений</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {client.visitHistory.map((visit, idx) => (
                  <div key={idx} className="border-b border-beauty-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h4 className="font-medium text-beauty-900">{visit.procedure}</h4>
                        <div className="flex items-center gap-4 text-sm text-beauty-700">
                          <span>{visit.date}</span>
                          <span>Специалист: {visit.specialist}</span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 text-beauty-900 font-medium">
                        {visit.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appointments">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Предстоящие записи</CardTitle>
            </CardHeader>
            <CardContent>
              {client.nextAppointment !== "Not scheduled" ? (
                <div className="border-beauty-100 pb-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h4 className="font-medium text-beauty-900">
                        {client.treatments[0]}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-beauty-700">
                        <span>{client.nextAppointment}</span>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <Button variant="outline" size="sm" className="mr-2">
                        Перенести
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                        Отменить
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-beauty-700 py-4">
                  Нет запланированных записей
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Предпочтения клиента</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-beauty-700 mb-2">Любимые процедуры:</h3>
                  <div className="flex flex-wrap gap-2">
                    {client.treatments.map((treatment, i) => (
                      <Badge key={i} variant="outline" className="bg-beauty-50">
                        {treatment}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-beauty-700 mb-2">Предпочтительные специалисты:</h3>
                  <div className="text-beauty-600">
                    {client.visitHistory.length > 0 && client.visitHistory[0].specialist}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-beauty-700 mb-2">Заметки:</h3>
                  <div className="text-beauty-600 bg-gray-50 p-3 rounded-md">
                    Предпочитает записываться на утренние часы. 
                    Чувствительная кожа, нужно использовать специальные средства.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Новая вкладка для дневника клиента */}
        <TabsContent value="diary" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Дневник клиента</h3>
            <Badge className="bg-beauty-500">Всего записей: {
              mockTreatments.reduce((sum, treatment) => 
                sum + (treatment.clientNotes?.length || 0), 0)
            }</Badge>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {mockTreatments
              .filter(treatment => treatment.clientNotes && treatment.clientNotes.length > 0)
              .map(treatment => (
                <Card key={treatment.id} className={`border-l-4 ${
                  treatment.color === 'beauty' ? 'border-l-beauty-500' :
                  treatment.color === 'teal' ? 'border-l-teal-500' :
                  'border-l-lavender-500'
                }`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{treatment.name}</CardTitle>
                      <Badge variant="outline">
                        Мастер: {treatment.staffName}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {treatment.clientNotes?.length ? (
                      <div className="space-y-4">
                        {treatment.clientNotes.map((note) => (
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
                            
                            <div className="flex justify-end mt-3">
                              <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <MessageCircle className="h-3 w-3" /> Ответить клиенту
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-beauty-600 py-2">У клиента пока нет заметок для этой процедуры</p>
                    )}
                  </CardContent>
                </Card>
              ))}
              
            {!mockTreatments.some(t => t.clientNotes && t.clientNotes.length > 0) && (
              <div className="text-center py-8 text-beauty-600">
                <BookText className="h-12 w-12 mx-auto text-beauty-400 mb-2" />
                <p>У клиента пока нет заметок в дневнике</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="communications">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Коммуникации</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <Button variant="outline" className="mr-2">
                    <Mail className="h-4 w-4 mr-2" /> Написать email
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" /> Отправить SMS
                  </Button>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-beauty-700 mb-2">История сообщений:</h3>
                  <div className="border border-beauty-100 rounded-md p-4">
                    <div className="text-beauty-700 mb-2 flex justify-between items-center">
                      <span className="font-medium">Подтверждение записи</span>
                      <span className="text-sm">22.04.2025 14:30</span>
                    </div>
                    <p className="text-sm text-beauty-600">
                      Здравствуйте, {client.name.split(' ')[0]}! Подтверждаем вашу запись 
                      на {client.nextAppointment} на процедуру {client.treatments[0]}.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex flex-wrap gap-3">
        <Button className="bg-beauty-500 hover:bg-beauty-600">
          <Calendar className="h-4 w-4 mr-2" /> Записать на прием
        </Button>
        <Button variant="outline">
          <Gift className="h-4 w-4 mr-2" /> Добавить бонусы
        </Button>
        <Button variant="outline">
          <Tag className="h-4 w-4 mr-2" /> Задать теги
        </Button>
      </div>
    </div>
  );
};

export default ClientDetailView;
