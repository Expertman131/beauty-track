
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Check, Palette, Sun, Moon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ColorOption {
  value: string;
  label: string;
  className: string;
  textClass: string;
}

const colorOptions: ColorOption[] = [
  { 
    value: 'beauty', 
    label: 'Розовый', 
    className: 'bg-beauty-500', 
    textClass: 'text-beauty-500' 
  },
  { 
    value: 'teal', 
    label: 'Бирюзовый', 
    className: 'bg-teal-500', 
    textClass: 'text-teal-500' 
  },
  { 
    value: 'lavender', 
    label: 'Лавандовый', 
    className: 'bg-lavender-500', 
    textClass: 'text-lavender-500' 
  },
  { 
    value: 'blue', 
    label: 'Синий', 
    className: 'bg-blue-500', 
    textClass: 'text-blue-500' 
  },
  { 
    value: 'green', 
    label: 'Зеленый', 
    className: 'bg-green-500', 
    textClass: 'text-green-500' 
  },
  { 
    value: 'purple', 
    label: 'Фиолетовый', 
    className: 'bg-purple-500', 
    textClass: 'text-purple-500' 
  },
];

export const ThemeSettings = () => {
  const { theme, toggleTheme, primaryColor, setPrimaryColor } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки оформления</CardTitle>
        <CardDescription>
          Настройте внешний вид сайта
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="mb-3 block">Тема оформления</Label>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              {theme === 'light' ? 
                <Sun className="h-4 w-4 text-amber-500" /> : 
                <Moon className="h-4 w-4 text-indigo-400" />
              }
              {theme === 'light' ? 'Светлая тема' : 'Темная тема'}
            </span>
            <ThemeToggle />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Palette className="h-4 w-4 text-primary" />
            <Label className="block">Основной цвет сайта</Label>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {colorOptions.map((color) => (
              <div 
                key={color.value}
                className={`
                  relative cursor-pointer rounded-md p-1 ring-2 transition-all
                  ${primaryColor === color.value ? 'ring-ring' : 'ring-transparent hover:ring-accent'}
                `}
                onClick={() => setPrimaryColor(color.value as any)}
              >
                <div className={`h-16 w-full rounded-sm ${color.className} flex items-center justify-center`}>
                  {primaryColor === color.value && (
                    <Check className="h-6 w-6 text-white" />
                  )}
                </div>
                <p className={`mt-1 text-center text-xs ${color.textClass}`}>
                  {color.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <Tabs defaultValue="general">
          <TabsList className="w-full">
            <TabsTrigger value="general" className="flex-1">Общие</TabsTrigger>
            <TabsTrigger value="fonts" className="flex-1">Шрифты</TabsTrigger>
            <TabsTrigger value="advanced" className="flex-1">Дополнительно</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="pt-4 space-y-4">
            <div className="grid gap-3">
              <Label>Радиус скругления</Label>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-sm bg-primary/20 border border-primary/30"></div>
                <div className="h-8 w-8 rounded-md bg-primary/20 border border-primary/30"></div>
                <div className="h-8 w-8 rounded-lg bg-primary/20 border border-primary/30"></div>
                <div className="h-8 w-8 rounded-xl bg-primary/20 border border-primary/30"></div>
                <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/30"></div>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Насыщенность цветов</Label>
              <div className="grid grid-cols-5 gap-2">
                <div className="h-8 bg-primary/20 rounded-md"></div>
                <div className="h-8 bg-primary/40 rounded-md"></div>
                <div className="h-8 bg-primary/60 rounded-md"></div>
                <div className="h-8 bg-primary/80 rounded-md"></div>
                <div className="h-8 bg-primary rounded-md"></div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="fonts" className="pt-4 space-y-4">
            <div className="space-y-2">
              <Label>Семейство шрифтов</Label>
              <RadioGroup defaultValue="montserrat" className="grid gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="montserrat" id="montserrat" />
                  <Label htmlFor="montserrat" className="font-montserrat">Montserrat</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="roboto" id="roboto" />
                  <Label htmlFor="roboto" style={{fontFamily: 'system-ui'}}>Roboto</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="opensans" id="opensans" />
                  <Label htmlFor="opensans" style={{fontFamily: 'sans-serif'}}>Open Sans</Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="pt-4 space-y-4">
            <div className="space-y-2">
              <Label>Анимации</Label>
              <RadioGroup defaultValue="standard" className="grid gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard">Стандартные</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reduced" id="reduced" />
                  <Label htmlFor="reduced">Уменьшенные</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none">Отключены</Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
