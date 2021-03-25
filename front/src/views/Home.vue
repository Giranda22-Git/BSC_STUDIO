<template>
  <div class="wrapper">
    <theHeader />
    <!-- <chatHelper id="chatHelper" /> -->
  </div>
</template>

<script>
// import chatHelper from '@/components/chatHelper.vue'
import theHeader from '@/components/theHeader.vue'
export default {
  name: 'Home',
  components: {
    theHeader
    // chatHelper
  }
}
</script>

<style lang="sass" scoped>
  .wrapper
    width: 100%
    #chatHelper
      width: 30%
      height: 50vh
</style>
