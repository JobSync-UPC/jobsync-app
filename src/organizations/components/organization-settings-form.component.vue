<template>
  <p class="text-2xl font-bold text-primary py-2 text-center">{{ $t('organization-settings.title') }}</p>
  <div class="flex items-center justify-center min-h-screen">
    <form v-on:submit="updateCompany($event)"
        class="flex flex-col bg-white dark:bg-black rounded-xl shadow-lg p-8 gap-4 md:w-1/2 justify-center">
      <div class="flex flex-col items-center gap-4 py-4">
        <div>
          <img
              :src="logoUrl"
              alt="Organization Profile Picture"
              class="rounded-3xl w-40 h-40 object-cover hover:scale-95 duration-200 shadow p-2"/>
        </div>
        <div class="flex items-center justify-between">
          <p class="font-bold text-3xl text-primary">{{ name }}</p>
        </div>
        <div class="flex justify-center items-center gap-3">
          <pv-file-upload
              ref="fileUpload"
              mode="basic"
              v-model="file"
              accept="image/*"
              :chooseLabel="$t('organization-settings.change-picture')"
              :maxFileSize="5000000"
              @select="selectedFile"
          />
        </div>
        <div class="grid items-center">
          <div class="card grid justify-content-center ">
            <pv-button
                aria-label="Change Plan button"
                :label="$t('organization-settings.current-plan') + ': ' + $t('plans.free')"
                class="w-full"
                @click="planVisible = true"
            />
          </div>
        </div>
        <div class="w-full">
          <label for="organization-email">{{ $t('create-org.company-name') }}</label>
          <div class="flex items-center justify-between">
            <pv-input id="organization-email" required v-model="name" class="w-full"/>
            <pv-button icon="pi pi-pencil" severity="help" text rounded aria-label="Edit"/>
          </div>
        </div>
        <div class="w-full">
          <label for="organization-email">{{ $t('create-org.company-description') }}</label>
          <div class="flex items-center justify-between">
            <pv-textarea id="organization-email" required v-model="description" class="w-full"/>
            <pv-button icon="pi pi-pencil" severity="help" text rounded aria-label="Edit"/>
          </div>
        </div>
        <div class="w-full">
          <label for="country">{{ $t('create-org.country') }}</label>
          <div class="flex items-center justify-between">
            <pv-dropdown
                required
                id="country"
                class="w-full"
                v-model="country"
                :options="countries"
                :placeholder="$t('create-org.select-country')"
            />
            <pv-button icon="pi pi-pencil" severity="help" text rounded aria-label="Edit"/>
          </div>
        </div>
        <div class="w-full">
          <label for="organization-email">{{ $t('create-org.company-address') }}</label>
          <div class="flex items-center justify-between">
            <pv-input id="organization-email" required v-model="address" class="w-full"/>
            <pv-button icon="pi pi-pencil" severity="help" text rounded aria-label="Edit"/>
          </div>
        </div>
        <div class="w-full">
          <label for="organization-email">{{ $t('create-org.website') }}</label>
          <div class="flex items-center justify-between">
            <pv-input id="organization-email" required v-model="website" class="w-full"/>
            <pv-button icon="pi pi-pencil" severity="help" text rounded aria-label="Edit"/>
          </div>
        </div>
        <div class="w-full">
          <label for="organization-email">{{ $t('create-org.industry') }}</label>
          <div class="flex items-center justify-between">
            <pv-input id="organization-email" required v-model="industry" class="w-full"/>
            <pv-button icon="pi pi-pencil" severity="help" text rounded aria-label="Edit"/>
          </div>
        </div>
      </div>
      <pv-button type="submit" class="w-full" :label="$t('organization-settings.save-changes')"/>
    </form>
  </div>

  <pv-dialog
      v-model:visible="planVisible" modal
      :header="$t('organization-settings.plan-options')"
      :style="{ width: '50vw' }"
      :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
      :draggable="false"
  >
    <div class="grid grid-rows-[auto_1fr] grid-cols-1 xl:grid-cols-2 xl:grid-rows-1 gap-2 lg:gap-4">
      <pv-card :class="{ 'border border-gray-300 rounded-lg p-4': selectedPlan === 'plan1' }">
        <template #title>{{ $t('plans.free') }}</template>
        <template #content>
          <ul>
            <li>{{ $t('plans.free-feature-1') }}</li>
            <li>{{ $t('plans.free-feature-2') }}</li>
            <li>{{ $t('plans.free-feature-3') }}</li>
          </ul>
        </template>
        <template #footer>
          <div class="flex items-center justify-center">
            <pv-radiobutton
                v-model="selectedPlan"
                value="plan1"
                @click="handleRadioButtonClick('plan1', $event)"
                @input="highlightCard('plan1')" />
          </div>
        </template>
      </pv-card>
      <pv-card :class="{ 'border border-gray-300 rounded-lg p-4': selectedPlan === 'plan2' }">
        <template #title>{{ $t('plans.premium') }}</template>
        <template #content>
          <ul>
            <li>{{ $t('plans.premium-feature-1') }}</li>
            <li>{{ $t('plans.premium-feature-2') }}</li>
            <li>{{ $t('plans.premium-feature-3') }}</li>
            <li>{{ $t('plans.premium-feature-4') }}</li>
          </ul>
        </template>
        <template #footer>
          <div class="flex items-center justify-center  ">
            <pv-radiobutton
                v-model="selectedPlan"
                value="plan2"
                @click="handleRadioButtonClick('plan2', $event)"
                @input="highlightCard('plan2')"
            />
          </div>
        </template>
      </pv-card>
    </div>
    <template #footer>
      <pv-button
          :label="$t('organization-settings.accept')"
          icon="pi pi-check"
          @click="planVisible = false"
      />
    </template>
  </pv-dialog>
