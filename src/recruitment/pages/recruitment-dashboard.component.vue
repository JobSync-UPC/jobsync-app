<template>
  <div v-if="recruitment">
    <div class="grid gap-4">
      <recruitment-card :recruitment="recruitment" />
      <div class="grid md:flex gap-4">
        <pv-button
            class="w-full"
            severity="success"
            :label="$t('recruitment.dashboard.add-phase-lbl')"
        />
        <pv-button
            class="w-full"
            severity="warning"
            :label="$t('recruitment.dashboard.edit-post')"
            @click="openEditJobPostDialog"
        />
        <pv-button
            class="w-full"
            severity="danger"
            :label="recruitment.enabled ? $t('recruitment.dashboard.finish-recruitment'):$t('recruitment.dashboard.reopen')"
            @click="openFinishRecruitmentDialog"
        />
      </div>
      <div class="grid gap-2">
        <h1 class="text-2xl font-bold uppercase text-primary">{{ $t('recruitment.dashboard.phases-title') }}</h1>
        <div class="grid gap-4">
          <recruitment-phase-card
              v-for="phase in recruitment.recruitmentPhases"
              :key="phase.id"
              :phase="phase"
          />
        </div>
      </div>
    </div>


    <pv-dialog v-model:visible="deleteRecruitmentDialog"
               :header="recruitment.enabled ? $t('recruitment.dashboard.finish-recruitment'):$t('recruitment.dashboard.reopen')"
               modal :dismissableMask="true"
               class="w-full md:w-1/3">
      <finish-reopen-recruitment-dialog
          :recruitment="recruitment"
          @updatedRecruitment="updateRecruitment" />
    </pv-dialog>
    <pv-dialog v-model:visible="editJobPostDialog"
               :header="$t('edit-jobPost')"
               modal :dismissableMask="true"
               class="w-full md:w-1/3">
      <edit-jobpost-form
          :jobPost="recruitment.jobPost"
          @updatedJobPost="updateRecruitment" />
    </pv-dialog>
  </div>
  <div v-else>
    <pv-spinner />
  </div>
</template>

<script>
import RecruitmentCard from "../components/recruitment-card.component.vue";
import {RecruitmentApiService} from "../../shared/services/recruitment.service.js";
import RecruitmentPhaseCard from "../components/recruitment-phase-card.component.vue";
import {useUserStore} from "../../shared/store/user-store.store.js";
import {ApplicationsService} from "../../shared/services/applications.service.js";
import FinishReopenRecruitmentDialog from "../components/finish-reopen-recruitment.component.vue";
import EditJobpostForm from "../components/edit-jobpost.component.vue";

export default {
  name: "recruitment-dashboard",
  components: {EditJobpostForm, FinishReopenRecruitmentDialog, RecruitmentPhaseCard, RecruitmentCard},
  data() {
    return {
      recruitmentApi: new RecruitmentApiService(),
      applicationsApi: new ApplicationsService(),
      recruitment: null,
      applicants: null,
      newPhaseTitle: '',
      newPhaseDescription: '',
      deleteRecruitmentDialog: false,
      editJobPostDialog: false
    }
  },
  created() {
    this.updateRecruitment();
  },
  methods: {
    openFinishRecruitmentDialog() {
      this.deleteRecruitmentDialog = true;
    },
    openEditJobPostDialog() {
      this.editJobPostDialog = true;
    },
    updateRecruitment() {
      this.recruitment = null;

      const recruitmentId = this.$route.params.id;
      const userStore = useUserStore();
      const companyId = userStore.user.company.id;

      this.recruitmentApi.isRecruitmentProcessFromCompany(recruitmentId, companyId)
          .then(response => {
            if (response.data === false) {
              this.$router.push({name: '404'});
            } else {
              this.recruitmentApi.getRecruitmentProcessById(recruitmentId)
                  .then(response => {
                    this.recruitment = response.data
                    this.applicationsApi.getApplicationsRecruitmentProcessId(recruitmentId)
                        .then(response => {
                          this.applicants = response.data;
                        });
                  });
            }
          });
      this.deleteRecruitmentDialog = false;
      this.editJobPostDialog = false;
    }

  }
}
</script>