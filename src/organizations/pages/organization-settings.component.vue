<template>
  <div>
    <pv-button
        rounded
        outlined
        aria-label="Go back"
        @click="$router.back()"
    >
      <i class="pi pi-arrow-left mr-2"/> {{ $t('general.go-back-btn-label') }}
    </pv-button>
    <div class="flex justify-center items-center h-full">
      <div class="w-full max-w-xl py-4">
        <organization-settings-form></organization-settings-form>
      </div>
    </div>
  </div>


</template>

<script>
import OrganizationSettingsForm from "../components/organization-settings-form.component.vue";

export default {
  name: "organization-settings.component",
  components: {OrganizationSettingsForm}
}
</script>

<style scoped>

</style>