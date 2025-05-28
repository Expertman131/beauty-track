
import { Branch, Staff, StaffMember, UserRole, UserPermissions } from "../../staff/types/staffTypes";

// Get permissions based on user role
export const getRolePermissions = (role: UserRole): UserPermissions => {
  switch (role) {
    case "admin":
      return {
        viewAllBranches: true,
        editAllBranches: true,
        manageBranchStaff: true,
        viewBranchReports: true,
        manageBranchServices: true,
        manageBranchInventory: true
      };
    case "manager":
      return {
        viewAllBranches: true,
        editAllBranches: false,
        manageBranchStaff: true,
        viewBranchReports: true,
        manageBranchServices: true,
        manageBranchInventory: true
      };
    case "specialist":
      return {
        viewAllBranches: false,
        editAllBranches: false,
        manageBranchStaff: false,
        viewBranchReports: false,
        manageBranchServices: false,
        manageBranchInventory: false
      };
    case "client":
      return {
        viewAllBranches: true,
        editAllBranches: false,
        manageBranchStaff: false,
        viewBranchReports: false,
        manageBranchServices: false,
        manageBranchInventory: false
      };
  }
};

// Filter staff members by branch
export const filterStaffByBranch = (staff: StaffMember[], branchId: number | null): StaffMember[] => {
  if (!branchId) return staff;
  return staff.filter(s => s.branchId === branchId);
};

// Check if user has permission for a specific action
export const hasPermission = (
  userRole: UserRole,
  permission: keyof UserPermissions
): boolean => {
  const permissions = getRolePermissions(userRole);
  return permissions[permission];
};

// Get branches managed by a staff member
export const getManagedBranches = (branches: Branch[], staffId: number): Branch[] => {
  return branches.filter(branch => branch.managerId === staffId);
};

// Check if a staff member works at a specific branch
export const staffWorksAtBranch = (staff: StaffMember, branchId: number): boolean => {
  return staff.branchId === branchId;
};

// Get all active branches
export const getActiveBranches = (branches: Branch[]): Branch[] => {
  return branches.filter(branch => branch.isActive);
};
