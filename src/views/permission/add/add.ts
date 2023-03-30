import Permission from "@/models/permission.model";
import PermissionService from "../../../services/permission.service";
import { Component, Vue } from "vue-property-decorator";
import PermissionTypeService from "@/services/permission-type.service";
import PermissionType from "@/models/permission-type.model";
import { AxiosResponse } from "axios";
import SelectItem from "@/base/models/select-item.model";
import HttpStatusCode  from '@/base/utils/http-status-code';

@Component({})
export default class PermissionAdd extends Vue {
  service = new PermissionService();
  permissionTypeService = new PermissionTypeService();
  saving = false;
  model = new Permission();
  permissionTypes: PermissionType[] = [];
  created() {
    this.getPermissionTypes();
  }
  onReset() {
    this.model = new Permission();
    this.$nextTick(() => this.$validator.reset());
  }
  get types() {
    let data = this.permissionTypes.map((x) => new SelectItem(x.id, x.description));
    data.unshift(new SelectItem(null, "Select a permission type"));
    return data;
  }
  async getPermissionTypes() {
    this.permissionTypes = await this.permissionTypeService.get();
  }

  async validate() {
    const result = await this.$validator.validateAll();
    if (result) this.add();
    this.$validator.errors.items.forEach((error) => {
      this.$bvToast.toast(error.msg, {
        title: `Validation error`,
        variant: "danger",
        solid: true,
      });
    });
  }
  async add() {
    try {
      this.saving = true;
      await this.service.add(this.model);
      this.onReset();
      this.backToList();
    } catch (errors: any) {
      const response = errors.response as AxiosResponse<any>;
      if (response && response.status === HttpStatusCode.UNPROCESSABLE_ENTITY) {
        response.data.forEach((error: any) => {
          this.$bvToast.toast(error.errorMessage, {
            title: `Validation error`,
            variant: "danger",
            solid: true,
          });
        });
      }
    } finally {
      this.saving = false;
    }
  }
  backToList() {
    this.$router.push(`/`);
  }
  validateState(ref: string) {
    let self = this as any;
    const dirty = self?.veeFields[ref]?.dirty;
    const validated = self?.veeFields[ref]?.validated;
    const hasContextToValidate = self.veeFields[ref] && (dirty || validated);
    return hasContextToValidate ? !self.veeErrors.has(ref) : null;
  }
}