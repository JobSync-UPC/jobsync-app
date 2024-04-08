<template>
  <form class="flex flex-col bg-white dark:bg-black rounded-xl shadow-lg gap-4 p-8">
    <p class="text-3xl text-center font-bold">{{ $t('organization-settings.title') }}</p>
    <hr class="mb-4">
    <div class="flex flex-col items-center gap-4 py-8">
      <div class="flex items-center justify-between">
        <p class="font-bold text-2xl">{{ currentOrganization.name }}</p>
        <pv-button icon="pi pi-pencil" severity="help" text rounded aria-label="Edit"/>
      </div>
      <div>
        <img
            :src="currentOrganization.avatarUrl"
            alt="Organization Profile Picture"
            class="rounded-3xl w-32 h-32 object-cover hover:scale-95 duration-200"/>
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
      <div class="w-full  ">
        <div class="flex items-center mt-4">
          <label for="organization">{{ $t('organization-settings.current-plan') }}</label>
          <div class="card flex justify-content-center ml-4 ">
            <pv-button
                outlined
                aria-label="Change Plan button"
                :label="$t('plans.free')"
                class="w-full"
                @click="planVisible = true"
            />
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
                    outlined
                />
              </template>
            </pv-dialog>

          </div>

        </div>
      </div>
      <div class="w-full">
        <label for="organization-email">{{ $t('organization-settings.company-email') }}</label>
        <div class="flex items-center justify-between">
          <pv-input id="organization-email" required v-model="currentOrganization.email" class="w-full"/>
          <pv-button icon="pi pi-pencil" severity="help" text rounded aria-label="Edit"/>
        </div>
      </div>
      <div class="w-full">
        <label for="organization-phone-number">{{ $t('organization-settings.company-phone') }}</label>
        <div class="flex items-center justify-between">
          <pv-input id="organization-phone-number" v-model="currentOrganization.phoneNumber" required class="w-full"
                    type="number"/>
          <pv-button icon="pi pi-pencil" severity="help" text rounded aria-label="Edit"/>
        </div>
      </div>
      <div class="w-full">
        <label for="organization-address">{{ $t('organization-settings.company-address') }}</label>
        <div class="flex items-center justify-between">
          <pv-input id="organization-address" v-model="currentOrganization.address" required class="w-full"/>
          <pv-button icon="pi pi-pencil" severity="help" text rounded aria-label="Edit"/>
        </div>
      </div>
    </div>
    <pv-button type="submit" class="w-full" :label="$t('organization-settings.save-changes')" outlined/>
  </form>
</template>

<script>
import {OrganizationApiService} from "../../shared/services/organizations.service.js";
import {CountriesApiService} from "../../shared/services/countries.service.js";


export default {
  name: "organization-settings-form",

  data() {
    return {
      currentOrganizationId: 1,
      currentOrganization: {},
      organizationService: new OrganizationApiService,
      countries: [],
      countriesApi: new CountriesApiService(),
      selectedCountry: 'Peru',
      planVisible: false,
      selectedPlan: null,
    };
  },
  created() {
    this.organizationService.getCurrentOrganization(this.currentOrganizationId)
        .then(response => this.currentOrganization = response.data)
        .catch(error => {
          console.error('An error occurred with organization:', error);
        });
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
          })
    },
    highlightCard(plan) {
      this.selectedPlan = plan;
    },
    handleRadioButtonClick(plan, event) {
      event.stopPropagation();
    },
  }
}
</script>

<style>
</style>