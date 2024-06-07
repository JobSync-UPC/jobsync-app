<template>
  {{recruitment}}
</template>

<script>
import RecruitmentCard from "../components/recruitment-card.component.vue";
import {RecruitmentApiService} from "../services/recruitment.service.js";
import RecruitmentPhaseCard from "../components/recruitment-phase-card.component.vue";
import {PhaseApiService} from "../services/phase.service.js";
import {useUserStore} from "../../shared/store/user-store.store.js";

export default {
  name: "recruitment-dashboard",
  components: {RecruitmentPhaseCard, RecruitmentCard},
  data() {
    return {
      addPhaseDialog: false,
      addCandidatesDialog: false,
      recruitmentSettingDialog: false,
      recruitmentApi: new RecruitmentApiService(),
      recruitment: {},
      phases: [],
      candidates: [],
      phaseTitle: '',
      phaseDescription: ''
    }
  },
  created() {
    const recruitmentId = this.$route.params.id;
    const userStore = useUserStore();
    const companyId = userStore.user.company.id;

    this.recruitmentApi.isRecruitmentProcessFromCompany(recruitmentId, companyId)
        .then(response => {
          if (response.data === false) {
            this.$router.push({name: '404'});
          } else {
            this.recruitmentApi.getRecruitmentProcessById(recruitmentId)
                .then(response => this.recruitment = response.data);
          }
        });
  },
  methods: {

  }
}
</script>