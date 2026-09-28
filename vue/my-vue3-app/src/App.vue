<template>
  <div>
  <h1>This Vue component include only template tag, so this kind of component is static web-page
  and does not contain any reactivity.</h1>
  <p> Teksti <span class="warning">punaisella</span></p>
  </div>
</template>

<script>

export default {
  name: 'App'
}

</script>

<style scoped>
  .warning {
    color: red;
    font-weight: bold;
  }
</style>
