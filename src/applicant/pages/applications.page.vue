<template>
  <div v-if="applications">
    <pv-data-table :value="applications">
      <template #header>
        <div class="flex justify-between">
          <span class="text-xl text-900 font-bold">{{ $t('navbar.applications') }}</span>
          <pv-button icon="pi pi-refresh" rounded raised @click="updateApplications" severity="success" />
        </div>
      </template>
      <pv-column field="id" header="#" />
      <pv-column :header="$t('company')">
        <template #body="slotProps">
          <div class="flex gap-2 items-center">
            <div class="flex justify-center items-center shadow w-24 h-24 p-4">
              <img
                  :src="slotProps.data.recruitmentProcess.company.logoUrl"
                  alt="Company logo"
                  class="object-cover"
              />
            </div>
            <div>
              <a :href="formatUrl(slotProps.data.recruitmentProcess.company.website)" target="_blank" class="font-bold text-primary underline">
                {{ slotProps.data.recruitmentProcess.company.name }}
              </a>
              <p>
                {{ slotProps.data.recruitmentProcess.company.country }}
              </p>
            </div>
          </div>
        </template>
      </pv-column>
      <pv-column :header="$t('job')">
        <template #body="slotProps">
          <span>{{ slotProps.data.recruitmentProcess.jobPost.title }}</span>
        </template>
      </pv-column>
      <pv-column :header="$t('recruitment-phase')">
        <template #body="slotProps">
          <span>{{ slotProps.data.currentRecruitmentPhase.title }}</span>
        </template>
      </pv-column>
      <pv-column :header="$t('application-date')">
        <template #body="slotProps">
          <span>{{ formatDate(slotProps.data.application_date) }}</span>
        </template>
      </pv-column>
      <pv-column :header="$t('phase-description')">
        <template #body="slotProps">
          <span>{{ slotProps.data.currentRecruitmentPhase.description }}</span>
        </template>
      </pv-column>
      <pv-column :header="$t('active')">
        <template #body="slotProps">
          <div v-if="slotProps.data.recruitmentProcess.enabled === true">
            <pv-button :label="$t('active')" severity="success" />
          </div>
          <div v-else>
            <pv-button :label="$t('finished')" severity="danger" />
          </div>
        </template>
      </pv-column>
      <pv-column :header="$t('actions')">
        <template #body="slotProps">
          <pv-button
              rounded
              severity="secondary"
              :disabled="slotProps.data.recruitmentProcess.enabled === false"
              icon="pi pi-ellipsis-h"
          />
        </template>
      </pv-column>
    </pv-data-table>
  </div>
  <div v-else>
    <div class="flex items-center justify-center">
      <pv-spinner />
    </div>
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
      this.applications = null;
      const userStore = useUserStore();
      const applicantId = userStore.user.id;

      this.applicationService.getApplicationsByApplicantId(applicantId).then(
          response => {
            this.applications = response.data;
          }
      ).catch(e => {
        console.log(e);
      });
    },
    formatUrl(url) {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return 'https://' + url;
      }
      return url;
    },
    formatDate(date) {
      if (!date) return "";
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(date).toLocaleDateString('en-US', options);
    },
    getPassedDays(date) {
      if (!date) return "";
      const today = new Date();
      const createdDate = new Date(date);
      const diffTime = today - createdDate;

      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        return diffHours + (diffHours === 1 ? " hour" : " hours");
      }

      return diffDays + (diffDays === 1 ? " day" : " days");
    }
  }
}

</script>