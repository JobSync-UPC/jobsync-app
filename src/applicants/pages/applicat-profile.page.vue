<template>
  <div class="bg-white dark:bg-black shadow-xl rounded px-8 pt-6 pb-8">
    <div class="flex flex-col space-y-6">
      <div>
        <h1 class="text-center font-bold text-3xl">{{ $t('profile-settings.applicant-title') }}</h1>
      </div>
      <div class="grid">
        <h1 class="text-center font-bold text-3xl">{{this.user.firstname + " " + this.user.lastname}}</h1>
        <p class="text-center text-xl">{{this.user.email}}</p>
      </div>
      <form v-on:submit="saveChanges($event)" class="flex flex-col space-y-3">
        <div>
          <label for="cvResumeUrl">{{ $t('profile-settings.change-cv-url') }}</label>
          <pv-input
              id="cvResumeUrl"
              class="w-full"
              v-model="cvResumeUrl"
              placeholder="URL"
              type="text"
          />
        </div>
        <div>
          <label for="linkedinUrl">{{ $t('profile-settings.change-linkedin-url') }}</label>
          <pv-input
              id="linkedinUrl"
              class="w-full"
              v-model="linkedinUrl"
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
        <pv-button type="submit" outlined :label="$t('auth.save-changes')" />
        <pv-button type="submit" severity="danger" :label="$t('profile-settings.discard-changes')" />
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
      cvResumeUrl: '',
      linkedinUrl: '',
      portfolioUrl: '',
      applicantApi: new ApplicantsService(),
      user:null,
    }
  },
  created(){
    this.applicantApi.getById(getUser().id).then(
        response => {
          this.user = response.data;

          this.cvResumeUrl = this.user.cvResumeUrl;
          this.linkedinUrl = this.user.linkedinUrl;
          this.portfolioUrl = this.user.portfolioUrl;
        }
    ).catch(e => {
      console.log(e);
    });
  },
  methods: {
    saveChanges() {
      this.applicantApi.updateById(this.user.id, {
        cvResumeUrl: this.cvResumeUrl,
        linkedinUrl: this.linkedinUrl,
        portfolioUrl: this.portfolioUrl,
      }).then(
          response => {
            console.log(response);
          }
      ).catch(e => {
        console.log(e);
      });
    }
  }
}
</script>

<style scoped>
</style>