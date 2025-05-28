
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
  Plus
} from "lucide-react";

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

const ClientDetailView: React.FC<ClientDetailViewProps> = ({ client }) => {
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
      
      <Tabs defaultValue="history" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" /> История посещений
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Записи
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Tag className="h-4 w-4" /> Предпочтения
          </TabsTrigger>
          <TabsTrigger value="communications" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" /> Сообщения
          </TabsTrigger>
        </TabsList>
        
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
