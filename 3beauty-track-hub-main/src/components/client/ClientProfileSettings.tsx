
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, Key, Bell, Droplet, Heart, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ClientData {
  name: string;
  phone: string;
  email: string;
  // New fields
  skinType: string;
  skinCondition: string;
  allergies: string;
  chronicConditions: string;
  notifications: {
    appointments: boolean;
    marketing: boolean;
    reviews: boolean;
  };
}

interface ClientProfileSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientData: ClientData;
}

const ClientProfileSettings = ({ open, onOpenChange, clientData }: ClientProfileSettingsProps) => {
  const [formData, setFormData] = useState({ 
    ...clientData,
    allergies: clientData.allergies || '',
    chronicConditions: clientData.chronicConditions || '',
    skinType: clientData.skinType || '',
    skinCondition: clientData.skinCondition || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNotificationChange = (key: keyof typeof clientData.notifications) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };
  
  const handleSaveProfile = () => {
    setIsSubmitting(true);
    
    // Here you would send the updated profile to your backend
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Профиль обновлен",
        description: "Изменения успешно сохранены",
      });
    }, 1000);
  };
  
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Пароли не совпадают",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Here you would send the password change request to your backend
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Пароль изменен",
        description: "Ваш пароль успешно обновлен",
      });
      
      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1000);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Настройки профиля
          </DialogTitle>
          <DialogDescription>
            Управляйте вашими личными данными и настройками
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="profile" className="py-2">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Профиль
            </TabsTrigger>
            <TabsTrigger value="medical" className="flex items-center gap-2">
              <Heart className="h-4 w-4" /> Мед. инфо
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Key className="h-4 w-4" /> Безопасность
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" /> Уведомления
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <div>
              <Label htmlFor="name">Имя</Label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input 
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label>Аватар</Label>
              <div className="flex items-center gap-4 mt-2">
                <div className="w-16 h-16 bg-beauty-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-beauty-500">{formData.name.charAt(0)}</span>
                </div>
                <Button variant="outline">Изменить фото</Button>
              </div>
            </div>
            
            <Button 
              onClick={handleSaveProfile} 
              disabled={isSubmitting}
              className="bg-beauty-500 hover:bg-beauty-600 w-full mt-4"
            >
              {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
            </Button>
          </TabsContent>
          
          {/* New Medical Information Tab */}
          <TabsContent value="medical" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="skinType" className="flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-beauty-500" />
                  Тип кожи по Фицпатрику
                </Label>
                <Select 
                  value={formData.skinType} 
                  onValueChange={(value) => handleSelectChange('skinType', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Выберите тип кожи" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="I">I - Очень светлая, всегда сгорает</SelectItem>
                    <SelectItem value="II">II - Светлая, обычно сгорает</SelectItem>
                    <SelectItem value="III">III - Средняя, иногда сгорает</SelectItem>
                    <SelectItem value="IV">IV - Оливковая, редко сгорает</SelectItem>
                    <SelectItem value="V">V - Смуглая, очень редко сгорает</SelectItem>
                    <SelectItem value="VI">VI - Темная, никогда не сгорает</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="skinCondition">Состояние кожи</Label>
                <Select
                  value={formData.skinCondition} 
                  onValueChange={(value) => handleSelectChange('skinCondition', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Выберите состояние кожи" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oily">Жирная</SelectItem>
                    <SelectItem value="dry">Сухая</SelectItem>
                    <SelectItem value="normal">Нормальная</SelectItem>
                    <SelectItem value="combination">Комбинированная</SelectItem>
                    <SelectItem value="sensitive">Чувствительная</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="allergies" className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-beauty-500" />
                  Аллергии
                </Label>
                <Textarea
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  placeholder="Например: латекс, лидокаин, никель и т.д."
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="chronicConditions" className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-beauty-500" />
                  Хронические заболевания
                </Label>
                <Textarea
                  id="chronicConditions"
                  name="chronicConditions"
                  value={formData.chronicConditions}
                  onChange={handleInputChange}
                  placeholder="Например: диабет, гипертония и т.д."
                  className="mt-1"
                />
              </div>
              
              <Button 
                onClick={handleSaveProfile} 
                disabled={isSubmitting}
                className="bg-beauty-500 hover:bg-beauty-600 w-full mt-4"
              >
                {isSubmitting ? 'Сохранение...' : 'Сохранить медицинскую информацию'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Текущий пароль</Label>
                <Input 
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="newPassword">Новый пароль</Label>
                <Input 
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <Input 
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <Button 
                onClick={handleChangePassword} 
                disabled={isSubmitting || !currentPassword || !newPassword || !confirmPassword}
                className="bg-beauty-500 hover:bg-beauty-600 w-full mt-2"
              >
                {isSubmitting ? 'Сохранение...' : 'Изменить пароль'}
              </Button>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-2">Сессии и устройства</h4>
              <div className="space-y-2 text-sm">
                {[
                  { device: 'Chrome на Windows', lastActive: 'Сейчас', current: true },
                  { device: 'Safari на iPhone', lastActive: '2 дня назад', current: false },
                  { device: 'Firefox на macOS', lastActive: '3 недели назад', current: false },
                ].map((session, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{session.device}</p>
                      <p className="text-beauty-600">{session.lastActive} {session.current && '(Текущая сессия)'}</p>
                    </div>
                    {!session.current && (
                      <Button variant="outline" size="sm">Выйти</Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Напоминания о записях</h4>
                  <p className="text-sm text-beauty-600">СМС и email-уведомления о предстоящих процедурах</p>
                </div>
                <input 
                  type="checkbox" 
                  className="toggle toggle-beauty" 
                  checked={formData.notifications.appointments}
                  onChange={() => handleNotificationChange('appointments')}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Маркетинговые рассылки</h4>
                  <p className="text-sm text-beauty-600">Акции, скидки и специальные предложения</p>
                </div>
                <input 
                  type="checkbox" 
                  className="toggle toggle-beauty" 
                  checked={formData.notifications.marketing}
                  onChange={() => handleNotificationChange('marketing')}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Запросы на отзывы</h4>
                  <p className="text-sm text-beauty-600">Напоминания оставить отзыв после посещения</p>
                </div>
                <input 
                  type="checkbox" 
                  className="toggle toggle-beauty" 
                  checked={formData.notifications.reviews}
                  onChange={() => handleNotificationChange('reviews')}
                />
              </div>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-2">Каналы связи</h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="notificationEmail">Email для уведомлений</Label>
                  <Input 
                    id="notificationEmail"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    name="email"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="notificationPhone">Телефон для уведомлений</Label>
                  <Input 
                    id="notificationPhone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    name="phone"
                    className="mt-1"
                  />
                </div>
                
                <Button 
                  onClick={handleSaveProfile} 
                  disabled={isSubmitting}
                  className="bg-beauty-500 hover:bg-beauty-600 w-full mt-2"
                >
                  {isSubmitting ? 'Сохранение...' : 'Сохранить настройки'}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Закрыть</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientProfileSettings;
