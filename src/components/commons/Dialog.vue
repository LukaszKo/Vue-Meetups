<template lang="pug">
  v-dialog(v-if="mobile", v-model='dialog', persistent='', fullscreen="")
  v-dialog(v-else, v-model='dialog', persistent='', width="50%")
</template>

<script>
  export default {
    props: ['mobile'],
    data () {
      return {
        dialog: false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
