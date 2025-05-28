
import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { Service } from './ServiceList';
import { StaffMember } from '@/components/staff/types/staffTypes';

interface BookingSummaryProps {
  selectedServices: Service[];
  selectedDate: Date | null;
  selectedTime: string | null;
  selectedStaff: StaffMember | null;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedServices,
  selectedDate,
  selectedTime,
  selectedStaff
}) => {
  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const totalDuration = selectedServices.reduce((sum, service) => sum + service.duration, 0);
  
  // Calculate end time
  let endTime = '';
  if (selectedTime && totalDuration) {
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    date.setMinutes(date.getMinutes() + totalDuration);
    endTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  }

  return (
    <Card className="border-beauty-200 dark:border-gray-700">
      <CardContent className="p-5">
        <h3 className="font-semibold text-beauty-800 dark:text-beauty-200 mb-4">
          Детали записи
        </h3>
        
        {selectedStaff && (
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
              <img 
                src={selectedStaff.image} 
                alt={selectedStaff.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium">{selectedStaff.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedStaff.specialization}
              </p>
            </div>
          </div>
        )}
        
        {selectedDate && selectedTime && (
          <div className="flex items-center p-3 bg-beauty-50/50 dark:bg-beauty-900/10 rounded-md mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium">
                {format(selectedDate, 'EEEE, d MMMM', { locale: ru })}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedTime} {endTime && `— ${endTime}`}
              </p>
            </div>
          </div>
        )}
        
        {selectedServices.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Услуги</p>
            <div className="space-y-2">
              {selectedServices.map(service => (
                <div key={service.id} className="flex justify-between text-sm">
                  <div>
                    <p>{service.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {service.duration} мин
                    </p>
                  </div>
                  <p className="font-medium">{service.price} ₽</p>
                </div>
              ))}
            </div>
            
            <div className="border-t border-dashed border-gray-200 dark:border-gray-700 my-4"></div>
            
            <div className="flex justify-between">
              <p className="font-medium">Итого</p>
              <p className="font-bold text-beauty-800 dark:text-beauty-200">
                {totalPrice} ₽
              </p>
            </div>
          </div>
        )}
        
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p>Записываясь на услугу, вы соглашаетесь с правилами салона.</p>
          <p className="mt-1">Отмена или перенос записи возможны не позднее чем за 12 часов.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;
