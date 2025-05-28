
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { useTooltips } from '@/contexts/TooltipsContext';
import { toast } from 'sonner';

export const TooltipSettings = () => {
  const { showTutorialTooltips, toggleTutorialTooltips, resetCompletedTutorials } = useTooltips();

  const handleReset = () => {
    resetCompletedTutorials();
    toast.success('Подсказки были сброшены и будут показаны снова');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки подсказок</CardTitle>
        <CardDescription>
          Управление интерактивными подсказками для новых пользователей
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center">
              <Lightbulb className="mr-2 h-4 w-4 text-primary" />
              <h3 className="text-base font-medium">Интерактивные подсказки</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Показывать подсказки для помощи в навигации по платформе
            </p>
          </div>
          <Switch
            checked={showTutorialTooltips}
            onCheckedChange={toggleTutorialTooltips}
          />
        </div>
        
        <div>
          <Button 
            variant="outline" 
            size="sm"
            className="w-full"
            onClick={handleReset}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Сбросить все подсказки
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            Нажмите, чтобы показать все подсказки снова, включая те, которые вы уже закрыли
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
