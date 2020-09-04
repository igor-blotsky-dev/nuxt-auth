<template>
  <div class="home">
    <form>
      <a
        id="googleSignButton"
        type="button"
        href="http://localhost:3000/api/auth/google"
        >Sign with google</a
      >
    </form>
  </div>
</template>

<script>
export default {
  middleware: 'isAuthenticated',
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
