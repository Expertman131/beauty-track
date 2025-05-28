
import React from 'react';
import { TimelineAppointment } from './TimelineAppointment';
import { parse } from 'date-fns';
import { type Appointment } from './types/staffTypes';
import { getAppointmentsForTimeSlot } from './utils/appointmentUtils';

interface TimelineCellProps {
  slotTime: string;
  isOutsideWorkHours: boolean;
  isWorkingDay: boolean;
  appointments: Appointment[];
  onCellClick: (time: string) => void;
}

export const TimelineCell: React.FC<TimelineCellProps> = ({
  slotTime,
  isOutsideWorkHours,
  isWorkingDay,
  appointments,
  onCellClick
}) => {
  if (isOutsideWorkHours) {
    return (
      <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
        {!isWorkingDay ? "Выходной" : ""}
      </div>
    );
  }
  
  const slotAppointments = getAppointmentsForTimeSlot(appointments, slotTime);
  
  if (slotAppointments.length === 0) {
    return (
      <div 
        className="h-full w-full bg-white hover:bg-beauty-50 transition-colors cursor-pointer flex items-center justify-center text-beauty-400"
        onClick={() => onCellClick(slotTime)}
      >
        <span className="text-xs">+</span>
      </div>
    );
  }
  
  return (
    <>
      {slotAppointments.map(app => {
        // Check if appointment starts in this slot
        const isStartSlot = app.time === slotTime;
        
        if (!isStartSlot) return null; // Only show in the starting slot
        
        // Calculate how many slots this appointment spans
        let slotSpan = 1;
        if (app.duration) {
          slotSpan = Math.ceil(app.duration / 30);
        } else if (app.endTime) {
          const startTime = parse(app.time, 'HH:mm', new Date());
          const endTime = parse(app.endTime, 'HH:mm', new Date());
          const diffInMinutes = (endTime.getTime() - startTime.getTime()) / 60000;
          slotSpan = Math.ceil(diffInMinutes / 30);
        }
        
        return (
          <TimelineAppointment 
            key={app.id}
            appointment={app}
            slotTime={slotTime}
            slotSpan={slotSpan}
          />
        );
      })}
    </>
  );
};
