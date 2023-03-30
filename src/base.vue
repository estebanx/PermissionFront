<template>
  <div>
    <br>
    <router-view />
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BaseVue extends Vue {
}
</script>