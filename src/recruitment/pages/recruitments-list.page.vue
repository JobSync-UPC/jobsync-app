<template>
  <div>
    <pv-button outlined v-on:click="openCreateRecruitmentProcess">
      {{$t('organization-profile.new-recruitment-btn-label')}}
    </pv-button>
    <h1>{{$t('recruitment.title')}}</h1>
    <pv-data-table :value="this.recruitmentProcesses">
      <pv-column field="jobPost.title" :header="$t('recruitment.create-recruitment.title-placeholder')" />
      <pv-column field="jobPost.description" :header="$t('recruitment.create-recruitment.description-placeholder')" />
    </pv-data-table>
  </div>
  <pv-dialog v-model:visible="createRecruitmentProcessDialog" :header="$t('organization-profile.new-recruitment-btn-label')"
             modal class="w-full md:w-1/3" dismissableMask>
    <create-recruitment-process />
  </pv-dialog>
</template>

<script >
import CreateRecruitmentProcess from "../components/create-recruitment-process.vue";
import {useUserStore} from "../../shared/store/user-store.store.js";
import {RecruitmentApiService} from "../services/recruitment.service.js";

export default {
  name: "RecruitmentsListPage",
  components: {CreateRecruitmentProcess},
  data() {
    return {
      title: '',
      description: '',
      recruitmentProcesses: null,
      recruitmentProcessService: new RecruitmentApiService(),
      createRecruitmentProcessDialog: false,
    }
  },
  created() {
    const userStore = useUserStore();
    const companyId = userStore.user.company.id
    this.recruitmentProcessService.getRecruitmentProcessesByCompanyId(companyId).then((response) => {
      this.recruitmentProcesses = response.data;
    }).catch((error) => {
      console.log(error);
    });
  },
  methods: {
    openCreateRecruitmentProcess() {
      this.createRecruitmentProcessDialog = !this.createRecruitmentProcessDialog;
    },
  }
}

</script>