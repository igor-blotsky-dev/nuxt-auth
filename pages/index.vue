<template>
  <div class="home">
    <form>
      <a
        href="http://localhost:3000/api/auth/google"
        type="button"
        id="googleSignButton"
        >Sign with google</a
      >
    </form>
  </div>
</template>

<script>
export default {
  middleware: 'isAuthenticated',
  /* async fetch() {
    this.users = await this.$api('users', 'index')
  }, */
  data() {
    return {
      users: [],
    }
  },
}
</script>

<style scoped>
.highlight {
  color: green;
  font-weight: bold;
}
</style>
