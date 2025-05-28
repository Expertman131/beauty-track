
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Check, CalendarClock, Send, History, Gift, Star, Phone, Mail, Smile, ChevronDown, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MarketingTools = () => {
  // State for message campaigns
  const [campaignMessage, setCampaignMessage] = useState('');
  const [campaignTitle, setCampaignTitle] = useState('');
  const [targetChannel, setTargetChannel] = useState<'email' | 'sms' | 'telegram'>('email');
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(new Date());
  const [scheduleTime, setScheduleTime] = useState('12:00');

  // State for emoji picker
  const [showEmojiPopover, setShowEmojiPopover] = useState(false);
  
  // Sample emojis list
  const emojis = ['😊', '❤️', '🎉', '👍', '✨', '🌸', '💯', '🙏', '🤗', '🥰', '✅', '🔥', '💋', '💁‍♀️', '🌺', '💅', '👑', '🎁', '🌈', '💫'];
  
  // State for reviews
  const [reviewClients, setReviewClients] = useState([
    { id: '1', name: 'Елена Петрова', lastVisit: '12.04.2025', service: 'Маникюр' },
    { id: '2', name: 'Анна Кузнецова', lastVisit: '10.04.2025', service: 'Педикюр' },
    { id: '3', name: 'Мария Соколова', lastVisit: '08.04.2025', service: 'Наращивание ресниц' },
    { id: '4', name: 'Светлана Иванова', lastVisit: '05.04.2025', service: 'Окрашивание волос' },
  ]);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [openClientSelector, setOpenClientSelector] = useState(false);

  // State for birthday gifts
  const [birthdayClients, setBirthdayClients] = useState([
    { id: '1', name: 'Елена Петрова', birthday: '25.04', phone: '+7 (900) 123-45-67' },
    { id: '2', name: 'Анна Кузнецова', birthday: '27.04', phone: '+7 (900) 234-56-78' },
    { id: '3', name: 'Мария Соколова', birthday: '30.04', phone: '+7 (900) 345-67-89' },
  ]);
  const [openGiftDialog, setOpenGiftDialog] = useState(false);
  const [selectedBirthdayClient, setSelectedBirthdayClient] = useState<string | null>(null);
  const [giftType, setGiftType] = useState<'bonus' | 'discount'>('bonus');
  const [giftValue, setGiftValue] = useState('500');
  
  // State for auto-greetings
  const [openAutoGreetingDialog, setOpenAutoGreetingDialog] = useState(false);
  const [greetingTemplate, setGreetingTemplate] = useState('Дорогой(ая) {name}, поздравляем Вас с днем рождения! В подарок дарим Вам {bonus} бонусных баллов. Ждем Вас в нашем салоне!');
  const [autoGreetingEnabled, setAutoGreetingEnabled] = useState(true);
  
  // Sample campaign history
  const campaignHistory = [
    { id: '1', title: 'Весенняя акция', channel: 'email', sent: 142, date: '15.04.2025', status: 'completed' },
    { id: '2', title: 'Новые услуги', channel: 'sms', sent: 87, date: '01.04.2025', status: 'completed' },
    { id: '3', title: 'Специальное предложение', channel: 'telegram', sent: 0, date: '30.04.2025', status: 'scheduled' },
  ];
  
  // Dialog state for campaign details
  const [openCampaignDetails, setOpenCampaignDetails] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  // Insert emoji into message
  const insertEmoji = (emoji: string) => {
    setCampaignMessage(prev => prev + emoji);
    setShowEmojiPopover(false);
  };

  // Handle scheduling
  const handleSchedule = () => {
    if (!scheduleDate) {
      toast({
        title: "Ошибка",
        description: "Выберите дату для планирования",
        variant: "destructive"
      });
      return;
    }

    const scheduledDateTime = `${format(scheduleDate, 'dd.MM.yyyy')} в ${scheduleTime}`;
    
    toast({
      title: "Рассылка запланирована",
      description: `Рассылка "${campaignTitle}" запланирована на ${scheduledDateTime}`
    });
    
    setShowScheduleDialog(false);
    setCampaignTitle('');
    setCampaignMessage('');
  };

  // Handle send review request
  const handleSendReviewRequest = () => {
    if (!selectedClient) {
      toast({
        title: "Ошибка",
        description: "Выберите клиента для запроса отзыва",
        variant: "destructive"
      });
      return;
    }

    const client = reviewClients.find(c => c.id === selectedClient);
    
    toast({
      title: "Запрос отзыва отправлен",
      description: `Запрос отзыва отправлен клиенту ${client?.name}`
    });
    
    setSelectedClient(null);
    setOpenClientSelector(false);
  };

  // Handle send gift
  const handleSendGift = () => {
    if (!selectedBirthdayClient || !giftValue) {
      toast({
        title: "Ошибка",
        description: "Выберите клиента и укажите значение подарка",
        variant: "destructive"
      });
      return;
    }

    const client = birthdayClients.find(c => c.id === selectedBirthdayClient);
    
    toast({
      title: "Подарок отправлен",
      description: `${giftType === 'bonus' ? 'Бонусы' : 'Скидка'} (${giftValue} ${giftType === 'bonus' ? 'баллов' : '%'}) отправлены клиенту ${client?.name}`
    });
    
    setOpenGiftDialog(false);
    setSelectedBirthdayClient(null);
  };

  // Handle save auto greetings
  const handleSaveAutoGreetings = () => {
    toast({
      title: "Настройки сохранены",
      description: `Автоматические поздравления ${autoGreetingEnabled ? 'включены' : 'отключены'}`
    });
    
    setOpenAutoGreetingDialog(false);
  };

  // Handle send campaign
  const handleSendCampaign = () => {
    if (!campaignTitle || !campaignMessage) {
      toast({
        title: "Ошибка",
        description: "Заполните заголовок и текст сообщения",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Рассылка отправлена",
      description: `Рассылка "${campaignTitle}" отправлена через ${targetChannel}`
    });
    
    setCampaignTitle('');
    setCampaignMessage('');
  };

  // Handle campaign details
  const handleViewCampaignDetails = (campaign: any) => {
    setSelectedCampaign(campaign);
    setOpenCampaignDetails(true);
  };

  return (
    <Tabs defaultValue="campaigns" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="campaigns">Рассылки</TabsTrigger>
        <TabsTrigger value="reviews">Отзывы</TabsTrigger>
        <TabsTrigger value="birthdays">Дни рождения</TabsTrigger>
      </TabsList>

      {/* Campaigns Tab */}
      <TabsContent value="campaigns" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Создать рассылку</CardTitle>
            <CardDescription>Отправьте сообщение всем или выбранным клиентам</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <label className="block text-sm font-medium mb-1">Заголовок рассылки</label>
                <Input
                  value={campaignTitle}
                  onChange={(e) => setCampaignTitle(e.target.value)}
                  placeholder="Введите заголовок"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Канал</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={targetChannel}
                  onChange={(e) => setTargetChannel(e.target.value as 'email' | 'sms' | 'telegram')}
                >
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="telegram">Telegram</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium">Текст сообщения</label>
                <Popover open={showEmojiPopover} onOpenChange={setShowEmojiPopover}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Smile className="h-4 w-4 mr-1" />
                      Эмодзи
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="grid grid-cols-5 gap-2">
                      {emojis.map((emoji, index) => (
                        <Button 
                          key={index} 
                          variant="ghost" 
                          className="h-10 w-10" 
                          onClick={() => insertEmoji(emoji)}
                        >
                          {emoji}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Textarea
                value={campaignMessage}
                onChange={(e) => setCampaignMessage(e.target.value)}
                placeholder="Введите текст сообщения"
                rows={6}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <CalendarClock className="h-4 w-4 mr-2" />
                  Запланировать
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Запланировать рассылку</DialogTitle>
                  <DialogDescription>
                    Выберите дату и время отправки рассылки
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Дата</label>
                    <Calendar
                      mode="single"
                      selected={scheduleDate}
                      onSelect={setScheduleDate}
                      className="p-3 pointer-events-auto"
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Время</label>
                    <Input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>Отмена</Button>
                  <Button onClick={handleSchedule}>Запланировать</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button onClick={handleSendCampaign}>
              <Send className="h-4 w-4 mr-2" />
              Отправить сейчас
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>История рассылок</CardTitle>
            <CardDescription>История отправленных и запланированных рассылок</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Заголовок</TableHead>
                  <TableHead>Канал</TableHead>
                  <TableHead>Отправлено</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaignHistory.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.title}</TableCell>
                    <TableCell>
                      {campaign.channel === 'email' && 'Email'}
                      {campaign.channel === 'sms' && 'SMS'}
                      {campaign.channel === 'telegram' && 'Telegram'}
                    </TableCell>
                    <TableCell>{campaign.sent}</TableCell>
                    <TableCell>{campaign.date}</TableCell>
                    <TableCell>
                      <Badge variant={campaign.status === 'completed' ? 'default' : 'outline'}>
                        {campaign.status === 'completed' ? 'Отправлено' : 'Запланировано'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleViewCampaignDetails(campaign)}>
                        Подробнее
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={openCampaignDetails} onOpenChange={setOpenCampaignDetails}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Детали рассылки</DialogTitle>
            </DialogHeader>
            {selectedCampaign && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-beauty-700">Заголовок</h3>
                  <p>{selectedCampaign.title}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-beauty-700">Канал</h3>
                  <p>
                    {selectedCampaign.channel === 'email' && 'Email'}
                    {selectedCampaign.channel === 'sms' && 'SMS'}
                    {selectedCampaign.channel === 'telegram' && 'Telegram'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-beauty-700">Дата отправки</h3>
                  <p>{selectedCampaign.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-beauty-700">Статус</h3>
                  <Badge variant={selectedCampaign.status === 'completed' ? 'default' : 'outline'}>
                    {selectedCampaign.status === 'completed' ? 'Отправлено' : 'Запланировано'}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-beauty-700">Отправлено</h3>
                  <p>{selectedCampaign.sent} клиентам</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-beauty-700">Содержание</h3>
                  <p className="p-3 bg-muted rounded-md mt-2">
                    Текст сообщения рассылки...
                  </p>
                </div>
                {selectedCampaign.status === 'completed' && (
                  <div>
                    <h3 className="text-sm font-medium text-beauty-700">Статистика</h3>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div className="p-2 bg-muted rounded-md text-center">
                        <p className="text-xs text-beauty-700">Открыто</p>
                        <p className="text-lg font-bold">{Math.floor(selectedCampaign.sent * 0.75)}</p>
                        <p className="text-xs">({Math.floor(75)}%)</p>
                      </div>
                      <div className="p-2 bg-muted rounded-md text-center">
                        <p className="text-xs text-beauty-700">Переходы</p>
                        <p className="text-lg font-bold">{Math.floor(selectedCampaign.sent * 0.32)}</p>
                        <p className="text-xs">({Math.floor(32)}%)</p>
                      </div>
                      <div className="p-2 bg-muted rounded-md text-center">
                        <p className="text-xs text-beauty-700">Записи</p>
                        <p className="text-lg font-bold">{Math.floor(selectedCampaign.sent * 0.08)}</p>
                        <p className="text-xs">({Math.floor(8)}%)</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setOpenCampaignDetails(false)}>Закрыть</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TabsContent>

      {/* Reviews Tab */}
      <TabsContent value="reviews" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Запросить отзыв</CardTitle>
            <CardDescription>Отправьте запрос на отзыв клиенту после посещения</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Выберите клиента</label>
                <Popover open={openClientSelector} onOpenChange={setOpenClientSelector}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openClientSelector}
                      className="w-full justify-between"
                    >
                      {selectedClient
                        ? reviewClients.find((client) => client.id === selectedClient)?.name
                        : "Выберите клиента"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Поиск клиента..." />
                      <CommandEmpty>Клиент не найден.</CommandEmpty>
                      <CommandGroup>
                        {reviewClients.map((client) => (
                          <CommandItem
                            key={client.id}
                            value={client.name}
                            onSelect={() => {
                              setSelectedClient(client.id);
                              setOpenClientSelector(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedClient === client.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            <div className="flex flex-col">
                              <span>{client.name}</span>
                              <span className="text-xs text-beauty-500">
                                Последнее посещение: {client.lastVisit}, Услуга: {client.service}
                              </span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Дополнительное сообщение</label>
                <Textarea placeholder="Введите дополнительное сообщение (необязательно)" rows={3} />
              </div>

              <div className="flex justify-between items-center p-4 bg-muted rounded-md">
                <div>
                  <h4 className="text-sm font-medium">Запрос будет отправлен через:</h4>
                  <div className="flex space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-beauty-500" />
                      <span className="text-sm">Email</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-beauty-500" />
                      <span className="text-sm">SMS</span>
                    </div>
                  </div>
                </div>
                <Button onClick={handleSendReviewRequest}>
                  <Star className="h-4 w-4 mr-2" />
                  Запросить отзыв
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Последние отзывы</CardTitle>
            <CardDescription>Отзывы, полученные от клиентов</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Елена', date: '15.04.2025', rating: 5, text: 'Отличный сервис, очень довольна результатом!' },
                { name: 'Мария', date: '10.04.2025', rating: 4, text: 'Хороший салон, приятная атмосфера, но немного задержали с началом процедуры.' },
                { name: 'Светлана', date: '05.04.2025', rating: 5, text: 'Превосходный результат, обязательно вернусь снова!' },
              ].map((review, index) => (
                <div key={index} className="p-4 border rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">{review.name}</div>
                    <div className="text-sm text-beauty-500">{review.date}</div>
                  </div>
                  <div className="flex mb-2">
                    {Array(5).fill(0).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm">{review.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Birthdays Tab */}
      <TabsContent value="birthdays" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Ближайшие дни рождения клиентов</CardTitle>
            <CardDescription>Отправьте поздравление или подарок</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Клиент</TableHead>
                  <TableHead>День рождения</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {birthdayClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.birthday}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedBirthdayClient(client.id);
                          setOpenGiftDialog(true);
                        }}
                      >
                        <Gift className="h-4 w-4 mr-2" />
                        Отправить подарок
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Автоматические поздравления</CardTitle>
              <CardDescription>Настройка автоматических поздравлений с днем рождения</CardDescription>
            </div>
            <Button onClick={() => setOpenAutoGreetingDialog(true)}>
              Настроить
            </Button>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-md">
              <h4 className="font-medium mb-2">Текущие настройки</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Статус:</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Активно
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Отправка:</span>
                  <span>В день рождения, 10:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Бонус:</span>
                  <span>500 баллов</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Dialog open={openGiftDialog} onOpenChange={setOpenGiftDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Отправить подарок</DialogTitle>
              <DialogDescription>
                Выберите тип и размер подарка для клиента
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium mb-1">Клиент</label>
                <Input
                  value={selectedBirthdayClient ? birthdayClients.find(c => c.id === selectedBirthdayClient)?.name : ''}
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Тип подарка</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={giftType}
                  onChange={(e) => setGiftType(e.target.value as 'bonus' | 'discount')}
                >
                  <option value="bonus">Бонусы</option>
                  <option value="discount">Скидка</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {giftType === 'bonus' ? 'Количество бонусов' : 'Размер скидки (%)'}
                </label>
                <Input
                  type="number"
                  value={giftValue}
                  onChange={(e) => setGiftValue(e.target.value)}
                  min="1"
                  max={giftType === 'discount' ? '100' : '10000'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Сообщение</label>
                <Textarea
                  placeholder="Поздравительное сообщение"
                  defaultValue="Поздравляем с днем рождения! Дарим вам подарок от нашего салона."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenGiftDialog(false)}>Отмена</Button>
              <Button onClick={handleSendGift}>Отправить подарок</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={openAutoGreetingDialog} onOpenChange={setOpenAutoGreetingDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Настройка автоматических поздравлений</DialogTitle>
              <DialogDescription>
                Настройте параметры автоматической отправки поздравлений с днем рождения
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Активировать автоматические поздравления</label>
                <input
                  type="checkbox"
                  checked={autoGreetingEnabled}
                  onChange={(e) => setAutoGreetingEnabled(e.target.checked)}
                  className="toggle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Время отправки</label>
                <Input
                  type="time"
                  defaultValue="10:00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Размер бонуса</label>
                <Input
                  type="number"
                  defaultValue="500"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Шаблон поздравления</label>
                <Textarea
                  value={greetingTemplate}
                  onChange={(e) => setGreetingTemplate(e.target.value)}
                  rows={4}
                />
                <p className="text-xs text-beauty-500 mt-1">
                  Используйте {'{name}'} для имени клиента и {'{bonus}'} для количества бонусов
                </p>
              </div>
              <div className="p-4 bg-muted rounded-md">
                <h4 className="text-sm font-medium mb-2">Предпросмотр</h4>
                <p className="text-sm">{greetingTemplate.replace('{name}', 'Елена').replace('{bonus}', '500')}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenAutoGreetingDialog(false)}>Отмена</Button>
              <Button onClick={handleSaveAutoGreetings}>Сохранить настройки</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TabsContent>
    </Tabs>
  );
};

export default MarketingTools;
