<template>
    <div></div>
</template>

<script>
export default {
  data () {
    return {
      query: this.$route.query
    }
  },
  created () {
    // console.log(this.query)
    this.$router.push({
      name: 'scratchGui',
      query: { id: this.$route.query.id, index: this.$route.query.index, url: this.$route.query.url ,title:this.$route.query.title}
    })
  }
}
</script>

<style scoped>

</style>
