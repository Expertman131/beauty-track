
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Clock } from 'lucide-react';
import { StaffMember } from '@/components/staff/types/staffTypes';
import { format, parse, addMinutes, isWithinInterval } from 'date-fns';
import { useBranch } from '@/contexts/BranchContext';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface TimeSlotSelectorProps {
  date: Date | null;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  selectedStaff: StaffMember | null;
  serviceDuration: number;
  branchId?: number;
}

const generateTimeSlots = (
  date: Date | null, 
  staff: StaffMember | null,
  serviceDuration: number,
  branchId?: number
): { morning: TimeSlot[], day: TimeSlot[], evening: TimeSlot[] } => {
  const slots = {
    morning: [] as TimeSlot[],
    day: [] as TimeSlot[],
    evening: [] as TimeSlot[]
  };

  if (!date || !staff) return slots;

  const dateStr = date.toISOString().split('T')[0];
  const workingHours = staff.workingHours?.[dateStr];
  
  // Check if the staff works in this branch (if branch is specified)
  if (branchId !== undefined && staff.branchId !== undefined && staff.branchId !== branchId) {
    return slots;
  }
  
  if (!workingHours || !workingHours.isWorkingDay) return slots;

  const startHour = parseInt(workingHours.start.split(':')[0], 10);
  const startMinute = parseInt(workingHours.start.split(':')[1], 10);
  const endHour = parseInt(workingHours.end.split(':')[0], 10);
  const endMinute = parseInt(workingHours.end.split(':')[1], 10);

  // Create a date object for the working hours
  const startTime = new Date(date);
  startTime.setHours(startHour, startMinute, 0, 0);
  
  const endTime = new Date(date);
  endTime.setHours(endHour, endMinute, 0, 0);

  // Generate time slots in 30-minute intervals
  const slotInterval = 30; // in minutes
  let currentTime = new Date(startTime);

  while (currentTime < endTime) {
    const timeStr = format(currentTime, 'HH:mm');
    const slot = {
      time: timeStr,
      available: true // We would check appointment availability here in a real app
    };

    // Categorize the time slot
    const hour = currentTime.getHours();
    if (hour < 12) {
      slots.morning.push(slot);
    } else if (hour < 18) {
      slots.day.push(slot);
    } else {
      slots.evening.push(slot);
    }

    // Move to next slot
    currentTime = addMinutes(currentTime, slotInterval);
  }

  return slots;
};

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  date,
  selectedTime,
  onSelectTime,
  selectedStaff,
  serviceDuration,
  branchId
}) => {
  const { currentBranch } = useBranch();
  const effectiveBranchId = branchId !== undefined ? branchId : currentBranch?.id;
  
  const { morning, day, evening } = generateTimeSlots(
    date, 
    selectedStaff, 
    serviceDuration,
    effectiveBranchId
  );
  
  const renderTimeSlots = (slots: TimeSlot[], title: string) => {
    if (slots.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h3 className="font-medium text-beauty-800 dark:text-beauty-200 mb-2">{title}</h3>
        <div className="grid grid-cols-3 gap-2">
          {slots.map((slot) => (
            <Button
              key={slot.time}
              variant={selectedTime === slot.time ? "default" : "outline"}
              disabled={!slot.available}
              className={`px-0 ${
                selectedTime === slot.time 
                  ? 'bg-beauty-500 hover:bg-beauty-600 text-white' 
                  : 'bg-white dark:bg-gray-800 hover:bg-beauty-50 dark:hover:bg-beauty-900/10'
              }`}
              onClick={() => onSelectTime(slot.time)}
            >
              <Clock className="mr-1 h-3 w-3" />
              {slot.time}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  if (!date || !selectedStaff) {
    return (
      <div className="py-8 text-center text-gray-500 dark:text-gray-400">
        Пожалуйста, выберите дату и специалиста
      </div>
    );
  }
  
  // If there's a branch mismatch, show appropriate message
  if (effectiveBranchId !== undefined && 
      selectedStaff.branchId !== undefined && 
      selectedStaff.branchId !== effectiveBranchId) {
    return (
      <div className="py-8 text-center text-gray-500 dark:text-gray-400">
        Выбранный специалист работает в другом филиале
      </div>
    );
  }

  return (
    <ScrollArea className="h-[300px]">
      <div className="pr-4">
        {renderTimeSlots(morning, 'Утро')}
        {renderTimeSlots(day, 'День')}
        {renderTimeSlots(evening, 'Вечер')}
        
        {morning.length === 0 && day.length === 0 && evening.length === 0 && (
          <div className="py-8 text-center text-gray-500 dark:text-gray-400">
            Нет доступного времени в этот день
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default TimeSlotSelector;
