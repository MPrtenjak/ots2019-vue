<template>
  <div class="container">
    <h3 v-if="error.statusCode === 404">Page not found</h3>
    <h3 v-else>An error occurred</h3>
    <h4>{{ error }}</h4>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String | Object,
      required: false,
      default: ''
    },
  },
}
</script>
