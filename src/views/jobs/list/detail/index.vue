<template>

</template>

<script>
export default {
  name: 'index',
  data(){
    return {
      detailValue:undefined,
      jobId:undefined
    }
  },
  mounted() {
    // this.$route.query
    console.log(this.$route.query.id)
    this.jobId = this.$route.query.id;
  },
  methods:{
    jobDetail(){

    }

  }
}
</script>

<style scoped>

</style>
