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
            {{ recruitment.jobPost.start-date }}
          </li>
          <li class="text-lg font-medium">
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
      }
  }
}
</script>

<style>
</style>