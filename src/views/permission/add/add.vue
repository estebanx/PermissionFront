<template>
  <div>
    <b-card
      border-variant="primary"
      header="primary"
      header-bg-variant="primary"
      header-text-variant="white"
      header-tag="header"
    >
      <template #header>
        <h6 class="mb-0">Add Permission</h6>
      </template>
      <b-form @submit.stop.prevent="validate" @reset.prevent="onReset">
        <b-form-group
          id="input-group-1"
          label="Name"
          label-for="employeeFirstName"
        >
          <b-form-input
            id="employeeFirstName"
            type="text"
            name="employeeFirstName"
            v-model="model.employeeFirstName"
            placeholder="Required*"
            v-validate="{ required: true }"
            :state="validateState('employeeFirstName')"
            aria-describedby="employeeFirstName-feedback"
            data-vv-as="Name"
          ></b-form-input>
          <b-form-invalid-feedback id="employeeFirstName-feedback">{{
            veeErrors.first("employeeFirstName")
          }}</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Lastname"
          label-for="employeeLastName"
        >
          <b-form-input
            id="employeeLastName"
            type="text"
            name="employeeLastName"
            v-model="model.employeeLastName"
            placeholder="Required*"
            v-validate="{ required: true }"
            :state="validateState('employeeLastName')"
            aria-describedby="employeeLastName-feedback"
            data-vv-as="Lastname"
          ></b-form-input>
          <b-form-invalid-feedback id="employeeLastName-feedback">{{
            veeErrors.first("employeeLastName")
          }}</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Permission type"
          label-for="permissionTypeId"
        >
          <b-form-select
            id="permissionTypeId"
            name="permissionTypeId"
            v-model="model.permissionTypeId"
            :options="types"
            v-validate="{ required: true }"
            :state="validateState('permissionTypeId')"
            aria-describedby="permissionTypeId-feedback"
            data-vv-as="Permission type"
          ></b-form-select>
          <b-form-invalid-feedback id="permissionTypeId-feedback">{{
            veeErrors.first("permissionTypeId")
          }}</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Permission application date"
          label-for="permissionDate"
        >
          <b-form-datepicker
            id="permissionDate"
            v-model="model.permissionDate"
            class="mb-2"
            name="permissionDate"
            v-validate="{ required: true }"
            :state="validateState('permissionDate')"
            aria-describedby="permissionDate-feedback"
            data-vv-as="Permission application date"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            locale="es"
          ></b-form-datepicker>
          <b-form-invalid-feedback id="permissionDate-feedback">{{
            veeErrors.first("permissionDate")
          }}</b-form-invalid-feedback>
        </b-form-group>
        <b-button @click="backToList" type="button" class="float-right">Cancel</b-button>
        <b-button type="submit" class="float-left" variant="success"
          >Save</b-button
        >
        <b-button class="cancel-btn float-left" type="reset" variant="danger"
          >Reset</b-button
        >
      </b-form>
    </b-card>
  </div>
</template>

<script lang="ts" src="./add.ts" />
<style>
.cancel-btn {
  margin-left: 5px;
}
</style>