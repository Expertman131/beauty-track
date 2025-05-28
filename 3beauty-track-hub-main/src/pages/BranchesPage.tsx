
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Branch } from '@/components/staff/types/staffTypes';
import { useBranch } from '@/contexts/BranchContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  Users, 
  Scissors, 
  Package, 
  Edit, 
  Trash, 
  Plus, 
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { format } from 'date-fns';

const colorOptions = [
  { value: 'beauty', label: 'Розовый' },
  { value: 'teal', label: 'Бирюзовый' },
  { value: 'lavender', label: 'Лавандовый' }
];

const BranchesPage = () => {
  const { branches, addBranch, updateBranch, deleteBranch, setCurrentBranch } = useBranch();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentEditBranch, setCurrentEditBranch] = useState<Branch | null>(null);
  const [formData, setFormData] = useState<Partial<Branch>>({
    name: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    isActive: true,
    color: 'beauty'
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isActive: checked }));
  };

  const handleColorChange = (color: string) => {
    setFormData(prev => ({ ...prev, color }));
  };

  const handleAddBranch = () => {
    const newBranch: Branch = {
      id: Math.max(0, ...branches.map(b => b.id)) + 1,
      name: formData.name || 'Новый филиал',
      address: formData.address || 'Адрес не указан',
      phone: formData.phone || 'Телефон не указан',
      email: formData.email || '',
      description: formData.description || '',
      image: `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 8) + 1}.jpg`,
      isActive: formData.isActive !== undefined ? formData.isActive : true,
      createdAt: new Date().toISOString(),
      color: formData.color || 'beauty'
    };

    addBranch(newBranch);
    setIsAddDialogOpen(false);
    resetForm();
    
    toast({
      title: "Филиал добавлен",
      description: `${newBranch.name} успешно добавлен в систему`,
    });
  };

  const handleEditBranch = () => {
    if (!currentEditBranch) return;

    const updatedBranch: Branch = {
      ...currentEditBranch,
      name: formData.name || currentEditBranch.name,
      address: formData.address || currentEditBranch.address,
      phone: formData.phone || currentEditBranch.phone,
      email: formData.email || currentEditBranch.email,
      description: formData.description || currentEditBranch.description,
      isActive: formData.isActive !== undefined ? formData.isActive : currentEditBranch.isActive,
      color: formData.color || currentEditBranch.color
    };

    updateBranch(updatedBranch);
    setIsEditDialogOpen(false);
    setCurrentEditBranch(null);
    resetForm();
    
    toast({
      title: "Филиал обновлен",
      description: `${updatedBranch.name} успешно обновлен`,
    });
  };

  const handleDeleteBranch = () => {
    if (!currentEditBranch) return;
    
    deleteBranch(currentEditBranch.id);
    setIsDeleteDialogOpen(false);
    setCurrentEditBranch(null);
    
    toast({
      title: "Филиал удален",
      description: `${currentEditBranch.name} успешно удален из системы`,
      variant: "destructive"
    });
  };

  const openEditDialog = (branch: Branch) => {
    setCurrentEditBranch(branch);
    setFormData({
      name: branch.name,
      address: branch.address,
      phone: branch.phone,
      email: branch.email,
      description: branch.description,
      isActive: branch.isActive,
      color: branch.color
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (branch: Branch) => {
    setCurrentEditBranch(branch);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
      description: '',
      isActive: true,
      color: 'beauty'
    });
  };

  const handleSelectBranch = (branch: Branch) => {
    setCurrentBranch(branch);
    toast({
      title: "Филиал выбран",
      description: `${branch.name} установлен как текущий филиал`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-24 mb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold beauty-gradient-text mb-4 md:mb-0">Филиалы</h1>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-beauty-500 hover:bg-beauty-600">
                  <Plus className="mr-2 h-4 w-4" /> Добавить филиал
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Добавить новый филиал</DialogTitle>
                  <DialogDescription>
                    Заполните информацию о новом филиале вашей сети
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="name">Название филиала</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <Label htmlFor="address">Адрес</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
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
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <Label htmlFor="description">Описание</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>Цветовая схема</Label>
                      <div className="mt-1 flex gap-3">
                        {colorOptions.map(color => (
                          <button
                            key={color.value}
                            type="button"
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                              formData.color === color.value 
                                ? `border-gray-900 dark:border-white` 
                                : 'border-transparent'
                            }`}
                            onClick={() => handleColorChange(color.value)}
                          >
                            <span className={`w-6 h-6 rounded-full bg-${color.value}-500`}></span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Label htmlFor="isActive" className="cursor-pointer">Активен</Label>
                      <Switch
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={handleSwitchChange}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button className="bg-beauty-500 hover:bg-beauty-600" onClick={handleAddBranch}>
                    Добавить филиал
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Desktop view - Table */}
          <div className="hidden lg:block">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Филиал</TableHead>
                    <TableHead>Адрес</TableHead>
                    <TableHead>Контакты</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {branches.map((branch) => (
                    <TableRow key={branch.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-10 bg-${branch.color}-500 rounded-full`}></div>
                          <div>
                            {branch.name}
                            <div className="text-xs text-muted-foreground mt-1">
                              Создан: {format(new Date(branch.createdAt), "dd.MM.yyyy")}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{branch.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{branch.phone}</span>
                          </div>
                          {branch.email && (
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{branch.email}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {branch.isActive ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Активен
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                            <XCircle className="h-3 w-3 mr-1" /> Неактивен
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleSelectBranch(branch)}
                          >
                            Выбрать
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openEditDialog(branch)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => openDeleteDialog(branch)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
          
          {/* Mobile view - Cards */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
            {branches.map((branch) => (
              <Card key={branch.id} className={`border-l-4 border-${branch.color}-500`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{branch.name}</CardTitle>
                    {branch.isActive ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Активен
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-100 text-gray-800">
                        Неактивен
                      </Badge>
                    )}
                  </div>
                  <CardDescription>
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{branch.address}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span>{branch.phone}</span>
                    </div>
                    {branch.email && (
                      <div className="flex items-center space-x-2">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span>{branch.email}</span>
                      </div>
                    )}
                    {branch.description && (
                      <p className="mt-2 text-muted-foreground">{branch.description}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSelectBranch(branch)}
                  >
                    Выбрать
                  </Button>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openEditDialog(branch)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-500"
                      onClick={() => openDeleteDialog(branch)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Редактировать филиал</DialogTitle>
            <DialogDescription>
              Обновите информацию о филиале
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="edit-name">Название филиала</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="edit-address">Адрес</Label>
                <Input
                  id="edit-address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-phone">Телефон</Label>
                <Input
                  id="edit-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="edit-description">Описание</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label>Цветовая схема</Label>
                <div className="mt-1 flex gap-3">
                  {colorOptions.map(color => (
                    <button
                      key={color.value}
                      type="button"
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        formData.color === color.value 
                          ? `border-gray-900 dark:border-white` 
                          : 'border-transparent'
                      }`}
                      onClick={() => handleColorChange(color.value)}
                    >
                      <span className={`w-6 h-6 rounded-full bg-${color.value}-500`}></span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Label htmlFor="edit-isActive" className="cursor-pointer">Активен</Label>
                <Switch
                  id="edit-isActive"
                  checked={formData.isActive}
                  onCheckedChange={handleSwitchChange}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Отмена
            </Button>
            <Button className="bg-beauty-500 hover:bg-beauty-600" onClick={handleEditBranch}>
              Сохранить изменения
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Удалить филиал</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить филиал "{currentEditBranch?.name}"? Это действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Отмена
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteBranch}
            >
              Удалить филиал
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default BranchesPage;
