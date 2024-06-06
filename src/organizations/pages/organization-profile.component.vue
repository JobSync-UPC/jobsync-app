<template>
  <div class="space-y-4">
    <div class="justify-center items-center">
      <div v-if="!this.company" class="flex items-center">
        <pv-spinner/>
      </div>
      <div v-else>
        <organization-settings-form
            :currentOrganization="this.company"
            @updatedCompany="updateCompanyInfo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OrganizationSettingsForm from "../components/organization-settings-form.component.vue";
import {useUserStore} from "../../shared/store/user-store.store.js";
import {CompaniesService} from "../service/companies.service.js";

export default {
  name: "organization-profile",
  components: {OrganizationSettingsForm},
  data(){
    return {
      company: null,
      companyService: new CompaniesService(),
    }
  },
  created() {
    this.updateCompanyInfo();
  },
  methods: {
    updateCompanyInfo() {
      const userStore = useUserStore();
      this.companyService.getCompanyById(userStore.user.company.id)
          .then(response => {
            this.company = response.data;
          })
          .catch(error => {
            console.error(error);
          });

    }
  }
}
</script>

<style scoped>
</style>