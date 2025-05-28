
import React from 'react';
import { format } from "date-fns";
import { TimelineCell } from './TimelineCell';
import { isSlotOutsideWorkingHours, getWorkingHoursForDate } from './utils/workHoursUtils';
import { type StaffMember, type Appointment, type WorkHours } from './types/staffTypes';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { parseWorkHours } from './utils/appointmentUtils';

interface StaffTimelineProps {
  staff: StaffMember;
  appointments: Appointment[];
  selectedDate: Date;
  timeSlots: string[];
  onCellClick: (time: string) => void;
  workingHours?: WorkHours[];
}

export const StaffTimeline: React.FC<StaffTimelineProps> = ({
  staff,
  appointments,
  selectedDate,
  timeSlots,
  onCellClick,
  workingHours
}) => {
  // Get date string and working hours info
  const dateString = format(selectedDate, 'yyyy-MM-dd');
  const { isWorkingDay, workStartTime, workEndTime } = getWorkingHoursForDate(
    dateString,
    workingHours || [],
    staff.workingHours ? parseWorkHours(staff.workingHours) : []
  );
  
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  
  // Filter the time slots to only show relevant ones on mobile
  const displayTimeSlots = isMobile 
    ? timeSlots.filter(slot => {
        // On mobile, only show slots every hour or active working hours
        const hour = parseInt(slot.split(':')[0], 10);
        const minutes = parseInt(slot.split(':')[1], 10);
        return minutes === 0 || !isSlotOutsideWorkingHours(slot, isWorkingDay, workStartTime, workEndTime);
      })
    : timeSlots;
  
  return (
    <div className="overflow-hidden">
      <ScrollArea className={`w-full ${isMobile ? 'h-[300px]' : 'h-auto'}`}>
        <div className="grid" style={{ 
          gridTemplateColumns: isMobile 
            ? `minmax(120px, 30%) repeat(${displayTimeSlots.length}, minmax(70px, 1fr))` 
            : `minmax(200px, 1fr) repeat(${timeSlots.length}, minmax(80px, 1fr))` 
        }}>
          {/* Staff info */}
          <div className="border-b p-3 flex items-center space-x-3 sticky left-0 bg-background z-10 shadow-sm">
            <img 
              src={staff.image} 
              alt={staff.name} 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="overflow-hidden">
              <p className="font-medium truncate">{staff.name}</p>
              <p className="text-xs text-primary/60 dark:text-primary/80 truncate">{staff.specialization}</p>
              {staff.workingHours && typeof staff.workingHours === 'object' && !Array.isArray(staff.workingHours) && staff.workingHours[dateString] && (
                <p className="text-xs text-primary/70 dark:text-primary/90 mt-1">
                  {staff.workingHours[dateString].isWorkingDay 
                    ? `${staff.workingHours[dateString].start} - ${staff.workingHours[dateString].end}` 
                    : 'Выходной'}
                </p>
              )}
            </div>
          </div>
          
          {/* Time slots */}
          {(isMobile ? displayTimeSlots : timeSlots).map((slot) => {
            const isOutsideWorkHours = isSlotOutsideWorkingHours(
              slot, 
              isWorkingDay, 
              workStartTime, 
              workEndTime
            );
            
            return (
              <div key={slot} className={`border-b border-l p-0 ${isMobile ? 'h-12' : 'h-16'} relative`}>
                <TimelineCell
                  slotTime={slot}
                  isOutsideWorkHours={isOutsideWorkHours}
                  isWorkingDay={isWorkingDay}
                  appointments={appointments}
                  onCellClick={onCellClick}
                />
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
