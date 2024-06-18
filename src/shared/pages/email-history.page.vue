<template>
  <div class="grid gap-4">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">{{ $t('email-history') }}</h1>
      <pv-button
          :label="this.$t('email')"
          icon="pi pi-envelope"
          severity="contrast"
          @click="emailDialog = true"
      />
    </div>
    <div class="grid md:flex w-full gap-4">
      <pv-button
          class="w-full"
          icon="pi pi-inbox"
          :label="this.$t('received-emails')"
          @click="displayedEmails = this.receivedEmails"
          :severity="this.displayedEmails === this.receivedEmails ? 'primary' : 'secondary'"
      />
      <pv-button
          class="w-full"
          icon="pi pi-send"
          :label="this.$t('sent-emails')"
          @click="displayedEmails = this.sentEmails"
          :severity="this.displayedEmails === this.sentEmails ? 'primary' : 'secondary'"
      />
    </div>
    <div v-if="displayedEmails">
      <div class="mt-4">
        <pv-data-table
            paginator :rows="10" :rowsPerPageOptions="[5, 10, 20]"
            :value="filteredEmails"
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
        v-model:visible="emailDialog" modal
        :header="$t('email')"
        :style="{ width: '50vw' }"
        :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
        :draggable="false"
        position="top"
    >
      <email-form
          :emailTo="this.selectedEmails"
          :emailCC="this.selectedCC"
          :emailSubject="this.emailSubject"
          :emailContent="this.emailContent"
      />
    </pv-dialog>
  </div>
</template>

<script>
import {EmailService} from "../services/email.service.js";
import EmailForm from "../components/email-form.component.vue";
import {useUserStore} from "../store/user-store.store.js";

export default {
  name: "email-history-page",
  components: {EmailForm},
  data(){
    return {
      emailHistory: null,
      emailService: new EmailService(),
      selectedEmail: null,
      emailDialog: false,
      selectedEmails: [],
      selectedCC: [],
      emailSubject: "",
      emailContent: "",
      sentEmails:null,
      receivedEmails:null,
      displayedEmails: null,
    }
  },
  created(){
    const userStore = useUserStore(); // User id => userStore.user.id
    this.updateReceivedEmails();
    this.updateSentEmails();
  },
  methods: {
    updateReceivedEmails(){
      // En data table agregar buscadores, filtros etc https://primevue.org/datatable/

      // Todo
      this.receivedEmails = []

      // Default displayed emails are received
      this.displayedEmails = this.receivedEmails;
    },
    updateSentEmails(){
      // Todo
      this.sentEmails = []
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