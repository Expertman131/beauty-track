import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User, Bell, Settings, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check for user role in local storage
    const storedRole = localStorage.getItem('userRole');
    setUserRole(storedRole);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    setUserRole(null);
    navigate('/');
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-beauty-100">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-semibold beauty-gradient-text">BeautyTrack</span>
          {userRole && (
            <span className="ml-2 px-2 py-1 bg-beauty-50 text-beauty-600 text-xs rounded-md">
              {userRole === 'admin' && 'Администратор'}
              {userRole === 'specialist' && 'Мастер'}
              {userRole === 'client' && 'Клиент'}
            </span>
          )}
        </Link>
        
        {userRole === 'admin' && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/admin" className="text-beauty-900 hover:text-beauty-600 transition-colors">
              Панель управления
            </Link>
            <Link to="/appointments" className="text-beauty-900 hover:text-beauty-600 transition-colors">
              Записи
            </Link>
            <Link to="/clients" className="text-beauty-900 hover:text-beauty-600 transition-colors">
              Клиенты
            </Link>
            <Link to="/staff" className="text-beauty-900 hover:text-beauty-600 transition-colors">
              Мастера
            </Link>
          </nav>
        )}
        
        {userRole === 'specialist' && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/specialist/dashboard" className="text-beauty-900 hover:text-beauty-600 transition-colors">
              Расписание
            </Link>
            <Link to="/specialist/clients" className="text-beauty-900 hover:text-beauty-600 transition-colors">
              Клиенты
            </Link>
            <Link to="/specialist/revenue" className="text-beauty-900 hover:text-beauty-600 transition-colors">
              Доход
            </Link>
          </nav>
        )}
        
        {userRole === 'client' && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/client/dashboard" className="text-beauty-900 hover:text-beauty-600 transition-colors">
              Личный кабинет
            </Link>
            <Link to="/book-appointment" className="text-beauty-900 hover:text-beauty-600 transition-colors">
              Записаться
            </Link>
          </nav>
        )}
        
        <div className="flex items-center space-x-3">
          {userRole ? (
            <>
              <Button variant="ghost" size="icon" className="text-beauty-600 hover:text-beauty-800 hover:bg-beauty-50">
                <Bell className="h-5 w-5" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-beauty-600 hover:text-beauty-800 hover:bg-beauty-50">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Профиль
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    Настройки
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => navigate('/login')}>
                Войти
              </Button>
              <Button className="bg-beauty-500 hover:bg-beauty-600" onClick={() => navigate('/login')}>
                Регистрация
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
