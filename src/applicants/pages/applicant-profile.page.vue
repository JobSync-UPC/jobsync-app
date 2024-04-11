<template>
  <div class="bg-white dark:bg-black shadow-xl rounded px-8 pt-6 pb-8">
    <div class="flex flex-col space-y-6">
      <div>
        <h1 class="text-center font-bold text-3xl">{{ $t('profile-settings.applicant-title') }}</h1>
      </div>
      <div class="grid" v-if="this.applicant">
        <h1 class="text-center font-bold text-3xl">{{this.applicant.firstname + " " + this.applicant.lastname}}</h1>
        <p class="text-center text-xl">{{this.applicant.email}}</p>
      </div>
      <form v-on:submit="saveChanges($event)" class="flex flex-col space-y-3">
        <div>
          <label for="cvUrl">{{ $t('profile-settings.change-cv-url') }}</label>
          <pv-input
              id="cvResumeUrl"
              class="w-full"
              v-model="cvUrl"
              placeholder="URL"
              type="text"
          />
        </div>
        <div>
          <label for="linkedinUrl">{{ $t('profile-settings.change-linkedin-url') }}</label>
          <pv-input
              id="linkedinUrl"
              class="w-full"
              v-model="linkedInUrl"
              placeholder="URL"
              type="text"
          />
        </div>
        <div>
          <label for="portfolioUrl">{{ $t('profile-settings.change-portfolio-url') }}</label>
          <pv-input
              id="portfolioUrl"
              class="w-full"
              v-model="portfolioUrl"
              placeholder="URL"
              type="text"
          />
        </div>
        <pv-button type="submit" @click="saveChanges" outlined :label="$t('auth.save-changes')" />
        <pv-button @click="cancelChanges" severity="danger" :label="$t('profile-settings.discard-changes')" />
      </form>
    </div>
  </div>
</template>

<script>
import {getUser} from "../../shared/services/user.js";
import {ApplicantsService} from "../service/applicants.service.js";

export default {
  name: "applicant-profile-page",
  components: {  },
  data(){
    return {
      cvUrl: '',
      linkedInUrl: '',
      portfolioUrl: '',
      applicantApi: new ApplicantsService(),
      applicant:null,
    }
  },
  created(){
    this.applicantApi.getById(getUser().id).then(
        response => {
          this.applicant = response.data;

          this.cvUrl = this.applicant.cvUrl;
          this.linkedInUrl = this.applicant.linkedInUrl;
          this.portfolioUrl = this.applicant.portfolioUrl;
        }
    ).catch(e => {
      console.log(e);
    });
  },
  methods: {
    saveChanges() {
      event.preventDefault();

      this.applicantApi.updateById(this.applicant.id, {
        cvUrl: this.cvUrl,
        linkedInUrl: this.linkedInUrl,
        portfolioUrl: this.portfolioUrl,
      }).then(
          response => {
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: "Changes saved successfully.",
              life: 2000
            });
          }
      ).catch(e => {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: e.data.message,
          life: 2000
        });
      });
    },
    cancelChanges() {
      this.cvUrl = this.applicant.cvUrl;
      this.linkedinUrl = this.applicant.linkedinUrl;
      this.portfolioUrl = this.applicant.portfolioUrl;
    }
  }
}
</script>

<style scoped>
</style>