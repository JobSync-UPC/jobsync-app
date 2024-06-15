<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">{{ $t('email-history') }}</h1>
      <pv-button
          label="Compose"
          icon="pi pi-plus"
          @click="emailDialog = true"
      />
    </div>
    <div v-if="emailHistory">
      <div class="mt-4">
        <pv-data-table
            :data="emailHistory"
            :columns="columns"
            :paginator="true"
            :rows="5"
            :rowsPerPageOptions="[5, 10, 15]"
        >
          <template #body="slotProps">
            <pv-button
                rounded
                severity="contrast"
                icon="pi pi-envelope"
                @click="showEmailDialog(slotProps.data)"
            />
          </template>
        </pv-data-table>
      </div>
    </div>
    <div v-else>
      <div class="flex items-center justify-center">
        <pv-spinner />
      </div>
    </div>
    <pv-dialog
        v-model:visible="emailDialog"
        modal
        :header="$t('compose-email')"
        :footer="true"
        @hide="resetEmailDialog"
    >
      Building the email dialog...
    </pv-dialog>
  </div>
</template>

<script>
import {useUserStore} from "../store/user-store.store.js";
import {EmailService} from "../services/email.service.js";

export default {
  name: "email-history-page",
  components: {},
  data(){
    return {
      emailHistory: null,
      emailService: new EmailService(),
      selectedEmail: null,
      emailDialog: false,
      selectedEmails: [],
      selectedCC: [],
      emailSubject: "",
      emailContent: ""
    }
  },
  created(){
    this.updateEmailHistory();
  },
  methods: {
    updateEmailHistory(){
      this.emailHistory = null;
      const userStore = useUserStore();
      const applicantId = userStore.user.id;

      this.emailService.sendEmail().then(
          response => {
            this.emailHistory = response.data;
          }
      ).catch(e => {
        console.log(e);
      });
    },
    formatDate(date) {
      if (!date) return "";
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(date).toLocaleDateString('en-US', options);
    },
    showEmailDialog(_email){
      this.selectedEmail = _email;
      this.emailDialog = true;
    },
    resetEmailDialog(){
      this.emailSubject = "";
      this.emailContent = "";
    }
  }
}
</script>