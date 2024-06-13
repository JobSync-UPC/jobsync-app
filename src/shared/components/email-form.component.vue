<template>
  <div class="grid gap-4 p-4">
    <div class="flex items-center gap-2 mb-2">
      <p>{{ $t('to') }}:</p>
      <div v-for="(email, index) in emailTo" :key="index">
        <pv-button
            :label="email"
            icon="pi pi-times"
            severity="secondary"
            size="small"
            rounded
            @click="removeCCEmail(index)"
        />
      </div>
    </div>
    <div class="flex items-center gap-2 mb-2">
      <p>{{ $t('cc') }}:</p>
      <div v-for="(email, index) in emailCC" :key="index">
        <pv-button
            :label="email"
            icon="pi pi-times"
            severity="secondary"
            size="small"
            rounded
            @click="removeCCEmail(index)"
        />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <pv-input
          v-model="ccInput"
          type="text"
          :placeholder="$t('to')"
          @input=""
          @keydown=""
      />
      <pv-input
          v-model="ccInput"
          type="text"
          :placeholder="$t('cc')"
          @input="handleCCInput"
          @keydown="handleCCKeydown"
      />
    </div>

    <pv-input
        v-model="this.emailSubject"
        type="text"
        placeholder="Subject"
    />
    <pv-textarea
        v-model="this.emailContent"
        type="text"
        placeholder="Content"
        rows="5" cols="30"
    />

    <div>
      <p>{{ $t('attachments') }}:</p>
      <pv-file-upload
          :auto="true"
          multiple
          chooseLabel="Choose"
          :maxFileSize="1000000"
          @select="onFileSelect"
      />
    </div>

    <pv-button
        iconPos="right"
        :label="$t('send')"
        icon="pi pi-envelope"
        severity="help"
        @click="sendEmail"
    />
  </div>
</template>

<script>
export default {
  name: "email-form",
  props: {
    emailTo: {
      type: Array,
      required: true
    },
    emailCC: {
      type: Array,
      default: () => []
    },
    emailSubject: {
      type: String,
    },
    emailContent: {
      type: String,
    }
  },
  data() {
    return {
      ccInput: '',
      selectedFiles: []
    }
  },
  methods: {
    handleCCInput(event) {
      const input = event.target.value;
      if (input.includes(' ')) {
        const email = input.trim();
        if (email) {
          this.emailCC.push(email);
        }
        this.ccInput = '';
      }
    },
    handleCCKeydown(event) {
      if (event.key === 'Enter') {
        const input = this.ccInput.trim();
        if (input) {
          this.emailCC.push(input);
          this.ccInput = '';
        }
        event.preventDefault(); // Prevent form submission on Enter key
      }
    },
    removeCCEmail(index) {
      this.emailCC.splice(index, 1);
    },
    onFileSelect(event) {
      this.selectedFiles = [...this.selectedFiles, ...event.files];
    },
    sendEmail() {
      console.log('Email to:', this.emailTo);
      console.log('CC:', this.emailCC);
      console.log('Subject:', this.emailSubject);
      console.log('Content:', this.emailContent);
    }
  }
}
</script>