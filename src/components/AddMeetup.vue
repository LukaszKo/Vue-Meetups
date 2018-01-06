<template lang="pug">
  v-container
    v-layout(row="" wrap="")
      add-meeting-form()

</template>

<script>
  import AddMeetingForm from './AddMeetingForm.vue'

  export default {
    components: {AddMeetingForm}
  }
</script>

<style>

</style>
