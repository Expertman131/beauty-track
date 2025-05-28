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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  MessageSquare, 
  Send,
  Users,
  Calendar,
  Gift,
  Star
} from "lucide-react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";

// Interface definitions
interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  image?: string;
}

interface Message {
  id: string;
  title: string;
  message: string;
  recipients: string[];
  status: 'draft' | 'scheduled' | 'sent';
  sendDate?: Date;
  sentDate?: string;
  recipientCount: number;
}

const ClientMessaging = () => {
  // Sample data
  const [clients, setClients] = useState<Client[]>([
    { id: '1', name: 'Анна Петрова', email: 'anna@beautytrack.ru', phone: '+7 (900) 123-45-67', lastVisit: '05.04.2025', image: 'https://randomuser.me/api/portraits/women/33.jpg' },
    { id: '2', name: 'Елена Сидорова', email: 'elena@beautytrack.ru', phone: '+7 (900) 234-56-78', lastVisit: '12.04.2025', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: '3', name: 'Марина Иванова', email: 'marina@beautytrack.ru', phone: '+7 (900) 345-67-89', lastVisit: '18.04.2025', image: 'https://randomuser.me/api/portraits/women/55.jpg' },
  ]);
  
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      title: 'Весенняя акция', 
      message: 'Скидка 20% на все услуги до конца апреля!', 
      recipients: ['all'], 
      status: 'sent', 
      sentDate: '10.04.2025',
      recipientCount: 120
    },
    { 
      id: '2', 
      title: 'Новые процедуры', 
      message: 'В нашем салоне появились новые процедуры для лица', 
      recipients: ['segment:lastMonth'], 
      status: 'scheduled', 
      sendDate: new Date('2025-05-10'),
      recipientCount: 45
    },
    { 
      id: '3', 
      title: 'С днем рождения!', 
      message: 'Поздравляем с днем рождения! Дарим скидку 15% на любую процедуру', 
      recipients: ['template:birthday'], 
      status: 'draft',
      recipientCount: 0
    },
  ]);
  
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false);
  const [messageForm, setMessageForm] = useState({
    title: '',
    message: '',
    recipientType: 'all',
    scheduledDate: null as Date | null
  });
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  
  const handleNewMessage = () => {
    const newMessage: Message = {
      id: Date.now().toString(),
      title: messageForm.title,
      message: messageForm.message,
      recipients: [messageForm.recipientType],
      status: messageForm.scheduledDate ? 'scheduled' : 'sent',
      sendDate: messageForm.scheduledDate || undefined,
      recipientCount: getRecipientCount(messageForm.recipientType)
    };
    
    setMessages([newMessage, ...messages]);
    
    toast({
      title: messageForm.scheduledDate ? "Сообщение запланировано" : "Сообщение отправлено",
      description: messageForm.scheduledDate 
        ? `Сообщение будет отправлено ${format(messageForm.scheduledDate, 'dd.MM.yyyy')}`
        : `Сообщение отправлено ${newMessage.recipientCount} получателям`
    });
    
    setShowNewMessageDialog(false);
    setMessageForm({
      title: '',
      message: '',
      recipientType: 'all',
      scheduledDate: null
    });
  };
  
  const getRecipientCount = (recipientType: string) => {
    switch (recipientType) {
      case 'all':
        return 120;
      case 'segment:lastMonth':
        return 45;
      case 'segment:inactive':
        return 32;
      case 'template:birthday':
        return 3;
      default:
        return 0;
    }
  };
  
  const getRecipientLabel = (recipient: string) => {
    if (recipient === 'all') return 'Все клиенты';
    if (recipient.startsWith('segment:lastMonth')) return 'Клиенты за последний месяц';
    if (recipient.startsWith('segment:inactive')) return 'Неактивные клиенты';
    if (recipient.startsWith('template:birthday')) return 'Клиенты с днем рождения';
    return recipient;
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return { label: 'Отправлено', color: 'bg-green-100 text-green-800' };
      case 'scheduled':
        return { label: 'Запланировано', color: 'bg-blue-100 text-blue-800' };
      case 'draft':
        return { label: 'Черновик', color: 'bg-gray-100 text-gray-800' };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Сообщения клиентам</h2>
        <Button 
          className="bg-beauty-500 hover:bg-beauty-600"
          onClick={() => setShowNewMessageDialog(true)}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Новое сообщение
        </Button>
      </div>
      
      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Сообщения
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Star className="h-4 w-4" /> Шаблоны
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages" className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id}>
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{message.title}</h3>
                    <p className="text-beauty-600 text-sm mt-1">
                      Получатели: {getRecipientLabel(message.recipients[0])} ({message.recipientCount})
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusBadge(message.status).color}`}>
                      {getStatusBadge(message.status).label}
                    </span>
                    {message.status === 'scheduled' && message.sendDate && (
                      <span className="text-xs text-beauty-600 block mt-1">
                        {format(message.sendDate, 'dd.MM.yyyy')}
                      </span>
                    )}
                    {message.status === 'sent' && message.sentDate && (
                      <span className="text-xs text-beauty-600 block mt-1">
                        {message.sentDate}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="border-t border-beauty-100 pt-4 mt-2">
                  <p className="text-beauty-800">{message.message}</p>
                </div>
                
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowPreviewDialog(true)}>
                    Просмотр
                  </Button>
                  
                  {message.status === 'draft' && (
                    <Button size="sm" className="bg-beauty-500 hover:bg-beauty-600">
                      Отправить
                    </Button>
                  )}
                  
                  {message.status === 'scheduled' && (
                    <Button variant="outline" size="sm" className="text-red-600">
                      Отменить отправку
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Шаблоны сообщений</CardTitle>
              <CardDescription>Создавайте и управляйте шаблонами сообщений</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { id: 1, name: 'С днем рождения', icon: <Gift className="h-8 w-8 text-beauty-500" /> },
                  { id: 2, name: 'Напоминание о записи', icon: <Calendar className="h-8 w-8 text-beauty-500" /> },
                  { id: 3, name: 'Акция', icon: <Star className="h-8 w-8 text-beauty-500" /> },
                  { id: 4, name: 'Новый шаблон', icon: <Plus className="h-8 w-8 text-beauty-500" /> },
                ].map((template) => (
                  <Card key={template.id} className="hover:border-beauty-200 transition-colors cursor-pointer">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="mb-4">
                        {template.icon}
                      </div>
                      <h4 className="font-medium mb-2">{template.name}</h4>
                      {template.id !== 4 ? (
                        <Button variant="outline" size="sm">
                          Использовать
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          Создать
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* New Message Dialog */}
      <Dialog open={showNewMessageDialog} onOpenChange={setShowNewMessageDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Новое сообщение</DialogTitle>
            <DialogDescription>
              Создание нового сообщения для клиентов
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Тема сообщения</Label>
              <Input 
                id="title"
                value={messageForm.title}
                onChange={(e) => setMessageForm({...messageForm, title: e.target.value})}
                placeholder="Введите тему сообщения"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Текст сообщения</Label>
              <Textarea 
                id="message"
                value={messageForm.message}
                onChange={(e) => setMessageForm({...messageForm, message: e.target.value})}
                placeholder="Введите текст сообщения"
                rows={5}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipients">Получатели</Label>
              <select 
                id="recipients"
                value={messageForm.recipientType}
                onChange={(e) => setMessageForm({...messageForm, recipientType: e.target.value})}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="all">Все клиенты (120)</option>
                <option value="segment:lastMonth">Клиенты за последний месяц (45)</option>
                <option value="segment:inactive">Неактивные клиенты (32)</option>
                <option value="template:birthday">Клиенты с днем рождения в этом месяце (3)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <input 
                  type="checkbox"
                  id="scheduleMessage"
                  className="mr-2"
                  checked={!!messageForm.scheduledDate}
                  onChange={(e) => {
                    if (!e.target.checked) {
                      setMessageForm({...messageForm, scheduledDate: null});
                    } else {
                      const tomorrow = new Date();
                      tomorrow.setDate(tomorrow.getDate() + 1);
                      setMessageForm({...messageForm, scheduledDate: tomorrow});
                    }
                  }}
                />
                <Label htmlFor="scheduleMessage">Запланировать отправку</Label>
              </div>
              
              {messageForm.scheduledDate && (
                <input 
                  type="date"
                  value={messageForm.scheduledDate ? format(messageForm.scheduledDate, 'yyyy-MM-dd') : ''}
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : null;
                    setMessageForm({...messageForm, scheduledDate: date});
                  }}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  min={format(new Date(), 'yyyy-MM-dd')}
                />
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewMessageDialog(false)}>
              Отмена
            </Button>
            <Button 
              onClick={handleNewMessage}
              disabled={!messageForm.title || !messageForm.message}
              className="bg-beauty-500 hover:bg-beauty-600"
            >
              <Send className="h-4 w-4 mr-2" />
              {messageForm.scheduledDate ? 'Запланировать' : 'Отправить'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Предпросмотр сообщения</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="border rounded-md p-4">
              <div className="bg-beauty-100 px-4 py-2 rounded-t-md -mx-4 -mt-4 mb-3">
                <p className="font-medium">От: BeautyTrack</p>
                <p className="font-medium">Кому: Клиент</p>
                <p className="font-medium">Тема: Весенняя акция</p>
              </div>
              
              <p className="text-beauty-800 mb-4">
                Скидка 20% на все услуги до конца апреля! Приходите к нам и воспользуйтесь выгодным предложением.
              </p>
              
              <div className="text-sm text-beauty-600 border-t border-beauty-100 pt-2 mt-4">
                С уважением, команда BeautyTrack
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowPreviewDialog(false)}>
              Закрыть
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientMessaging;
