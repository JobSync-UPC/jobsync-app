<template>
  <div :class="[
      'max-h-container',
      'border',
      'rounded-xl',
      'px-4',
      'py-4',
      'w-72',
      'space-y-2',
      bgColor,
      bgColorDark
      ]"
  >
    <div v-if="phase">
      <div id="header" class="flex justify-between items-center w-full px-1 py-1">
        <h1 class="font-semibold text-lg">{{ phase.title }}</h1>
        <pv-button
            @click="phaseDialog = true"
            icon="pi pi-ellipsis-h" text rounded size="large" severity="secondary" outlined
            aria-label="Phase dialog expander" />
        <pv-dialog v-model:visible="phaseDialog" modal :header=phase.title class="w-1/2">
          <div class="grid gap-2">
            <form class="grid"
                  @submit.prevent="updatePhase(phase)">
              <div class="grid w-full gap-2">
                <div class="grid">
                  <label for="title">{{ $t('recruitment.create-recruitment.title-placeholder') }}</label>
                  <pv-input
                      id="title"
                      required
                      v-model="this.title"
                      :placeholder="$t('recruitment.create-recruitment.title-placeholder')"
                      type="text"
                  />
                </div>
                <div class="grid">
                  <label for="description">{{ $t('recruitment.create-recruitment.description-placeholder') }}</label>
                  <pv-textarea
                      id="description"
                      v-model="this.description"
                      :placeholder="$t('recruitment.create-recruitment.description-placeholder')"
                      type="text"
                  />
                </div>
                <pv-button outlined type="submit"
                           :enabled="!this.loading"
                           :label="this.loading ? $t('loading') : $t('accept')"
                />
              </div>
            </form>
            <div class="grid w-full" v-if="isFirstPhase===false">
              <pv-button type="submit"
                         severity="danger"
                         :enabled="!this.loading"
                         :label="this.loading ? $t('loading') : $t('delete')"
                         @click="deletePhase(phase)"
              />
            </div>
          </div>
        </pv-dialog>
      </div>
      <div>
        <h1 v-if="candidates.length === 0">{{ $t('recruitment.no-candidates-found-message')}}</h1>
      </div>
      <div v-for="candidate in phase.candidates" :key="candidate.id">
        <div @click="openCandidateDialog(candidate.id)"
             class="flex border px-2 py-4 rounded-lg bg-white hover:scale-95 duration-100 items-center space-x-2">
          <img class="rounded-full w-12 h-12 object-cover"
               :src="candidate.user.profileImageUrl"
               :alt="candidate.user.name + ' profile picture'"/>
          <p>{{ candidate.user.name }}</p>
        </div>
      </div>
      <pv-dialog v-model:visible="candidateDialog" modal>
        <p>
          {{ currentCandidate.user.name }}
          <br>
          Building...
        </p>
        <template #footer>
          <pv-button label="Okay" icon="pi pi-times" @click="candidateDialog = false" text />
        </template>
      </pv-dialog>
    </div>
    <div v-else>
      <pv-spinner />
    </div>
  </div>
</template>


<script>
import {RecruitmentPhaseApiService} from "../services/phases.service.js";

export default {
  name: "recruitment-phase-card",
  props: {
    phase: {
      type: Object,
      required: true
    },
    bgColor: {
      type: String,
      required: true
    },
    bgColorDark: {
      type: String,
      required: true
    },
    isFirstPhase: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      phaseDialog: false,
      candidateDialog: false,
      currentCandidate: {},
      candidates: [],
      title:'',
      description: '',
      loading: false,
      phaseService: new RecruitmentPhaseApiService()
    }
  },
  created() {
    this.title = this.phase.title;
    this.description = this.phase.description;
  },
  methods: {
    openCandidateDialog(candidateId) {
      this.currentCandidate = this.phase.candidates.find(
          candidate => candidate.id === candidateId
      );
      this.candidateDialog = true;
    },
    updatePhase() {
      this.loading = true;

      if (this.phase.title === '' || this.title === '') {
        this.loading = false;
        this.$toast.add({
          severity: "error",
          summary: "JobSync",
          detail: "Title is required",
          life: 2000
        });
        return;
      }

      const newPhase = {
        id: this.phase.id,
        title: this.title,
        description: this.description,
        startDate: this.phase.startDate,
        endDate: this.phase.endDate,
        recruitmentProcessId: this.phase.recruitmentProcessId
      }

      this.phaseService.updatePhase(newPhase.id,newPhase)
          .then(() => {
            this.$toast.add({
              severity: "success",
              summary: "JobSync",
              detail: "Created",
              life: 2000
            });
            this.$emit('update');
          })
          .catch((error) => {
            this.$toast.add({
              severity: "error",
              summary: "JobSync",
              detail: "There was an error. Please try again later: " + error.message,
              life: 2000
            });
            console.log(error)
          });

      this.loading = false;
    },
    deletePhase() {
      this.loading = true;

      if (this.isFirstPhase === true) {
        return;
      }

      this.phaseService.deletePhase(this.phase.id)
          .then(() => {
            this.$toast.add({
              severity: "success",
              summary: "JobSync",
              detail: "Deleted",
              life: 2000
            });
            this.$emit('update');
          })
          .catch((error) => {
            this.$toast.add({
              severity: "error",
              summary: "JobSync",
              detail: "There was an error. Please try again later: " + error.message,
              life: 2000
            });
            console.log(error)
          });
      this.loading = false;
    }
  }
}
</script>