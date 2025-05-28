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
  User, 
  Users, 
  Scissors, 
  Mail,
  Copy,
  RefreshCw
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Interface definitions
interface AccessUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'specialist' | 'client';
  status: 'active' | 'inactive' | 'pending';
  lastLogin?: string;
  accessGranted: string;
}

const UserAccessManagement = () => {
  // Sample data
  const [users, setUsers] = useState<AccessUser[]>([
    { 
      id: '1', 
      name: 'Анна Петрова', 
      email: 'anna@beautytrack.ru', 
      role: 'client', 
      status: 'active',
      lastLogin: '2 дня назад',
      accessGranted: '10.02.2025' 
    },
    { 
      id: '2', 
      name: 'Елена Сидорова', 
      email: 'elena@beautytrack.ru', 
      role: 'specialist', 
      status: 'active',
      lastLogin: 'Вчера',
      accessGranted: '05.01.2025' 
    },
    { 
      id: '3', 
      name: 'Марина Иванова', 
      email: 'marina@beautytrack.ru', 
      role: 'admin', 
      status: 'active',
      lastLogin: 'Сегодня',
      accessGranted: '15.12.2024' 
    },
    { 
      id: '4', 
      name: 'Сергей Козлов', 
      email: 'sergey@beautytrack.ru', 
      role: 'client', 
      status: 'pending',
      accessGranted: '15.04.2025' 
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AccessUser | null>(null);
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    role: 'client' as 'admin' | 'specialist' | 'client'
  });
  
  // Filtered users based on search and tab
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleInviteSubmit = () => {
    // Here you would send the invitation to your backend
    const newUser: AccessUser = {
      id: Date.now().toString(),
      name: inviteForm.name,
      email: inviteForm.email,
      role: inviteForm.role,
      status: 'pending',
      accessGranted: new Date().toLocaleDateString('ru-RU')
    };
    
    setUsers([...users, newUser]);
    
    toast({
      title: "Приглашение отправлено",
      description: `Приглашение отправлено на адрес ${inviteForm.email}`,
    });
    
    setShowInviteDialog(false);
    setInviteForm({
      name: '',
      email: '',
      role: 'client'
    });
  };
  
  const handleResetPassword = () => {
    if (!selectedUser) return;
    
    // Here you would send the password reset request to your backend
    toast({
      title: "Пароль сброшен",
      description: `Ссылка на сброс пароля отправлена на адрес ${selectedUser.email}`,
    });
    
    setShowResetPasswordDialog(false);
    setSelectedUser(null);
  };
  
  const generateRandomPassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };
  
  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        
        toast({
          title: newStatus === 'active' ? "Пользователь активирован" : "Пользователь деактивирован",
          description: `Статус пользователя ${user.name} изменен`
        });
        
        return {
          ...user,
          status: newStatus as 'active' | 'inactive' | 'pending'
        };
      }
      return user;
    }));
  };
  
  const handleResendInvitation = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    toast({
      title: "Приглашение отправлено повторно",
      description: `Новое приглашение отправлено на адрес ${user.email}`
    });
  };
  
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return { label: 'Администратор', color: 'bg-purple-100 text-purple-800' };
      case 'specialist':
        return { label: 'Мастер', color: 'bg-blue-100 text-blue-800' };
      case 'client':
        return { label: 'Клиент', color: 'bg-green-100 text-green-800' };
      default:
        return { label: role, color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return { label: 'Активен', color: 'bg-green-100 text-green-800' };
      case 'inactive':
        return { label: 'Неактивен', color: 'bg-red-100 text-red-800' };
      case 'pending':
        return { label: 'Ожидает', color: 'bg-yellow-100 text-yellow-800' };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Управление доступом</h2>
        <Button 
          className="bg-beauty-500 hover:bg-beauty-600"
          onClick={() => setShowInviteDialog(true)}
        >
          Пригласить пользователя
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Поиск пользователей..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:max-w-xs"
        />
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Все
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Администраторы
          </TabsTrigger>
          <TabsTrigger value="specialist" className="flex items-center gap-2">
            <Scissors className="h-4 w-4" /> Мастера
          </TabsTrigger>
          <TabsTrigger value="client" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Клиенты
          </TabsTrigger>
        </TabsList>
        
        {['all', 'admin', 'specialist', 'client'].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left">Имя</th>
                      <th className="px-4 py-3 text-left">Email</th>
                      <th className="px-4 py-3 text-left">Роль</th>
                      <th className="px-4 py-3 text-left">Статус</th>
                      <th className="px-4 py-3 text-left">Последний вход</th>
                      <th className="px-4 py-3 text-right">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers
                      .filter(user => tab === 'all' || user.role === tab)
                      .map((user) => (
                        <tr key={user.id} className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3">{user.name}</td>
                          <td className="px-4 py-3">{user.email}</td>
                          <td className="px-4 py-3">
                            <Badge className={getRoleLabel(user.role).color}>
                              {getRoleLabel(user.role).label}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge className={getStatusLabel(user.status).color}>
                              {getStatusLabel(user.status).label}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">{user.lastLogin || 'Никогда'}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowResetPasswordDialog(true);
                                }}
                              >
                                Сброс пароля
                              </Button>
                              
                              {user.status === 'pending' ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleResendInvitation(user.id)}
                                  className="text-yellow-600"
                                >
                                  Отправить повторно
                                </Button>
                              ) : (
                                <Button
                                  variant={user.status === 'active' ? 'destructive' : 'outline'}
                                  size="sm"
                                  onClick={() => handleToggleStatus(user.id)}
                                >
                                  {user.status === 'active' ? 'Деактивировать' : 'Активировать'}
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Invite Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Пригласить пользователя</DialogTitle>
            <DialogDescription>
              Отправить приглашение по электронной почте для создания учетной записи
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input 
                id="name"
                value={inviteForm.name}
                onChange={(e) => setInviteForm({...inviteForm, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email"
                value={inviteForm.email}
                onChange={(e) => setInviteForm({...inviteForm, email: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Роль</Label>
              <select 
                id="role"
                value={inviteForm.role}
                onChange={(e) => setInviteForm({
                  ...inviteForm, 
                  role: e.target.value as 'admin' | 'specialist' | 'client'
                })}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="admin">Администратор</option>
                <option value="specialist">Мастер</option>
                <option value="client">Клиент</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
              Отмена
            </Button>
            <Button 
              onClick={handleInviteSubmit}
              disabled={!inviteForm.name || !inviteForm.email}
              className="bg-beauty-500 hover:bg-beauty-600"
            >
              Отправить приглашение
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reset Password Dialog */}
      <Dialog open={showResetPasswordDialog} onOpenChange={setShowResetPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Сброс пароля</DialogTitle>
            <DialogDescription>
              {selectedUser && `Сброс пароля для пользователя ${selectedUser.name}`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium">Вы можете:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Отправить ссылку для сброса пароля на email пользователя</li>
                <li>Сгенерировать временный пароль</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Временный пароль</Label>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => {
                    navigator.clipboard.writeText(generateRandomPassword());
                    toast({
                      title: "Пароль скопирован",
                      description: "Временный пароль скопирован в буфер обмена"
                    });
                  }}
                >
                  <RefreshCw className="h-4 w-4" /> Сгенерировать
                </Button>
              </div>
              <div className="flex">
                <Input 
                  value={generateRandomPassword()}
                  readOnly
                  className="rounded-r-none"
                />
                <Button 
                  variant="outline" 
                  className="rounded-l-none"
                  onClick={() => {
                    navigator.clipboard.writeText(generateRandomPassword());
                    toast({
                      title: "Пароль скопирован",
                      description: "Временный пароль скопирован в буфер обмена"
                    });
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetPasswordDialog(false)}>
              Отмена
            </Button>
            <Button 
              onClick={handleResetPassword}
              className="bg-beauty-500 hover:bg-beauty-600"
            >
              Отправить ссылку для сброса
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserAccessManagement;
