
import { parse, isWithinInterval, isAfter, isBefore } from "date-fns";

export interface Appointment {
  id: string;
  clientName: string;
  service: string;
  time: string;
  endTime?: string;
  date: string;
  duration?: number;
  staffId: number;
  status?: "confirmed" | "pending" | "cancelled" | "completed";
  isNew?: boolean;
}

/**
 * Checks if an appointment falls within the given time slot
 */
export const isAppointmentInTimeSlot = (appointment: Appointment, slotTime: string): boolean => {
  const appointmentDate = new Date(appointment.date);
  const appointmentStart = parse(appointment.time, 'HH:mm', appointmentDate);
  
  // If there's endTime, use it, otherwise calculate from duration
  let appointmentEnd;
  if (appointment.endTime) {
    appointmentEnd = parse(appointment.endTime, 'HH:mm', appointmentDate);
  } else if (appointment.duration) {
    appointmentEnd = new Date(appointmentStart.getTime() + appointment.duration * 60000);
  } else {
    // Default to 1 hour appointment
    appointmentEnd = new Date(appointmentStart.getTime() + 60 * 60000);
  }
  
  const slotStart = parse(slotTime, 'HH:mm', appointmentDate);
  
  // For 30-minute slots
  const slotDurationMinutes = 30;
  const slotEnd = new Date(slotStart.getTime() + slotDurationMinutes * 60000);
  
  // Check interval overlap
  return (
    // Appointment start falls within slot
    isWithinInterval(appointmentStart, { start: slotStart, end: slotEnd }) ||
    // Appointment end falls within slot
    isWithinInterval(appointmentEnd, { start: slotStart, end: slotEnd }) ||
    // Slot is completely inside appointment
    (isBefore(appointmentStart, slotStart) && isAfter(appointmentEnd, slotEnd))
  );
};

/**
 * Get all appointments for a specific time slot
 */
export const getAppointmentsForTimeSlot = (
  appointments: Appointment[], 
  slotTime: string
): Appointment[] => {
  return appointments.filter(app => isAppointmentInTimeSlot(app, slotTime));
};
