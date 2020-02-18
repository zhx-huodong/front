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
      user(val) {
        if (val.IsPlatformAdmin) this.$router.push('/home');
        else this.$router.push('/home');
      }
    }
  };
</script>
