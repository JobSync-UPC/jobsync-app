<template>
  <div class="max-h-container bg-gray-100 dark:bg-gray-800 border rounded-xl px-4 py-4 w-72 space-y-2">
    <div id="header" class="flex justify-between items-center w-full px-1 py-1">
      <h1 class="font-semibold text-xl">{{ phase.name }}</h1>
      <pv-button
          @click="phaseDialog = true"
          icon="pi pi-ellipsis-h" text rounded size="large" severity="secondary" outlined
          aria-label="Phase dialog expander" />
      <pv-dialog v-model:visible="phaseDialog" modal :header=phase.name>
        <p>
          Building...
        </p>
        <template #footer>
          <pv-button label="Okay" icon="pi pi-times" @click="phaseDialog = false" text />
        </template>
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
</template>


<script>
export default {
  name: "recruitment-phase-card",
  props: {
    phase: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      phaseDialog: false,
      candidateDialog: false,
      currentCandidate: {},
      candidates: []
    }
  },
  methods: {
    openCandidateDialog(candidateId) {
      this.currentCandidate = this.phase.candidates.find(
          candidate => candidate.id === candidateId
      );
      this.candidateDialog = true;
    },
  }
}
</script>

<style scoped>
</style>