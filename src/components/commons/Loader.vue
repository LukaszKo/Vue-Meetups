<template lang="pug">
  v-layout(row="" wrap="")
    v-flex.text-xs-center.text-md-center
      v-progress-circular.primary--text(indeterminate='', v-bind:size='size', v-bind:width='width')
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
      }
    }
  }
</script>
<style>

</style>
