
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { format, addDays, startOfWeek, eachDayOfInterval } from 'date-fns';
import { ru } from 'date-fns/locale';

interface WorkingDay {
  start: string;
  end: string;
  isWorkingDay: boolean;
}

interface WorkingHours {
  [date: string]: WorkingDay;
}

interface StaffWorkingHoursProps {
  staffId: number;
  selectedDate: Date;
  workingHours?: WorkingHours;
  onSave: (staffId: number, workingHours: WorkingHours) => void;
  onCancel: () => void;
}

// Временные интервалы для выбора начала и окончания рабочего дня
const TIME_OPTIONS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", 
  "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
];

// Шаблоны графиков работы
const SCHEDULE_TEMPLATES = {
  default: { start: "09:00", end: "20:00", isWorkingDay: true },
  morning: { start: "08:00", end: "14:00", isWorkingDay: true },
  evening: { start: "14:00", end: "21:00", isWorkingDay: true },
  shortDay: { start: "10:00", end: "16:00", isWorkingDay: true },
  dayOff: { start: "09:00", end: "20:00", isWorkingDay: false }
};

export const StaffWorkingHours: React.FC<StaffWorkingHoursProps> = ({
  staffId,
  selectedDate,
  workingHours = {},
  onSave,
  onCancel
}) => {
  // Текущая выбранная дата для редактирования
  const [editDate, setEditDate] = useState<Date>(selectedDate);
  
  // Текущие настройки рабочего дня
  const [currentSettings, setCurrentSettings] = useState<WorkingDay>(
    SCHEDULE_TEMPLATES.default
  );
  
  // Локальная копия графика работы для редактирования
  const [localWorkingHours, setLocalWorkingHours] = useState<WorkingHours>(workingHours);
  
  // При изменении даты загружаем настройки для этой даты, если они есть
  useEffect(() => {
    const dateString = format(editDate, 'yyyy-MM-dd');
    if (localWorkingHours[dateString]) {
      setCurrentSettings(localWorkingHours[dateString]);
    } else {
      // По умолчанию рабочий день с 9 до 20
      setCurrentSettings(SCHEDULE_TEMPLATES.default);
    }
  }, [editDate, localWorkingHours]);
  
  // Обновление настроек текущего дня
  const updateDaySettings = (settings: Partial<WorkingDay>) => {
    setCurrentSettings(prev => ({ ...prev, ...settings }));
  };
  
  // Сохранение настроек для текущего дня
  const saveCurrentDaySettings = () => {
    const dateString = format(editDate, 'yyyy-MM-dd');
    setLocalWorkingHours(prev => ({
      ...prev,
      [dateString]: currentSettings
    }));
  };
  
  // Применить шаблон графика для текущего дня
  const applyTemplate = (template: keyof typeof SCHEDULE_TEMPLATES) => {
    setCurrentSettings(SCHEDULE_TEMPLATES[template]);
  };
  
  // Применить график на всю неделю
  const applyToWeek = () => {
    const firstDay = startOfWeek(editDate, { weekStartsOn: 1 });
    const weekDays = eachDayOfInterval({
      start: firstDay,
      end: addDays(firstDay, 6)
    });
    
    const updatedHours = { ...localWorkingHours };
    weekDays.forEach(day => {
      const dateString = format(day, 'yyyy-MM-dd');
      updatedHours[dateString] = { ...currentSettings };
    });
    
    setLocalWorkingHours(updatedHours);
  };
  
  // Финальное сохранение всех настроек
  const handleSave = () => {
    // Сохраняем текущий день перед отправкой всех настроек
    saveCurrentDaySettings();
    onSave(staffId, localWorkingHours);
  };

  return (
    <div className="space-y-6 pt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Календарь для выбора дня */}
        <div>
          <h3 className="text-lg font-medium mb-3">Выберите дату</h3>
          <Calendar
            mode="single"
            selected={editDate}
            onSelect={(date) => date && setEditDate(date)}
            locale={ru}
            className="rounded-md border"
          />
          
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Шаблоны графика:</h4>
            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => applyTemplate('default')}
              >
                Стандартный (9-20)
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => applyTemplate('morning')}
              >
                Утренний (8-14)
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => applyTemplate('evening')}
              >
                Вечерний (14-21)
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => applyTemplate('shortDay')}
              >
                Сокращенный (10-16)
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="text-red-500 border-red-300"
                onClick={() => applyTemplate('dayOff')}
              >
                Выходной
              </Button>
            </div>
          </div>
        </div>
        
        {/* Настройки рабочего дня */}
        <div>
          <h3 className="text-lg font-medium mb-3">
            Настройки для {format(editDate, 'dd.MM.yyyy, EEEE', { locale: ru })}
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="is-working-day"
                checked={currentSettings.isWorkingDay}
                onCheckedChange={(checked) => updateDaySettings({ isWorkingDay: checked })}
              />
              <Label htmlFor="is-working-day">Рабочий день</Label>
            </div>
            
            <div className={currentSettings.isWorkingDay ? "" : "opacity-50 pointer-events-none"}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Начало работы</Label>
                  <Select
                    value={currentSettings.start}
                    onValueChange={(value) => updateDaySettings({ start: value })}
                    disabled={!currentSettings.isWorkingDay}
                  >
                    <SelectTrigger id="start-time">
                      <SelectValue placeholder="Выберите время" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_OPTIONS.map((time) => (
                        <SelectItem key={`start-${time}`} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="end-time">Окончание работы</Label>
                  <Select
                    value={currentSettings.end}
                    onValueChange={(value) => updateDaySettings({ end: value })}
                    disabled={!currentSettings.isWorkingDay}
                  >
                    <SelectTrigger id="end-time">
                      <SelectValue placeholder="Выберите время" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_OPTIONS.map((time) => (
                        <SelectItem 
                          key={`end-${time}`} 
                          value={time}
                          disabled={time <= currentSettings.start}
                        >
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4 bg-beauty-500 hover:bg-beauty-600" 
                onClick={saveCurrentDaySettings}
              >
                Сохранить для этого дня
              </Button>
            </div>
            
            <div className="pt-4 border-t">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={applyToWeek}
              >
                Применить этот график ко всей неделе
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button onClick={handleSave}>
          Сохранить изменения
        </Button>
      </div>
    </div>
  );
};
