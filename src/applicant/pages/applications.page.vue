<template>
  <div v-if="applications">
    <pv-data-table :value="applications">
      <template #header>
        <div class="flex justify-between">
          <span class="text-xl text-900 font-bold">{{ $t('navbar.applications') }}</span>
          <pv-button icon="pi pi-refresh" rounded raised @click="updateApplications" severity="success" />
        </div>
      </template>
      <pv-column field="id" header="Company" />
      <pv-column header="Company">
        <template #body="slotProps">
          <span>{{ this.getRecruitmentProcess(slotProps.data.recruitmentProcessId).id }}</span>
        </template>
      </pv-column>
      <pv-column field="is_active" header="isActive" />
    </pv-data-table>
  </div>
  <div v-else>
    <pv-spinner />
  </div>
</template>

<script>
import {useUserStore} from "../../shared/store/user-store.store.js";
import {ApplicationsService} from "../../shared/services/applications.service.js";
import {RecruitmentApiService} from "../../shared/services/recruitment.service.js";

export default {
  name: "jobs-posts-page",
  components: {  },
  data(){
    return {
      applications: null,
      applicationService: new ApplicationsService(),
      recruitmentProcessService: new RecruitmentApiService()
    }
  },
  created(){
    this.updateApplications();

  },
  methods: {
    updateApplications(){
      const userStore = useUserStore();
      const applicantId = userStore.user.id;

      this.applicationService.getApplicationsByApplicantId(applicantId).then(
          response => {
            const _applications = response.data;

            this.applications = _applications.map (
                async application => {
                  return {
                    applicationId: application.id,
                    recruitmentProcessId: application.recruitmentProcessId,
                    is_active: application.is_active
                  }
                }
            )
          }
      ).catch(e => {
        console.log(e);
      });
    },
    async getRecruitmentProcess(id){
      this.recruitmentProcessService.getRecruitmentProcessById(id).then(
          response => {
            console.log(response.data)
            return response.data;
          }
      ).catch(e => {
        return "Error"
      });
    }
  }
}

</script>