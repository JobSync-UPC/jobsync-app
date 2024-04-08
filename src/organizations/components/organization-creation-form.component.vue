<template>
  <form class="flex flex-col bg-white dark:bg-black rounded-xl shadow-lg gap-4 p-8">
    <p class="text-3xl text-center font-bold">{{ $t('create-org.title') }}</p>
    <div class="flex flex-col items-center gap-4 py-8">
      <img
        :src="previewImage ?? '/organization-placeholder.png'"
        alt="Organization preview image"
        class="h-44 w-44 object-cover rounded-full border-2 border-black p-3"
      >
      <div class="flex justify-center items-center gap-3">
        <pv-file-upload
          ref="fileUpload"
          mode="basic"
          v-model="file"
          accept="image/*"
          :chooseLabel="$t('create-org.choose-picture')"
          :maxFileSize="5000000"
          @select="selectedFile"
        />
        <pv-button
          v-if="previewImage"
          icon="pi pi-trash"
          severity="danger"
          @click="clearImageUpload"
        />
      </div>
    </div>
    <div>
      <p>{{ $t('create-org.company-name') }}</p>
      <pv-input class="w-full" placeholder="JobSync Inc." required v-model="companyName" />
    </div>
    <div>
      <p>{{ $t('create-org.choose-plan') }}</p>
      <div class="grid grid-cols-2 gap-8">
        <button
          aria-label="Activate candidate form"
          class="rounded-full py-2"
          :class="[useFreePlan ? 'bg-primary text-white' : 'border-2 border-primary text-primary']"
          @click="chooseFreePlan($event, true)"
        >
          {{ $t('plans.free') }}
        </button>
        <button
          aria-label="Activate recruiter form"
          class="rounded-full py-2"
          :class="[!useFreePlan ? 'bg-primary text-white' : 'border-2 border-primary text-primary']"
          @click="chooseFreePlan($event, false)"
        >
          <i class="pi pi-star" />
            {{ $t('plans.premium') }}
        </button>
      </div>
    </div>
    <div>
      <p>{{ $t('create-org.company-email') }}</p>
      <pv-input class="w-full" placeholder="jobsync@mail.com" required v-model="companyName" />
    </div>
    <div class="grid grid-cols-2 items-end gap-4">
      <div>
        <label for="country">{{ $t('create-org.country') }}</label>
        <pv-dropdown
          required
          id="country"
          class="w-full"
          v-model="selectedCountry"
          :options="countries"
          :placeholder="$t('create-org.select-country')"
        />
      </div>
      <div>
        <label for="phone-number">{{ $t('create-org.phone-number') }}</label>
        <pv-input id="phone-number" required class="w-full" v-model="phoneNumber" type="number" />
      </div>
    </div>
    <div>
      <p>{{ $t('create-org.company-address') }}</p>
      <pv-input class="w-full" :placeholder="$t('create-org.address-placeholder')" required v-model="companyAddress" />
    </div>
    <pv-message severity="info" :closable="false">{{ $t('create-org.add-members-msg') }}</pv-message>
    <pv-button type="submit" outlined :label="$t('create-org.create-organization')"/>
  </form>
</template>

<script>
import {CountriesApiService} from "../../shared/services/countries.service.js";

export default  {
  name: "organization-creation-form",
  data() {
    return {
      reader: new FileReader(),
      file: null,
      useFreePlan: true,
      previewImage: null,
      companyName: '',
      countries: [],
      selectedCountry: '',
      phoneNumber: '',
      companyAddress: '',
      countriesApi: new CountriesApiService(),
    };
  },
  created() {
    this.loadCountries();
  },
  methods: {
    loadCountries() {
      this.countriesApi.getCountries()
        .then(response => {
          this.countries = response.data.map(countryData => countryData.name.common);
          this.countries.sort();
        })
        .catch(e => {
          this.countries.push("Error loading countries");
        })
    },
    selectedFile(event) {
      const file = event.files[0];
      this.reader.onload = (e) => this.previewImage = e.target.result;
      this.reader.readAsDataURL(file);
    },
    clearImageUpload() {
      this.file = null;
      this.previewImage = null;
      this.$refs.fileUpload.clear();
    },
    chooseFreePlan(event, state) {
      event.preventDefault();
      this.useFreePlan = state;
    }
  },
}
</script>

<style scoped>
</style>