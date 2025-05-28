
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Shield, User, Scissors } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const RoleSelector = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRoleSelect = (role: string) => {
    localStorage.setItem('userRole', role);
    
    toast({
      title: "Успешный вход",
      description: `Вы вошли как ${role === 'admin' ? 'администратор' : role === 'specialist' ? 'мастер' : 'клиент'}`,
    });
    
    switch(role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'specialist':
        navigate('/specialist/dashboard');
        break;
      case 'client':
        navigate('/client/dashboard');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      <Card className="hover:shadow-md transition-all cursor-pointer border-beauty-100" 
        onClick={() => handleRoleSelect('admin')}>
        <CardHeader className="text-center pb-2">
          <Shield className="w-12 h-12 mx-auto text-beauty-600" />
          <CardTitle>Администратор</CardTitle>
          <CardDescription>Управление всем салоном</CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-beauty-600">
          <p>Полный доступ к управлению салоном, клиентами, мастерами и маркетингом</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-beauty-500 hover:bg-beauty-600">
            Войти как администратор
          </Button>
        </CardFooter>
      </Card>

      <Card className="hover:shadow-md transition-all cursor-pointer border-beauty-100" 
        onClick={() => handleRoleSelect('specialist')}>
        <CardHeader className="text-center pb-2">
          <Scissors className="w-12 h-12 mx-auto text-beauty-600" />
          <CardTitle>Мастер</CardTitle>
          <CardDescription>Личный кабинет специалиста</CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-beauty-600">
          <p>Доступ к расписанию, клиентам, доходам и персональной статистике</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-beauty-500 hover:bg-beauty-600">
            Войти как мастер
          </Button>
        </CardFooter>
      </Card>

      <Card className="hover:shadow-md transition-all cursor-pointer border-beauty-100" 
        onClick={() => handleRoleSelect('client')}>
        <CardHeader className="text-center pb-2">
          <User className="w-12 h-12 mx-auto text-beauty-600" />
          <CardTitle>Клиент</CardTitle>
          <CardDescription>Личный кабинет клиента</CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-beauty-600">
          <p>Запись на услуги, история визитов, бонусы и специальные предложения</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-beauty-500 hover:bg-beauty-600">
            Войти как клиент
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RoleSelector;
