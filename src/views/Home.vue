<template>
  <div class="home">
    <Competition/>
  </div>
</template>

<script>
// @ is an alias to /src
import Competition from '@/components/Competition.vue'

export default {
  name: 'home',
  components: {
    Competition
  }
}
</script>
<style lang="scss" scope>
  .home{
    height: 100%;
    width: 100%;
  }
</style>
