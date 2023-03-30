import BaseEntity from '@/base/models/base.model';

export default class Permission extends BaseEntity {
    employeeFirstName: string = ''; 
    employeeLastName: string = '';
    permissionDate: Date = new Date();
    permissionTypeId?: number | null = null;
    permissionTypeDescription: string = '';
}