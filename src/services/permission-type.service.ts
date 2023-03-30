import PermissionType from '@/models/permission-type.model';
import BaseSerivce from '../base/http-clients/service.base';

export default class PermissionTypeService extends BaseSerivce<PermissionType>{
    constructor(public controller = 'PermissionTypes') {
        super(controller);
    }
}
