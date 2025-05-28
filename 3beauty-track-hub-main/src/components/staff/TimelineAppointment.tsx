
import React from 'react';
import { type Appointment } from './types/staffTypes';
import { useTheme } from '@/contexts/ThemeContext';

interface TimelineAppointmentProps {
  appointment: Appointment;
  slotTime: string;
  slotSpan: number;
}

export const TimelineAppointment: React.FC<TimelineAppointmentProps> = ({
  appointment,
  slotTime,
  slotSpan
}) => {
  const { primaryColor } = useTheme();
  
  // Determine status for styling based on the current primary color theme
  let statusColor = "bg-primary/20 border-primary/40";
  if (appointment.status === "confirmed") statusColor = "bg-primary/10 border-primary";
  if (appointment.status === "completed") statusColor = "bg-green-100 dark:bg-green-900/30 border-green-500";
  if (appointment.status === "pending") statusColor = "bg-amber-100 dark:bg-amber-900/30 border-amber-500";
  if (appointment.status === "cancelled") statusColor = "bg-red-100 dark:bg-red-900/30 border-red-500";
  if (appointment.isNew) statusColor = "bg-primary/10 border-primary ring-2 ring-primary/30";
  
  return (
    <div 
      key={appointment.id}
      className={`absolute top-0 left-0 h-full ${statusColor} border-l-4 p-2 overflow-hidden transition-colors duration-200`}
      style={{ 
        width: `${slotSpan * 100}%`,
        zIndex: 10
      }}
    >
      <div className="flex flex-col h-full text-xs">
        <p className="font-medium">{appointment.clientName}</p>
        <p className="text-primary/70 dark:text-primary/90">{appointment.time} - {appointment.endTime}</p>
        <p className="text-foreground/70 line-clamp-2">{appointment.service}</p>
      </div>
    </div>
  );
};
