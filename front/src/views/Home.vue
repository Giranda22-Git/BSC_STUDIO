<template>
  <div class="wrapper">
    <mainstr />
  </div>
</template>

<script>
import mainstr from '@/components/main_menu.vue'
export default {
  name: 'Home',
  components: {
    mainstr
  }
}
</script>

<style lang="sass" scoped>
  .wrapper
    width: 100%
</style>
