<template>
  <div>
    <pv-button outlined v-on:click="openCreateRecruitmentProcess">
      {{$t('organization-profile.new-recruitment-btn-label')}}
    </pv-button>
    <h1>Recruitments</h1>
  </div>


  <pv-dialog v-model:visible="createRecruitmentProcessDialog" :header="$t('organization-profile.new-recruitment-btn-label')" modal class="w-full md:w-1/3">
    <form class="grid gap-2"
          @submit.prevent="createRecruitmentProcess">
      <div class="grid w-full">
        <pv-input required
                  v-model="title"
                  type="text"
        />
        <pv-input required
                  v-model="description"
                  type="text"
        />
        <pv-button outlined type="submit" :label="$t('recruitment.create-recruitment.create-submit-lbl')"/>
      </div>
    </form>
  </pv-dialog>
</template>

<script >
export default {
  name: "RecruitmentsListPage",
  setup() {
    return {
      title: "Recruitments"
    }
  },
  data() {
    return {
      createRecruitmentProcessDialog: false,
    }
  },
  methods: {
    openCreateRecruitmentProcess() {
      this.createRecruitmentProcessDialog = !this.createRecruitmentProcessDialog;
    },
    createRecruitmentProcess(){

    }
  }
}

</script>