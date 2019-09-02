<template>
  <div>
    当前路由：[ /part/{{getDefaultActive}} ]
  </div>
</template>

<script>
  export default {
    name: "test",
    computed: {
      getDefaultActive(){
        return this.$store.getters.defaultActive
      }
    }
  }
</script>

<style scoped>

</style>
