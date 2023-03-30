<template>
  <div>
    <confirmation
      @ok="confirmRemove"
      :entity-id.sync="idToRemove"
      :show.sync="showModal"
    />
    <b-navbar toggleable type="dark" variant="primary">
      <b-navbar-brand href="#">List of Permissions</b-navbar-brand>
      <b-navbar-nav right class="ml-auto">
        <b-button @click="add" size="sm" class="my-2 my-sm-0" variant="success"
          >Add <b-icon icon="plus" aria-hidden="true"></b-icon
          ></b-button
        >
      </b-navbar-nav>
    </b-navbar>

    <b-table outlined :busy="loading" :items="items" :fields="fields">
      <template #cell(permissionDate)="data">
        {{ data.value | dateShort }}
      </template>

      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>

      <template #cell(permissionTypeDescription)="data">
        {{ data.item.permissionTypeDescription }}
      </template>

      <template #cell(id)="data">
        <b-button-group size="sm">
          <b-button @click="edit(data.value)" variant="warning" style="margin-right: 5px;">
            Edit <b-icon icon="pencil" aria-hidden="true"></b-icon
          ></b-button>
          <b-button @click="remove(data.value)" variant="danger">
            Delete <b-icon icon="x-circle" aria-hidden="true"></b-icon
          ></b-button>
        </b-button-group>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Permission from "@/models/permission.model";
import PermissionService from "../../services/permission.service";
@Component({})
export default class PermissionList extends Vue {
  loading = false;
  showModal = false;
  idToRemove: number | null = null;
  service = new PermissionService();
  items: Permission[] = [];
  fields = [
    new TableField("employeeFirstName", "Name"),
    new TableField("employeeLastName", "LastName"),
    new TableField("permissionTypeDescription", "Permission Type"),
    new TableField("permissionDate", "Permission application date"),
    new TableField("id", "Actions"),
  ];
  created() {
    this.getItems();
  }
  async getItems() {
    try {
      this.loading = true;
      this.items = await this.service.get();
    } catch (error) {
      throw error;
    } finally {
      this.loading = false;
    }
  }
  add() {
    this.$router.push(`add`);
  }
  edit(id: number) {
    this.$router.push(`edit/${id}`);
  }

  remove(id: number) {
    this.showModal = true;
    this.idToRemove = id;
  }
  async confirmRemove(id: number) {
    try {
      await this.service.delete(id);
      this.getItems();
    } catch (error) {
      throw error;
    } finally {
      this.idToRemove = null;
    }
  }
}

class TableField {
  constructor(public key: string, public label: string) {}
}
</script>
<style>
.edit-btn {
  margin-right: 5px;
}
</style>