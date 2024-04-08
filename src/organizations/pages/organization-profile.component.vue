<template>
  <div class="space-y-4">
    <div>
      <pv-button
          rounded
          outlined
          aria-label="Go back"
          @click="$router.back()"
      >
        <i class="pi pi-arrow-left mr-2" />{{ $t('general.go-back-btn-label')}}
      </pv-button>
      <div class="flex space-x-4 justify-center items-center py-4">
        <div>
          <img
              :src="currentOrganization.avatarUrl"
              alt="Organization Profile Picture"
              class="rounded-3xl w-32 h-32 object-cover hover:scale-95 duration-200"/>
        </div>
        <div class="space-y-2">
          <div>
            <h1 class="text-primary font-medium text-xl">Working on</h1>
            <p class="font-bold text-3xl">{{ currentOrganization.name }}</p>
          </div>
          <router-link to="organizations/settings">
          <pv-button rounded outlined
              :label="$t('organization-profile.organization-settings-label')"/>
          </router-link>
        </div>
      </div>
    </div>
    <div class="justify-center items-center">
      <members-table :members = "currentOrganization.members" />
    </div>
  </div>
</template>

<script>
import MembersTable from "../components/organization-members-table.component.vue"
import {OrganizationApiService} from "../../shared/services/organizations.service.js";

export default {
  name: "organization-profile",
  components: { MembersTable },
  data(){
    return {
      currentOrganizationId: 1,
      currentOrganization: {},
      organizationService: new OrganizationApiService(),
    }
  },
  created(){
    this.organizationService.getCurrentOrganization(this.currentOrganizationId)
        .then(response => this.currentOrganization = response.data)
        .catch(error => {
          console.error('An error occurred with organization:', error);
        });
  }
}
</script>

<style scoped>

</style>