
import { Appointment as AppointmentType, WorkHours, WorkHoursMap } from '../types/staffTypes';

// This is a stub file to ensure the application builds correctly
// Some components may be importing from this file

export interface Appointment extends AppointmentType {
  // Maintaining compatibility with other components
}

export function getAppointmentSlot() {
  // Stub function
  return {};
}

export function checkAvailability() {
  // Stub function
  return true;
}

// Fixed function for TimelineCell
export function getAppointmentsForTimeSlot(appointments: AppointmentType[], slotTime: string): AppointmentType[] {
  if (!appointments || !Array.isArray(appointments)) return [];
  
  return appointments.filter(appointment => {
    // Check if the appointment starts at this time slot
    if (appointment.startTime === slotTime) return true;
    
    // Check if the appointment is ongoing during this time slot
    return false; // Simplified for now
  });
}

// Fixed function to properly handle different work hours formats
export function parseWorkHours(workHoursInput: WorkHours[] | WorkHoursMap): WorkHours[] {
  // Function to parse different working hour formats
  if (!workHoursInput) return [];
  
  // If already in array format, return it
  if (Array.isArray(workHoursInput)) {
    return workHoursInput;
  }
  
  // Convert the object format to array format
  const result: WorkHours[] = [];
  
  // Convert object format to array
  if (workHoursInput && typeof workHoursInput === 'object') {
    Object.keys(workHoursInput).forEach((day) => {
      const dayData = workHoursInput[day];
      if (dayData && typeof dayData === 'object' && 'start' in dayData) {
        const dayDataWithStart = dayData as { start: string; end: string; isWorkingDay: boolean };
        result.push({
          dayOfWeek: parseInt(day, 10) || 0, // Default to Sunday if parsing fails
          startTime: dayDataWithStart.start || "09:00",
          endTime: dayDataWithStart.end || "18:00",
          isWorking: dayDataWithStart.isWorkingDay || false
        });
      }
    });
  }
  
  return result;
}

// Function to filter appointments by branch
export function filterAppointmentsByBranch(appointments: AppointmentType[], branchId: number | null): AppointmentType[] {
  if (!branchId) return appointments;
  return appointments.filter(appointment => appointment.branchId === branchId);
}

// Function to check if a time slot is available for a staff member in a specific branch
export function isTimeSlotAvailableInBranch(
  slotTime: string,
  date: string,
  staffId: number,
  branchId: number,
  appointments: AppointmentType[]
): boolean {
  // Filter appointments by staff, date, and branch
  const staffAppointments = appointments.filter(
    app => app.staffId === staffId && 
           app.date === date && 
           app.branchId === branchId
  );
  
  // Check if the staff member already has an appointment at this time
  return !staffAppointments.some(
    app => app.startTime === slotTime
  );
}
