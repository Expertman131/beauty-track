
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StaffMember } from '@/components/staff/types/staffTypes';
import { Star } from 'lucide-react';
import { useBranch } from '@/contexts/BranchContext';

interface StaffSelectorProps {
  staffMembers: StaffMember[];
  selectedStaffId: number | null;
  onSelectStaff: (staffId: number) => void;
  date: Date | null;
  branchId?: number | null;
}

const StaffSelector: React.FC<StaffSelectorProps> = ({
  staffMembers,
  selectedStaffId,
  onSelectStaff,
  date,
  branchId
}) => {
  const { currentBranch } = useBranch();
  const branchToUse = branchId !== undefined ? branchId : (currentBranch?.id || null);
  
  // Filter staff members by branch if specified
  let filteredStaff = staffMembers;
  if (branchToUse !== null) {
    filteredStaff = staffMembers.filter(staff => 
      staff.branchId === undefined || staff.branchId === branchToUse
    );
  }
  
  // Filter staff members to show only those available on the selected date
  const availableStaff = date 
    ? filteredStaff.filter(staff => {
        const dateStr = date.toISOString().split('T')[0];
        return !staff.workingHours || 
               (staff.workingHours[dateStr] && staff.workingHours[dateStr].isWorkingDay);
      })
    : filteredStaff;

  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {availableStaff.map((staff) => {
          const isSelected = staff.id === selectedStaffId;
          const isWorking = date && staff.workingHours?.[date.toISOString().split('T')[0]]?.isWorkingDay;
          
          return (
            <div 
              key={staff.id}
              className={`relative rounded-lg border p-4 cursor-pointer flex flex-col items-center 
                ${isSelected 
                  ? 'bg-beauty-50 dark:bg-beauty-900/20 border-beauty-300 dark:border-beauty-700' 
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-beauty-50/50 dark:hover:bg-beauty-900/10'
                }
                ${isSelected ? 'ring-2 ring-beauty-300 dark:ring-beauty-700' : ''}
              `}
              onClick={() => onSelectStaff(staff.id)}
            >
              <Avatar className="h-16 w-16 mb-2">
                <AvatarImage src={staff.image} alt={staff.name} />
                <AvatarFallback>{staff.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              
              <h4 className="text-sm font-medium text-beauty-900 dark:text-beauty-50 text-center">
                {staff.name}
              </h4>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2">
                {staff.specialization}
              </p>
              
              <div className="flex items-center text-xs text-amber-500">
                <Star className="h-3 w-3 mr-1 fill-amber-500" />
                <span>4.9</span>
              </div>
              
              {staff.position && (
                <Badge 
                  variant="outline" 
                  className={`mt-2 text-xs ${
                    staff.position === 'senior' 
                      ? 'bg-beauty-100 text-beauty-700 dark:bg-beauty-900/30 dark:text-beauty-300 border-beauty-300'
                      : staff.position === 'middle'
                        ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 border-teal-300'
                        : 'bg-lavender-100 text-lavender-700 dark:bg-lavender-900/30 dark:text-lavender-300 border-lavender-300'
                  }`}
                >
                  {staff.position === 'senior' ? 'Ведущий' : staff.position === 'middle' ? 'Мастер' : 'Младший'}
                </Badge>
              )}
              
              {!isWorking && date && (
                <Badge className="absolute top-2 right-2 bg-red-500">Выходной</Badge>
              )}
              
              {staff.branchId && (
                <Badge variant="outline" className="mt-2 text-xs">
                  Филиал #{staff.branchId}
                </Badge>
              )}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default StaffSelector;
