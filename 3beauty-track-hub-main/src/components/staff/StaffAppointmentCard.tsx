
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  service: string;
  services?: string[];
  time: string;
  endTime?: string;
  date: string;
  duration?: number;
  staffId: number;
  profit?: number;
  status?: "confirmed" | "pending" | "cancelled" | "completed";
  notes?: string;
  isNew?: boolean;
}

interface StaffMember {
  id: number;
  name: string;
  specialization: string;
  image: string;
}

interface StaffAppointmentCardProps {
  appointment: Appointment;
  staff?: StaffMember;
  onViewDetails: () => void;
  showDate?: boolean;
}

export const StaffAppointmentCard: React.FC<StaffAppointmentCardProps> = ({
  appointment,
  staff,
  onViewDetails,
  showDate = false
}) => {
  // Определить статус для отображения
  const getStatusBadge = () => {
    switch (appointment.status) {
      case 'confirmed':
        return <Badge className="bg-beauty-500">Подтверждено</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Ожидает</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Отменено</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Выполнено</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className={`overflow-hidden ${appointment.isNew ? 'ring-2 ring-beauty-300' : ''}`}>
      <div className={`h-1 ${
        appointment.status === 'confirmed' ? 'bg-beauty-500' :
        appointment.status === 'pending' ? 'bg-amber-500' :
        appointment.status === 'cancelled' ? 'bg-red-500' :
        appointment.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
      }`} />
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-beauty-500" />
            <span className="font-medium">{appointment.time}</span>
            {appointment.endTime && (
              <span className="text-beauty-600">- {appointment.endTime}</span>
            )}
          </div>
          {getStatusBadge()}
        </div>
        
        {showDate && (
          <div className="flex items-center mb-3">
            <Calendar className="h-4 w-4 text-beauty-500 mr-2" />
            <span>{format(new Date(appointment.date), 'dd.MM.yyyy, EEEE', { locale: ru })}</span>
          </div>
        )}
        
        <div className="flex items-center mb-3">
          <User className="h-4 w-4 text-beauty-500 mr-2" />
          <span>{appointment.clientName}</span>
        </div>
        
        <div className="mb-3">
          <p className="font-medium mb-1">Услуги:</p>
          <div className="flex flex-wrap gap-1">
            {(appointment.services || [appointment.service]).map((service, idx) => (
              <span 
                key={idx}
                className="text-xs px-2 py-1 bg-beauty-50 text-beauty-700 rounded-full"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
        
        {staff && (
          <div className="flex items-center space-x-3 mb-3">
            <img 
              src={staff.image} 
              alt={staff.name} 
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm">{staff.name}</span>
          </div>
        )}
        
        {appointment.profit !== undefined && (
          <div className="text-sm font-medium mb-3">
            Стоимость: {appointment.profit.toLocaleString()} ₽
          </div>
        )}
        
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            className="text-beauty-500 border-beauty-200"
            onClick={onViewDetails}
          >
            Подробнее
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
