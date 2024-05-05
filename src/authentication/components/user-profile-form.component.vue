<template>
  <div>
    <div class="bg-white dark:bg-black shadow-xl rounded px-8 pt-6 pb-8">
      <div class="flex flex-col space-y-6">
        <div>
          <h1 class="text-center font-bold text-3xl">{{ $t('auth.edit-profile') }}</h1>
        </div>
        <div class="flex justify-center">
          <div class="h-48 w-48 shadow rounded-full overflow-hidden">
            <img class="h-full w-full object-cover" :src="this.profilePictureUrl" alt="User profile picture" />
          </div>
        </div>
        <div class="grid">
          <h1 class="text-center font-bold text-3xl">{{this.user.firstname + " " + this.user.lastname}}</h1>
          <p class="text-center text-xl">{{this.user.email}}</p>
        </div>
        <form v-on:submit="saveChanges($event)" class="flex flex-col space-y-3">
          <div class="justify-center flex items-center">
            <pv-file-upload mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @select="uploadProfilePicture" />
          </div>
          <div class="grid grid-cols-2 items-end gap-4">
            <div>
              <label for="first-name">{{ $t('auth.first-name') }}</label>
              <pv-input
                  required
                  id="first-name"
                  class="w-full"
                  v-model="firstname"
                  :placeholder="$t('auth.first-name')"
                  type="text"
              />
            </div>
            <div>
              <label for="last-name">{{ $t('auth.last-name') }}</label>
              <pv-input
                  required
                  id="last-name"
                  class="w-full"
                  v-model="lastName"
                  :placeholder="$t('auth.last-name')"
                  type="text"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 items-end gap-4">
            <div>
              <label for="country">{{ $t('auth.country') }}</label>
              <pv-dropdown
                  required
                  id="country"
                  class="w-full"
                  v-model="selectedCountry"
                  :options="countries"
                  :placeholder="$t('auth.select-country')"
              />
            </div>
            <div>
              <label for="phone-number">{{ $t('auth.phone-number') }}</label>
              <pv-input
                  required
                  id="phone-number"
                  class="w-full"
                  v-model="phoneNumber"
                  type="number"
              />
            </div>
          </div>
          <pv-button type="submit" :label="$t('auth.save-changes')" outlined/>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {CountriesApiService} from "../../shared/services/countries.service.js";
import {getUser} from "../../shared/services/user.js";
import {UsersApiService} from "../../shared/services/users.service.js";
import {useUserStore} from "../../shared/store/user-store.store.js";
export default {
  name: "user-profile-form",
  data() {
    return {
      firstname: '',
      lastName: '',
      phoneNumber: '',
      selectedCountry: '',
      profilePictureUrl: '',
      countries: [],
      countriesApi: new CountriesApiService(),
      userApi: new UsersApiService(),
      user:null,

      profilePictureFile: null
    }
  },
  created() {
    this.loadCountries();


    this.userApi.getById(getUser().id).then(
        response => {
          this.user = response.data;

          this.firstname = this.user.firstname;
          this.lastName = this.user.lastname;
          this.phoneNumber = this.user.phoneNumber;
          this.selectedCountry = this.user.country;
          this.profilePictureUrl = this.user.profilePictureUrl;
        }
    ).catch(e => {
      console.log(e);
    });
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
    uploadProfilePicture(event) {
      this.profilePictureFile = event.files[0]; // Save the file locally
    },
    saveChanges(event) {
      event.preventDefault();

      this.user.firstname = this.firstName;
      this.user.lastname = this.lastName;
      this.user.phoneNumber = this.phoneNumber;
      this.user.country = this.selectedCountry;

      if (this.profilePictureFile !== null) {
        console.log("Uploading profile picture");
        this.userApi.changeProfilePicture(this.user.id, this.profilePictureFile)
            .then(response => {
              this.profilePictureUrl = response.data.profilePictureUrl;
              console.log("Profile picture uploaded successfully");
            })
            .catch(e => {
              console.error(e.response);
              this.$toast.add({
                severity: "error",
                summary: "Error",
                detail: "Error uploading profile picture",
                life: 1000
              });
            });
      }

      const userStore = useUserStore();
      userStore.updateUser();
    },
  }
}
</script>