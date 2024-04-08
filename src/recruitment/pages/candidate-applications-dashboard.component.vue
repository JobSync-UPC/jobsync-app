<template>
<div class="space-y-4">
  <h1 class="text-2xl font-semibold">{{$t('navbar.applications')}}</h1>
  <div>
    <pv-data-table :value="user.applications"
                   paginator :rows="5" :rowsPerPageOptions="[5, 10, 20]">
      <pv-column header="Id">
        <template #body="application">
          <div class="flex items-center gap-2">
            <span>{{ application.data.recruitment.id }}</span>
          </div>
        </template>
      </pv-column>
      <pv-column :header="$t('applications.application')">
        <template #body="application">
          <div class="flex items-center gap-2">
            <span>{{ application.data.recruitment.title }}</span>
          </div>
        </template>
      </pv-column>
      <pv-column :header="$t('applications.application-date')">
        <template #body="application">
          <div class="flex items-center gap-2">
            <span>{{ application.data.recruitment.applicationDate }}</span>
          </div>
        </template>
      </pv-column>
      <pv-column :header="$t('applications.current-phase')">
        <template #body="application">
          <div class="flex items-center gap-2">
            <span>{{ application.data.recruitment.currentPhase.title }}</span>
            <i class="pi pi-info-circle" aria-label="Info" />
          </div>
        </template>
      </pv-column>
      <pv-column :header="$t('applications.status')">
        <template #body="application">
          <div class="flex items-center gap-2">
            <pv-tag :value="getTag(application.data.recruitment.isActive)"
                    :severity="getSeverity(application.data.recruitment.isActive)" />
          </div>
        </template>
      </pv-column>
      <pv-column :header="$t('applications.actions')">
        <template #body="application">
          <div class="flex items-center gap-2">
            <pv-button label="Building" text raised />
          </div>
        </template>
      </pv-column>
    </pv-data-table>
  </div>
</div>
</template>

<script>

import {UsersApiService} from "../../shared/services/users.service.js";

export default {
  name: "candidate-applications-dashboard",
  data() {
    return {
      user: {},
      usersApi: new UsersApiService(),
    }
  },
  created(){
    const userId = 3;
    this.usersApi.getById(userId)
        .then(response => this.user = response.data)
        .catch(error => {
          this.countries.push("Error loading user with error ", error);
        })
  },
  methods:{
    getSeverity(isActive){
      return isActive ? 'success' : 'danger';
    },
    getTag(isActive){
      return isActive ? 'Active' : 'Finished';
    }
  }
}
</script>

<style scoped>
</style>