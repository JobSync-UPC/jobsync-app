<template>
  <div class="flex justify-center items-center h-full">
    <div class="w-full max-w-xl">
      <user-profile-form/>
    </div>
  </div>
</template>

<script>
import UserProfileForm from "../components/user-profile-form.component.vue";

export default {
  name: "profile-management",
  components: {UserProfileForm}
}
</script>

<style scoped>

</style>