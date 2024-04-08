<template>
  <div>
    <pv-button
      rounded
      outlined
      aria-label="Go back"
      @click="$router.back()"
    >
      <i class="pi pi-arrow-left mr-2" />Go back
    </pv-button>
    <div class="flex justify-center items-center h-full">
      <div class="w-full max-w-xl py-4">
        <organization-creation-form />
      </div>
    </div>
  </div>
</template>

<script>
import OrganizationCreationForm from "../components/organization-creation-form.component.vue";

export default {
  name: "organization-creation",
  components: {OrganizationCreationForm},
}
</script>

<style scoped>

</style>