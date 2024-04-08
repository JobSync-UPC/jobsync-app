<template>
  <router-link :to="`/${recruitment.id}/dashboard`">
    <div class="max-w-container border-2 px-8 py-4 rounded-lg duration-300 hover:border-primary">
      <h1 class="font-semibold text-2xl">{{ recruitment.name }}</h1>
      <ul>
        <li>
          <span class="font-semibold">{{ $t('recruitment-card.start-date-label') }}: </span>
          {{ recruitment.startingDate }}
        </li>
        <li>
          <span class="font-semibold text-primary">{{ $t('recruitment-card.recruitment-status-label') }}: </span>
          {{ getStatus(recruitment.status) }}
        </li>
        <li>
          {{ recruitment.description }}
        </li>
      </ul>
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