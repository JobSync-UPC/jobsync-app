<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 items-center justify-center">
      <div class="flex flex-col gap-4">
        <pv-button rounded outlined
            @click="$router.back()"
            :label="$t('general.go-back-btn-label')"
            icon="pi pi-arrow-left"
        />
        <pv-button rounded outlined
            aria-label="Add phase"
            :label="$t('recruitment.dashboard.add-phase-lbl')"
            @click="addPhaseDialog = true"
        />
        <pv-button rounded outlined
            aria-label="Add Candidates"
            :label="$t('recruitment.dashboard.add-candidates-lbl')"
            @click="addCandidatesDialog = true"
        />
        <pv-button rounded outlined
            aria-label="Recruitment Settings"
            :label="$t('recruitment.dashboard.recruitment-settings-lbl')"
            @click="recruitmentSettingDialog = true"
        />
      </div>
      <div class="gap-4">
        <div class="space-y-2">
          <div class="flex gap-2 overflow-x-auto">
            <div class="bg-purple-600 dark:bg-purple-950 px-2 py-2 rounded-xl text-white">
              <p class="font-medium">
                <i class="pi pi-user" />
                {{ candidates.length }}
                {{ $t('recruitment.dashboard.candidates-counter')}}
              </p>
            </div>
            <div class="bg-red-600 dark:bg-red-950 px-2 py-2 rounded-xl text-white">
              <p class="font-medium">
                <i class="pi pi-user" />
                {{ phases.length }}
                {{ $t('recruitment.dashboard.phases-counter')}}
              </p>
            </div>
          </div>
          <div class="flex">
            <recruitment-card :recruitment="recruitment" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex space-x-4 overflow-x-auto" v-if="recruitment && phases">
      <recruitment-phase-card v-for="phase in phases" :key="phase.id" :phase="phase"/>
    </div>
  </div>

  <pv-dialog v-model:visible="addPhaseDialog"
             modal
             class="w-1/3"
             :header="$t('recruitment.create-phase.title')">
    <form v-on:submit="savePhase($event)">
      <div class="grid gap-2">
        <pv-input
            required
            v-model="phaseTitle"
            type="text"
            :placeholder="$t('recruitment.create-phase.title-placeholder')"
        />
        <pv-input
            v-model="phaseDescription"
            type="text"
            :placeholder="$t('recruitment.create-recruitment.description-placeholder')"
        />
        <pv-button outlined type="submit" :label="$t('recruitment.create-phase.create-submit-lbl')" />
      </div>
    </form>
  </pv-dialog>

  <pv-dialog v-model:visible="addCandidatesDialog" modal header="Building">
    <template #footer>
      <pv-button label="Okay" icon="pi pi-times" @click="addCandidatesDialog = false" text />
    </template>
  </pv-dialog>

  <pv-dialog v-model:visible="recruitmentSettingDialog" modal header="Building">
    <template #footer>
      <pv-button label="Okay" icon="pi pi-times" @click="recruitmentSettingDialog = false" text />
    </template>
  </pv-dialog>
</template>

<script>
import RecruitmentCard from "../components/recruitment-card.component.vue";
import {RecruitmentApiService} from "../services/recruitment.service.js";
import RecruitmentPhaseCard from "../components/recruitment-phase-card.component.vue";
import {PhaseApiService} from "../services/phase.service.js";

export default {
  name: "recruitment-dashboard",
  components: { RecruitmentPhaseCard, RecruitmentCard },
  data() {
    return {
      addPhaseDialog: false,
      addCandidatesDialog: false,
      recruitmentSettingDialog: false,
      recruitmentApi: new RecruitmentApiService(),
      phaseApi: new PhaseApiService(),
      recruitment: {},
      phases: [],
      candidates: [],
      phaseTitle: '',
      phaseDescription: ''
    }
  },
  created() {
    const recruitmentId = this.$route.params.id;
    this.recruitmentApi.getById(recruitmentId)
        .then(response => this.recruitment = response.data);
    this.recruitmentApi.getPhases(recruitmentId)
        .then(response => this.phases = response.data);
  },
  methods: {
    savePhase(event){
      event.preventDefault();
      this.phaseApi.create({
        name: this.phaseTitle,
        description: this.phaseDescription,
        createdDate: new Date(),
        processId: this.recruitment.id
      }).then(response => {
        this.phases.push(response.data);
        this.addPhaseDialog = false;
        const recruitmentId = this.$route.params.id;
        this.recruitmentApi.getPhases(recruitmentId)
            .then(response => this.phases = response.data);
        this.$toast.add({
          severity: "success",
          summary: "New recruitment phase created",
          detail: response.data.message,
          life: 3000
        });
      }).catch(e => {
        this.$toast.add({
          severity: "error",
          summary: "Error creating recruitment phase",
          detail: e.response.data,
          life: 4000
        });
      });
    }
  }
}
</script>

<style scoped>

</style>