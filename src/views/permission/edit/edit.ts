import SelectItem from "@/base/models/select-item.model";
import PermissionType from "@/models/permission-type.model";
import Permission from "@/models/permission.model";
import PermissionTypeService from "@/services/permission-type.service";
import { AxiosResponse } from "axios";
import { Component, Vue } from "vue-property-decorator";
import PermissionService from "../../../services/permission.service";
@Component
export default class PermissionEdit extends Vue {
  service = new PermissionService();
  permissionTypeService = new PermissionTypeService();
  saving = false;
  model = new Permission();
  initModel = new Permission();
  id = 0;
  permissionTypes: PermissionType[] = [];
  created() {
    this.id = Number.parseInt(this.$route.params.id);
    this.getPermissionTypes();
    this.getData();
  }
  get types() {
    let data = this.permissionTypes.map((x) => new SelectItem(x.id, x.description));
    data.unshift(new SelectItem(null, "Select a permission type"));
    return data;
  }
  async getPermissionTypes() {
    this.permissionTypes = await this.permissionTypeService.get();
  }
  onReset() {
    this.model = JSON.parse(JSON.stringify(this.initModel));
    this.$nextTick(() => this.$validator.reset());
  }
  async getData() {
    this.initModel = await this.service.getById(this.id);
    this.model = JSON.parse(JSON.stringify(this.initModel));
  }

  async validate() {
    const result = await this.$validator.validateAll();
    if (result) this.edit();
    this.$validator.errors.items.forEach((error) => {
      this.$bvToast.toast(error.msg, {
        title: `Error de validación`,
        variant: "danger",
        solid: true,
      });
    });
  }
  async edit() {
    try {
      this.saving = true;
      await this.service.update(this.model);
      this.onReset();
      this.backToList();
    } catch (errors: any) {
      const response = errors.response as AxiosResponse<any>;
      if (response && response.status === 422) {
        response.data.forEach((error: any) => {
          this.$bvToast.toast(error.errorMessage, {
            title: `Error de validación`,
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