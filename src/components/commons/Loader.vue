<template lang="pug">
  v-layout(row="" wrap="")
    v-flex.text-xs-center.text-md-center
      v-progress-circular(indeterminate='', :size='size', :width='width', :color="color")
</template>

<script>
  export default {
    props: {
      size: {
        type: Number,
        default: 100
      },
      width: {
        type: Number,
        default: 5
      },
      color: {
        type: String,
        default: 'primary'
      }
    }
  }
</script>
<style>

</style>
