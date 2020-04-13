<template></template>
<script>
  export default {
    name: 'switch-page',
    computed: {
      user() {
        return this.$store.state.account.user;
      }
    },
    watch: {
      // user(val) {
      //   this.$router.push('/home');
      // }
    }
  };
</script>
