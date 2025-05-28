
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MessageSquare,
  Link,
  ArrowUpRight,
  Check,
  Archive,
  Upload
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const IntegrationsPanel = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Календари
          </TabsTrigger>
          <TabsTrigger value="messaging" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Мессенджеры
          </TabsTrigger>
          <TabsTrigger value="docs" className="flex items-center gap-2">
            <Archive className="h-4 w-4" /> Документы
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Синхронизация с календарями</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border border-beauty-100 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-50 rounded-full mr-4">
                        <svg viewBox="0 0 24 24" className="h-8 w-8 text-blue-500" fill="currentColor">
                          <path d="M21.56 2H17V1c0-.55-.45-1-1-1s-1 .45-1 1v1H9V1c0-.55-.45-1-1-1S7 .45 7 1v1H2.44C1.65 2 1 2.65 1 3.44v17.12C1 21.35 1.65 22 2.44 22h19.12c.79 0 1.44-.65 1.44-1.44V3.44C23 2.65 22.35 2 21.56 2zM7 4H6V3h1v1zm11 0h-1V3h1v1zm3.89 17H2.11V8h19.78v13z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Google Calendar</h3>
                        <p className="text-beauty-600">Синхронизируйте записи с Google Calendar</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-4 md:mt-0">
                      <Badge variant="outline" className="mr-4 border-yellow-300 text-yellow-700 bg-yellow-50">
                        Не подключено
                      </Badge>
                      <Button className="bg-beauty-500 hover:bg-beauty-600">
                        Подключить
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border border-beauty-100 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-50 rounded-full mr-4">
                        <svg viewBox="0 0 24 24" className="h-8 w-8 text-blue-600" fill="currentColor">
                          <path d="M17.25 17.25H6.75V6.75h5.25V5.25H6.75C5.92 5.25 5.25 5.92 5.25 6.75v10.5c0 .83.67 1.5 1.5 1.5h10.5c.83 0 1.5-.67 1.5-1.5v-5.25h-1.5v5.25zM13.5 5.25v1.5h2.19L9.11 13.33l1.06 1.06 6.58-6.58V10h1.5V5.25H13.5z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Apple Calendar</h3>
                        <p className="text-beauty-600">Синхронизируйте записи с Apple Calendar</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-4 md:mt-0">
                      <Badge variant="outline" className="mr-4 border-yellow-300 text-yellow-700 bg-yellow-50">
                        Не подключено
                      </Badge>
                      <Button className="bg-beauty-500 hover:bg-beauty-600">
                        Подключить
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border border-beauty-100 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-50 rounded-full mr-4">
                        <svg viewBox="0 0 24 24" className="h-8 w-8 text-blue-700" fill="currentColor">
                          <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Microsoft Outlook</h3>
                        <p className="text-beauty-600">Синхронизируйте записи с Outlook Calendar</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-4 md:mt-0">
                      <Badge variant="outline" className="mr-4 border-yellow-300 text-yellow-700 bg-yellow-50">
                        Не подключено
                      </Badge>
                      <Button className="bg-beauty-500 hover:bg-beauty-600">
                        Подключить
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-4">Настройки синхронизации</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Двусторонняя синхронизация</div>
                      <div className="text-sm text-beauty-600">Изменения в любом календаре будут отражаться в других</div>
                    </div>
                    <Switch disabled />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Автоматическое обновление</div>
                      <div className="text-sm text-beauty-600">Обновлять календари каждые 15 минут</div>
                    </div>
                    <Switch disabled />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Видимость для клиентов</div>
                      <div className="text-sm text-beauty-600">Показывать ли клиентам свободные слоты в календаре</div>
                    </div>
                    <Switch disabled />
                  </div>
                </div>
                
                <div className="mt-4 text-center text-beauty-600 text-sm">
                  Для использования этих настроек, пожалуйста, подключите хотя бы один календарь
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messaging" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Интеграция с мессенджерами</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border border-beauty-100 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-50 rounded-full mr-4">
                        <svg viewBox="0 0 24 24" className="h-8 w-8 text-green-600" fill="currentColor">
                          <path d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">WhatsApp Business</h3>
                        <p className="text-beauty-600">Общайтесь с клиентами через WhatsApp</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-4 md:mt-0">
                      <Badge variant="outline" className="mr-4 border-yellow-300 text-yellow-700 bg-yellow-50">
                        Не подключено
                      </Badge>
                      <Button className="bg-beauty-500 hover:bg-beauty-600">
                        Подключить
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border border-beauty-100 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-50 rounded-full mr-4">
                        <svg viewBox="0 0 24 24" className="h-8 w-8 text-blue-500" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.46 7.12l-1.97 9.38c-.06.29-.32.5-.62.5H9.13c-.29 0-.55-.21-.62-.5l-1.97-9.38c-.07-.33.16-.63.49-.63h9.94c.33 0 .56.3.49.63z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Telegram</h3>
                        <p className="text-beauty-600">Общайтесь с клиентами через Telegram</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-4 md:mt-0">
                      <Badge variant="outline" className="mr-4 border-yellow-300 text-yellow-700 bg-yellow-50">
                        Не подключено
                      </Badge>
                      <Button className="bg-beauty-500 hover:bg-beauty-600">
                        Подключить
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-4">Настройки автоматических сообщений</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Подтверждение записи</div>
                        <div className="text-sm text-beauty-600">Отправлять сообщение после создания записи</div>
                      </div>
                      <Switch disabled />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Напоминание о визите</div>
                        <div className="text-sm text-beauty-600">Отправлять напоминание за день до визита</div>
                      </div>
                      <Switch disabled />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Запрос отзыва</div>
                        <div className="text-sm text-beauty-600">Отправлять запрос отзыва после визита</div>
                      </div>
                      <Switch disabled />
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center text-beauty-600 text-sm">
                    Для использования этих настроек, пожалуйста, подключите хотя бы один мессенджер
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="docs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Архив документов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-6 border-2 border-dashed border-beauty-200 rounded-lg text-center mb-6">
                <Upload className="h-10 w-10 mx-auto text-beauty-400 mb-2" />
                <h3 className="font-medium text-lg mb-2">Загрузите документы</h3>
                <p className="text-beauty-600 mb-4">
                  Перетащите файлы сюда или нажмите кнопку ниже для загрузки документов
                </p>
                <Button className="bg-beauty-500 hover:bg-beauty-600">Выбрать файлы</Button>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium mb-2">Документы клиентов</h3>
                
                <div className="space-y-4">
                  {[
                    { client: "Елена Петрова", type: "Договор", date: "15.04.2025", size: "256 KB" },
                    { client: "Светлана Иванова", type: "Согласие на обработку персональных данных", date: "10.04.2025", size: "128 KB" },
                    { client: "Мария Соколова", type: "Договор", date: "05.04.2025", size: "256 KB" },
                  ].map((doc, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-beauty-100 pb-4 last:border-0">
                      <div>
                        <h4 className="font-medium text-beauty-900">{doc.client}</h4>
                        <div className="text-sm text-beauty-700">{doc.type}</div>
                        <div className="text-sm text-beauty-600">
                          Загружен: {doc.date} • Размер: {doc.size}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2 md:mt-0">
                        <Button variant="outline" size="sm">
                          Просмотреть
                        </Button>
                        <Button variant="outline" size="sm">
                          Скачать
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-2">Шаблоны документов</h3>
                
                <div className="space-y-4">
                  {[
                    { name: "Договор оказания услуг", type: "PDF" },
                    { name: "Согласие на обработку персональных данных", type: "DOCX" },
                    { name: "Карта клиента", type: "PDF" },
                  ].map((template, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-beauty-100 pb-4 last:border-0">
                      <div className="flex items-center">
                        <div className="p-2 mr-3">
                          <Archive className="h-5 w-5 text-beauty-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">{template.name}</h4>
                          <div className="text-sm text-beauty-600">Тип файла: {template.type}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Редактировать
                        </Button>
                        <Button variant="outline" size="sm">
                          Использовать
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationsPanel;
