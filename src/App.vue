<template>
  <main-header />
  <div class="app_container">
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import MainHeader from "./components/layout/MainHeader.vue";
</script>
<style lang="sass"  scoped>
.app_container
  padding: 0 10px
  flex: 1
  width: 100%
  max-width: 1320px
  margin: auto
</style>
<style lang="sass"  >
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  box-sizing: border-box
  color: #2c3e50
  width: 100%

body
  min-height: 100vh
  display: flex
</style>
