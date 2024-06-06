<template>
  <router-link :to="`recruitment/${recruitment.id}/dashboard`">
    <div class="max-w-container border-2 px-8 py-4 rounded-lg duration-300 hover:border-primary">
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
          </li>
          <li class="font-medium">
            <span class="font-bold text-primary">{{ recruitment.company.name }}</span>
            •
            {{ recruitment.company.country }}
          </li>
          <li>
            <span class="font-semibold text-primary">{{ $t('recruitment-card.recruitment-status-label') }}: </span>
            {{ getStatus(recruitment.jobPost.enabled) }}
          </li>
          <li>
            {{ recruitment.description }}
          </li>
        </ul>
      </div>
    </div>
  </router-link>
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
    getStatus(status) {
      return status === true ? "Open" : "Closed";
    },
    formatDate(date) {
      if (!date) return "";
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      return new Date(date).toLocaleString('en-US', options);
    }
  }
}
</script>

<style>
</style>