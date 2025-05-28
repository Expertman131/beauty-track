
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export interface Service {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  includes?: string[];
}

interface ServiceListProps {
  services: Service[];
  selectedServices: string[];
  onSelectService: (serviceId: string, selected: boolean) => void;
  categoryId: string | null;
}

const ServiceList: React.FC<ServiceListProps> = ({
  services,
  selectedServices,
  onSelectService,
  categoryId
}) => {
  const filteredServices = categoryId 
    ? services.filter(service => service.categoryId === categoryId)
    : services;

  if (filteredServices.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500 dark:text-gray-400">
        Пожалуйста, выберите категорию услуг
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-3">
        {filteredServices.map((service) => {
          const isSelected = selectedServices.includes(service.id);
          
          return (
            <div 
              key={service.id}
              className={`rounded-lg border p-4 ${
                isSelected 
                  ? 'bg-beauty-50 dark:bg-beauty-900/20 border-beauty-200 dark:border-beauty-700' 
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex space-x-3">
                  <Checkbox
                    id={`service-${service.id}`}
                    checked={isSelected}
                    onCheckedChange={(checked) => {
                      onSelectService(service.id, checked === true);
                    }}
                    className="mt-1"
                  />
                  <div>
                    <Label 
                      htmlFor={`service-${service.id}`}
                      className="font-medium cursor-pointer text-beauty-900 dark:text-beauty-50"
                    >
                      {service.name}
                    </Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {service.duration} мин • {service.description}
                    </p>
                    
                    {service.includes && service.includes.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Включает:</p>
                        <ul className="text-xs text-gray-500 dark:text-gray-400 mt-1 space-y-1">
                          {service.includes.map((item, index) => (
                            <li key={index} className="flex items-center">
                              <span className="mr-1 text-beauty-500">-</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="font-medium text-beauty-800 dark:text-beauty-200">{service.price} ₽</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default ServiceList;
