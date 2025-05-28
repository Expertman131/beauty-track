
import { parse } from "date-fns";
import { WorkingHours } from "../types/staffTypes";

/**
 * Check if a time slot is outside the working hours
 */
export const isSlotOutsideWorkingHours = (
  slotTime: string,
  isWorkingDay: boolean,
  workStartTime: string,
  workEndTime: string
): boolean => {
  if (!isWorkingDay) return true;
  
  const workStart = parse(workStartTime, 'HH:mm', new Date());
  const workEnd = parse(workEndTime, 'HH:mm', new Date());
  const slotTimeDate = parse(slotTime, 'HH:mm', new Date());
  
  return slotTimeDate < workStart || slotTimeDate >= workEnd;
};

/**
 * Get working hours for a specific date
 */
export const getWorkingHoursForDate = (
  dateString: string, 
  workingHours?: WorkingHours,
  staffWorkingHours?: WorkingHours
): { 
  isWorkingDay: boolean;
  workStartTime: string;
  workEndTime: string;
} => {
  const dayWorkingHours = workingHours?.[dateString] || staffWorkingHours?.[dateString];
  const isWorkingDay = !dayWorkingHours || dayWorkingHours.isWorkingDay !== false;
  
  // Working hours boundaries
  const workStartTime = dayWorkingHours?.start || "09:00";
  const workEndTime = dayWorkingHours?.end || "20:00";
  
  return { isWorkingDay, workStartTime, workEndTime };
};

/**
 * Format time for display
 */
export const formatTimeForDisplay = (time: string): string => {
  try {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  } catch (e) {
    return time;
  }
};

/**
 * Check if a slot is current time
 */
export const isCurrentTimeSlot = (slotTime: string): boolean => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  
  const [slotHour, slotMinute] = slotTime.split(':').map(Number);
  
  return currentHour === slotHour && 
    (currentMinutes >= slotMinute && currentMinutes < slotMinute + 30);
};
