// Existing types
export interface Staff {
  id: number;
  name: string;
  specialization: string;
  avatar?: string;
  bio?: string;
  ratings?: number;
  workingHours?: WorkHours[];
  appointmentDuration?: number; // in minutes
  // Add these for compatibility with components
  position?: string;
  image?: string;
  // Add branch relationship
  branchId?: number;
}

export interface WorkHours {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startTime: string; // format: "HH:MM"
  endTime: string; // format: "HH:MM"
  isWorking: boolean;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  staffId: number;
  serviceId: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  notes?: string;
  color?: string;
  // Add these for compatibility with other components
  service?: string;
  time?: string;
  isNew?: boolean;
  // For TimelineCell compatibility
  duration?: number;
  // Add branch relationship
  branchId?: number;
}

// Updated Treatment interface with "need-attention" status
export interface Treatment {
  id: string;
  name: string;
  date: string;
  nextDate?: string;
  status: "active" | "completed" | "schedule-soon" | "need-attention";
  staffName: string;
  staffId: number;
  clientId: string;
  progress: number;
  color?: string;
  notes?: string;
  productsUsed?: string[];
  history?: TreatmentHistoryItem[];
  result?: string; // Added for ProceduresPage
  // Add branch relationship
  branchId?: number;
}

export interface TreatmentHistoryItem {
  date: string;
  procedure: string;
  staffName: string;
  staffId?: number; // Added staffId to fix errors
  productsUsed?: string[];
  notes?: string;
  branchId?: number;
}

export interface ClientFormData {
  name: string;
  phone: string;
  email: string;
  birthDate?: string;
  notes?: string;
  // Add branch relationship or preferences
  preferredBranchId?: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
  image?: string;
  color?: string;
}

export interface Service {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  duration: number; // in minutes
  price: number;
  color?: string;
  image?: string;
  // Services can be available in specific branches or all
  availableInBranches?: number[];
}

// Updated StaffMember for compatibility with all components
export interface StaffMember extends Omit<Staff, 'workingHours'> {
  // Additional properties used in components
  position?: string;
  image?: string;
  workingHours?: WorkHours[] | WorkHoursMap;
  branchId?: number;
}

// Define an interface for the different workHours format
export interface WorkHoursMap {
  [date: string]: { 
    start: string;
    end: string;
    isWorkingDay: boolean;
  }
}

// Fixed for consistency - making these explicitly an array type
export type WorkingHours = WorkHours[];

// Define ClientDiaryEntry type for compatibility
export interface ClientDiaryEntry {
  id: string;
  date: string;
  content: string;
  mood: "good" | "neutral" | "bad";
  images?: string[];
  clientId: string;
  treatmentId?: string;
  // Add branch relationship
  branchId?: number;
}

// Define SpecialistNote type for compatibility
export interface SpecialistNote {
  id: string;
  date: string;
  content: string;
  authorId: number;
  authorName: string;
  treatmentId: string;
  branchId?: number;
}

// Add feedback specific type
export interface TreatmentFeedback {
  id: string;
  treatmentId: string;
  clientId: string;
  staffId: number;
  date: string;
  rating: number;
  comment: string;
  response?: string;
  responseDate?: string;
  isPublic?: boolean;
  branchId?: number;
}

// New types for branch management
export interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  email?: string;
  workingHours?: WorkHoursMap;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  managerId?: number; // Reference to a staff member who manages this branch
  color?: string;
}

// User role for access control
export type UserRole = "admin" | "manager" | "specialist" | "client";

// User permissions based on roles
export interface UserPermissions {
  viewAllBranches: boolean;
  editAllBranches: boolean;
  manageBranchStaff: boolean;
  viewBranchReports: boolean;
  manageBranchServices: boolean;
  manageBranchInventory: boolean;
}