</template>

<script>
import {CountriesApiService} from "../../shared/services/countries.service.js";
import {CompaniesService} from "../service/companies.service.js";
import {CloudinaryService} from "../../shared/services/cloudinary.service.js";

export default {
  name: "organization-settings-form",
  props: {
    currentOrganization: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      countries: [],
      countriesApi: new CountriesApiService(),
      selectedCountry: 'Peru',
      planVisible: false,
      selectedPlan: null,
      companyService: new CompaniesService(),
      cloudinaryService: new CloudinaryService(),

      file: null,

      logoUrl: '',
      name: '',
      description: '',
      country: '',
      address: '',
      website: '',
      industry: '',
    };
  },
  created() {
    this.loadCountries();
    this.logoUrl = this.currentOrganization.logoUrl;
    this.name = this.currentOrganization.name;
    this.description = this.currentOrganization.description;
    this.country = this.currentOrganization.country;
    this.address = this.currentOrganization.address;
    this.website = this.currentOrganization.website;
    this.industry = this.currentOrganization.industry;
  },
  methods: {
    loadCountries() {
      this.countriesApi.getCountries()
          .then(response => {
            this.countries = response.data.map(countryData => countryData.name.common);
            this.countries.sort();
          })
          .catch(error => {
            this.countries.push("Error loading countries");
          });
    },
    highlightCard(plan) {
      this.selectedPlan = plan;
    },
    handleRadioButtonClick(plan, event) {
      event.stopPropagation();
    },
    uploadPhoto(){
      this.cloudinaryService.uploadPicture(this.file)
          .then(response => {
            this.logoUrl = response.data;
            this.updateAll();
          })
          .catch(error => {
            this.$toast.add({
              severity: "warn",
              detail: "Error uploading profile picture",
              summary: error.response.data.message,
              life: 2000
            });
          });
    },
    updateAll(){
      this.companyService
          .updateCompanyById(
              this.currentOrganization.id,
              {
                name: this.name,
                description: this.description,
                country: this.country,
                address: this.address,
                logoUrl: this.logoUrl,
                website: this.website,
                industry: this.industry,
              }
          )
          .then(() => {
            this.$toast.add({
              severity: "success",
              summary: "JobSync",
              detail: "Updated",
              life: 2000
            });
            this.$emit('updatedCompany');
          })
          .catch(error => {
            this.$toast.add({
              severity: "warn",
              detail: "Invalid email or password",
              summary: error.response.data.message,
              life: 2000
            });
          });
    },
    updateCompany(event) {
      event.preventDefault();

      if (this.file !== null) {
        this.uploadPhoto();
      }
      else {
        this.updateAll();
      }
    },
    selectedFile(event) {
      const file = event.files[0];
      this.file = file;

      if (file) {
        try {
          this.logoUrl = URL.createObjectURL(file);
        } catch (error) {
          this.$toast.add({
            severity: "warn",
            detail: "Error uploading file",
            summary: error,
            life: 2000
          });
        }
      } else {
        this.$toast.add({
          severity: "warn",
          detail: "Invalid file type",
          summary: error.response.data.message,
          life: 2000
        });
      }
    },
  }

}
</script>

<style>
</style>