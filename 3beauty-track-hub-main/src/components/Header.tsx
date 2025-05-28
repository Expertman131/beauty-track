
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HeaderThemeToggle } from '@/components/ui/header-theme-toggle';
import { HeaderBranchSelector } from '@/components/ui/header-branch-selector';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    setShowMobileMenu(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow z-50 py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <button 
            onClick={() => navigate('/')} 
            className="font-bold text-xl text-beauty-600 dark:text-beauty-400"
          >
            BeautySalon
          </button>
          
          {/* Add the branch selector here */}
          <HeaderBranchSelector />
        </div>
        
        <div className="hidden lg:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-beauty-700 dark:text-beauty-300">Услуги</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-beauty-400 to-beauty-500 p-6 no-underline outline-none focus:shadow-md"
                          href="/book-appointment"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium text-white">
                            Записаться
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Быстрая запись онлайн без звонка
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="/services/face"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-beauty-50 dark:hover:bg-beauty-900/10 hover:text-beauty-900 focus:bg-beauty-50 focus:text-beauty-900"
                        >
                          <div className="text-sm font-medium leading-none">Уход за лицом</div>
                          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
                            Комплексные процедуры для красоты вашей кожи
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="/services/nails"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-beauty-50 dark:hover:bg-beauty-900/10 hover:text-beauty-900 focus:bg-beauty-50 focus:text-beauty-900"
                        >
                          <div className="text-sm font-medium leading-none">Маникюр и педикюр</div>
                          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
                            Профессиональный уход за вашими ногтями
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="/services/hair"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-beauty-50 dark:hover:bg-beauty-900/10 hover:text-beauty-900 focus:bg-beauty-50 focus:text-beauty-900"
                        >
                          <div className="text-sm font-medium leading-none">Волосы</div>
                          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
                            Стрижки, окрашивание и восстановление волос
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="/services/massage"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-beauty-50 dark:hover:bg-beauty-900/10 hover:text-beauty-900 focus:bg-beauty-50 focus:text-beauty-900"
                        >
                          <div className="text-sm font-medium leading-none">Массаж и SPA</div>
                          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
                            Релаксация и омоложение вашего тела
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button className={navigationMenuTriggerStyle()} onClick={() => navigate('/procedures')}>
                  Процедуры
                </button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button className={navigationMenuTriggerStyle()} onClick={() => navigate('/appointments')}>
                  Записи
                </button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button className={navigationMenuTriggerStyle()} onClick={() => navigate('/clients')}>
                  Клиенты
                </button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button className={navigationMenuTriggerStyle()} onClick={() => navigate('/branches')}>
                  Филиалы
                </button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Button onClick={() => navigate('/admin')} variant="outline" className="ml-4">
            Панель управления
          </Button>
          
          <Button onClick={() => navigate('/book-appointment')} className="bg-beauty-500 hover:bg-beauty-600">
            Записаться
          </Button>

          <HeaderThemeToggle />
        </div>
        
        <div className="lg:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/book-appointment')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
          </Button>
          
          <HeaderThemeToggle />
          
          <Button variant="ghost" size="icon" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12"/>
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="4" y1="18" x2="20" y2="18"/>
            </svg>
          </Button>
        </div>
      </div>
      
      {showMobileMenu && (
        <div className="lg:hidden container mx-auto px-4 py-2 border-t border-gray-200 dark:border-gray-800">
          <ul className="flex flex-col space-y-1">
            <li><button className="w-full text-left py-2 text-beauty-700 dark:text-beauty-300" onClick={() => handleNavigation('/book-appointment')}>Записаться</button></li>
            <li><button className="w-full text-left py-2" onClick={() => handleNavigation('/procedures')}>Процедуры</button></li>
            <li><button className="w-full text-left py-2" onClick={() => handleNavigation('/appointments')}>Записи</button></li>
            <li><button className="w-full text-left py-2" onClick={() => handleNavigation('/clients')}>Клиенты</button></li>
            <li><button className="w-full text-left py-2" onClick={() => handleNavigation('/branches')}>Филиалы</button></li>
            <li><button className="w-full text-left py-2" onClick={() => handleNavigation('/admin')}>Панель управления</button></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
