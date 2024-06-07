<template>
  <div class="max-w-container border-2 px-8 py-4 rounded-lg duration-300 hover:border-primary">
    <div v-if="recruitment">
      <div class="flex gap-8">
        <div>
          <img class="w-24 h-24 shadow p-4" :src="recruitment.company.logoUrl" alt="company logo" />
        </div>
        <ul>
          <li>
            <h1 class="font-semibold text-2xl">{{ recruitment.jobPost.title }}</h1>
          </li>
          <li>
            <span class="font-semibold">{{ $t('recruitment-card.start-date-label') }}: </span>
            {{ formatDate(recruitment.created_date) }}
            <span class="font-medium">
            ({{ getPassedDays(recruitment.created_date) }} ago)
          </span>
          </li>
          <li class="font-medium">
            <span class="font-bold text-primary">{{ recruitment.company.name }}</span>
            •
            {{ recruitment.company.country }}
          </li>
          <li>
            <span class="font-semibold text-primary">{{ $t('recruitment-card.job-post-status-label') }}: </span>
            <span v-if="recruitment.jobPost.enabled===true">
              {{ $t('recruitment-card.open') }} 🟢
            </span>
            <span v-else>
              {{ $t('recruitment-card.closed') }} 🔴
            </span>
          </li>
          <li>
            {{ recruitment.description }}
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <pv-spinner />
    </div>
  </div>
</template>

<script>
export default {
  name: "recruitment-card",
  props: {
    recruitment: {
      type: Object,
      required: true
    }
  },
  methods:{
    formatDate(date) {
      if (!date) return "";
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(date).toLocaleDateString('en-US', options);
    },
    getPassedDays(date) {
      if (!date) return "";
      const today = new Date();
      const createdDate = new Date(date);
      const diffTime = today - createdDate;

      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        return diffHours + (diffHours === 1 ? " hour" : " hours");
      }

      return diffDays + (diffDays === 1 ? " day" : " days");
    }
  }
}
</script>

<style>
</style>